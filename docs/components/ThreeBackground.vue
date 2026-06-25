<template>
  <div class="three-background-wrapper absolute inset-0 overflow-hidden pointer-events-none">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// 接收鼠标视差偏移 props
const props = defineProps({
  mouseX: {
    type: Number,
    default: 0
  },
  mouseY: {
    type: Number,
    default: 0
  }
});

const canvasRef = ref(null);
const BALL_OFFSET_X = -1.1; // 统一定义水球及粒子的左移偏置量，可一键调整
let animationFrameId = null;
let renderer, scene, camera;
let waterMesh;
let waterMaterial;
let glowTexture; // 全局共用的粒子发光贴图

// 5 个轨道的配置数组：将业务文字小球与封闭的圆环轨道一一配对
const orbitsConfig = [
  {
    text: 'AI',
    radius: 2.6,        // 统一半径，形成对称同心圆
    tubeRadius: 0.024,  // 统一管径粗细
    color: '#00ffd5',
    speed: 0.8,        // 公转角速度
    trailLength: 0.35, // 拖尾长度比例 (0-1)
    rotX: Math.PI / 3,  // 统一倾角 60 度
    rotY: 0 * (Math.PI * 2 / 5), // 绕 Y 轴等分：0 度
    rotZ: 0.0,
    waveSpeed: 0.06,
    waveAmp: 0.038
  },
  {
    text: '自动',
    radius: 2.6,
    tubeRadius: 0.024,
    color: '#00ff8c',
    speed: -0.7,        // 反向交错
    trailLength: 0.38,
    rotX: Math.PI / 3,
    rotY: 1 * (Math.PI * 2 / 5), // 绕 Y 轴等分：72 度
    rotZ: 0.0,
    waveSpeed: 0.04,
    waveAmp: 0.042
  },
  {
    text: '智慧',
    radius: 2.6,
    tubeRadius: 0.024,
    color: '#0088ff',
    speed: 0.6,
    trailLength: 0.42,
    rotX: Math.PI / 3,
    rotY: 2 * (Math.PI * 2 / 5), // 绕 Y 轴等分：144 度
    rotZ: 0.0,
    waveSpeed: 0.03,
    waveAmp: 0.048
  },
  {
    text: '节水',
    radius: 2.6,
    tubeRadius: 0.024,
    color: '#40a6ff',
    speed: -0.5,        // 反向交错
    trailLength: 0.46,
    rotX: Math.PI / 3,
    rotY: 3 * (Math.PI * 2 / 5), // 绕 Y 轴等分：216 度
    rotZ: 0.0,
    waveSpeed: 0.05,
    waveAmp: 0.035
  },
  {
    text: '灌溉',
    radius: 2.6,
    tubeRadius: 0.024,
    color: '#a855f7',
    speed: 0.4,
    trailLength: 0.50,
    rotX: Math.PI / 3,
    rotY: 4 * (Math.PI * 2 / 5), // 绕 Y 轴等分：288 度
    rotZ: 0.0,
    waveSpeed: 0.035,
    waveAmp: 0.045
  }
];

// 保存运行时创建的 3D 对象
const activeOrbits = [];

// 1. Raymarching 顶点着色器：计算并传递世界坐标与局部坐标
const vertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  void main() {
    vLocalPosition = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

// 2. Raymarching 片元着色器：实现复杂分形、有机纹理与光线步进水特效
const fragmentShader = `
  uniform vec3 uCameraPosition;
  uniform float uTime;
  uniform float uNoiseStrength;
  uniform float uNoiseSpeed;
  uniform vec3 uWaterColor;
  uniform vec3 uSphereCenter;

  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  // 3D 快速伪噪声
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 57.0, 113.0));

    float v000 = fract(sin(n) * 43758.5453123);
    float v100 = fract(sin(n + 1.0) * 43758.5453123);
    float v010 = fract(sin(n + 57.0) * 43758.5453123);
    float v110 = fract(sin(n + 58.0) * 43758.5453123);
    float v001 = fract(sin(n + 113.0) * 43758.5453123);
    float v101 = fract(sin(n + 114.0) * 43758.5453123);
    float v011 = fract(sin(n + 170.0) * 43758.5453123);
    float v111 = fract(sin(n + 171.0) * 43758.5453123);

    return mix(
      mix(mix(v000, v100, f.x), mix(v010, v110, f.x), f.y),
      mix(mix(v001, v101, f.x), mix(v011, v111, f.x), f.y),
      f.z
    );
  }

  // 3D 分形布朗运动 (Fractal Brownian Motion)，构造细腻有机的液态纹理
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    vec3 shift = vec3(100.0);
    // 旋转空间避免轴对齐伪影
    mat3 rot = mat3(
      0.80,  0.60,  0.00,
     -0.60,  0.80,  0.00,
      0.00,  0.00,  1.00
    );
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = rot * p * 2.2 + shift;
      amplitude *= 0.48;
    }
    return value;
  }

  // 场景 SDF (Signed Distance Field) 映射函数
  float map(vec3 p) {
    vec3 localP = p;

    // 让噪声随时间缓慢流动，表现液体的有机流动性
    float timeScale = uTime * uNoiseSpeed;
    vec3 noiseP = localP * 1.6 + vec3(0.0, timeScale, timeScale * 0.5);

    // 通过 FBM 分形获取表面的水波起伏值
    float displacement = (fbm(noiseP) - 0.5) * uNoiseStrength;

    // 基础水球半径为 1.25
    float sphereSDF = length(localP) - 1.25;

    return sphereSDF + displacement;
  }

  // 利用数值导数求撞击点处的表面法线 (Normal)
  vec3 getNormal(vec3 p) {
    const float eps = 0.003;
    const vec2 h = vec2(eps, 0.0);
    return normalize(vec3(
      map(p + h.xyy) - map(p - h.xyy),
      map(p + h.yxy) - map(p - h.yxy),
      map(p + h.yyx) - map(p - h.yyx)
    ));
  }

  void main() {
    vec3 ro = uCameraPosition;
    vec3 rd = normalize(vWorldPosition - ro);

    // 偏移球体在世界坐标下的中心点 (同步 uniform 以匹配外部物理位置)
    vec3 sphereCenter = uSphereCenter;

    // 光线步进 (Raymarching) 循环，最多搜索 72 步以保障完美细节
    float t = 0.0;
    float max_t = 12.0;
    bool hit = false;
    vec3 p;

    for (int i = 0; i < 72; i++) {
      p = ro + rd * t;
      // 将采样的点变换回相对于球体中心的空间
      float d = map(p - sphereCenter);
      if (d < 0.001) {
        hit = true;
        break;
      }
      t += d;
      if (t > max_t) break;
    }

    if (!hit) {
      discard;
    }

    // 撞击到水球，进行有机水材质光学着色 (Water Shading)
    vec3 localHitPoint = p - sphereCenter;
    vec3 N = getNormal(localHitPoint);
    vec3 V = -rd;

    // 主光源（强烈的右上角太阳光）
    vec3 L = normalize(vec3(3.0, 4.0, 5.0));
    // 补光源（来自左下方的弱冷光）
    vec3 L2 = normalize(vec3(-3.0, -2.0, -1.0));

    // 1. 漫反射项
    float diff = max(dot(N, L), 0.0);
    float diff2 = max(dot(N, L2), 0.0);

    // 2. 菲涅尔效应 (Fresnel Effect)
    float fresnel = pow(clamp(1.0 - dot(N, V), 0.0, 1.0), 4.5);

    // 3. 镜面高光 (Specular)
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 64.0) * 2.2;

    // 4. 水内部透光/发光模拟
    float scatter = pow(clamp(0.5 - 0.5 * dot(N, L), 0.0, 1.0), 2.0);
    vec3 subsurfaceColor = mix(uWaterColor, vec3(0.0, 0.9, 0.95), scatter * 0.7);

    // 5. 综合混合色彩
    vec3 finalColor = subsurfaceColor * (diff * 0.65 + diff2 * 0.25 + 0.25);

    // 叠加上镜面高光
    finalColor += vec3(0.9, 0.95, 1.0) * spec;

    // 叠加上菲涅尔环境反射光
    finalColor += mix(vec3(0.4, 0.8, 1.0), vec3(1.0), fresnel) * fresnel * 0.9;

    // 6. 边缘泛光 (Edge Glow)
    float edgeGlow = pow(1.0 - max(dot(N, V), 0.0), 2.5);
    finalColor += vec3(0.0, 0.6, 1.0) * edgeGlow * 0.45;

    // 柔和的渐变透明度
    float alpha = mix(0.78, 0.98, fresnel);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// 3. 科幻流光轨道顶点着色器
const trailVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

// 4. 科幻流光轨道片元着色器：渲染完全封闭的发光圆环，并在其上叠加从小球头部向身后延伸的发光拖尾
const trailFragmentShader = `
  uniform vec3 uColor;
  uniform float uLength;
  uniform float uHead;       // 小球在轨道上的 U 位置 (0.0 到 1.0)
  uniform float uDirection;  // 公转运动方向：1.0 为正向，-1.0 为反向

  varying vec2 vUv;

  void main() {
    // 1. 横截面径向渐变发光 (在管子截面上，中心亮，边缘暗，产生霓虹光晕感)
    float radialGlow = sin(vUv.y * 3.14159265);
    float radialGlowPower = pow(radialGlow, 4.0); // 径向收紧，突出光纤中心线

    // 2. 环向发光拖尾控制：计算当前点到小球头部的身后距离
    float dist = fract((uHead - vUv.x) * uDirection);

    // 拖尾平滑消隐：在 dist = 0.0（小球头部）时最亮，到 dist = uLength（尾部）时平滑衰减为 0.0
    float streamLight = 0.0;
    if (dist < uLength) {
      // 使用指数衰减曲线，使拖尾更有流星消隐感
      streamLight = pow(1.0 - dist / uLength, 2.0);
    }

    // 结合径向光晕
    streamLight *= radialGlowPower;

    // 3. 封闭底轨发光（不随小球移动的常驻闭合霓虹光环）
    // 让底轨在径向上更细、更柔和，作为一个精致的参考线
    float baseOrbit = pow(radialGlow, 6.0) * 0.18;

    // 4. 叠加混合：高亮流动拖尾与完整闭合的霓虹底轨
    vec3 finalColor = uColor * (streamLight * 4.0 + baseOrbit * 1.2);
    
    // 透明度由拖尾和底轨共同决定，并与径向发光挂钩
    float finalAlpha = (streamLight * 0.95 + baseOrbit * 0.7) * radialGlow;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

// 初始化 3D 场景
const initThree = async () => {
  if (typeof window === 'undefined') return;

  // 动态导入 Three.js，使用物理相对路径绕过 Vite 依赖优化缓存，防止 Outdated Dep 504 错误
  const THREE = await import('../../node_modules/three/build/three.module.js');

  // 初始化生成高亮发光星斑贴图，供星轨共用
  glowTexture = createGlowTexture(THREE);

  const width = canvasRef.value.clientWidth;
  const height = canvasRef.value.clientHeight;

  // 1. 创建场景
  scene = new THREE.Scene();

  // 2. 创建相机（透视相机）
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.8);

  // 3. 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true // 透明背景，完美融合网页的背景渐变
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 4. 使用 SphereGeometry 包装 Raymarching 材质
  const waterGeometry = new THREE.SphereGeometry(1.68, 36, 36);

  // 自定义 Shader 材质
  waterMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uCameraPosition: { value: new THREE.Vector3() },
      uTime: { value: 0 },
      uNoiseStrength: { value: 0.38 },            // 水波分形波动振幅
      uNoiseSpeed: { value: 0.52 },               // 水球流动形变速度
      uWaterColor: { value: new THREE.Color('#002b8f') }, // 深海幽蓝色底
      uSphereCenter: { value: new THREE.Vector3(BALL_OFFSET_X, 0, 0) } // 水球及轨道在世界坐标下的物理中心
    },
    transparent: true,
    depthWrite: true,
    blending: THREE.NormalBlending
  });

  waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
  waterMesh.position.set(BALL_OFFSET_X, 0, 0);
  scene.add(waterMesh);

  // 5. 循环构建 5 个轨道系统并加入场景中
  orbitsConfig.forEach((cfg) => {
    // 5.1 创建轨道倾斜容器 Group
    const group = new THREE.Group();
    group.rotation.order = 'YXZ'; // 关键：改变旋转顺序为 YXZ，先绕 Y 轴散开方位角，再绕 X 轴倾斜，完美呈现 3D 交错原子轨道
    group.position.set(BALL_OFFSET_X, 0, 0);
    group.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);
    scene.add(group);

    // 5.2 创建星尘粒子并加入 group
    const orbitParticles = createOrbit(THREE, cfg.radius, cfg.color, 1600 + Math.floor(cfg.radius * 400));
    group.add(orbitParticles);

    // 5.3 创建科幻流光圆环，在局部空间先旋转 90 度以平铺到 XZ 轨道平面上，并添加至 group
    const trailGeom = new THREE.TorusGeometry(cfg.radius, cfg.tubeRadius, 8, 120);
    const trailMat = new THREE.ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(cfg.color) },
        uLength: { value: cfg.trailLength },
        uHead: { value: 0.0 },
        uDirection: { value: cfg.speed >= 0 ? 1.0 : -1.0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending // 叠加发光融合
    });
    const trailMesh = new THREE.Mesh(trailGeom, trailMat);
    trailMesh.rotation.x = Math.PI / 2; // 对齐局部 XZ 极坐标公转平面
    group.add(trailMesh);

    // 5.4 创建高清文字圆形电子面板 Sprite，并添加进 group
    const sprite = createSpriteElectron(THREE, cfg.text, cfg.color);
    // 初始位置设置在局部 X 轴的半径处
    sprite.position.set(cfg.radius, 0, 0);
    group.add(sprite);

    // 5.5 保存引用用于 tick 动画 and 销毁
    activeOrbits.push({
      config: cfg,
      group,
      particles: orbitParticles,
      trailMesh,
      trailMat,
      sprite,
      angle: Math.random() * Math.PI * 2 // 随机化初始角度，避免小球初始全部排在一排
    });
  });

  // 监听窗口大小调整
  window.addEventListener('resize', onWindowResize);

  // 开始动画主循环
  tick(THREE);
};

// 辅助方法：动态生成高亮发光星斑贴图 (用 Canvas 渐变实现发光星尘微粒，无外部依赖)
const createGlowTexture = (THREE) => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// 辅助方法：创建星尘微粒系统，提供星轨雾化拉丝质感
const createOrbit = (THREE, radius, colorHex, count = 1000) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const baseColor = new THREE.Color(colorHex);

  for (let i = 0; i < count; i++) {
    // 沿着圆环均匀随机分布
    const theta = Math.random() * Math.PI * 2;
    // 稍微在半径方向和 Y 轴方向加一点随机抖动，使星尘有宽度和厚度
    const r = radius + (Math.random() - 0.5) * 0.12;
    const y = (Math.random() - 0.5) * 0.05;

    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r;

    // 颜色微调，使星尘有色彩明暗深度变化
    const mixedColor = baseColor.clone().multiplyScalar(0.5 + Math.random() * 0.6);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    map: glowTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  return points;
};

// 辅助方法：动态绘制带发光霓虹边框的高清文字圆形贴图 (用于原子核电子文字面板)
const createTextTexture = (THREE, text, colorHex) => {
  const canvas = document.createElement('canvas');
  // 256x256 高分辨率，保障在大屏投影下文字极其锐利、清晰无锯齿
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // 1. 绘制带有柔和外发光的半透深蓝色圆形底盘，带来科技通透感
  const circleGrad = ctx.createRadialGradient(128, 128, 45, 128, 128, 115);
  circleGrad.addColorStop(0, 'rgba(5, 15, 38, 0.88)');
  circleGrad.addColorStop(0.75, 'rgba(0, 75, 220, 0.52)');
  circleGrad.addColorStop(1, 'rgba(0, 255, 213, 0)');
  
  ctx.beginPath();
  ctx.arc(128, 128, 115, 0, Math.PI * 2);
  ctx.fillStyle = circleGrad;
  ctx.fill();

  // 绘制圆环霓虹发光圆边框
  ctx.beginPath();
  ctx.arc(128, 128, 86, 0, Math.PI * 2);
  ctx.strokeStyle = colorHex; // 匹配所在轨道的科技主题色
  ctx.lineWidth = 6;
  ctx.shadowColor = colorHex;
  ctx.shadowBlur = 18;
  ctx.stroke();
  
  // 重置 shadow 阴影，避免其晕染汉字字形
  ctx.shadowBlur = 0;

  // 2. 绘制高清微软雅黑加粗文字
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px "Microsoft YaHei", "Helvetica Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 给文字也加上亮白的发光微晕效果
  ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
  ctx.shadowBlur = 10;
  ctx.fillText(text, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

// 辅助方法：创建 3D 空间中的圆形电子 Sprite (Sprite 广告牌技术保证文字永远端正朝向镜头)
const createSpriteElectron = (THREE, text, colorHex) => {
  const texture = createTextTexture(THREE, text, colorHex);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95,
    depthWrite: false, // 保证发光圆轨和星尘不被深度剔除，实现自然融合
    blending: THREE.NormalBlending
  });
  const sprite = new THREE.Sprite(material);
  // 缩放到 3D 空间中的 0.58 黄金尺寸
  sprite.scale.set(0.58, 0.58, 1);
  return sprite;
};

// 相机视差漂移变量
const targetCameraPos = { x: 0, y: 0 };
const currentCameraPos = { x: 0, y: 0 };

// 监听鼠标偏移 props，动态驱动 3D 相机
watch(() => [props.mouseX, props.mouseY], ([x, y]) => {
  targetCameraPos.x = (x / 30) * 0.75;
  targetCameraPos.y = -(y / 30) * 0.75; // 3D Y轴相反
});

// 获取真正的数学正小数 fract
const fract = (val) => {
  return val - Math.floor(val);
};

// 主渲染循环
const clock = { elapsed: 0, delta: 0, last: 0 };
const tick = (THREE) => {
  const now = performance.now();
  clock.delta = (now - clock.last) / 1000;
  clock.last = now;
  clock.elapsed += clock.delta;

  const time = clock.elapsed;

  // 1. 平滑插值相机位置，驱动 Raymarching 反射视角的立体感
  currentCameraPos.x += (targetCameraPos.x - currentCameraPos.x) * 0.055;
  currentCameraPos.y += (targetCameraPos.y - currentCameraPos.y) * 0.055;

  if (camera) {
    camera.position.x = currentCameraPos.x;
    camera.position.y = currentCameraPos.y;
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // 保持相机直视世界原点，使得物理位置偏置的水球及星轨能真正偏左渲染
  }

  // 2. 将相机的最新世界位置 and 时间传入 Raymarching Shader
  if (waterMaterial && camera) {
    waterMaterial.uniforms.uTime.value = time;
    waterMaterial.uniforms.uCameraPosition.value.copy(camera.position);
  }

  // 3. 循环更新 5 个轨道上的粒子、流光、文字小球以及引力波动
  activeOrbits.forEach((obj) => {
    const cfg = obj.config;

    // 3.1 累加小球的角度（公转）
    obj.angle += clock.delta * cfg.speed * 0.85;

    // 3.2 更新小球在局部 XZ 坐标系中的位置 (小球被 100% 绑定在此轨道的半径上)
    obj.sprite.position.x = Math.cos(obj.angle) * cfg.radius;
    obj.sprite.position.z = Math.sin(obj.angle) * cfg.radius;

    // 3.3 计算拖尾头部的 U 坐标 (0.0 到 1.0) 传入 Shader
    const uHead = fract(obj.angle / (2 * Math.PI));
    obj.trailMat.uniforms.uHead.value = uHead;

    // 3.4 星尘粒子局部缓慢自转
    if (obj.particles) {
      obj.particles.rotation.y = time * (cfg.speed * 0.18);
    }

    // 3.5 倾斜轨道容器 Group 的多轴引力波动
    if (obj.group) {
      obj.group.rotation.x = cfg.rotX + Math.sin(time * cfg.waveSpeed) * cfg.waveAmp;
      obj.group.rotation.z = cfg.rotZ + Math.cos(time * cfg.waveSpeed * 0.85) * (cfg.waveAmp * 0.65);
    }
  });

  // 4. 执行渲染
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }

  animationFrameId = requestAnimationFrame(() => tick(THREE));
};

const onWindowResize = () => {
  if (!canvasRef.value || !camera || !renderer) return;
  const width = canvasRef.value.clientWidth;
  const height = canvasRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);
};

onMounted(() => {
  clock.last = performance.now();
  initThree();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('resize', onWindowResize);

  // 彻底销毁资源，防止 WebGL 上下文泄露
  if (waterMesh) {
    scene.remove(waterMesh);
    waterMesh.geometry.dispose();
    waterMesh.material.dispose();
  }

  // 循环清理 5 个轨道系统的所有 Geometry 和 Material
  activeOrbits.forEach((obj) => {
    if (obj.group) {
      scene.remove(obj.group);
    }
    if (obj.particles) {
      obj.particles.geometry.dispose();
      obj.particles.material.dispose();
    }
    if (obj.trailMesh) {
      obj.trailMesh.geometry.dispose();
      obj.trailMesh.material.dispose();
    }
    if (obj.sprite) {
      obj.sprite.material.map.dispose();
      obj.sprite.material.dispose();
    }
  });

  if (glowTexture) {
    glowTexture.dispose();
  }

  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.three-background-wrapper {
  /* 使用高斯径向遮罩，将 WebGL 场景边缘羽化淡出，完美融合 CSS 深度背景色 */
  mask-image: radial-gradient(circle at 35% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: radial-gradient(circle at 35% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%);
}
</style>
