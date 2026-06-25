<template>
  <div class="topology-background-wrapper absolute inset-0 overflow-hidden pointer-events-none">
    <div ref="containerRef" class="w-full h-full block pointer-events-auto"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const containerRef = ref(null);
let animationFrameId = null;

// Three.js 运行时核心变量
let THREE;
let renderer, scene, camera, clock;
let road, leftCarLights, rightCarLights, leftSticks;

// 交互与物理配置
let speedUp = 0;
let speedUpTarget = 0;
let fovTarget = 90;
let timeOffset = 0;
let disposed = false;

const length = 400.0; // 赛道总长度

// 1. 核心时空扭曲配置与 JS/GLSL 数学模型
const turbulentUniforms = {
  uFreq: { value: null },
  uAmp: { value: null }
};

const nsin = (val) => Math.sin(val) * 0.5 + 0.5;

// GLSL 顶点时空扭曲 Shader 片段
const getDistortionShader = `
  uniform vec4 uFreq;
  uniform vec4 uAmp;
  
  #define PI 3.14159265358979
  
  float nsin(float val){
    return sin(val) * 0.5 + 0.5;
  }
  
  float getDistortionX(float progress){
    return (
      cos(PI * progress * uFreq.r + uTime) * uAmp.r +
      pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
    );
  }
  
  float getDistortionY(float progress){
    return (
      -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
      -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
    );
  }
  
  vec3 getDistortion(float progress){
    return vec3(
      getDistortionX(progress) - getDistortionX(0.0125),
      getDistortionY(progress) - getDistortionY(0.0125),
      0.
    );
  }
`;

// JS 版本的时空扭曲道路中心线坐标偏移计算 (用于小球贴轨及相机焦点起伏)
const getRoadCenterOffset = (progress, time) => {
  const uFreq = turbulentUniforms.uFreq.value;
  const uAmp = turbulentUniforms.uAmp.value;
  
  const PI = Math.PI;
  const getX = (p) =>
    Math.cos(PI * p * uFreq.x + time) * uAmp.x +
    Math.pow(Math.cos(PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2.0) * uAmp.y;

  const getY = (p) =>
    -nsin(PI * p * uFreq.z + time) * uAmp.z -
    Math.pow(nsin(PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5.0) * uAmp.w;

  return {
    x: getX(progress) - getX(0.0125),
    y: getY(progress) - getY(0.0125)
  };
};

// JS 版本的时空扭曲公式 (用于对齐相机焦点的晃动)
const getDistortionJS = (progress, time) => {
  const offset = getRoadCenterOffset(progress, time);
  const distortion = new THREE.Vector3(offset.x, offset.y, 0);
  
  const lookAtAmp = new THREE.Vector3(-2, -5, 0);
  const lookAtOffset = new THREE.Vector3(0, 0, -10);
  return distortion.multiply(lookAtAmp).add(lookAtOffset);
};

// 计算障碍物小球在蜿蜒道路上的贴轨 3D 世界坐标
const getRoadPositionForObstacle = (z, laneX, time) => {
  const progress = Math.max(0, Math.min(1, -z / length));
  const offset = getRoadCenterOffset(progress, time);
  return new THREE.Vector3(
    laneX + offset.x,
    offset.y + 0.7, // 悬浮高度 0.7，紧贴公路波动
    z
  );
};

// 2. Shaders 模块
const roadBaseFragment = `
  #define USE_FOG;
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  
  uniform float uLanes;
  uniform vec3 uBrokenLinesColor;
  uniform vec3 uShoulderLinesColor;
  uniform float uShoulderLinesWidthPercentage;
  uniform float uBrokenLinesWidthPercentage;
  uniform float uBrokenLinesLengthPercentage;
  
  highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy, vec2(a, b));
    highp float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
  }

  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(uColor);
    
    // 道路纵向按时间平移，形成向相机流动的速度感
    uv.y = mod(uv.y + uTime * 0.05, 1.0);
    
    // 虚线周期长度与离散间隔
    float laneEmptySpace = 1.0 - uBrokenLinesLengthPercentage;
    float isDashed = step(laneEmptySpace, fract(uv.y * 15.0));
    
    // 动态计算车道分界线距离以支持任意车道数 (如 3 或 4 车道)
    float normalizedX = uv.x * uLanes;
    float distToDivider = abs(fract(normalizedX - 0.5) - 0.5) / uLanes;
    float halfLineWidth = uBrokenLinesWidthPercentage / uLanes * 0.5;
    
    // 过滤掉边缘，仅保留车道内部的分隔线
    float isInnerDivider = step(0.5, normalizedX) * step(normalizedX, uLanes - 0.5);
    float brokenLines = step(distToDivider, halfLineWidth) * isDashed * isInnerDivider;
    
    // 边缘实轨 (Shoulder Lines) 渲染
    float shoulderWidth = uShoulderLinesWidthPercentage / uLanes;
    float sideLines = step(uv.x, shoulderWidth) + step(1.0 - shoulderWidth, uv.x);
    
    // 混合路面、车道线与边缘实线，引入自发光亮度增益 (乘以 2.0)
    color = mix(color, uBrokenLinesColor * 2.0, brokenLines);
    color = mix(color, uShoulderLinesColor * 2.0, sideLines);

    // 引入细腻的路面随机颗粒噪点
    vec2 noiseFreq = vec2(4.0, 7000.0);
    float roadNoise = random(floor(uv * noiseFreq) / noiseFreq) * 0.015 - 0.0075;
    color += roadNoise;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const islandFragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  void main() {
    vec3 color = vec3(uColor);
    // 给中央隔离带边缘加入自发光的科技蓝绿霓虹光带 (占两侧各 8% 宽度)
    float glow = step(0.92, vUv.x) + step(vUv.x, 0.08);
    vec3 glowColor = vec3(0.0, 0.8, 1.0);
    color = mix(color, glowColor * 2.0, glow);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const roadVertexShader = `
  #define USE_FOG;
  uniform float uTime;
  uniform float uTravelLength;
  varying vec2 vUv;
  
  #include <getDistortion_vertex>
  
  void main() {
    vec3 transformed = position.xyz;
    vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.0) / uTravelLength);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    transformed.y += -1.0 * distortion.z;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
  }
`;

const carLightsFragmentShader = `
  #define USE_FOG;
  varying vec3 vColor;
  varying vec2 vUv;
  uniform vec2 uFade;
  void main() {
    vec3 color = vec3(vColor);
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color, alpha);
    if (gl_FragColor.a < 0.0001) discard;
  }
`;

const carLightsVertexShader = `
  #define USE_FOG;
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vColor;
  
  #include <getDistortion_vertex>
  
  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;

    transformed.xy *= radius;
    transformed.z *= myLength;

    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;

    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
  }
`;

const sideSticksVertexShader = `
  #define USE_FOG;
  attribute float aOffset;
  attribute vec3 aColor;
  attribute vec2 aMetrics;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec3 vColor;
  
  mat4 rotationY( in float angle ) {
    return mat4(
      cos(angle),       0.0,    sin(angle), 0.0,
      0.0,              1.0,    0.0,          0.0,
      -sin(angle),      0.0,    cos(angle), 0.0,
      0.0,              0.0,    0.0,          1.0
    );
  }
  
  #include <getDistortion_vertex>
  
  void main(){
    vec3 transformed = position.xyz;
    float width = aMetrics.x;
    float height = aMetrics.y;

    transformed.xy *= vec2(width, height);
    float time = mod(uTime * 120.0 + aOffset, uTravelLength);

    transformed = (rotationY(3.14/2.0) * vec4(transformed, 1.0)).xyz;
    transformed.z += - uTravelLength + time;

    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    transformed.y += height / 2.0;
    transformed.x += -width / 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
  }
`;

const sideSticksFragmentShader = `
  #define USE_FOG;
  varying vec3 vColor;
  void main(){
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color,1.0);
  }
`;

// Helper: 随机与 LERP
const random = (base) => {
  if (Array.isArray(base)) {
    return Math.random() * (base[1] - base[0]) + base[0];
  }
  return Math.random() * base;
};

const pickRandom = (arr) => {
  if (Array.isArray(arr)) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return arr;
};

const lerp = (current, target, speed = 0.1, limit = 0.001) => {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) {
    change = target - current;
  }
  return change;
};

// 3. Road 公路模块
class Road {
  constructor(webgl, options) {
    this.webgl = webgl;
    this.options = options;
    this.uTime = { value: 0 };
  }

  createPlane(side, width, isRoad) {
    const options = this.options;
    const geometry = new THREE.PlaneGeometry(
      isRoad ? options.roadWidth : options.islandWidth,
      options.length,
      20,
      100
    );

    let uniforms = {
      uTravelLength: { value: options.length },
      uColor: {
        value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor),
      },
      uTime: this.uTime,
    };

    if (isRoad) {
      uniforms = Object.assign(uniforms, {
        uLanes: { value: options.lanesPerRoad },
        uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) },
        uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) },
        uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },
        uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },
        uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage },
      });
    }

    const material = new THREE.ShaderMaterial({
      fragmentShader: isRoad ? roadBaseFragment : islandFragmentShader,
      vertexShader: roadVertexShader,
      side: THREE.DoubleSide,
      uniforms: Object.assign(uniforms, options.distortion.uniforms),
    });

    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.z = -options.length / 2;
    mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;

    this.webgl.scene.add(mesh);
    return mesh;
  }

  init() {
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);
    this.island = this.createPlane(0, this.options.islandWidth, false);
  }

  update(time) {
    this.uTime.value = time;
  }
}

// 4. CarLights 车灯尾迹模块
class CarLights {
  constructor(webgl, options, colors, speed, fade) {
    this.webgl = webgl;
    this.options = options;
    this.colors = colors;
    this.speed = speed;
    this.fade = fade;
  }

  init() {
    const options = this.options;
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
    const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);

    const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
    instanced.instanceCount = options.lightPairsPerRoadWay * 2;

    const laneWidth = options.roadWidth / options.lanesPerRoad;
    const aOffset = [];
    const aMetrics = [];
    const aColor = [];

    let colorArray = Array.isArray(this.colors)
      ? this.colors.map((c) => new THREE.Color(c))
      : [new THREE.Color(this.colors)];

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      const radius = random(options.carLightsRadius);
      const length = random(options.carLightsLength);
      const spd = random(this.speed);

      const carLane = i % options.lanesPerRoad;
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;

      const carWidth = random(options.carWidthPercentage) * laneWidth;
      const carShiftX = random(options.carShiftX) * laneWidth;
      laneX += carShiftX;

      const offsetY = random(options.carFloorSeparation) + radius * 1.3;
      const offsetZ = -random(options.length);

      aOffset.push(laneX - carWidth / 2, offsetY, offsetZ);
      aOffset.push(laneX + carWidth / 2, offsetY, offsetZ);

      aMetrics.push(radius, length, spd);
      aMetrics.push(radius, length, spd);

      const color = pickRandom(colorArray);
      aColor.push(color.r, color.g, color.b);
      aColor.push(color.r, color.g, color.b);
    }

    instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3));
    instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3));
    instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));

    const material = new THREE.ShaderMaterial({
      fragmentShader: carLightsFragmentShader,
      vertexShader: carLightsVertexShader,
      transparent: true,
      uniforms: Object.assign(
        {
          uTime: { value: 0 },
          uTravelLength: { value: options.length },
          uFade: { value: this.fade },
        },
        options.distortion.uniforms
      ),
    });

    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };

    this.mesh = new THREE.Mesh(instanced, material);
    this.mesh.frustumCulled = false;
    this.webgl.scene.add(this.mesh);
  }

  update(time) {
    if (this.mesh.material.uniforms.uTime) {
      this.mesh.material.uniforms.uTime.value = time;
    }
  }
}

// 5. LightsSticks 侧边通道光柱模块
class LightsSticks {
  constructor(webgl, options) {
    this.webgl = webgl;
    this.options = options;
  }

  init() {
    const options = this.options;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
    
    const totalSticks = options.totalSideLightSticks;
    instanced.instanceCount = totalSticks;

    const stickoffset = options.length / (totalSticks - 1);
    const aOffset = [];
    const aColor = [];
    const aMetrics = [];

    let colorArray = Array.isArray(options.colors.sticks)
      ? options.colors.sticks.map((c) => new THREE.Color(c))
      : [new THREE.Color(options.colors.sticks)];

    for (let i = 0; i < totalSticks; i++) {
      const width = random(options.lightStickWidth);
      const height = random(options.lightStickHeight);
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());

      const color = pickRandom(colorArray);
      aColor.push(color.r, color.g, color.b);
      aMetrics.push(width, height);
    }

    instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1));
    instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));
    instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2));

    const material = new THREE.ShaderMaterial({
      fragmentShader: sideSticksFragmentShader,
      vertexShader: sideSticksVertexShader,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        {
          uTravelLength: { value: options.length },
          uTime: { value: 0 },
        },
        options.distortion.uniforms
      ),
    });

    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        options.distortion.getDistortion
      );
    };

    this.mesh = new THREE.Mesh(instanced, material);
    this.mesh.frustumCulled = false;
    this.webgl.scene.add(this.mesh);
  }

  update(time) {
    if (this.mesh.material.uniforms.uTime) {
      this.mesh.material.uniforms.uTime.value = time;
    }
  }
}

// 6. 动态“障碍物”业务气泡管理系统
const obstaclePool = [
  { type: '水源', titles: ['南门水库', '夹江取水口', '地下水源区', '一级取水点'], unit: 'm³/h', valRange: [1200, 3500] },
  { type: '水厂', titles: ['城北自来水厂', '一号净化中心', '污水处理站', '回水利用所'], unit: 'NTU', valRange: [0.08, 0.18], isFloat: true },
  { type: '泵阀', titles: ['增压提升泵站', '防汛二级泵房', '大坝控制水闸', '中枢分水网所'], unit: 'MPa', valRange: [0.35, 0.65], isFloat: true },
  { type: '终端', titles: ['高新工业园区', '河畔居民小区', '智能水表总集', '终端用水户'], unit: 't', valRange: [50, 260] }
];

const activeObstacles = [];

// 高清双行文本 Canvas 看板绘制
const createNodeTexture = (title, desc, colorHex) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  const grad = ctx.createRadialGradient(128, 128, 40, 128, 128, 115);
  grad.addColorStop(0, 'rgba(4, 12, 38, 0.95)');
  grad.addColorStop(0.78, 'rgba(0, 60, 180, 0.72)');
  grad.addColorStop(1, 'rgba(0, 255, 200, 0)');
  
  ctx.beginPath();
  ctx.arc(128, 128, 115, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(128, 128, 88, 0, Math.PI * 2);
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 6;
  ctx.shadowColor = colorHex;
  ctx.shadowBlur = 15;
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;
  ctx.fillText(title, 128, 105);
  
  ctx.fillStyle = '#00ffd5';
  ctx.font = 'bold 26px "Microsoft YaHei", sans-serif';
  ctx.fillText(desc, 128, 155);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

const createSpriteNode = (title, desc, colorHex) => {
  const texture = createNodeTexture(title, desc, colorHex);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.NormalBlending
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.3, 1.3, 1.0);
  return sprite;
};

// 7. 初始化 WebGL 场景
const initThree = () => {
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  scene = new THREE.Scene();
  scene.background = null;

  clock = new THREE.Clock();

  turbulentUniforms.uFreq.value = new THREE.Vector4(4, 8, 8, 1);
  turbulentUniforms.uAmp.value = new THREE.Vector4(25, 5, 10, 10);

  const distortion = {
    uniforms: turbulentUniforms,
    getDistortion: getDistortionShader,
    getJS: getDistortionJS
  };

  const options = {
    distortion,
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x060b16,      // 微微带有一点暗蓝，提升立体感
      islandColor: 0x0c1122,    // 隔离带材质色
      background: 0x000000,
      shoulderLines: 0x0088ff,  // 边缘实轨：亮蓝色
      brokenLines: 0x00ffd5,    // 车道虚轨：亮青霓虹色
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x00ffd5,         // 光柱颜色同步亮青
    }
  };

  camera = new THREE.PerspectiveCamera(options.fov, width / height, 0.1, 10000);
  camera.position.z = -5;
  camera.position.y = 8;
  camera.position.x = 0;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.setProperty("width", "100%");
  renderer.domElement.style.setProperty("height", "100%");
  containerRef.value.appendChild(renderer.domElement);

  road = new Road({ scene }, options);
  road.init();

  leftCarLights = new CarLights({ scene }, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
  leftCarLights.init();
  leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);

  rightCarLights = new CarLights({ scene }, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
  rightCarLights.init();
  rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);

  leftSticks = new LightsSticks({ scene }, options);
  leftSticks.init();
  leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));

  // 初始化 6 个动态水网“障碍物”业务节点小球 (散落在远处并附着在车道)
  const colors = ['#00ffd5', '#ffcc00', '#0088ff', '#00ff8c', '#a855f7', '#ff8800'];
  for (let i = 0; i < 6; i++) {
    const initZ = -100 - i * 65.0 - Math.random() * 30.0;
    const laneIdx = Math.floor(Math.random() * 3) - 1; // -1, 0, 1 (左车道、中隔离、右车道)
    const laneX = laneIdx * 4.0;
    const speed = 75.0 + Math.random() * 30.0; // 小球向相机推进的流速
    
    const poolItem = obstaclePool[i % obstaclePool.length];
    const title = poolItem.titles[Math.floor(Math.random() * poolItem.titles.length)];
    const val = poolItem.isFloat 
      ? (poolItem.valRange[0] + Math.random() * (poolItem.valRange[1] - poolItem.valRange[0])).toFixed(2)
      : Math.floor(poolItem.valRange[0] + Math.random() * (poolItem.valRange[1] - poolItem.valRange[0]));
    const desc = `${poolItem.type === '水源' ? '流量' : poolItem.type === '水厂' ? '浊度' : poolItem.type === '泵阀' ? '压力' : '昨日'} : ${val}${poolItem.unit}`;

    const sprite = createSpriteNode(title, desc, colors[i % colors.length]);
    
    // 首帧坐标计算
    const pos = getRoadPositionForObstacle(initZ, laneX, 0);
    sprite.position.copy(pos);
    scene.add(sprite);

    activeObstacles.push({
      sprite,
      z: initZ,
      laneX,
      speed,
      color: colors[i % colors.length]
    });
  }

  containerRef.value.addEventListener("mousedown", onMouseDown);
  containerRef.value.addEventListener("mouseup", onMouseUp);
  containerRef.value.addEventListener("mouseout", onMouseUp);
  containerRef.value.addEventListener("touchstart", onTouchStart);
  containerRef.value.addEventListener("touchend", onTouchEnd);

  window.addEventListener('resize', onWindowResize);

  tick(options);
};

const onMouseDown = () => {
  fovTarget = 150;
  speedUpTarget = 2;
};

const onMouseUp = () => {
  fovTarget = 90;
  speedUpTarget = 0;
};

const onTouchStart = () => {
  fovTarget = 150;
  speedUpTarget = 2;
};

const onTouchEnd = () => {
  fovTarget = 90;
  speedUpTarget = 0;
};

// 渲染与推进更新循环
const tick = (options) => {
  if (disposed) return;

  const delta = clock.getDelta();

  const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
  speedUp += lerp(speedUp, speedUpTarget, lerpPercentage, 0.00001);
  timeOffset += speedUp * delta;
  
  const time = clock.getElapsedTime() + timeOffset;

  // 1. 驱动背景流动
  if (rightCarLights) rightCarLights.update(time);
  if (leftCarLights) leftCarLights.update(time);
  if (leftSticks) leftSticks.update(time);
  if (road) road.update(time);

  // 2. 驱动“障碍物”业务面板向相机飞奔，并实施道路弯曲形变贴轨
  activeObstacles.forEach((obs) => {
    // 增加 Z 坐标朝相机迎面移动 (速度也会受到玩家加速控制影响)
    obs.z += obs.speed * (1.0 + speedUp * 0.5) * delta;
    
    // 超出相机镜头后进行远处重置
    if (obs.z > 5.0) {
      obs.z = -400.0 - Math.random() * 50.0;
      obs.laneX = (Math.floor(Math.random() * 3) - 1) * 4.0;
      obs.speed = 75.0 + Math.random() * 30.0;
      
      const poolItem = obstaclePool[Math.floor(Math.random() * obstaclePool.length)];
      const title = poolItem.titles[Math.floor(Math.random() * poolItem.titles.length)];
      const val = poolItem.isFloat 
        ? (poolItem.valRange[0] + Math.random() * (poolItem.valRange[1] - poolItem.valRange[0])).toFixed(2)
        : Math.floor(poolItem.valRange[0] + Math.random() * (poolItem.valRange[1] - poolItem.valRange[0]));
      const desc = `${poolItem.type === '水源' ? '流量' : poolItem.type === '水厂' ? '浊度' : poolItem.type === '泵阀' ? '压力' : '昨日'} : ${val}${poolItem.unit}`;

      const newTexture = createNodeTexture(title, desc, obs.color);
      obs.sprite.material.map.dispose();
      obs.sprite.material.map = newTexture;
    }

    // 贴轨同步：计算当前 Z 坐标以及道路扭曲形变对齐，紧贴在路面上空滑动
    const pos = getRoadPositionForObstacle(obs.z, obs.laneX, time);
    obs.sprite.position.copy(pos);
  });

  // 3. 更新相机 FOV
  let updateCamera = false;
  const fovChange = lerp(camera.fov, fovTarget, lerpPercentage);
  if (fovChange !== 0) {
    camera.fov += fovChange * delta * 6;
    updateCamera = true;
  }

  // 4. 让静止相机的焦点跟随弯曲公路动态起伏 (创造赛车游戏式视角运动感)
  if (camera && options.distortion && options.distortion.getJS) {
    const dist = options.distortion.getJS(0.025, time);
    camera.lookAt(
      new THREE.Vector3(
        camera.position.x + dist.x,
        camera.position.y + dist.y,
        camera.position.z + dist.z
      )
    );
    updateCamera = true;
  }

  if (updateCamera) {
    camera.updateProjectionMatrix();
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }

  animationFrameId = requestAnimationFrame(() => tick(options));
};

const onWindowResize = () => {
  if (!containerRef.value || !camera || !renderer) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
};

onMounted(async () => {
  THREE = await import('../../node_modules/three/build/three.module.js');
  initThree();
});

onUnmounted(() => {
  disposed = true;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  window.removeEventListener('resize', onWindowResize);

  if (containerRef.value) {
    containerRef.value.removeEventListener("mousedown", onMouseDown);
    containerRef.value.removeEventListener("mouseup", onMouseUp);
    containerRef.value.removeEventListener("mouseout", onMouseUp);
    containerRef.value.removeEventListener("touchstart", onTouchStart);
    containerRef.value.removeEventListener("touchend", onTouchEnd);
    
    if (renderer && renderer.domElement) {
      containerRef.value.innerHTML = '';
    }
  }

  // 释放场景资源
  if (road) {
    if (road.leftRoadWay) {
      scene.remove(road.leftRoadWay);
      road.leftRoadWay.geometry.dispose();
      road.leftRoadWay.material.dispose();
    }
    if (road.rightRoadWay) {
      scene.remove(road.rightRoadWay);
      road.rightRoadWay.geometry.dispose();
      road.rightRoadWay.material.dispose();
    }
    if (road.island) {
      scene.remove(road.island);
      road.island.geometry.dispose();
      road.island.material.dispose();
    }
  }

  if (leftCarLights && leftCarLights.mesh) {
    scene.remove(leftCarLights.mesh);
    leftCarLights.mesh.geometry.dispose();
    leftCarLights.mesh.material.dispose();
  }

  if (rightCarLights && rightCarLights.mesh) {
    scene.remove(rightCarLights.mesh);
    rightCarLights.mesh.geometry.dispose();
    rightCarLights.mesh.material.dispose();
  }

  if (leftSticks && leftSticks.mesh) {
    scene.remove(leftSticks.mesh);
    leftSticks.mesh.geometry.dispose();
    leftSticks.mesh.material.dispose();
  }

  activeObstacles.forEach((obs) => {
    scene.remove(obs.sprite);
    obs.sprite.material.map.dispose();
    obs.sprite.material.dispose();
  });

  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.topology-background-wrapper {
  mask-image: radial-gradient(circle at 35% 55%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: radial-gradient(circle at 35% 55%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 100%);
}
</style>
