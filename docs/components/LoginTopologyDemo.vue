<template>
  <fullscreen v-model="isFullscreen" :teleport="true" :page-only="true">
    <div 
      class="login-demo-container relative w-full overflow-hidden flex border border-slate-200/50 dark:border-slate-800 shadow-2xl bg-gradient-to-tr from-[#020617] via-[#0b1329] to-[#0d1e3d] transition-all duration-300 ease-in-out"
      :class="[
        isFullscreen 
          ? 'fixed inset-0 w-screen h-screen z-[9999] rounded-none border-none' 
          : 'h-[600px] rounded-[24px]'
      ]"
      @mousemove="handleParallax"
      @mouseleave="resetParallax"
    >
    <!-- 1. 3D WebGL 无限滚动微观拓扑流背景层 (Topology Background) -->
    <TopologyBackground :mouse-x="xOffset" :mouse-y="yOffset" />

    <!-- 全屏控制悬浮按钮 -->
    <button 
      v-if="!isFullscreen"
      class="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 dark:bg-slate-900/30 border border-white/15 text-[10px] font-bold text-white hover:bg-white/20 transition-all duration-300 cursor-pointer pointer-events-auto"
      @click="toggleFullscreen"
    >
      <span class="i-ep-full-screen text-xs"></span> 全屏体验
    </button>
 
    <button 
      v-else
      class="absolute top-6 right-6 z-[1000] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 dark:bg-slate-900/30 border border-white/20 backdrop-blur-md text-xs font-bold text-white hover:bg-white/20 transition-all duration-300 cursor-pointer pointer-events-auto shadow-lg"
      @click="toggleFullscreen"
    >
      <span class="i-ep-close-bold"></span> 退出全屏
    </button>

    <!-- 2. 双栏布局结构 -->
    <!-- 左半栏：留白区域 (仅在非全屏模式下占位) -->
    <div v-if="!isFullscreen" class="w-[55%] h-full relative z-10"></div>

    <!-- 右半栏：Fluent Acrylic 登录容器 -->
    <div 
      :class="[
        isFullscreen 
          ? 'absolute right-[6%] sm:right-[8%] md:right-[12%] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-auto' 
          : 'w-[45%] h-full relative z-10 flex items-center justify-center p-6 border-l border-white/5 backdrop-blur-[2px] bg-slate-950/5'
      ]"
    >
      <div class="flip-card-container w-full max-w-[360px] h-[450px]">
        <div 
          class="flip-card-inner w-full h-full" 
          :class="{ 'is-flipped': isFlipped, 'is-shaking': isShaking }"
          @animationend="isShaking = false"
        >
          <!-- 正面：密码验证登录 -->
          <div class="card-front w-full h-full bg-transparent p-6 flex flex-col justify-between select-none relative">
            <!-- 动态液态玻璃背景层（硬实线外框 + 裁剪） -->
            <div class="liquid-glass-border-container">
              <!-- 内部液态折射层 -->
              <div class="liquid-glass-fluid-layer"></div>
            </div>
            <!-- 头部 -->
            <div class="space-y-1 text-center">
              <h2 class="text-base font-extrabold tracking-wide text-slate-900 dark:text-white">水网数字孪生登入</h2>
              <p class="text-[9px] text-slate-500 font-medium">使用水务内网加密电子令牌进行登入</p>
            </div>

            <!-- 表单区域 -->
            <div class="space-y-3.5 my-2">
              <el-input 
                v-model="loginForm.account" 
                placeholder="请输入专网账号 / 邮箱" 
                clearable
              >
                <template #prefix>
                  <span class="i-ep-user text-slate-400"></span>
                </template>
              </el-input>

              <el-input 
                v-model="loginForm.password" 
                type="password" 
                placeholder="请输入专用密码" 
                show-password
              >
                <template #prefix>
                  <span class="i-ep-lock text-slate-400"></span>
                </template>
              </el-input>

              <!-- 验证码 -->
              <div class="flex gap-2">
                <el-input 
                  v-model="loginForm.code" 
                  placeholder="短信验证码" 
                  maxlength="6"
                  class="flex-1"
                >
                  <template #prefix>
                    <span class="i-ep-message text-slate-400"></span>
                  </template>
                </el-input>
                <el-button 
                  type="primary" 
                  :disabled="codeBtnDisabled" 
                  @click="sendSmsCode"
                  class="w-[100px]"
                >
                  {{ codeBtnText }}
                </el-button>
              </div>

              <!-- 服务条款 -->
              <div class="flex items-start gap-1">
                <el-checkbox v-model="loginForm.agree" class="mt-0.5" />
                <span class="text-[10px] text-slate-500 leading-normal">
                  我已阅读并同意
                  <a href="javascript:;" class="text-[#0055ff] hover:underline font-semibold">《智慧水利服务协议》</a> 与 
                  <a href="javascript:;" class="text-[#0055ff] hover:underline font-semibold">《隐私政策》</a>。
                </span>
              </div>
            </div>

            <!-- 底部操作 -->
            <div class="space-y-3">
              <el-button 
                type="primary" 
                class="w-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                @click="handleLogin"
              >
                连接数字管网中心
              </el-button>
              
              <div class="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                <a href="javascript:;" class="hover:text-[#0055ff] transition-colors">证书找回</a>
                <button 
                  class="flex items-center gap-0.5 hover:text-[#0055ff] font-bold transition-colors"
                  @click="isFlipped = true"
                >
                  扫码安全登录 <span class="i-ep-arrow-right"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- 反面：扫码验证登录 -->
          <div class="card-back w-full h-full bg-transparent p-6 flex flex-col justify-between select-none relative">
            <!-- 动态液态玻璃背景层（硬实线外框 + 裁剪） -->
            <div class="liquid-glass-border-container">
              <!-- 内部液态折射层 -->
              <div class="liquid-glass-fluid-layer"></div>
            </div>
            <!-- 头部 -->
            <div class="space-y-1 text-center">
              <h2 class="text-base font-extrabold tracking-wide text-slate-900 dark:text-white">安全令扫码登录</h2>
              <p class="text-[9px] text-slate-500 font-medium">请使用移动水务终端或防伪小程序扫描</p>
            </div>

            <!-- 二维码 -->
            <div class="flex flex-col items-center justify-center relative my-2">
              <div class="relative w-[160px] h-[160px] p-2 bg-white/90 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center overflow-hidden">
                <!-- 激光动画线 -->
                <div 
                  v-if="!qrExpired" 
                  class="absolute w-[90%] h-[1.5px] bg-gradient-to-r from-transparent via-[#0055ff] to-transparent shadow-[0_0_6px_#0055ff] animate-laser"
                ></div>

                <!-- 模拟二维码 -->
                <svg 
                  v-if="!qrLoading"
                  class="w-[90%] h-[90%] text-slate-800 dark:text-slate-200 transition-opacity duration-300"
                  :class="{ 'opacity-15': qrExpired }"
                  viewBox="0 0 100 100" 
                  fill="currentColor"
                >
                  <path d="M0 0h28v28H0zm4 4v20h20V4zm4 4h12v12H8zm64-8h28v28h-28zm4 4v20h20V4zm4 4h12v12H8zM0 72h28v28H0zm4 4v20h20V76zm4 4h12v12H8z" />
                  <path d="M36 4h4v4h-4zm8 0h8v4h-8zm12 0h4v4h-4zm4 8h4v8h-4zm0 8h8v4h-8zm-12 4h4v4h-4zm-8-8h4v4h-4zm16 8h4v4h-4zm12 12h4v4h-4zm-20 4h12v4h-12zm-4 4h4v4h-4zm16 4h4v4h-4zm-24 4h8v4h-8zm12 0h4v4h-4zm32-28h4v4h-4zm8 0h4v4h-4zm-8 8h8v4h-8zm8 8h4v4h-4zm-16 4h8v4h-8zm8 8h4v4h-4zm16 4h4v4h-4zm-8 4h4v4h-4zm-16-16h4v4h-4zm8 0h4v4h-4zm0-8h4v4h-4zm12 12h4v4h-4z" />
                  <path d="M48 36h4v4h-4zm8 4h8v4h-8zm-12 12h4v8h-4zm16 4h4v4h-4zm8-12h4v4h-4zm-12-8h4v4h-4z" />
                  <path d="M42 42h16v16H42z" fill="white" class="dark:fill-slate-950" />
                  <path d="M45 45c0-1 2-2 5-2s5 1 5 2v3h-10zm2 5h6c.6 0 1 .4 1 1v4c0 1.7-1.3 3-3 3s-3-1.3-3-3v-4c0-.6.4-1 1-1z" fill="#0055ff" />
                </svg>

                <div v-if="qrLoading" class="flex flex-col items-center gap-1.5">
                  <span class="i-ep-loading text-xl text-[#0055ff] animate-spin"></span>
                  <span class="text-[8px] text-slate-400">正在生成一次性密钥...</span>
                </div>

                <!-- 二维码过期遮罩 -->
                <div 
                  v-if="qrExpired" 
                  class="absolute inset-0 bg-white/95 dark:bg-slate-950/95 flex flex-col items-center justify-center gap-2 transition-all duration-300"
                >
                  <span class="i-ep-warning text-2xl text-amber-500 animate-bounce"></span>
                  <span class="text-[9px] text-slate-500 font-semibold">安全密钥已过期</span>
                  <el-button size="small" type="primary" @click="refreshQrCode">重新加载</el-button>
                </div>
              </div>

              <!-- 倒计时提示 -->
              <span v-if="!qrExpired && !qrLoading" class="text-[8px] text-slate-400 mt-2 flex items-center gap-1">
                <span class="i-ep-time text-xs"></span>
                安全二维码有效期剩 {{ qrCountdown }} 秒
              </span>
            </div>

            <!-- 底部操作 -->
            <div class="space-y-3">
              <div class="border-t border-slate-100 dark:border-slate-800/40 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-medium">
                <span>水务令 <a href="javascript:;" class="text-[#0055ff] hover:underline font-semibold">安装向导</a></span>
                <button 
                  class="flex items-center gap-0.5 hover:text-[#0055ff] font-bold transition-colors"
                  @click="isFlipped = false"
                >
                  <span class="i-ep-arrow-left"></span> 密码登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </fullscreen>

  <!-- 隐藏的 SVG 液态网格滤镜定义，使用 topology 独立 id 防干扰 -->
  <svg style="position: absolute; width: 0; height: 0; pointer-events: none; overflow: hidden;" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="liquid-glass-filter-topology">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.012 0.018" 
          numOctaves="3" 
          :seed="filterSeed" 
          result="noise" 
        />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="noise" 
          scale="16" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
      </filter>
    </defs>
  </svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import TopologyBackground from './TopologyBackground.vue';

// 1. 3D 视差相机的坐标偏移计算
const xOffset = ref(0);
const yOffset = ref(0);

const handleParallax = (e) => {
  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  
  const x = (e.clientX - rect.left) / rect.width * 2 - 1;
  const y = (e.clientY - rect.top) / rect.height * 2 - 1;
  
  xOffset.value = x * 30;
  yOffset.value = y * 30;
};

const resetParallax = () => {
  xOffset.value = 0;
  yOffset.value = 0;
};

// 2. 账号与密码表单
const isFlipped = ref(false);
const isShaking = ref(false);

const loginForm = ref({
  account: '',
  password: '',
  code: '',
  agree: false
});

// 短信验证码倒计时
const codeBtnText = ref('获取验证码');
const codeBtnDisabled = ref(false);
let smsTimer = null;

const sendSmsCode = () => {
  if (codeBtnDisabled.value) return;
  
  ElMessage.success('安全令短信验证码发送成功！请注意查收。');
  codeBtnDisabled.value = true;
  let count = 60;
  codeBtnText.value = `${count}s`;
  
  smsTimer = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(smsTimer);
      codeBtnText.value = '获取验证码';
      codeBtnDisabled.value = false;
    } else {
      codeBtnText.value = `${count}s`;
    }
  }, 1000);
};

// 账号登录操作
const handleLogin = () => {
  if (!loginForm.value.agree) {
    isShaking.value = true;
    ElMessage.error('请先阅读并勾选同意《智慧水利服务协议》与《隐私政策》！');
    return;
  }

  if (!loginForm.value.account || !loginForm.value.password) {
    isShaking.value = true;
    ElMessage.warning('请输入完整的水网数字孪生中心账号与密码！');
    return;
  }

  ElMessage.success('身份验证成功！已接入数据管网数字孪生大屏。');
};

// 3. 扫码登录模拟
const qrLoading = ref(false);
const qrExpired = ref(false);
const qrCountdown = ref(30);
let qrTimer = null;

const startQrCountdown = () => {
  qrExpired.value = false;
  qrCountdown.value = 30;
  
  if (qrTimer) clearInterval(qrTimer);
  
  qrTimer = setInterval(() => {
    qrCountdown.value--;
    if (qrCountdown.value <= 0) {
      clearInterval(qrTimer);
      qrExpired.value = true;
    }
  }, 1000);
};

const refreshQrCode = () => {
  qrLoading.value = true;
  qrExpired.value = false;
  
  setTimeout(() => {
    qrLoading.value = false;
    startQrCountdown();
    ElMessage.success('扫码登录密钥重置完毕！已更新动态令牌。');
  }, 1000);
};

// 4. 全屏视口模式控制
const isFullscreen = ref(false);

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

watch(isFullscreen, () => {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 80);
});

// 5. 液态玻璃的动态噪点 seed 动画控制
const filterSeed = ref(1);
let filterAnimFrame = null;

const animateFilter = () => {
  filterSeed.value = (filterSeed.value + 0.05) % 1000;
  filterAnimFrame = requestAnimationFrame(animateFilter);
};

onMounted(() => {
  startQrCountdown();
  filterAnimFrame = requestAnimationFrame(animateFilter);
});

onUnmounted(() => {
  if (smsTimer) clearInterval(smsTimer);
  if (qrTimer) clearInterval(qrTimer);
  if (filterAnimFrame) cancelAnimationFrame(filterAnimFrame);
});
</script>

<style scoped>
/* 3D 翻转卡片 */
.flip-card-container {
  perspective: 1200px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-card-inner.is-flipped {
  transform: rotateY(180deg);
}

/* 抖动微交互 */
@keyframes shake {
  0%, 100% { transform: rotateY(0) translateX(0); }
  12%, 36%, 60%, 84% { transform: rotateY(0) translateX(-8px); }
  24%, 48%, 72%, 96% { transform: rotateY(0) translateX(8px); }
}

.is-shaking {
  animation: shake 0.45s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shakeFlipped {
  0%, 100% { transform: rotateY(180deg) translateX(0); }
  12%, 36%, 60%, 84% { transform: rotateY(180deg) translateX(-8px); }
  24%, 48%, 72%, 96% { transform: rotateY(180deg) translateX(8px); }
}

.is-flipped.is-shaking {
  animation: shakeFlipped 0.45s cubic-bezier(.36,.07,.19,.97) both;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

/* 扫码激光器 */
@keyframes laserMove {
  0%, 100% { top: 8%; opacity: 0.1; }
  50% { top: 90%; opacity: 0.95; }
}

.animate-laser {
  animation: laserMove 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

/* 拟态液态玻璃的外层直线实线边框容器 */
.liquid-glass-border-container {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}

.dark .liquid-glass-border-container {
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.45);
}

/* 内部液态折射层 */
.liquid-glass-fluid-layer {
  position: absolute;
  inset: -16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%);
  box-shadow: 
    inset 0 2px 4px 0 rgba(255, 255, 255, 0.5),
    inset 0 16px 32px -16px rgba(255, 255, 255, 0.6),
    inset 0 -16px 32px -16px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  filter: url(#liquid-glass-filter-topology);
}

.dark .liquid-glass-fluid-layer {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.1) 100%);
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 16px 32px -16px rgba(255, 255, 255, 0.2),
    inset 0 -16px 32px -16px rgba(0, 0, 0, 0.45);
}
</style>
