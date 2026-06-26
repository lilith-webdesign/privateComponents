<template>
  <div 
    class="normal-login-wrapper w-full relative"
    :style="themeStyles"
  >
    <!-- 右上角悬浮实时选色与系统切换控制面板 (指导手册专用调试面板) -->
    <div class="theme-selector absolute top-4 right-4 z-20 flex flex-col gap-2.5 p-3.5 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl max-w-[240px] transition-all">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
        <span class="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">设计规范控制台</span>
        <span class="pulse-dot w-2 h-2 rounded-full bg-emerald-500"></span>
      </div>

      <!-- 1. 业务系统动态切换 -->
      <div class="flex flex-col gap-1 w-full">
        <label class="text-[9px] text-slate-500 dark:text-slate-400 font-bold">1. 业务子系统切换:</label>
        <select 
          v-model="currentSystemId"
          class="text-[10px] px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-800 dark:text-white cursor-pointer w-full font-sans transition-all focus:border-[var(--normal-primary)]"
        >
          <option v-for="sys in systems" :key="sys.id" :value="sys.id">{{ sys.name }}</option>
        </select>
      </div>
      
      <!-- 2. 主题色彩选取 -->
      <div class="flex flex-col gap-1 w-full">
        <label class="text-[9px] text-slate-500 dark:text-slate-400 font-bold">2. 主题色定制:</label>
        <div class="flex items-center gap-2">
          <!-- 预设色块 -->
          <div class="preset-colors flex gap-1.5">
            <button 
              v-for="color in presetColors" 
              :key="color"
              type="button"
              class="w-4 h-4 rounded-full border border-black/10 transition-all cursor-pointer hover:scale-125 focus:outline-none"
              :class="{ 'scale-125 ring-2 ring-slate-400': primaryColor === color }"
              :style="{ backgroundColor: color }"
              :title="color"
              @click="primaryColor = color"
            ></button>
          </div>
          <!-- 自定义取色器 -->
          <div class="relative flex items-center justify-center h-4 w-4">
            <input 
              type="color" 
              v-model="primaryColor"
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <span class="w-4 h-4 rounded-full border border-black/10 flex items-center justify-center text-[9px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">
              🎨
            </span>
          </div>
        </div>
      </div>

      <!-- 3. 混白修改磅重控制 (核心技术展示) -->
      <div class="flex flex-col gap-1 w-full border-t border-slate-100 dark:border-slate-800 pt-2">
        <div class="flex justify-between text-[9px] text-slate-500 dark:text-slate-400 font-bold">
          <span>3. 混白权重 (明暗磅重):</span>
          <span class="font-mono text-slate-700 dark:text-slate-300 font-bold">{{ Math.round(mixWeight * 100) }}%</span>
        </div>
        <input 
          type="range" 
          min="0.05" 
          max="0.40" 
          step="0.01" 
          v-model.number="mixWeight"
          class="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--normal-primary)] focus:outline-none"
        />
      </div>

      <!-- 4. 实时色值显示 (用于指导手册的技术细节输出) -->
      <div class="flex flex-col gap-1 text-[8px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-1.5">
        <div class="flex justify-between">
          <span>Hover色 (混白):</span>
          <span class="text-slate-600 dark:text-slate-400 font-semibold">{{ themeStyles['--normal-primary-hover'] }}</span>
        </div>
        <div class="flex justify-between">
          <span>Active色 (混黑):</span>
          <span class="text-slate-600 dark:text-slate-400 font-semibold">{{ themeStyles['--normal-primary-active'] }}</span>
        </div>
      </div>
    </div>

    <!-- 主布局结构 (左右布局) -->
    <div class="login-container flex flex-col md:flex-row items-stretch min-h-[560px] bg-[#f8fafc] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      
      <!-- 左侧：项目名称、业务内容与对应系统配套 icon 展示区 -->
      <div class="left-section flex-[1.2] p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-[#ffffff] to-[#f1f5f9] dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        
        <!-- 背景几何层叠装饰线 (水流线条意象) -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <svg class="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-50 200 C100 100, 200 300, 450 200" stroke="var(--normal-primary)" stroke-width="4" stroke-linecap="round"/>
            <path d="M-50 240 C120 150, 180 340, 450 240" stroke="var(--normal-primary)" stroke-width="2" stroke-dasharray="10 5" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- 品牌与内容区 -->
        <div class="space-y-4 relative z-10">
          <!-- 业务子系统项目名称 -->
          <div class="system-badge text-[10px] font-black tracking-widest text-[var(--normal-primary)] uppercase flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--normal-primary)]"></span>
            {{ currentSystem.name }}
          </div>

          <!-- Slogan 标题：采用“阿里妈妈数黑体” -->
          <h1 class="slogan-title text-3xl sm:text-4xl md:text-5.5xl font-black text-slate-800 dark:text-white leading-tight">
            {{ currentSystem.slogan.slice(0, 2) }}<span class="highlight-text text-[var(--normal-primary)]">{{ currentSystem.slogan.slice(2, 6) }}</span>{{ currentSystem.slogan.slice(6) }}
          </h1>
          
          <!-- 业务内容：采用“思源黑体” -->
          <p class="content-desc text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[440px]">
            {{ currentSystem.desc }}
          </p>
        </div>

        <!-- 系统配套 Icon 展示与动态切换区 -->
        <div class="icon-showcase mt-8 md:mt-0 relative z-10">
          <div class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
            配套业务功能节点
          </div>
          <div class="icon-image-wrapper p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 rounded-2xl shadow-sm max-w-[420px] min-h-[160px] overflow-hidden flex items-center justify-center">
            <!-- 默认初始状态：渲染 loginIcon.png -->
            <img 
              v-if="currentSystem.usePng"
              src="/loginIcon.png" 
              alt="水利业务配套系统icon"
              class="max-h-[130px] md:max-h-[145px] object-contain transition-all duration-300"
            />
            
            <!-- 切换系统状态下：动态渲染响应式科技发光 SVG -->
            <div v-else class="svg-icon-container flex items-center justify-center transition-all duration-300">
              <!-- 智能防汛调度系统 SVG -->
              <svg v-if="currentSystem.iconSvg === 'flood'" class="w-28 h-28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" stroke="var(--normal-primary)" stroke-width="1" stroke-dasharray="4 4" class="opacity-25" />
                <circle cx="60" cy="60" r="35" stroke="var(--normal-primary)" stroke-width="1" stroke-dasharray="6 3" class="opacity-40" />
                <line x1="60" y1="60" x2="95" y2="25" stroke="var(--normal-primary)" stroke-width="2" stroke-linecap="round" class="opacity-75">
                  <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="4s" repeatCount="indefinite" />
                </line>
                <path d="M25 80 L35 52 L85 52 L95 80 Z" fill="var(--normal-primary)" class="opacity-15" />
                <path d="M35 52 L85 52 L80 80 L40 80 Z" fill="var(--normal-primary)" class="opacity-35" />
                <path d="M15 85 Q30 75, 45 85 T75 85 T105 85" stroke="var(--normal-primary)" stroke-width="3" stroke-linecap="round" class="opacity-90">
                  <animate attributeName="d" values="M15 85 Q30 75, 45 85 T75 85 T105 85; M15 85 Q30 95, 45 85 T75 85 T105 85; M15 85 Q30 75, 45 85 T75 85 T105 85" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>

              <!-- 水资源综合管理系统 SVG -->
              <svg v-if="currentSystem.iconSvg === 'resource'" class="w-28 h-28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="45" stroke="var(--normal-primary)" stroke-width="1.5" stroke-dasharray="8 4" class="opacity-45">
                  <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="12s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="60" r="52" stroke="var(--normal-primary)" stroke-width="0.75" class="opacity-20" />
                <path d="M60 20 C35 55 35 85 60 95 C85 85 85 55 60 20 Z" fill="url(#grad-water-normal)" stroke="var(--normal-primary)" stroke-width="2" class="drop-shadow-md" />
                <path d="M42 68 Q50 60, 60 68 T78 68" stroke="var(--normal-primary)" stroke-width="1.5" stroke-linecap="round" class="opacity-70">
                  <animate attributeName="d" values="M42 68 Q50 60, 60 68 T78 68; M42 68 Q50 76, 60 68 T78 68; M42 68 Q50 60, 60 68 T78 68" dur="2.5s" repeatCount="indefinite" />
                </path>
                <defs>
                  <linearGradient id="grad-water-normal" x1="60" y1="20" x2="60" y2="95" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="var(--normal-primary)" stop-opacity="0.25"/>
                    <stop offset="100%" stop-color="var(--normal-primary)" stop-opacity="0.8"/>
                  </linearGradient>
                </defs>
              </svg>

              <!-- 管网水质在线监测系统 SVG -->
              <svg v-if="currentSystem.iconSvg === 'pipe'" class="w-28 h-28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30 H60 V90 H100" stroke="var(--normal-primary)" stroke-width="4" stroke-linecap="round" class="opacity-30" />
                <path d="M20 90 H60 V30 H100" stroke="var(--normal-primary)" stroke-width="4" stroke-linecap="round" class="opacity-30" />
                <circle r="4" fill="var(--normal-primary)">
                  <animateMotion path="M20 30 H60 V90 H100" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="var(--normal-primary)">
                  <animateMotion path="M20 90 H60 V30 H100" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="20" cy="30" r="5" fill="var(--normal-primary)" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="60" cy="30" r="7.5" fill="var(--normal-primary)" stroke="#ffffff" stroke-width="2" class="pulse-node" />
                <circle cx="60" cy="90" r="7.5" fill="var(--normal-primary)" stroke="#ffffff" stroke-width="2" class="pulse-node" />
                <circle cx="100" cy="90" r="5" fill="var(--normal-primary)" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="100" cy="30" r="5" fill="var(--normal-primary)" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="20" cy="90" r="5" fill="var(--normal-primary)" stroke="#ffffff" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：登录表单 Card -->
      <div class="right-section flex-1 p-8 md:p-12 flex items-center justify-center bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800">
        <div class="form-card w-full max-w-[320px] flex flex-col space-y-6">
          <div class="space-y-1">
            <h2 class="text-xl font-bold text-slate-800 dark:text-white tracking-tight">安全凭证登录</h2>
            <p class="text-[10px] text-slate-400 dark:text-slate-500">水务内网加密登录，请确保电子安全卡处于读取状态</p>
          </div>

          <!-- 表单控件：基于 Inter 字体 -->
          <div class="form-fields flex flex-col space-y-4 font-inter">
            <!-- 账号输入 -->
            <div class="input-container relative flex flex-col">
              <input 
                id="normal-user" 
                type="text" 
                v-model="loginForm.account"
                placeholder=" "
                required
                class="custom-input w-full px-3.5 py-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[var(--normal-primary)] focus:ring-2 focus:ring-[var(--normal-primary-light-9)] transition-all text-slate-800 dark:text-white"
                :disabled="isLoading"
              />
              <label 
                for="normal-user"
                class="absolute left-3.5 top-3.5 text-xs text-slate-400 pointer-events-none transition-all duration-200 transform origin-left peer-focus:-translate-y-5.5 peer-focus:scale-75 peer-focus:text-[var(--normal-primary)] peer-[:not(:placeholder-shown)]:-translate-y-5.5 peer-[:not(:placeholder-shown)]:scale-75"
                :class="{ '-translate-y-5.5 scale-75 text-[var(--normal-primary)]': loginForm.account }"
              >
                水务账号 / 邮箱
              </label>
            </div>

            <!-- 密码输入 -->
            <div class="input-container relative flex flex-col">
              <input 
                id="normal-pwd" 
                type="password" 
                v-model="loginForm.password"
                placeholder=" "
                required
                class="custom-input w-full px-3.5 py-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[var(--normal-primary)] focus:ring-2 focus:ring-[var(--normal-primary-light-9)] transition-all text-slate-800 dark:text-white"
                :disabled="isLoading"
              />
              <label 
                for="normal-pwd"
                class="absolute left-3.5 top-3.5 text-xs text-slate-400 pointer-events-none transition-all duration-200 transform origin-left peer-focus:-translate-y-5.5 peer-focus:scale-75 peer-focus:text-[var(--normal-primary)] peer-[:not(:placeholder-shown)]:-translate-y-5.5 peer-[:not(:placeholder-shown)]:scale-75"
                :class="{ '-translate-y-5.5 scale-75 text-[var(--normal-primary)]': loginForm.password }"
              >
                访问密码
              </label>
            </div>

            <!-- 协议勾选 -->
            <div class="terms flex items-start gap-2 select-none mt-1">
              <input 
                id="normal-check" 
                type="checkbox" 
                v-model="loginForm.agree"
                class="custom-checkbox w-4 h-4 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 accent-[var(--normal-primary)] cursor-pointer mt-0.5"
              />
              <label for="normal-check" class="text-[10px] text-slate-400 dark:text-slate-500 leading-normal cursor-pointer select-none">
                我已阅读并同意 <a href="javascript:;" class="text-[var(--normal-primary)] font-semibold hover:underline">《智慧水网准入安全协议》</a> 及隐私政策。
              </label>
            </div>

            <!-- 错误提示 -->
            <div v-if="errTip" class="text-[11px] text-[#DC2626] font-semibold">
              ⚠️ {{ errTip }}
            </div>

            <!-- 登录按钮：实时绑定主题色背景 -->
            <button 
              type="button" 
              class="primary-submit-btn w-full py-3 text-white font-bold text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              :disabled="isLoading"
              @click="handleLogin"
            >
              <span v-if="isLoading" class="btn-spinner border-2 border-white/30 border-t-white rounded-full w-3.5 h-3.5 animate-spin"></span>
              登入智慧水网中心
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// ----------------------------------------------------
// 1. 业务系统模型配置 (支持动态切换 icon 与文案)
// ----------------------------------------------------
const systems = [
  {
    id: 'default',
    name: '智慧水网中心',
    slogan: '开启智慧水利之路',
    desc: '构建集全域感知、算法研判、联合调度于一体的智慧防汛与安全引水网络。通过模块化水网拓扑和智能化数据流水，实现水利信息化的敏捷重构。',
    usePng: true
  },
  {
    id: 'flood',
    name: '智能防汛调度子系统',
    slogan: '筑牢防汛减灾安全防线',
    desc: '基于大尺度数字孪生流域模型，开展流域暴雨洪水演进模拟、气象水位联合分析、调度方案多维比选及防汛防洪风险精细研判。',
    usePng: false,
    iconSvg: 'flood'
  },
  {
    id: 'resource',
    name: '水资源综合管理子系统',
    slogan: '优化水资源全周期调度',
    desc: '集成全域取用水在线监测、水权精细化分配与水质动态跟踪。运用智能引调水调度算法，实现跨流域水资源集约高效节约利用。',
    usePng: false,
    iconSvg: 'resource'
  },
  {
    id: 'pipe',
    name: '管网水质在线监测子系统',
    slogan: '守护城市管网输水水质',
    desc: '对地表水源、出厂水及供水管网关键节点实施浊度、余氯秒级感知。运用水流微观拓扑网络，快速追踪漏损与水质异常。',
    usePng: false,
    iconSvg: 'pipe'
  }
];

const currentSystemId = ref('default');

const currentSystem = computed(() => {
  return systems.find(s => s.id === currentSystemId.value) || systems[0];
});

// 默认预设主题色块：智慧蓝，防汛橙，水利青，环保绿
const presetColors = ['#002FA7', '#FF5701', '#00ffd5', '#16A34A'];
const primaryColor = ref('#002FA7');

// 混白修改权重（明暗磅重），范围 0.05 (5%) - 0.40 (40%)，默认 0.15 (15%)
const mixWeight = ref(0.15);

const errTip = ref('');
const isLoading = ref(false);

const loginForm = reactive({
  account: '',
  password: '',
  agree: false
});

// ----------------------------------------------------
// 2. Hex 颜色混合算法与混白磅重计算
// ----------------------------------------------------
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// 颜色混合函数：根据权重 weight 进行插值混合
const mixColor = (color1, color2, weight = 0.5) => {
  try {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1.r * weight + rgb2.r * (1 - weight));
    const g = Math.round(rgb1.g * weight + rgb2.g * (1 - weight));
    const b = Math.round(rgb1.b * weight + rgb2.b * (1 - weight));

    return rgbToHex(r, g, b);
  } catch (e) {
    return color1;
  }
};

// ----------------------------------------------------
// 3. 计算属性：实时导出 CSS 变量样式
// ----------------------------------------------------
const themeStyles = computed(() => {
  const p = primaryColor.value;
  const w = 1 - mixWeight.value; // 主色占比，mixWeight.value 是白/黑的目标颜色占比
  
  // Hover 态：混入指定比例的白色
  const hover = mixColor(p, '#ffffff', w);
  // Active 态：混入指定比例的黑色
  const active = mixColor(p, '#000000', w);
  // Light 发光底色：固定混入 90% 的白色，提供细腻的高光微边框
  const light = mixColor(p, '#ffffff', 0.1);

  return {
    '--normal-primary': p,
    '--normal-primary-hover': hover,
    '--normal-primary-active': active,
    '--normal-primary-light-9': light
  };
});

// ----------------------------------------------------
// 4. 登录验证响应逻辑
// ----------------------------------------------------
const handleLogin = async () => {
  if (!loginForm.account.trim() || !loginForm.password.trim()) {
    errTip.value = '请输入您的水网安全证书账号和密码！';
    return;
  }
  if (!loginForm.agree) {
    errTip.value = '请先阅读并同意《智慧水网准入安全协议》！';
    return;
  }

  errTip.value = '';
  isLoading.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    alert(`🎉 建立准入凭证成功！加密令牌已成功写入【${currentSystem.value.name}】调度网关。`);
  } catch (e) {
    errTip.value = '调度网关联接失败，请检查网线连接。';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* 引入 Inter 字体，用于基于 Element 的表单控件，并加载 Noto Sans SC (思源黑体) CDN */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

/* 引入阿里妈妈数黑体 CDN woff2 资源 */
@font-face {
  font-family: 'AlimamaShuHeiTi';
  src: url('https://cdn.jsdelivr.net/gh/themusecatcher/resources/AlimamaShuHeiTi-Bold.woff2') format('woff2'),
       url('https://cdn.jsdelivr.net/gh/themusecatcher/resources/AlimamaShuHeiTi-Bold.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* Slogan 标题：采用“阿里妈妈数黑体”，Fallback 到 Impact/Arial Black */
.slogan-title {
  font-family: 'AlimamaShuHeiTi', 'Alimama ShuHeiTi', 'Impact', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* 内容描述：采用“思源黑体”，Fallback 到 Noto Sans SC, 微软雅黑和苹方 */
.content-desc {
  font-family: 'Noto Sans SC', 'Source Han Sans CN', 'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 400;
}

/* 表单内部：应用 Inter 字体 */
.font-inter {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 按钮的实时背景变色 */
.primary-submit-btn {
  background-color: var(--normal-primary);
}

.primary-submit-btn:hover:not(:disabled) {
  background-color: var(--normal-primary-hover);
  box-shadow: 0 4px 12px var(--normal-primary-light-9);
}

.primary-submit-btn:active:not(:disabled) {
  background-color: var(--normal-primary-active);
}

.primary-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  border-right-color: transparent;
}

/* 输入框聚焦效果 */
.custom-input {
  transition: all 0.2s ease-in-out;
}

.custom-input:focus {
  border-color: var(--normal-primary);
  background-color: #ffffff;
}

.dark .custom-input:focus {
  background-color: #0d1425;
}

/* Floating Label 动画 */
.input-container label {
  transition: all 0.2s ease-in-out;
}

.custom-input:focus ~ label,
.custom-input:not(:placeholder-shown) ~ label {
  transform: translateY(-22px) scale(0.75);
}

/* 状态点呼吸 */
.pulse-dot {
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse 1.8s infinite;
}

.pulse-node {
  animation: pulse-svg 2s infinite;
}

@keyframes pulse {
  to {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
}

@keyframes pulse-svg {
  0% {
    r: 7.5px;
    opacity: 1;
  }
  50% {
    r: 10px;
    opacity: 0.7;
  }
  100% {
    r: 7.5px;
    opacity: 1;
  }
}
</style>
