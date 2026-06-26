<template>
  <div class="font-spec-demo-container space-y-12 py-4">
    
    <!-- 对比行一：h2 标题对比 -->
    <div class="contrast-row border-b border-slate-100 dark:border-slate-850 pb-8">
      <!-- 居中的对比标题 -->
      <div class="text-center mb-6">
        <div class="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
          对比一
        </div>
        <h3 class="text-sm font-black text-slate-800 dark:text-white">
          h2 标题字形对比 (左: 阿里妈妈数黑体 / 右: 系统默认)
        </h3>
      </div>
      
      <!-- 对比内容：左侧正确，右侧系统默认，中间在 md 屏幕下加 border 分割线 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-0 items-center">
        <!-- 左侧：规范推荐 (靠右对齐) -->
        <div class="flex justify-center md:justify-end md:pr-12 md:border-r border-slate-200 dark:border-slate-800 min-h-[50px] items-center">
          <h2 class="slogan-ok text-xl text-slate-800 dark:text-white">
            智慧水利调度中心
          </h2>
        </div>
        <!-- 右侧：不规范默认 (靠左对齐) -->
        <div class="flex justify-center md:justify-start md:pl-12 min-h-[50px] items-center">
          <h2 class="slogan-fail text-xl text-slate-800 dark:text-white">
            智慧水利调度中心
          </h2>
        </div>
      </div>
    </div>

    <!-- 对比行二：正文段落排版对比 -->
    <div class="contrast-row border-b border-slate-100 dark:border-slate-850 pb-8">
      <!-- 居中的对比标题 -->
      <div class="text-center mb-6">
        <div class="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
          对比二
        </div>
        <h3 class="text-sm font-black text-slate-800 dark:text-white">
          正文段落排版对比 (左: Noto Sans SC 思源 / 右: 系统默认)
        </h3>
      </div>
      
      <!-- 对比内容：左侧正确，右侧系统默认，中间在 md 屏幕下加 border 分割线 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-0 items-center">
        <!-- 左侧：规范推荐 (字号 text-sm, 颜色 text-slate-700 加深) -->
        <div class="flex justify-center md:justify-end md:pr-12 md:border-r border-slate-200 dark:border-slate-800 min-h-[70px] items-center">
          <p class="desc-ok text-sm text-slate-700 dark:text-slate-300 text-left md:text-right max-w-[400px]">
            集成取用水在线监测、水权精细化分配与水质动态跟踪。运用引调水智能算法优化供需匹配，实现水资源集约利用。
          </p>
        </div>
        <!-- 右侧：不规范默认 (字号 text-sm, 颜色 text-slate-700 加深) -->
        <div class="flex justify-center md:justify-start md:pl-12 min-h-[70px] items-center">
          <p class="desc-fail text-sm text-slate-700 dark:text-slate-300 text-left max-w-[400px]">
            集成取用水在线监测、水权精细化分配与水质动态跟踪。运用引调水智能算法优化供需匹配，实现水资源集约利用。
          </p>
        </div>
      </div>
    </div>

    <!-- 对比行三：表单输入框与按钮中英文混合对比 -->
    <div class="contrast-row border-b border-slate-100 dark:border-slate-850 pb-8">
      <!-- 居中的对比标题 -->
      <div class="text-center mb-6">
        <div class="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
          对比三
        </div>
        <h3 class="text-sm font-black text-slate-800 dark:text-white">
          表单英数与按钮中文对比 (左: 输入框 Inter+按钮 Noto / 右: 系统默认)
        </h3>
      </div>
      
      <!-- 对比内容：左侧正确，右侧系统默认，中间在 md 屏幕下加 border 分割线 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-0 items-center">
        <!-- 左侧：规范推荐 (大尺寸控件，输入框 Inter，按钮 Noto SC) -->
        <div class="flex justify-center md:justify-end md:pr-12 md:border-r border-slate-200 dark:border-slate-800 min-h-[60px] items-center">
          <div class="flex gap-3 items-center w-full max-w-[340px]">
            <input 
              type="text" 
              value="Water_Admin_123" 
              class="font-spec-input-ok w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 text-slate-800 dark:text-white font-medium" 
            />
            <button class="font-spec-btn-ok bg-blue-600 text-white font-bold text-sm px-4.5 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
              确认授权
            </button>
          </div>
        </div>
        <!-- 右侧：不规范默认 (大尺寸控件，全部回退默认系统字体) -->
        <div class="flex justify-center md:justify-start md:pl-12 min-h-[60px] items-center">
          <div class="flex gap-3 items-center w-full max-w-[340px]">
            <input 
              type="text" 
              value="Water_Admin_123" 
              class="font-spec-input-fail w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 text-slate-800 dark:text-white font-medium" 
            />
            <button class="font-spec-btn-fail bg-blue-600 text-white font-bold text-sm px-4.5 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
              确认授权
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 对比行四：高频数值刷新防抖对比 (控制变量：左侧开启等宽防抖 / 右侧强制非等宽并展现极其强烈的震颤感) -->
    <div class="contrast-row pb-2">
      <!-- 居中的对比标题 -->
      <div class="text-center mb-6">
        <div class="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
          对比四
        </div>
        <h3 class="text-sm font-black text-slate-800 dark:text-white">
          等宽防抖数值对比 (左: Inter+Noto 等宽稳定 / 右: Georgia+Times 非等宽抖动)
        </h3>
      </div>
      
      <!-- 对比内容 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-0 items-center">
        <!-- 左侧：规范推荐 (中英文卡片，等宽数字，指示为绿色) -->
        <div class="flex justify-center md:justify-end md:pr-12 md:border-r border-slate-200 dark:border-slate-800 min-h-[140px] items-center">
          <div class="font-spec-card-ok w-full max-w-[300px] p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col gap-1 text-left select-none">
            <div class="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-1.5">
              <span class="text-[10px] font-bold text-slate-400 font-spec-btn-ok">南门水库流量监测站</span>
              <span class="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-spec-input-ok">LIVE</span>
            </div>
            <div class="text-[10px] text-slate-500 font-spec-btn-ok">当前泄洪阀瞬时流量:</div>
            <div class="text-xl font-bold text-emerald-400 tracking-tight flex items-baseline">
              {{ waterFlow.toFixed(4) }} <span class="text-xs text-slate-400 ml-1">m³/s</span>
            </div>
            <div class="text-[9px] text-slate-400 mt-1 font-spec-btn-ok">
              安全水位预警阈值: 28.50 米
            </div>
          </div>
        </div>
        
        <!-- 右侧：不规范默认 (中英文卡片，非等宽数字且显式关闭 tabular-nums。使用 Georgia，通过在 1111 与 8888 间大幅刷新产生极其强烈的震颤抖动感) -->
        <div class="flex justify-center md:justify-start md:pl-12 min-h-[140px] items-center">
          <div class="font-spec-card-fail w-full max-w-[300px] p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col gap-1 text-left select-none">
            <div class="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-1.5">
              <span class="text-[10px] font-bold text-slate-400">南门水库流量监测站</span>
              <span class="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">LIVE</span>
            </div>
            <div class="text-[10px] text-slate-500">当前泄洪阀瞬时流量:</div>
            <div class="text-xl font-bold text-rose-400 tracking-tight flex items-baseline">
              {{ waterFlow.toFixed(4) }} <span class="text-xs text-slate-400 ml-1">m³/s</span>
            </div>
            <div class="text-[9px] text-slate-400 mt-1">
              安全水位预警阈值: 28.50 米
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const waterFlow = ref(1025.7942);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    // ----------------------------------------------------
    // 为了使 Georgia 等非等宽数字在右侧产生极其强烈的抖动和伸缩效果：
    // 我们必须消除平缓波动的遮蔽性，让数字在高频刷新时：
    // 在极窄数字组合 (以大量 1 组成) 与 极宽数字组合 (以大量 8 组成) 之间大范围交替震荡。
    // 这将使得 Georgia 极其不均匀的数字宽度（数字 1 与 数字 8 的物理宽度几乎相差一倍）充分显现！
    // ----------------------------------------------------
    const randomFactor = Math.random();
    if (randomFactor > 0.5) {
      // 产生以 1111 为代表的极窄数字波段
      waterFlow.value = 1111.1111 + Math.random() * 3.0;
    } else {
      // 产生以 8888 为代表的极宽数字波段
      waterFlow.value = 8888.8888 - Math.random() * 3.0;
    }
  }, 80); // 80ms 高频刷新率，极易直观捕捉右侧非等宽下的强烈晃动抖动
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

/* 引入阿里妈妈数黑体 CDN woff2 资源 */
@font-face {
  font-family: 'AlimamaShuHeiTi';
  src: url('https://cdn.jsdelivr.net/gh/themusecatcher/resources/AlimamaShuHeiTi-Bold.woff2') format('woff2'),
       url('https://cdn.jsdelivr.net/gh/themusecatcher/resources/AlimamaShuHeiTi-Bold.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* 左侧推荐样式 */
.slogan-ok {
  font-family: 'AlimamaShuHeiTi', 'Alimama ShuHeiTi', 'Impact', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.desc-ok {
  font-family: 'Noto Sans SC', 'Source Han Sans CN', 'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 400;
  line-height: 1.65;
}

/* 输入框指定 Inter，按钮指定 Noto Sans SC (思源黑体) */
.font-spec-input-ok {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.font-spec-btn-ok {
  font-family: 'Noto Sans SC', 'Source Han Sans CN', sans-serif;
}

/* 对比四左侧卡片：Inter 英文 + Noto 中文 + 开启等宽数字 */
.font-spec-card-ok {
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
  font-variant-numeric: tabular-nums;
  -moz-font-feature-settings: "tnum";
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
}

/* 右侧非推荐/系统默认样式 */
.slogan-fail {
  font-weight: 900;
  letter-spacing: -0.02em;
}

.desc-fail {
  font-weight: 400;
  line-height: 1.65;
}

.font-spec-input-fail,
.font-spec-btn-fail {
  /* 回退至系统默认 */
}

/* 对比四右侧卡片：典型非等宽字体 (Georgia) 且显式关闭 tabular-nums */
.font-spec-card-fail {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-variant-numeric: normal;
  font-feature-settings: normal;
}
</style>
