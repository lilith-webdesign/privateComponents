<template>
  <div class="theme-v2-demo-root space-y-8 text-slate-800 dark:text-slate-200">
    <!-- Toast 反反馈提示 -->
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-lg border border-slate-700/30 dark:border-slate-200/50 flex items-center gap-2 z-50">
        <span class="i-ep-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></span>
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>

    <!-- 上半部分左右布局 -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 左侧：可视化配置区域 (占比 4/12) -->
      <div class="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-6 self-start">
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded" :style="{ backgroundColor: primaryColor }"></span>
          <h3 class="text-sm font-bold">可视化主题编辑器</h3>
        </div>

        <!-- 主色选值 -->
        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-500 flex justify-between">
            <span>主色 (Primary Color)</span>
            <span class="font-mono text-[10px] text-slate-400">{{ primaryColor }}</span>
          </label>
          <div class="flex items-center gap-3">
            <el-color-picker v-model="primaryColor" />
            <el-input size="small" v-model="primaryColor" placeholder="#002FA7" class="font-mono" />
          </div>
        </div>

        <!-- 成功状态色选值 -->
        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-500 flex justify-between">
            <span>成功色 (Success Color)</span>
            <span class="font-mono text-[10px] text-slate-400">{{ successColor }}</span>
          </label>
          <div class="flex items-center gap-3">
            <el-color-picker v-model="successColor" />
            <el-input size="small" v-model="successColor" placeholder="#17AB00" class="font-mono" />
          </div>
        </div>

        <!-- 警告状态色选值 -->
        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-500 flex justify-between">
            <span>警告色 (Warning Color)</span>
            <span class="font-mono text-[10px] text-slate-400">{{ warningColor }}</span>
          </label>
          <div class="flex items-center gap-3">
            <el-color-picker v-model="warningColor" />
            <el-input size="small" v-model="warningColor" placeholder="#E67717" class="font-mono" />
          </div>
        </div>

        <!-- 危险状态色选值 -->
        <div class="space-y-2">
          <label class="text-xs font-semibold text-slate-500 flex justify-between">
            <span>危险色 (Danger Color)</span>
            <span class="font-mono text-[10px] text-slate-400">{{ dangerColor }}</span>
          </label>
          <div class="flex items-center gap-3">
            <el-color-picker v-model="dangerColor" />
            <el-input size="small" v-model="dangerColor" placeholder="#E33232" class="font-mono" />
          </div>
        </div>

        <!-- 圆角滑块 -->
        <div class="space-y-2 border-t border-slate-100 dark:border-slate-800/60 pt-4">
          <label class="text-xs font-semibold text-slate-500 flex justify-between">
            <span>基础圆角 (Border Radius Base)</span>
            <span class="font-mono text-[11px] text-slate-400">{{ borderRadiusBase }} px</span>
          </label>
          <el-slider v-model="borderRadiusBase" :min="0" :max="20" />
        </div>

        <!-- 重置为水利蓝默认 -->
        <el-button size="small" class="w-full" @click="resetToDefault">恢复水利蓝默认值</el-button>
      </div>

      <!-- 右侧：组件样式预览区 (占比 8/12) -->
      <div class="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm preview-area-container flex flex-col gap-6" :style="themeStyles">
        <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-center">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7]" :style="{ backgroundColor: primaryColor }"></span>
            组件主题效果实时预览
          </h3>
          <span class="text-[10px] text-slate-400 font-mono">已隔离覆盖，仅在当前预览容器中生效</span>
        </div>

        <!-- 1. Universal & Navigation (通用与导航组件预览) -->
        <div class="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-4">
          <span class="text-[10px] text-slate-400 font-mono block mb-1">通用与导航类</span>
          <div class="flex flex-wrap items-center gap-3">
            <el-button type="primary" size="large" @click="triggerAction('点击了大按钮')">主要按钮 (L)</el-button>
            <el-button type="primary" @click="triggerAction('点击了中按钮')">主要按钮 (M)</el-button>
            <el-button type="primary" size="small" @click="triggerAction('点击了小按钮')">主要按钮 (S)</el-button>
            <el-button type="primary" disabled>禁用状态</el-button>
            <el-button @click="triggerAction('点击了次要按钮')">次要按钮</el-button>
            <el-button link type="primary" @click="triggerAction('点击了文字按钮')">链接按钮</el-button>
          </div>
          <!-- 导航类 -->
          <div class="border-t border-slate-100 dark:border-slate-800/60 pt-3 flex flex-col gap-3">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item>水网控制中心</el-breadcrumb-item>
              <el-breadcrumb-item>预警监控</el-breadcrumb-item>
              <el-breadcrumb-item>大坝水位监测</el-breadcrumb-item>
            </el-breadcrumb>
            <el-steps :active="1" finish-status="success" size="small">
              <el-step title="数据校验" />
              <el-step title="水位判定" />
              <el-step title="阈值告警" />
            </el-steps>
          </div>
        </div>

        <!-- 2. Data Entry (数据录入预览) -->
        <div class="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-4">
          <span class="text-[10px] text-slate-400 font-mono block mb-1">数据录入类</span>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-input v-model="inputText" placeholder="请在此输入文本..." clearable />
            <el-select v-model="selectValue" placeholder="请选择监控点位" class="w-full">
              <el-option label="大坝渗漏量监测站-01" value="01" />
              <el-option label="泵站流量采集仪-02" value="02" />
              <el-option label="南门水库水位装置-03" value="03" />
            </el-select>
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <el-radio-group v-model="radioVal">
              <el-radio label="1">自动上报</el-radio>
              <el-radio label="2">手动抓取</el-radio>
            </el-radio-group>
            <el-checkbox v-model="checkboxVal">短信推送</el-checkbox>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500">自控闸门:</span>
              <el-switch v-model="switchVal" />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-xs text-slate-500 whitespace-nowrap">开度设置:</span>
            <el-slider v-model="sliderVal" class="flex-1" />
          </div>
        </div>

        <!-- 3. Data Display & Feedback (数据展示与反馈类) -->
        <div class="border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-4">
          <span class="text-[10px] text-slate-400 font-mono block mb-1">数据展示与反馈类</span>
          <div class="flex flex-wrap items-center gap-3">
            <el-tag>常规标签</el-tag>
            <el-tag type="success">成功</el-tag>
            <el-tag type="warning">警告</el-tag>
            <el-tag type="danger">异常</el-tag>
            <el-badge :value="9" class="ml-2">
              <el-button size="small">未处理告警</el-button>
            </el-badge>
            <el-popconfirm title="确定要删除此站点吗？" @confirm="triggerAction('气泡框确认删除')">
              <template #reference>
                <el-button type="danger" size="small" class="ml-2">删除节点</el-button>
              </template>
            </el-popconfirm>
          </div>

          <!-- Alert 展示 -->
          <div class="space-y-2">
            <el-alert title="水闸运行正常：今日定期巡检设备未发现任何故障异常。" type="success" show-icon :closable="false" />
            <el-alert title="高危防汛通报：上游干流开闸放水，请沿线各水库注意警戒。" type="warning" show-icon />
          </div>

          <!-- 折叠面板与表格 -->
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="实时水网站点统计" name="1">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" label="站点" />
                <el-table-column prop="val" label="水位" />
                <el-table-column label="运行">
                  <template #default="scope">
                    <span class="flex items-center gap-1.5 text-xs">
                      <span :class="scope.row.status === '正常' ? 'bg-emerald-500' : 'bg-rose-500'" class="w-1.5 h-1.5 rounded-full"></span>
                      <span>{{ scope.row.status }}</span>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

    <!-- 下半部分：自动生成的 uno.config.ts 配置代码 -->
    <div class="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-lg relative">
      <div class="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-bold text-slate-200">自动同步生成的 uno.config.ts</span>
          <span class="text-[10px] text-slate-500">复制本配置，直接覆盖您工程根目录的 uno.config.ts 即可。</span>
        </div>
        <el-button type="primary" size="small" @click="copyGeneratedConfig">
          <span class="i-ep-document-copy mr-1 text-xs"></span>一键复制配置代码
        </el-button>
      </div>

      <div class="overflow-x-auto max-h-[450px] font-mono text-xs text-slate-300">
        <pre><code class="language-typescript">{{ generatedConfig }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

// Toast 反馈
const toasts = ref([]);
let toastIdCounter = 0;

const triggerAction = (text) => {
  const id = toastIdCounter++;
  toasts.value.push({ id, text });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 2200);
};

// 1. 用户主题状态变量 (默认值对齐水利深蓝)
const primaryColor = ref('#002FA7');
const successColor = ref('#17AB00');
const warningColor = ref('#E67717');
const dangerColor = ref('#E33232');
const borderRadiusBase = ref(4);

// 重置功能
const resetToDefault = () => {
  primaryColor.value = '#002FA7';
  successColor.value = '#17AB00';
  warningColor.value = '#E67717';
  dangerColor.value = '#E33232';
  borderRadiusBase.value = 4;
  triggerAction('已成功重置为默认的水利蓝颜色参数！');
};

// 2. 颜色关联计算混合器
const mixColor = (color1, color2, weight) => {
  const d2h = (d) => {
    let s = d.toString(16);
    return s.length === 1 ? '0' + s : s;
  };
  const parseHex = (hex) => {
    const clean = hex.replace('#', '');
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    }
  };
  try {
    const c1 = parseHex(color1);
    const c2 = parseHex(color2);
    
    const r = Math.round(c1.r * (1 - weight) + c2.r * weight);
    const g = Math.round(c1.g * (1 - weight) + c2.g * weight);
    const b = Math.round(c1.b * (1 - weight) + c2.b * weight);
    
    return '#' + d2h(r) + d2h(g) + d2h(b);
  } catch (e) {
    return color1;
  }
};

// 衍生色计算属性
const primaryLight3 = computed(() => mixColor(primaryColor.value, '#ffffff', 0.3));
const primaryLight5 = computed(() => mixColor(primaryColor.value, '#ffffff', 0.5));
const primaryLight7 = computed(() => mixColor(primaryColor.value, '#ffffff', 0.7));
const primaryLight8 = computed(() => mixColor(primaryColor.value, '#ffffff', 0.8));
const primaryLight9 = computed(() => mixColor(primaryColor.value, '#ffffff', 0.9));
const primaryDark2 = computed(() => mixColor(primaryColor.value, '#000000', 0.2));

const successLight3 = computed(() => mixColor(successColor.value, '#ffffff', 0.3));
const successDark2 = computed(() => mixColor(successColor.value, '#000000', 0.2));
const successLight9 = computed(() => mixColor(successColor.value, '#ffffff', 0.9));

const warningLight3 = computed(() => mixColor(warningColor.value, '#ffffff', 0.3));
const warningDark2 = computed(() => mixColor(warningColor.value, '#000000', 0.2));
const warningLight9 = computed(() => mixColor(warningColor.value, '#ffffff', 0.9));

const dangerLight3 = computed(() => mixColor(dangerColor.value, '#ffffff', 0.3));
const dangerDark2 = computed(() => mixColor(dangerColor.value, '#000000', 0.2));
const dangerLight9 = computed(() => mixColor(dangerColor.value, '#ffffff', 0.9));

// 3. 动态 CSS 变量映射组
const themeStyles = computed(() => {
  return {
    '--el-color-primary': primaryColor.value,
    '--el-color-primary-light-3': primaryLight3.value,
    '--el-color-primary-light-5': primaryLight5.value,
    '--el-color-primary-light-7': primaryLight7.value,
    '--el-color-primary-light-8': primaryLight8.value,
    '--el-color-primary-light-9': primaryLight9.value,
    '--el-color-primary-dark-2': primaryDark2.value,

    '--el-color-success': successColor.value,
    '--el-color-success-light-3': successLight3.value,
    '--el-color-success-dark-2': successDark2.value,
    '--el-color-success-light-9': successLight9.value,

    '--el-color-warning': warningColor.value,
    '--el-color-warning-light-3': warningLight3.value,
    '--el-color-warning-dark-2': warningDark2.value,
    '--el-color-warning-light-9': warningLight9.value,

    '--el-color-danger': dangerColor.value,
    '--el-color-danger-light-3': dangerLight3.value,
    '--el-color-danger-dark-2': dangerDark2.value,
    '--el-color-danger-light-9': dangerLight9.value,

    '--el-border-radius-base': `${borderRadiusBase.value}px`,
    '--el-border-radius-small': `${Math.max(0, borderRadiusBase.value - 2)}px`,
  }
});

// 4. 右侧预览用到的组件状态变量
const inputText = ref('');
const selectValue = ref('');
const radioVal = ref('1');
const checkboxVal = ref(true);
const switchVal = ref(true);
const sliderVal = ref(45);
const activeCollapse = ref(['1']);
const tableData = ref([
  { name: '大坝渗漏量监测站-01', val: '78.20 m', status: '正常' },
  { name: '泵站流量采集仪-02', val: '12.40 m³/s', status: '异常' }
]);

// 5. 动态生成的 uno.config.ts 模板
const generatedConfig = computed(() => {
  const smallRadius = Math.max(0, borderRadiusBase.value - 2);
  return `import {
    defineConfig,
    presetUno,
    presetAttributify,
    presetIcons
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
    theme: {
        colors: {
            primary: '${primaryColor.value}', // 主色调配置
        }
    },
    preflights: [
        {
            getCSS: ({ theme }: { theme: any }) => \`
        :root {
          /* 主要核心色定制 */
          --el-color-primary: \${theme.colors.primary};
          --el-color-primary-light-3: ${primaryLight3.value}; /* Hover 态 */
          --el-color-primary-light-5: ${primaryLight5.value};
          --el-color-primary-light-7: ${primaryLight7.value};
          --el-color-primary-light-8: ${primaryLight8.value};
          --el-color-primary-light-9: ${primaryLight9.value};
          --el-color-primary-dark-2: ${primaryDark2.value};  /* Active 态 */

          /* 成功状态色定制 (#17AB00) */
          --el-color-success: ${successColor.value};
          --el-color-success-light-3: ${successLight3.value};
          --el-color-success-dark-2: ${successDark2.value};
          --el-color-success-light-9: ${successLight9.value};

          /* 警告状态色定制 (#E67717) */
          --el-color-warning: ${warningColor.value};
          --el-color-warning-light-3: ${warningLight3.value};
          --el-color-warning-dark-2: ${warningDark2.value};
          --el-color-warning-light-9: ${warningLight9.value};

          /* 危险状态色定制 (#E33232) */
          --el-color-danger: ${dangerColor.value};
          --el-color-danger-light-3: ${dangerLight3.value};
          --el-color-danger-dark-2: ${dangerDark2.value};
          --el-color-danger-light-9: ${dangerLight9.value};

          /* 标准圆角定制 */
          --el-border-radius-small: ${smallRadius}px;
          --el-border-radius-base: ${borderRadiusBase.value}px;
          --el-border-radius-round: 20px;
        }

        /* 统一 Element Plus 组件的字体家族，防止被 VitePress 全局基础字体覆盖 */
        [class^="el-"],
        [class*=" el-"] {
          font-family: Inter, 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif !important;
        }

        /* 针对不同尺寸 Element Plus 原生组件圆角等变量重声明的全局统一覆盖 */
        .el-button {
          --el-button-border-radius: var(--el-border-radius-base);
        }
        .el-button--small {
          --el-button-border-radius: var(--el-border-radius-base);
        }
        .el-button--large {
          --el-button-border-radius: var(--el-border-radius-base);
        }

        /* 统一表单元素不同尺寸下的圆角变量，防止被 Element 默认的更小或更大尺寸计算覆盖 */
        .el-input,
        .el-input--small,
        .el-input--large,
        .el-select,
        .el-select-v2,
        .el-textarea {
          --el-input-border-radius: var(--el-border-radius-base) !important;
        }

        /* 统一 Table 展示样式 */
        .el-table {
          --el-table-border-color: #e4e6eb !important;
          --el-table-header-bg-color: #f5f5f5 !important;
          --el-table-row-hover-bg-color: rgba(0, 47, 167, 0.04) !important;
        }
        .el-table th.el-table__cell {
          background-color: var(--el-table-header-bg-color) !important;
          color: #060B14 !important;
          font-weight: bold !important;
        }

        /* 统一 Collapse 折叠面板样式 */
        .el-collapse {
          border-top: 1px solid #e4e6eb !important;
          border-bottom: 1px solid #e4e6eb !important;
        }
        .el-collapse-item__header {
          font-weight: bold !important;
          color: #060B14 !important;
        }

        /* 统一 Dialog 对话框与 MessageBox 弹框样式 */
        .el-dialog {
          --el-dialog-border-radius: var(--el-border-radius-base) !important;
          --el-dialog-padding-primary: 24px !important;
        }
        .el-dialog__header {
          margin-right: 0 !important;
          padding-bottom: 12px !important;
          border-bottom: 1px solid #e4e6eb !important;
        }
        .el-dialog__title {
          font-weight: bold !important;
          color: #060B14 !important;
        }
        .el-dialog__body {
          padding: 24px 0 !important;
          color: #4f5259 !important;
        }
        .el-dialog__footer {
          padding-top: 12px !important;
          border-top: 1px solid #e4e6eb !important;
        }

        .el-message-box {
          --el-messagebox-border-radius: var(--el-border-radius-base) !important;
          padding: 20px 24px !important;
        }
        .el-message-box__header {
          padding-bottom: 12px !important;
          border-bottom: 1px solid #e4e6eb !important;
          padding-right: 0 !important;
        }
        .el-message-box__title {
          font-weight: bold !important;
          color: #060B14 !important;
        }
        .el-message-box__content {
          padding: 24px 0 !important;
          color: #4f5259 !important;
        }
        .el-message-box__btns {
          padding-top: 12px !important;
          border-top: 1px solid #e4e6eb !important;
        }

        /* 统一 Drawer 抽屉样式 */
        .el-drawer {
          --el-drawer-padding-primary: 24px !important;
        }
        .el-drawer__header {
          margin-bottom: 0 !important;
          padding-bottom: 16px !important;
          border-bottom: 1px solid #e4e6eb !important;
          color: #060B14 !important;
          font-weight: bold !important;
        }
        .el-drawer__body {
          padding: 24px !important;
        }
        .el-drawer__footer {
          padding: 16px 24px !important;
          border-top: 1px solid #e4e6eb !important;
        }

        /* 统一 Alert 警告提示样式 */
        .el-alert {
          --el-alert-border-radius-i: var(--el-border-radius-base) !important;
          border: 1px solid transparent !important;
        }
        .el-alert--success.is-light {
          background-color: ${successLight9.value} !important;
          border-color: ${successLight3.value} !important;
          color: ${successDark2.value} !important;
        }
        .el-alert--info.is-light {
          background-color: \${theme.colors.primary}15 !important;
          border-color: \${theme.colors.primary}80 !important;
          color: \${theme.colors.primary} !important;
        }
        .el-alert--warning.is-light {
          background-color: ${warningLight9.value} !important;
          border-color: ${warningLight3.value} !important;
          color: ${warningDark2.value} !important;
        }
        .el-alert--error.is-light {
          background-color: ${dangerLight9.value} !important;
          border-color: ${dangerLight3.value} !important;
          color: ${dangerDark2.value} !important;
        }

        /* 统一 Message 消息及 Notification 通知样式 */
        .el-message {
          --el-message-border-radius: var(--el-border-radius-base) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
        .el-notification {
          --el-notification-border-radius: var(--el-border-radius-base) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
      \`
        }
    ],
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    }
})
`;
});

// 一键复制
const copyGeneratedConfig = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(generatedConfig.value)
      .then(() => {
        triggerAction('主题配置代码已成功复制到剪贴板！');
      });
  }
};
</script>

<style scoped>
/* 局部深度重写样式，将右侧组件的特定变量直接与预览区父容器的 style 变量映射相绑定，避免干扰库中其他页面的默认风格 */
.preview-area-container :deep([class^="el-"]),
.preview-area-container :deep([class*=" el-"]) {
  font-family: Inter, 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif !important;
}
.preview-area-container :deep(.el-button) {
  --el-button-border-radius: var(--el-border-radius-base);
}
.preview-area-container :deep(.el-button--small) {
  --el-button-border-radius: var(--el-border-radius-base);
}
.preview-area-container :deep(.el-button--large) {
  --el-button-border-radius: var(--el-border-radius-base);
}
.preview-area-container :deep(.el-input),
.preview-area-container :deep(.el-select),
.preview-area-container :deep(.el-textarea) {
  --el-input-border-radius: var(--el-border-radius-base) !important;
}
.preview-area-container :deep(.el-table) {
  --el-table-border-color: #e4e6eb !important;
  --el-table-header-bg-color: #f5f5f5 !important;
  --el-table-row-hover-bg-color: rgba(0, 47, 167, 0.04) !important;
}
.preview-area-container :deep(.el-collapse) {
  border-top: 1px solid #e4e6eb !important;
  border-bottom: 1px solid #e4e6eb !important;
}
.preview-area-container :deep(.el-collapse-item__header) {
  font-weight: bold !important;
  color: #060B14 !important;
}
.preview-area-container :deep(.el-alert) {
  --el-alert-border-radius-i: var(--el-border-radius-base) !important;
  border: 1px solid transparent !important;
}
.preview-area-container :deep(.el-alert--success.is-light) {
  background-color: var(--el-color-success-light-9) !important;
  border-color: var(--el-color-success-light-3) !important;
  color: var(--el-color-success-dark-2) !important;
}
.preview-area-container :deep(.el-alert--info.is-light) {
  background-color: var(--el-color-primary-light-9) !important;
  border-color: var(--el-color-primary-light-7) !important;
  color: var(--el-color-primary) !important;
}
.preview-area-container :deep(.el-alert--warning.is-light) {
  background-color: var(--el-color-warning-light-9) !important;
  border-color: var(--el-color-warning-light-3) !important;
  color: var(--el-color-warning-dark-2) !important;
}
.preview-area-container :deep(.el-alert--error.is-light) {
  background-color: var(--el-color-danger-light-9) !important;
  border-color: var(--el-color-danger-light-3) !important;
  color: var(--el-color-danger-dark-2) !important;
}

/* Toast 反馈 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
</style>
