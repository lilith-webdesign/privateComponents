<template>
  <div class="gis-container relative w-full h-[550px] rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg">
    <!-- 地图容器 -->
    <div id="mars3d-container" class="w-full h-full bg-slate-950"></div>

    <!-- 加载遮罩层 -->
    <Transition name="fade">
      <div v-if="loading" class="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
          <div class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-4 text-slate-300 text-sm font-medium tracking-wider">正在初始化 Mars3D 地图引擎...</p>
        <span class="mt-2 text-xs text-slate-500">正在按需加载 Cesium 及三维组件资源</span>
      </div>
    </Transition>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center z-40">
      <div class="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <p class="text-rose-400 font-medium mb-2">{{ errorMessage }}</p>
      <p class="text-xs text-slate-500 max-w-sm">请检查您的网络连接或稍后刷新重试。</p>
    </div>

    <!-- GIS 顶部工具栏 -->
    <div class="absolute top-4 left-4 right-4 flex justify-between pointer-events-none z-30">
      <div class="flex items-center gap-3 pointer-events-auto">
        <!-- 主控制工具栏 -->
        <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-slate-200/50 dark:border-slate-800/80 flex items-center gap-1.5 text-sm font-medium">
          <!-- 图层切换下拉按钮 -->
          <div class="relative" @mouseenter="showLayerMenu = true" @mouseleave="showLayerMenu = false">
            <button class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors">
              <span class="i-ep-grid text-base text-blue-500"></span>
              <span>图层</span>
              <span class="i-ep-arrow-down text-xs opacity-60"></span>
            </button>
            <!-- 图层下拉菜单 -->
            <Transition name="slide-up">
              <div v-show="showLayerMenu" class="absolute left-0 top-full mt-1.5 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200/60 dark:border-slate-800 py-1 flex flex-col z-50">
                <button 
                  v-for="item in basemapList" 
                  :key="item.id" 
                  @click="changeBasemap(item.id)"
                  :class="[
                    'px-4 py-2 text-left text-xs transition-colors flex items-center justify-between',
                    currentBasemap === item.id 
                      ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/30' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  ]"
                >
                  <span>{{ item.name }}</span>
                  <span v-if="currentBasemap === item.id" class="i-ep-check text-blue-500 text-xs"></span>
                </button>
              </div>
            </Transition>
          </div>

          <div class="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 mx-1"></div>

          <!-- 量算下拉按钮 -->
          <div class="relative" @mouseenter="showMeasureMenu = true" @mouseleave="showMeasureMenu = false">
            <button class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors">
              <span class="i-ep-set-up text-base text-teal-500"></span>
              <span>量算</span>
              <span class="i-ep-arrow-down text-xs opacity-60"></span>
            </button>
            <!-- 量算菜单 -->
            <Transition name="slide-up">
              <div v-show="showMeasureMenu" class="absolute left-0 top-full mt-1.5 w-36 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200/60 dark:border-slate-800 py-1 flex flex-col z-50">
                <button @click="startMeasure" class="px-4 py-2 text-left text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center gap-2">
                  <span class="i-ep-coordinate text-teal-500"></span>
                  <span>空间距离</span>
                </button>
                <button @click="clearMeasure" class="px-4 py-2 text-left text-xs text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800">
                  <span class="i-ep-delete"></span>
                  <span>清除测量</span>
                </button>
              </div>
            </Transition>
          </div>

          <div class="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 mx-1"></div>

          <!-- 快速定位搜索 -->
          <div class="flex items-center relative pl-1.5">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索点位 (如: 南门水库/黄山/北京)" 
              @keyup.enter="handleSearch"
              class="w-48 bg-transparent border-none text-xs outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400"
            />
            <button @click="handleSearch" class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
              <span class="i-ep-search text-slate-400 hover:text-blue-500"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- 坐标信息 & Key配置入口 -->
      <div class="flex items-center gap-2 pointer-events-auto">
        <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-md border border-slate-200/50 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300">
          {{ coordinatesText }}
        </div>
        <button 
          @click="showKeyDrawer = !showKeyDrawer"
          :class="[
            'p-2 rounded-lg shadow-md border backdrop-blur-md transition-all',
            showKeyDrawer 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          ]"
          title="配置天地图 Key"
        >
          <span class="i-ep-setting text-sm block" :class="{ 'animate-spin-slow': showKeyDrawer }"></span>
        </button>
      </div>
    </div>

    <!-- 右侧监测信息面板 -->
    <Transition name="slide-right">
      <div v-show="showPanel" class="absolute top-20 right-4 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 dark:border-slate-800/80 p-5 pointer-events-auto z-30 transition-all">
        <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-4 bg-blue-600 rounded"></div>
            <span class="font-bold text-slate-800 dark:text-slate-100 text-sm">南门水库 A1 监测点</span>
          </div>
          <button @click="showPanel = false" class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            <span class="i-ep-close text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"></span>
          </button>
        </div>
        <div class="space-y-4">
          <div class="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-lg border border-blue-100/50 dark:border-blue-900/30 flex items-center justify-between">
            <div>
              <div class="text-[11px] text-blue-600/80 dark:text-blue-400/80">当前水位 (实时)</div>
              <div class="text-2xl font-black text-blue-700 dark:text-blue-400 font-mono mt-0.5">124.52 m</div>
            </div>
            <div class="i-ep-odometer text-blue-500 text-3xl opacity-30"></div>
          </div>
          <div class="p-3 bg-teal-50/60 dark:bg-teal-950/20 rounded-lg border border-teal-100/50 dark:border-teal-900/30 flex items-center justify-between">
            <div>
              <div class="text-[11px] text-teal-600/80 dark:text-teal-400/80">昨日降雨量</div>
              <div class="text-2xl font-black text-teal-700 dark:text-teal-400 font-mono mt-0.5">12.8 mm</div>
            </div>
            <div class="i-ep-umbrella text-teal-500 text-3xl opacity-30"></div>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-800">
              <span class="text-slate-400 block">溢流状态</span>
              <span class="font-semibold text-slate-700 dark:text-slate-300 mt-0.5 block">正常无溢流</span>
            </div>
            <div class="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-800">
              <span class="text-slate-400 block">大坝渗流</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 block">安全稳定</span>
            </div>
          </div>
          <div class="text-[10px] text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>数据更新: 2026-06-21 11:52</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 天地图 Key 配置浮窗 -->
    <Transition name="slide-right">
      <div v-show="showKeyDrawer" class="absolute top-20 right-4 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 pointer-events-auto z-30">
        <div class="flex justify-between items-center mb-3 pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <span class="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
            <span class="i-ep-key text-blue-500"></span>
            <span>天地图 API 密钥配置</span>
          </span>
          <button @click="showKeyDrawer = false" class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            <span class="i-ep-close text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"></span>
          </button>
        </div>
        <div class="space-y-3.5">
          <p class="text-xs text-slate-500 leading-relaxed">
            天地图底图服务需要专属的浏览器端应用密钥 (Key)。如遇到地图空白或报错，请填入您在天地图官网申请的密钥。
          </p>
          <div>
            <label class="block text-[11px] text-slate-400 mb-1">天地图 Token (Key)</label>
            <input 
              v-model="tdtKey" 
              type="text" 
              placeholder="请输入您的天地图密钥"
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-md text-xs font-mono text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div class="flex gap-2">
            <button 
              @click="resetToDefaultKey" 
              class="flex-1 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] text-slate-600 dark:text-slate-300 font-medium transition-colors"
            >
              使用默认 Key
            </button>
            <button 
              @click="reinitMap" 
              class="flex-1 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-[11px] text-white font-medium shadow-sm transition-colors"
            >
              应用并重载地图
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const loading = ref(true);
const errorMessage = ref('');
const showPanel = ref(false);
const showKeyDrawer = ref(false);
const showLayerMenu = ref(false);
const showMeasureMenu = ref(false);
const searchQuery = ref('');
const coordinatesText = ref('坐标: 载入中...');
const currentBasemap = ref('gaode_img');

// 默认的测试天地图 Key
const DEFAULT_TDT_KEY = '20f781df559c5d1e48f760fb2167d404';
const tdtKey = ref('');

const basemapList = [
  { id: 'tdt_img', name: '天地图影像 (带注记)' },
  { id: 'tdt_vec', name: '天地图电子 (带注记)' },
  { id: 'gaode_img', name: '高德影像 (免 Key)' },
  { id: 'gaode_vec', name: '高德电子 (免 Key)' }
];

let map = null;
let measure = null;
let graphicLayer = null;

// 初始化密钥
if (typeof window !== 'undefined') {
  const storedKey = localStorage.getItem('__tdt_token_key__');
  // 天地图密钥为 32 位长度，如果存储的密钥不合法，则回退到默认密钥
  if (storedKey && storedKey.trim().length === 32) {
    tdtKey.value = storedKey.trim();
  } else {
    tdtKey.value = DEFAULT_TDT_KEY;
  }
} else {
  tdtKey.value = DEFAULT_TDT_KEY;
}

// 动态脚本和样式加载辅助
const loadCSS = (url) => {
  if (document.querySelector(`link[href="${url}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
};

const loadJS = (url) => {
  if (document.querySelector(`script[src="${url}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

let loadPromise = null;
const initMars3dResources = () => {
  if (loadPromise) return loadPromise;
  window.CESIUM_BASE_URL = 'https://unpkg.com/mars3d-cesium/Build/Cesium/';
  loadPromise = Promise.all([
    loadCSS('https://unpkg.com/mars3d-cesium/Build/Cesium/Widgets/widgets.css'),
    loadCSS('https://unpkg.com/mars3d/mars3d.css')
  ]).then(() => {
    return loadJS('https://unpkg.com/mars3d-cesium/Build/Cesium/Cesium.js');
  }).then(() => {
    return loadJS('https://unpkg.com/mars3d/mars3d.js');
  });
  return loadPromise;
};

// 实例化地图
const initMap = () => {
  try {
    const key = tdtKey.value || DEFAULT_TDT_KEY;
    
    map = new window.mars3d.Map("mars3d-container", {
      scene: {
        center: { lat: 31.78, lng: 117.2, alt: 25000, heading: 0, pitch: -45 },
        fxaa: true,
        globe: {
          depthTestAgainstTerrain: false
        }
      },
      control: {
        baseLayerPicker: false,
        defaultContextMenu: false,
        infoBox: false
      },
      basemaps: [
        {
          id: "tdt_img",
          name: "天地图影像",
          type: "group",
          show: currentBasemap.value === 'tdt_img',
          layers: [
            { name: "底图", type: "tdt", layer: "img_d", key: key },
            { name: "注记", type: "tdt", layer: "img_z", key: key }
          ]
        },
        {
          id: "tdt_vec",
          name: "天地图电子",
          type: "group",
          show: currentBasemap.value === 'tdt_vec',
          layers: [
            { name: "底图", type: "tdt", layer: "vec_d", key: key },
            { name: "注记", type: "tdt", layer: "vec_z", key: key }
          ]
        },
        {
          id: "gaode_img",
          name: "高德影像",
          type: "group",
          show: currentBasemap.value === 'gaode_img',
          layers: [
            { name: "底图", type: "gaode", layer: "img_d" },
            { name: "注记", type: "gaode", layer: "img_z" }
          ]
        },
        {
          id: "gaode_vec",
          name: "高德电子",
          type: "gaode",
          layer: "vec",
          show: currentBasemap.value === 'gaode_vec'
        }
      ]
    });

    // 1. 监听坐标捕获
    map.on(window.mars3d.EventType.mouseMove, (event) => {
      if (event.cartesian) {
        const point = window.mars3d.LngLatPoint.fromCartesian(event.cartesian);
        if (point) {
          coordinatesText.value = `坐标: ${point.lng.toFixed(5)}, ${point.lat.toFixed(5)} (WGS84)`;
        }
      }
    });

    // 2. 添加水库图标 (使用 HTML 的 DivGraphic 实现精美地标)
    graphicLayer = new window.mars3d.layer.GraphicLayer();
    map.addLayer(graphicLayer);

    const divGraphic = new window.mars3d.graphic.DivGraphic({
      position: [117.2, 31.8, 150],
      style: {
        html: `
          <div class="mars3d-custom-marker">
            <div class="mars3d-marker-ripple"></div>
            <div class="mars3d-marker-core">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="mars3d-marker-label">南门水库 A1</div>
          </div>
        `,
        horizontalOrigin: window.Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM
      }
    });

    // 监听点位点击，弹出监测面板
    divGraphic.on(window.mars3d.EventType.click, () => {
      showPanel.value = true;
    });

    graphicLayer.addGraphic(divGraphic);

    // 3. 添加量算功能
    measure = new window.mars3d.thing.Measure();
    map.addThing(measure);

  } catch (err) {
    console.error('初始化地图失败:', err);
    errorMessage.value = '渲染三维地球失败，请确保浏览器支持 WebGL 并允许硬件加速。';
  }
};

// 切换底图
const changeBasemap = (id) => {
  if (map) {
    map.basemap = id;
    currentBasemap.value = id;
  }
};

// 开启测距
const startMeasure = () => {
  if (measure) {
    measure.distance();
  }
};

// 清除测量
const clearMeasure = () => {
  if (measure) {
    measure.clear();
  }
};

// 搜索定位
const handleSearch = () => {
  if (!map || !searchQuery.value.trim()) return;
  const q = searchQuery.value.trim();

  if (q === '南门水库' || q === 'A1') {
    map.flyToPoint([117.2, 31.8, 8000], { pitch: -40, duration: 2 });
    showPanel.value = true;
  } else if (q.includes('黄山')) {
    map.flyToPoint([118.18, 30.13, 5000], { pitch: -35, duration: 3 });
  } else if (q.includes('北京') || q.includes('天安门')) {
    map.flyToPoint([116.3974, 39.9087, 6000], { pitch: -45, duration: 3 });
  } else {
    alert('暂未找到该地标。您可以搜索：“南门水库”、“黄山”或“北京”。');
  }
};

// 重置到默认 Key
const resetToDefaultKey = () => {
  tdtKey.value = DEFAULT_TDT_KEY;
};

// 重新加载地图以使新 Key 生效
const reinitMap = () => {
  if (typeof window !== 'undefined') {
    const formattedKey = tdtKey.value ? tdtKey.value.trim() : '';
    if (formattedKey.length === 32) {
      localStorage.setItem('__tdt_token_key__', formattedKey);
    } else {
      alert('天地图密钥长度应为 32 位，已重置为默认密钥！');
      tdtKey.value = DEFAULT_TDT_KEY;
      localStorage.setItem('__tdt_token_key__', DEFAULT_TDT_KEY);
    }
  }
  showKeyDrawer.value = false;
  
  if (map) {
    map.destroy();
    map = null;
  }
  
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    initMap();
  }, 300);
};

// 客户端入口加载
onMounted(() => {
  initMars3dResources()
    .then(() => {
      loading.value = false;
      initMap();
    })
    .catch((err) => {
      console.error('加载依赖资源出错:', err);
      errorMessage.value = '地图引擎资源加载失败，可能是由于网络连接问题。';
      loading.value = false;
    });
});

onBeforeUnmount(() => {
  if (map) {
    map.destroy();
    map = null;
  }
});
</script>

<style>
/* 针对 Mars3D 自定义 DivGraphic 的原生样式定义 */
.mars3d-custom-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.mars3d-marker-ripple {
  position: absolute;
  top: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.4);
  animation: marker-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes marker-ping {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.mars3d-marker-core {
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border: 2px solid #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: transform 0.2s ease;
}

.mars3d-custom-marker:hover .mars3d-marker-core {
  transform: scale(1.15);
}

.mars3d-marker-label {
  margin-top: 6px;
  padding: 3.5px 8px;
  background: rgba(15, 23, 42, 0.9);
  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(51, 65, 85, 0.5);
  backdrop-filter: blur(4px);
  pointer-events: none;
}

/* 动效过渡类 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
