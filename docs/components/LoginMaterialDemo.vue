<template>
  <div 
    class="material-login-wrapper w-full overflow-hidden select-none relative"
    @mousemove="handleParallax"
    @mouseleave="resetParallax"
  >
    <!-- 1. M3 多层等深线视差背景 (Layered surfaces) -->
    <div class="parallax-bg-layer absolute inset-0 z-0">
      <!-- 第一层：水库等深线最深层 -->
      <div 
        class="absolute -left-10 -bottom-20 w-[380px] h-[380px] rounded-full bg-[#e2e8f0]/40 filter blur-xl transition-transform duration-300 ease-out"
        :style="{ transform: `translate(${xOffset * 0.4}px, ${yOffset * 0.4}px)` }"
      ></div>
      <!-- 第二层：水库等深线中层 -->
      <div 
        class="absolute -right-20 -top-20 w-[450px] h-[450px] rounded-full bg-[#cbdffb]/20 filter blur-2xl transition-transform duration-300 ease-out"
        :style="{ transform: `translate(${xOffset * -0.3}px, ${yOffset * -0.3}px)` }"
      ></div>
      <!-- 第三层：水流层叠卡片 1 -->
      <div 
        class="doodle-contour-1 absolute left-1/4 top-1/3 w-[320px] h-[160px] border border-[#0063ec]/10 rounded-full bg-[#0063ec]/5 transition-transform duration-300 ease-out"
        :style="{ transform: `translate(${xOffset * 0.8}px, ${yOffset * 0.8}px) rotate(-15deg)` }"
      ></div>
      <!-- 第四层：水流层叠卡片 2 -->
      <div 
        class="doodle-contour-2 absolute right-1/3 bottom-1/4 w-[280px] h-[140px] border border-[#00ffd5]/10 rounded-full bg-[#00ffd5]/5 transition-transform duration-300 ease-out"
        :style="{ transform: `translate(${xOffset * -0.6}px, ${yOffset * -0.6}px) rotate(25deg)` }"
      ></div>
    </div>

    <!-- 2. 主页面内容结构 -->
    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-6 md:p-12 min-h-[500px]">
      
      <!-- 左侧：B 端硬朗 Slogan 宣传区 -->
      <div class="left-hero flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
        <h1 class="slogan-title text-4xl sm:text-5xl font-black tracking-tight text-[#0f172a] leading-none">
          连接水网<br/>
          <span class="text-[#0063ec]">调度未来</span>
        </h1>
        <p class="slogan-desc text-xs font-mono text-[#64748b]">
          Material Design 3 (M3) // 智慧水利调度中心专用接入终端
        </p>
      </div>

      <!-- 右侧：Material Elevated Card 登录表单卡片 -->
      <div class="right-form w-full max-w-[360px]">
        <div 
          class="card-container bg-white border border-[#e2e8f0] rounded-3xl p-6 flex flex-col transition-all duration-300 ease-in-out"
          :class="isHovered ? 'shadow-elevation-4 -translate-y-0.5' : 'shadow-elevation-2'"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <!-- 卡片头部：水网在线监测信息状态条 -->
          <div class="monitor-header flex items-center justify-between border-b border-slate-100 pb-3 mb-6 font-mono text-[9px] text-[#64748b]">
            <div class="flex items-center gap-1.5">
              <span class="pulse-dot bg-[#16A34A] w-2 h-2 rounded-full"></span>
              <span>南门水库: 84% (安全)</span>
            </div>
            <div class="bg-slate-100 px-2 py-0.5 rounded text-[#0063ec] font-bold">
              SYS-ONLINE
            </div>
          </div>

          <h2 class="text-lg font-bold text-[#0f172a] mb-1">控制台登录</h2>
          <p class="text-[11px] text-[#64748b] mb-6">请输入您的水务安全凭证以进行网路接入</p>

          <!-- 模式选择：M3 经典的 Segments Tabs -->
          <div class="segments-tab flex border border-[#cbdffb] rounded-xl p-0.5 mb-6 bg-slate-50 relative overflow-hidden">
            <button 
              type="button" 
              class="segment-btn flex-1 py-1.5 text-xs font-bold rounded-lg relative overflow-hidden transition-colors cursor-pointer"
              :class="authType === 'key' ? 'text-white bg-[#0063ec]' : 'text-[#64748b] hover:text-[#0f172a]'"
              @click="setAuthType('key', $event)"
            >
              密钥密保
            </button>
            <button 
              type="button" 
              class="segment-btn flex-1 py-1.5 text-xs font-bold rounded-lg relative overflow-hidden transition-colors cursor-pointer"
              :class="authType === 'token' ? 'text-white bg-[#0063ec]' : 'text-[#64748b] hover:text-[#0f172a]'"
              @click="setAuthType('token', $event)"
            >
              安全电子令
            </button>
          </div>

          <!-- 表单区 -->
          <div class="form-fields flex flex-col space-y-5">
            
            <!-- 账号输入框 (M3 Outlined 缺口悬浮标签样式) -->
            <div class="m3-outlined-field relative flex flex-col w-full">
              <input 
                id="m3-account" 
                type="text" 
                v-model="loginForm.account"
                placeholder=" "
                required
                class="peer m3-input w-full px-3.5 py-3 text-xs bg-transparent border border-[#cbdffb] rounded-xl focus:border-[#0063ec] focus:border-2 outline-none transition-all"
                :disabled="isLoading"
              />
              <label 
                for="m3-account"
                class="absolute left-3 top-3 px-1 text-xs text-[#64748b] bg-white pointer-events-none transition-all duration-200 transform origin-left peer-focus:-translate-y-5.5 peer-focus:scale-80 peer-focus:text-[#0063ec] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:-translate-y-5.5 peer-[:not(:placeholder-shown)]:scale-80"
              >
                专网账号
              </label>
            </div>

            <!-- 密码/密令输入框 -->
            <div class="m3-outlined-field relative flex flex-col w-full">
              <input 
                id="m3-password" 
                type="password" 
                v-model="loginForm.password"
                placeholder=" "
                required
                class="peer m3-input w-full px-3.5 py-3 text-xs bg-transparent border border-[#cbdffb] rounded-xl focus:border-[#0063ec] focus:border-2 outline-none transition-all"
                :disabled="isLoading"
              />
              <label 
                for="m3-password"
                class="absolute left-3 top-3 px-1 text-xs text-[#64748b] bg-white pointer-events-none transition-all duration-200 transform origin-left peer-focus:-translate-y-5.5 peer-focus:scale-80 peer-focus:text-[#0063ec] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:-translate-y-5.5 peer-[:not(:placeholder-shown)]:scale-80"
              >
                {{ authType === 'key' ? '密码认证' : '动态电子密令' }}
              </label>
            </div>

            <!-- 同意服务协议 (M3 样式 Checkbox) -->
            <div class="terms flex items-start gap-2.5 mt-1 select-none">
              <div class="relative flex items-center justify-center">
                <input 
                  id="m3-agree" 
                  type="checkbox" 
                  v-model="loginForm.agree"
                  class="peer custom-m3-checkbox w-4.5 h-4.5 border border-[#cbdffb] rounded-md bg-transparent appearance-none cursor-pointer checked:bg-[#0063ec] checked:border-[#0063ec] transition-all"
                />
                <span class="checkmark absolute pointer-events-none text-white text-[10px] font-bold opacity-0 peer-checked:opacity-100 transition-opacity">✓</span>
              </div>
              <label for="m3-agree" class="text-[10px] text-[#64748b] leading-normal cursor-pointer select-none">
                同意接入并接受 <a href="javascript:;" class="text-[#0063ec] font-semibold hover:underline">《全国智慧水网安全准入协议》</a>。
              </label>
            </div>

            <!-- 提示信息 -->
            <div v-if="errTip" class="text-xs text-[#DC2626] font-semibold">
              ⚠️ {{ errTip }}
            </div>

            <!-- 主按钮：带有 Ink Ripple 动画 -->
            <button 
              type="button" 
              class="m3-primary-btn relative overflow-hidden w-full py-3 bg-[#0063ec] text-white font-bold text-xs tracking-wider rounded-full shadow-elevation-1 hover:shadow-elevation-2 active:shadow-elevation-1 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :disabled="isLoading"
              @click="handleLogin"
            >
              <span v-if="isLoading" class="m3-spinner border-2 border-white/30 border-t-white rounded-full w-3.5 h-3.5 animate-spin"></span>
              建立调度安全连接
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- 3. AI 调度助理悬浮按钮 (FAB - Floating Action Button) -->
    <div class="fab-container absolute right-4 bottom-4 z-20">
      <button 
        type="button" 
        class="m3-fab relative overflow-hidden w-12 h-12 bg-[#FF5701] text-white rounded-2xl shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-200 flex items-center justify-center text-lg cursor-pointer"
        @click="toggleAiAssistant($event)"
      >
        🤖
      </button>

      <!-- AI 助理对话气泡 (M3 质感) -->
      <div 
        v-if="showAi" 
        class="ai-bubble absolute right-0 bottom-14 w-[240px] bg-white border border-[#e2e8f0] p-3.5 rounded-2xl shadow-elevation-4 text-xs text-[#0f172a] space-y-2 select-none"
      >
        <div class="flex items-center justify-between border-b border-slate-100 pb-1">
          <span class="font-bold text-[#0063ec]">水利AI助理</span>
          <button @click="showAi = false" class="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
        </div>
        <p class="text-[10px] text-[#64748b] leading-relaxed">
          {{ aiMsg }}
        </p>
        <div class="flex gap-1.5 justify-end">
          <button 
            v-for="opt in aiOptions" 
            :key="opt"
            type="button"
            class="opt-btn px-2 py-0.5 text-[9px] bg-slate-50 border border-slate-200 rounded hover:border-[#0063ec] hover:text-[#0063ec] transition-all cursor-pointer"
            @click="triggerAiAction(opt)"
          >
            {{ opt }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 认证模式: 'key' (密钥密保) | 'token' (安全电子令)
const authType = ref('key');
const errTip = ref('');
const isHovered = ref(false);
const isLoading = ref(false);

const loginForm = reactive({
  account: '',
  password: '',
  agree: false
});

// ----------------------------------------------------
// 1. Parallax 视差动画控制
// ----------------------------------------------------
const xOffset = ref(0);
const yOffset = ref(0);

const handleParallax = (e) => {
  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * 2 - 1;
  const y = (e.clientY - rect.top) / rect.height * 2 - 1;
  // 限制最大位移像素数
  xOffset.value = x * 20;
  yOffset.value = y * 20;
};

const resetParallax = () => {
  xOffset.value = 0;
  yOffset.value = 0;
};

// ----------------------------------------------------
// 2. 原生水波纹 (Ink Ripple) 触觉动画实现
// ----------------------------------------------------
const triggerRipple = (e, dark = false) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.transform = 'scale(0)';
  circle.style.pointerEvents = 'none';
  circle.style.animation = 'ripple-animation 0.4s linear';
  circle.style.backgroundColor = dark ? 'rgba(0, 99, 236, 0.15)' : 'rgba(255, 255, 255, 0.35)';

  const existingRipple = btn.querySelector('.m3-ripple-node');
  if (existingRipple) {
    existingRipple.remove();
  }

  circle.classList.add('m3-ripple-node');
  btn.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 400);
};

const setAuthType = (type, e) => {
  authType.value = type;
  errTip.value = '';
  // 触发白底按钮上的蓝色 Ripple
  triggerRipple(e, true);
};

// ----------------------------------------------------
// 3. 登录动作与延迟模拟
// ----------------------------------------------------
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleLogin = async (e) => {
  triggerRipple(e, false);

  if (!loginForm.account.trim() || !loginForm.password.trim()) {
    errTip.value = '请输入您的水务安全账号和密码！';
    return;
  }
  if (!loginForm.agree) {
    errTip.value = '请先阅读并同意《全国智慧水网安全准入协议》！';
    return;
  }

  errTip.value = '';
  isLoading.value = true;

  try {
    await delay(1200);
    alert('🎉 建立调度中心连接成功！已载入全国智慧水网调度中心。');
  } catch (err) {
    errTip.value = '调度网关认证超时，请重试。';
  } finally {
    isLoading.value = false;
  }
};

// ----------------------------------------------------
// 4. AI 调度助理 (FAB) 交互
// ----------------------------------------------------
const showAi = ref(false);
const aiMsg = ref('您好！我是水务调度 AI。请问需要自动填单或启动测站演示登录吗？');
const aiOptions = reactive(['自动填单', '测站演示']);

const toggleAiAssistant = (e) => {
  triggerRipple(e, false);
  showAi.value = !showAi.value;
};

const triggerAiAction = (opt) => {
  if (opt === '自动填单') {
    loginForm.account = 'm3_observer_admin';
    loginForm.password = 'pass_water_center';
    loginForm.agree = true;
    aiMsg.value = '已为您自动填入系统管理员的演示准入凭据。';
  } else if (opt === '测站演示') {
    loginForm.account = 'demo_station_08';
    loginForm.password = 'token_secure_demo';
    loginForm.agree = true;
    aiMsg.value = '已填入 8号防汛测站 的只读演示指令。请直接点击建立连接。';
  }
};
</script>

<style scoped>
/* 引入 M3 规范的 Roboto 与 Fira Code 字体 */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Roboto:wght@400;500;700;900&display=swap');

.material-login-wrapper {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f1f5f9;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.slogan-title {
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.03em;
}

.slogan-desc {
  font-family: 'Fira Code', monospace;
}

/* 等深线卡片装饰样式 */
.doodle-contour-1, .doodle-contour-2 {
  filter: drop-shadow(0 4px 6px rgba(0, 99, 236, 0.05));
}

/* Material 3 物理分层投影 (Elevation Shadows) */
.shadow-elevation-1 {
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.shadow-elevation-2 {
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
}

.shadow-elevation-3 {
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.07), 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}

.shadow-elevation-4 {
  box-shadow: 0px 6px 12px 4px rgba(0, 0, 0, 0.09), 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}

/* 水波纹关键帧动画 */
@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.breathing-node {
  animation: nodeBreath 1.5s ease-in-out infinite alternate;
}

@keyframes nodeBreath {
  from {
    r: 3px;
    fill-opacity: 0.65;
  }
  to {
    r: 6px;
    fill-opacity: 1;
  }
}

/* M3 Outlined 缺口悬浮标签 */
.m3-input {
  transition: border-color 0.2s, border-width 0.1s;
}

.m3-input:focus ~ label,
.m3-input:not(:placeholder-shown) ~ label {
  transform: translateY(-22px) scale(0.85);
  font-weight: 600;
  color: #0063ec;
}

/* M3 Checkbox 自定义复选框 */
.custom-m3-checkbox:checked {
  background-color: #0063ec;
  border-color: #0063ec;
}

.custom-m3-checkbox:focus-visible {
  outline: 2px solid #0063ec;
  outline-offset: 2px;
}

/* 状态指示点呼吸 */
.pulse-dot {
  box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  to {
    box-shadow: 0 0 0 6px rgba(22, 163, 74, 0);
  }
}

/* Spinner */
.m3-spinner {
  border-right-color: transparent;
}

.m3-primary-btn:disabled, .segment-btn:disabled, .m3-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
