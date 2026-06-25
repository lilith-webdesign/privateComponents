<template>
  <div class="agentic-login-wrapper w-full select-none">
    <!-- 主卡片容器：B 端暗色科技质感 -->
    <div class="agentic-card flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10 bg-[#080c16] text-white">
      
      <!-- 左半栏：精简视觉区 (除了 Slogan 和动态手绘 SVG 外，无任何杂质内容) -->
      <div class="left-hero flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8 w-full">
        <!-- B 端硬朗无衬线 Slogan -->
        <h1 class="slogan-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          开启智慧水利之路
        </h1>

        <!-- 动态手绘水利信息化流程图 SVG -->
        <div class="svg-container w-full max-w-[460px] p-4 bg-[#0d1425] border border-slate-800 shadow-lg rounded-xl overflow-hidden">
          <svg class="hand-drawn-svg w-full h-[140px]" viewBox="0 0 460 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 科技网格线背景 -->
            <defs>
              <pattern id="hand-drawn-grid-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="460" height="140" fill="url(#hand-drawn-grid-dark)" />

            <!-- 数据波浪水流 1 (科技霓虹蓝) -->
            <path 
              d="M 10 70 Q 70 30, 130 70 T 250 70 T 370 70 Q 410 90, 450 70" 
              fill="none" 
              stroke="#0088ff" 
              stroke-width="3" 
              stroke-linecap="round" 
              class="doodle-water-path"
            />
            <!-- 数据流光节点虚线 2 (活力橙红) -->
            <path 
              d="M 10 70 Q 70 30, 130 70 T 250 70 T 370 70 Q 410 90, 450 70" 
              fill="none" 
              stroke="#FF5701" 
              stroke-width="2.5" 
              stroke-linecap="round" 
              stroke-dasharray="10, 8" 
              class="doodle-flow-pulse"
            />

            <!-- 测站节点 1: 水源地 -->
            <g transform="translate(60, 48)">
              <circle r="14" fill="#0d1425" stroke="#0088ff" stroke-width="2" />
              <circle r="4" fill="#00ffd5" class="breathing-node" />
              <text x="0" y="28" font-size="10" font-family="sans-serif" font-weight="bold" fill="#94a3b8" text-anchor="middle">水源地</text>
            </g>

            <!-- 测站节点 2: 提升泵房 (高亮橙色) -->
            <g transform="translate(190, 70)">
              <circle r="14" fill="#0d1425" stroke="#FF5701" stroke-width="2" />
              <polygon points="-5,5 5,5 0,-5" fill="#FF5701" stroke="#0d1425" stroke-width="1" />
              <text x="0" y="-22" font-size="10" font-family="sans-serif" font-weight="bold" fill="#94a3b8" text-anchor="middle">泵房站</text>
            </g>

            <!-- 测站节点 3: 净化水厂 -->
            <g transform="translate(310, 70)">
              <circle r="14" fill="#0d1425" stroke="#00ffd5" stroke-width="2" />
              <rect x="-5" y="-5" width="10" height="10" fill="#0088ff" stroke="#0d1425" stroke-width="1" />
              <text x="0" y="28" font-size="10" font-family="sans-serif" font-weight="bold" fill="#94a3b8" text-anchor="middle">自来水厂</text>
            </g>

            <!-- 测站节点 4: 用水终端 -->
            <g transform="translate(410, 82)">
              <circle r="8" fill="#0d1425" stroke="#1e293b" stroke-width="2" />
              <circle r="3" fill="#16A34A" />
              <text x="0" y="-16" font-size="10" font-family="sans-serif" font-weight="bold" fill="#94a3b8" text-anchor="middle">用水户</text>
            </g>

            <!-- AI 智能分析中枢连接虚线 -->
            <path d="M 190 70 Q 250 15, 310 70" fill="none" stroke="#FF5701" stroke-width="1.5" stroke-dasharray="4, 4" />
            <g transform="translate(250, 36)">
              <circle r="10" fill="#FF5701" stroke="#0d1425" stroke-width="1" />
              <text x="0" y="3" font-family="monospace" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AI</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- 右半栏：精美 B 端极简 Agentic 登录卡片 -->
      <div class="right-form w-full max-w-[370px]">
        <div class="card-container bg-[#0d1425] border border-slate-800 shadow-2xl rounded-2xl overflow-hidden p-6 flex flex-col">
          <!-- 登录模式极简切换器 -->
          <div class="mode-selector flex border border-slate-800 rounded-lg p-0.5 mb-6 bg-[#080c16]">
            <button 
              type="button" 
              class="flex-1 py-1.5 text-xs font-bold rounded transition-all duration-200 cursor-pointer"
              :class="loginMode === 'ai' ? 'bg-[#FF5701] text-white' : 'text-[#64748b] hover:text-[#94a3b8]'"
              @click="setLoginMode('ai')"
            >
              AI 智能授权
            </button>
            <button 
              type="button" 
              class="flex-1 py-1.5 text-xs font-bold rounded transition-all duration-200 cursor-pointer"
              :class="loginMode === 'normal' ? 'bg-[#FF5701] text-white' : 'text-[#64748b] hover:text-[#94a3b8]'"
              @click="setLoginMode('normal')"
            >
              凭证密保登录
            </button>
          </div>

          <!-- 模式 1: AI 智能委派授权模式 (Conversational AI-first) -->
          <div v-if="loginMode === 'ai'" class="ai-mode-container flex flex-col space-y-4">
            <div class="intro-box p-3 bg-[#111c30] border border-slate-800 rounded-lg text-[11px] text-[#94a3b8] leading-relaxed">
              <span class="font-bold text-[#FF5701]">💬 AI 委派交互：</span> 
              支持会话式一键接入。请输入您希望执行的系统登录指令或凭证密令（系统会自动推导并为您委派授权）。
            </div>

            <!-- AI 委派指令框 -->
            <div class="control-group flex flex-col space-y-1.5">
              <label for="ai-instruction" class="text-xs font-bold text-[#94a3b8]">
                登录指令
              </label>
              <textarea 
                id="ai-instruction"
                v-model="aiInstruction"
                placeholder="例如：/auth admin 并接入智慧防汛控制中心" 
                rows="3"
                class="custom-textarea w-full p-3 text-xs font-mono bg-[#111c30] text-white border border-slate-800 rounded-xl focus:border-[#FF5701] focus:ring-2 focus:ring-[#FF5701]/20 outline-none resize-none transition-all"
                :disabled="isAiLoading"
              ></textarea>
            </div>

            <!-- 快捷指令词库 -->
            <div class="shortcuts flex flex-wrap gap-1.5">
              <span class="text-[10px] text-[#64748b] font-bold self-center mr-1">快捷命令:</span>
              <button 
                v-for="cmd in quickCommands" 
                :key="cmd"
                type="button"
                class="cmd-tag px-2 py-0.5 text-[10px] font-mono text-[#94a3b8] bg-[#111c30] border border-slate-800 rounded hover:border-[#FF5701] hover:text-[#FF5701] transition-all cursor-pointer"
                @click="fillCommand(cmd)"
                :disabled="isAiLoading"
              >
                {{ cmd }}
              </button>
            </div>

            <!-- AI 智能终端执行控制台 (Loading/Execute state) -->
            <div 
              v-if="isAiLoading || aiConsoleLogs.length > 0" 
              class="ai-console p-3 bg-[#080c16] text-white border border-slate-800 rounded-xl font-mono text-[10px] space-y-1 min-h-[95px] max-h-[120px] overflow-y-auto"
            >
              <div v-for="(log, idx) in aiConsoleLogs" :key="idx" class="flex gap-1">
                <span class="text-[#FF5701]">&gt;</span>
                <span :class="log.isOk ? 'text-[#00ffd5]' : 'text-slate-300'">{{ log.text }}</span>
              </div>
              <div v-if="isAiLoading" class="flex items-center gap-1 text-[#FF5701] animate-pulse">
                <span>&gt;</span>
                <span>正在执行推理并连接网关...</span>
              </div>
            </div>

            <!-- 提示信息 -->
            <div v-if="errTip" class="text-xs text-[#DC2626] font-bold flex items-center gap-1">
              ⚠️ {{ errTip }}
            </div>

            <!-- 委派执行按钮 -->
            <button 
              type="button" 
              class="primary-btn w-full py-2.5 bg-[#FF5701] text-white font-bold text-xs tracking-wider hover:bg-[#e04d00] transition-all rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              :disabled="isAiLoading"
              @click="handleAiDelegate"
            >
              <span v-if="isAiLoading" class="spinner border-2 border-white/30 border-t-white rounded-full w-3.5 h-3.5 animate-spin"></span>
              一键智能委派登录
            </button>
          </div>

          <!-- 模式 2: 凭证密保登录模式 (Credentials Mode - Custom HTML/CSS) -->
          <div v-else class="normal-mode-container flex flex-col space-y-4">
            
            <!-- 账号输入框 (自定义 Floating Label) -->
            <div class="relative flex flex-col mt-2">
              <input 
                id="normal-account" 
                type="text" 
                v-model="credentials.account"
                required
                class="peer custom-input w-full pt-5 pb-1 px-3 text-xs bg-[#111c30] text-white border-b border-slate-800 rounded-t-lg focus:border-[#FF5701] outline-none transition-all"
                :disabled="isNormalLoading"
              />
              <label 
                for="normal-account"
                class="absolute left-3 top-3.5 text-xs text-[#64748b] pointer-events-none transition-all duration-200 transform origin-left peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#FF5701] peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5"
                :class="{ 'scale-75 -translate-y-2.5 text-[#FF5701]': credentials.account }"
              >
                水网专网账号 / 邮箱
              </label>
            </div>

            <!-- 密码输入框 (自定义 Floating Label) -->
            <div class="relative flex flex-col">
              <input 
                id="normal-password" 
                type="password" 
                v-model="credentials.password"
                required
                class="peer custom-input w-full pt-5 pb-1 px-3 text-xs bg-[#111c30] text-white border-b border-slate-800 rounded-t-lg focus:border-[#FF5701] outline-none transition-all"
                :disabled="isNormalLoading"
              />
              <label 
                for="normal-password"
                class="absolute left-3 top-3.5 text-xs text-[#64748b] pointer-events-none transition-all duration-200 transform origin-left peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#FF5701] peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5"
                :class="{ 'scale-75 -translate-y-2.5 text-[#FF5701]': credentials.password }"
              >
                专用安全密码
              </label>
            </div>

            <!-- 自定义手绘风格拖拽水闸验证码 (Doodle Gate Slider) -->
            <div class="slider-verify-box flex flex-col space-y-1.5">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-[#94a3b8]">水闸安全认证</span>
                <span class="text-[10px]" :class="isUnlocked ? 'text-[#16A34A] font-bold' : 'text-[#64748b]'">
                  {{ isUnlocked ? '🔓 认证通过' : '🔒 拖动水滴开启闸门' }}
                </span>
              </div>
              
              <!-- 拖动滑轨 -->
              <div 
                ref="sliderTrackRef"
                class="slider-track relative w-full h-9 bg-[#111c30] border border-slate-800 rounded-xl overflow-hidden"
              >
                <!-- 拖动进度水流填充色 -->
                <div 
                  class="water-fill absolute left-0 top-0 h-full bg-[#0088ff]/20 border-r border-[#0088ff] transition-all duration-75"
                  :style="{ width: `${slidePercent}%` }"
                ></div>

                <!-- 终点水闸凹槽 -->
                <div class="gate-groove absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 border border-dashed border-slate-700 rounded-lg flex items-center justify-center text-[10px] text-[#64748b]/40 font-bold select-none">
                  🌀
                </div>

                <!-- 水流完全灌满高亮覆盖层 -->
                <div 
                  v-if="isUnlocked"
                  class="absolute inset-0 bg-[#16A34A] text-white flex items-center justify-center text-xs font-bold font-mono tracking-wide animate-pulse"
                >
                  🌊 水闸开启 · 验证通过
                </div>

                <!-- 可拖动滑块 -->
                <div 
                  v-if="!isUnlocked"
                  class="slider-handler absolute top-0.5 w-8 h-7.5 bg-[#FF5701] rounded-lg shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  :style="{ left: `${slideX}px` }"
                  @mousedown="startDrag"
                  @touchstart="startDrag"
                >
                  💧
                </div>
              </div>
            </div>

            <!-- 服务条款原生选项 -->
            <div class="terms flex items-start gap-2 mt-1">
              <input 
                id="normal-agree" 
                type="checkbox" 
                v-model="credentials.agree"
                class="custom-checkbox w-4 h-4 accent-[#FF5701] border border-slate-700 rounded cursor-pointer mt-0.5"
              />
              <label for="normal-agree" class="text-[10px] text-[#64748b] leading-normal cursor-pointer select-none">
                我已勾选并同意 <a href="javascript:;" class="text-[#FF5701] hover:underline font-bold">《智慧水利服务条款》</a> 与 <a href="javascript:;" class="text-[#FF5701] hover:underline font-bold">《数据隐私协议》</a>。
              </label>
            </div>

            <!-- 提示信息 -->
            <div v-if="errTip" class="text-xs text-[#DC2626] font-bold flex items-center gap-1">
              ⚠️ {{ errTip }}
            </div>

            <!-- 常规登录按钮 -->
            <button 
              type="button" 
              class="primary-btn w-full py-2.5 bg-[#FF5701] text-white font-bold text-xs tracking-wider hover:bg-[#e04d00] transition-all rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              :disabled="isNormalLoading"
              @click="handleNormalLogin"
            >
              <span v-if="isNormalLoading" class="spinner border-2 border-white/30 border-t-white rounded-full w-3.5 h-3.5 animate-spin"></span>
              建立凭证连接
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue';

// 登录模式选择: 'ai' 为 AI智能指令模式，'normal' 为常规密保模式
const loginMode = ref('ai');
const errTip = ref('');

const setLoginMode = (mode) => {
  loginMode.value = mode;
  errTip.value = '';
};

// ----------------------------------------------------
// 1. AI 智能委派授权模式逻辑
// ----------------------------------------------------
const aiInstruction = ref('/auth observer --access=station_12');
const quickCommands = ['/auth admin', '/auth guest', '/bypass --force', '/token default'];
const isAiLoading = ref(false);
const aiConsoleLogs = ref([]);

const fillCommand = (cmd) => {
  aiInstruction.value = `${cmd} --access=station_${Math.floor(Math.random() * 20) + 1}`;
  errTip.value = '';
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleAiDelegate = async () => {
  if (!aiInstruction.value.trim()) {
    errTip.value = '请输入登录委派指令！';
    return;
  }
  errTip.value = '';
  isAiLoading.value = true;
  aiConsoleLogs.value = [];

  try {
    aiConsoleLogs.value.push({ text: 'AI推理引擎已启动，正在分析登录意图...', isOk: false });
    await delay(600);
    aiConsoleLogs.value.push({ text: `指令匹配: "${aiInstruction.value.trim()}"`, isOk: true });
    await delay(500);
    aiConsoleLogs.value.push({ text: '匹配安全令牌与水利网关准入控制列表...', isOk: false });
    await delay(700);
    aiConsoleLogs.value.push({ text: '建立专网数字加密连接 [Token verified]', isOk: true });
    await delay(500);
    aiConsoleLogs.value.push({ text: '委派授权登录成功！正在跳转控制台...', isOk: true });
    await delay(400);

    // 触发成功提示
    alert('🎉 Agentic 智能委派登录成功！已成功载入智慧水利调度中心。');
  } catch (e) {
    errTip.value = 'AI 授权网关匹配失败，请重试。';
  } finally {
    isAiLoading.value = false;
  }
};

// ----------------------------------------------------
// 2. 凭证密保登录模式逻辑与原生手绘拖拽滑块
// ----------------------------------------------------
const credentials = reactive({
  account: '',
  password: '',
  agree: false
});
const isNormalLoading = ref(false);

// 滑动解锁状态
const sliderTrackRef = ref(null);
const slideX = ref(0);
const slidePercent = ref(0);
const isUnlocked = ref(false);
let isDragging = false;
let startMouseX = 0;
let maxSlideWidth = 0;

const startDrag = (e) => {
  if (isUnlocked.value || isNormalLoading.value) return;
  isDragging = true;
  
  // 兼容鼠标和触摸事件
  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
  startMouseX = clientX - slideX.value;
  
  if (sliderTrackRef.value) {
    const trackWidth = sliderTrackRef.value.clientWidth;
    // 扣除滑块本身的宽度 (32px) 和轨道的边框与安全边距
    maxSlideWidth = trackWidth - 36;
  }

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', handleDrag, { passive: false });
  document.addEventListener('touchend', stopDrag);
};

const handleDrag = (e) => {
  if (!isDragging) return;
  if (e.cancelable) e.preventDefault(); // 阻止触摸设备下的滚动干扰

  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
  let currentX = clientX - startMouseX;
  
  if (currentX < 0) currentX = 0;
  if (currentX > maxSlideWidth) currentX = maxSlideWidth;
  
  slideX.value = currentX;
  if (maxSlideWidth > 0) {
    slidePercent.value = Math.min(100, Math.floor((currentX / maxSlideWidth) * 100));
  }

  // 接近最右侧 (超过 96%) 触发成功锁死
  if (slidePercent.value >= 96) {
    isUnlocked.value = true;
    slidePercent.value = 100;
    slideX.value = maxSlideWidth;
    isDragging = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
  }
};

const stopDrag = () => {
  if (!isDragging) return;
  isDragging = false;
  
  // 未完全解锁，滑块弹回左侧
  if (!isUnlocked.value) {
    const start = slideX.value;
    const duration = 200; // 弹回动画时长 200ms
    const startTime = performance.now();
    
    const animateBack = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // 缓动弹回
      const factor = 1 - Math.pow(1 - progress, 3); 
      slideX.value = start * (1 - factor);
      slidePercent.value = Math.floor((slideX.value / maxSlideWidth) * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animateBack);
      } else {
        slideX.value = 0;
        slidePercent.value = 0;
      }
    };
    requestAnimationFrame(animateBack);
  }

  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', handleDrag);
  document.removeEventListener('touchend', stopDrag);
};

const handleNormalLogin = async () => {
  if (!credentials.account || !credentials.password) {
    errTip.value = '请输入专网账号和密码！';
    return;
  }
  if (!isUnlocked.value) {
    errTip.value = '请向右拖动水闸验证码以进行安全解锁！';
    return;
  }
  if (!credentials.agree) {
    errTip.value = '请先阅读并勾选同意服务条款与隐私协议！';
    return;
  }
  
  errTip.value = '';
  isNormalLoading.value = true;
  
  try {
    await delay(1200);
    alert('🎉 凭证加密登录成功！已成功载入智慧水利调度中心。');
  } catch (e) {
    errTip.value = '登录连接超时，请检查专网环境。';
  } finally {
    isNormalLoading.value = false;
  }
};

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', handleDrag);
  document.removeEventListener('touchend', stopDrag);
});
</script>

<style scoped>
/* 引入 JetBrains Mono 字体，体现 Agentic 极简代码调性 */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

.agentic-login-wrapper {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #080c16;
  border-radius: 20px;
  border: 1px solid #1e293b;
  overflow: hidden;
}

/* Slogan 切换为 B 端无衬线现代大粗体 */
.slogan-title {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -0.02em;
}

/* 动态手绘 SVG 动画 */
.doodle-water-path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawIn 2.5s ease-out forwards;
}

.doodle-flow-pulse {
  animation: pulseMove 1.5s linear infinite;
}

@keyframes drawIn {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulseMove {
  to {
    stroke-dashoffset: -36;
  }
}

.breathing-node {
  animation: nodeBreath 1.8s ease-in-out infinite alternate;
}

@keyframes nodeBreath {
  from {
    r: 3px;
    fill-opacity: 0.65;
  }
  to {
    r: 6.5px;
    fill-opacity: 1;
    filter: drop-shadow(0 0 4px #00ffd5);
  }
}

/* 纯手写 input 与 textarea 的 Focus-visible 细节状态 */
.custom-textarea {
  background-color: #111c30;
  border: 1px solid #1e293b;
  color: #ffffff;
}

.custom-textarea:focus {
  border-color: #FF5701;
  background-color: #0b1220;
}

.custom-input {
  transition: all 0.2s ease-in-out;
  border-bottom: 2px solid #1e293b;
}

.custom-input:focus {
  background-color: #0b1220;
  border-bottom-color: #FF5701;
}

/* 原生 Checkbox 状态覆盖 */
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border: 1px solid #475569;
  border-radius: 3px;
  background: #111c30;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
}

.custom-checkbox:checked {
  background: #FF5701;
  border-color: #FF5701;
}

.custom-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.custom-checkbox:focus-visible {
  outline: 2px solid #FF5701;
  outline-offset: 1px;
}

/* 模拟终端控制台控制 */
.ai-console {
  box-shadow: inset 0px 2px 8px rgba(0, 0, 0, 0.6);
}

/* 按钮微交互与 Loading */
.spinner {
  border-right-color: transparent;
}

.primary-btn {
  background-color: #FF5701;
  transition: all 0.2s ease-in-out;
}

.primary-btn:hover:not(:disabled) {
  background-color: #e04d00;
  box-shadow: 0 0 12px rgba(255, 87, 1, 0.4);
}

.primary-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.primary-btn:disabled, .cmd-tag:disabled, .custom-textarea:disabled, .custom-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-btn:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: #FF5701;
}
</style>
