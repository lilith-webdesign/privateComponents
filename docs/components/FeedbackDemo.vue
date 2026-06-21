<template>
  <div class="feedback-demo-root space-y-8 text-slate-800 dark:text-slate-200">
    <!-- Toast 反馈提示（用于非原生提示的辅助反馈） -->
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-lg border border-slate-700/30 dark:border-slate-200/50 flex items-center gap-2 z-50">
        <span class="i-ep-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></span>
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>

    <!-- 1. Alert 警告提示 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Alert 警告提示
        </h3>
        <button @click="toggleCode('alert')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.alert ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.alert ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">通过全局 CSS 覆写，将 4 种类型警告的底色、文字色、边框与圆角完美统一，消除原有刺眼的默认底色。</p>

      <div class="space-y-4 py-2">
        <el-alert title="常规提示：系统已成功连接防汛大数据平台中心。" type="info" show-icon :closable="false" />
        <el-alert title="成功状态：今日全网排涝设施运行状态检查已圆满通过。" type="success" show-icon :closable="false" />
        <el-alert title="警告状态：大坝水位监控点 02 即将触及设定的安全橙色警戒水位线。" type="warning" show-icon />
        <el-alert title="错误/异常状态：检测到下游一号水闸闸门开度反馈异常，请排查线路连接。" type="error" show-icon />
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.alert" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('alert')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 提示 --&gt;
&lt;el-alert title="提示内容" type="info" show-icon :closable="false" /&gt;

&lt;!-- 成功 --&gt;
&lt;el-alert title="成功内容" type="success" show-icon :closable="false" /&gt;

&lt;!-- 警告 --&gt;
&lt;el-alert title="警告内容" type="warning" show-icon /&gt;

&lt;!-- 错误 --&gt;
&lt;el-alert title="错误内容" type="error" show-icon /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 2. Dialog 对话框 & Drawer 抽屉 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Dialog 对话框 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Dialog 对话框
          </h3>
          <button @click="toggleCode('dialog')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.dialog ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.dialog ? '代码' : '代码' }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mb-4">弹窗头部与底部统一增加细分割线，标题加粗，圆角保持全局的 4px。</p>

        <div class="py-3">
          <el-button type="primary" @click="dialogVisible = true">打开预警监控配置</el-button>
        </div>

        <el-dialog v-model="dialogVisible" title="水利防汛监控预警配置" width="500">
          <div class="space-y-4">
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              您当前正在调整大坝水位阈值的通知参数。保存后此策略将立即下发至各个前端网关设备，在超过阈值时自动下发告警。
            </p>
            <div class="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
              <strong>提示：</strong> 默认常规警戒水位为 78.50 米，溢洪限制水位为 81.20 米。
            </div>
          </div>
          <template #footer>
            <div class="flex justify-end gap-3">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="confirmDialog">保存配置</el-button>
            </div>
          </template>
        </el-dialog>

        <Transition name="slide-fade">
          <div v-if="showCode.dialog" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('dialog')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 原生 Dialog 结构 --&gt;
&lt;el-dialog v-model="dialogVisible" title="预警配置" width="500"&gt;
  &lt;div&gt;主体内容...&lt;/div&gt;
  &lt;template #footer&gt;
    &lt;el-button @click="dialogVisible = false"&gt;取消&lt;/el-button&gt;
    &lt;el-button type="primary" @click="save"&gt;保存&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-dialog&gt;</code></pre>
          </div>
        </Transition>
      </div>

      <!-- Drawer 抽屉 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Drawer 抽屉
          </h3>
          <button @click="toggleCode('drawer')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.drawer ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.drawer ? '代码' : '代码' }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mb-4">抽屉侧边栏，其页头与页脚具有细线分割，完美还原设计图面板风格。</p>

        <div class="py-3">
          <el-button type="primary" @click="drawerVisible = true">打开实时监测看板</el-button>
        </div>

        <el-drawer v-model="drawerVisible" title="大坝监测站实时看板" direction="rtl" size="400">
          <div class="space-y-4 text-xs text-slate-600 dark:text-slate-400">
            <div class="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span>当前库水位：</span>
              <span class="font-bold text-[#002FA7]">76.45 m</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span>实时蓄水量：</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">12.54 万 m³</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span>出库流量：</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">14.50 m³/s</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span>渗漏量状况：</span>
              <span class="text-emerald-500 font-bold">无渗漏 (正常)</span>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-end gap-3">
              <el-button @click="drawerVisible = false">关闭</el-button>
              <el-button type="primary" @click="confirmDrawer">一键重载数据</el-button>
            </div>
          </template>
        </el-drawer>

        <Transition name="slide-fade">
          <div v-if="showCode.drawer" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('drawer')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 原生 Drawer 结构 --&gt;
&lt;el-drawer v-model="drawerVisible" title="监测看板" size="400"&gt;
  &lt;div&gt;主体内容...&lt;/div&gt;
  &lt;template #footer&gt;
    &lt;el-button @click="drawerVisible = false"&gt;关闭&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-drawer&gt;</code></pre>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 3. MessageBox 弹框 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          MessageBox 弹框
        </h3>
        <button @click="toggleCode('messagebox')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.messagebox ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.messagebox ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">通过原生 `ElMessageBox` 弹出系统警告确认框、输入弹窗，外观配置与原生 Dialog 高度一致。</p>

      <div class="flex flex-wrap items-center gap-4 py-2">
        <el-button @click="openMsgAlert">Alert 提示弹窗</el-button>
        <el-button type="warning" @click="openMsgConfirm">Confirm 确认弹窗</el-button>
        <el-button type="primary" @click="openMsgPrompt">Prompt 输入弹窗</el-button>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.messagebox" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('messagebox')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 原生 ElMessageBox 指令化调用 --&gt;
ElMessageBox.alert('您当前正在调整大坝水位阈值的通知参数。', '系统提示');

ElMessageBox.confirm('此操作将永久重置测站历史数据，是否继续？', '警告', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
});

ElMessageBox.prompt('请输入新建水利测站的别名：', '别名配置', {
  confirmButtonText: '确认',
  cancelButtonText: '取消',
});</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 4. Message 消息提示 & Notification 通知 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Message 消息提示 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Message 消息提示
          </h3>
          <button @click="toggleCode('message')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.message ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.message ? '代码' : '代码' }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mb-4">全局消息提示，支持成功、提示、警告、错误 4 种类型。</p>

        <div class="flex flex-wrap items-center gap-3 py-3">
          <el-button @click="triggerMessage('info')">提示消息</el-button>
          <el-button type="success" @click="triggerMessage('success')">成功消息</el-button>
          <el-button type="warning" @click="triggerMessage('warning')">警告消息</el-button>
          <el-button type="danger" @click="triggerMessage('error')">错误消息</el-button>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.message" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('message')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 原生 ElMessage 消息调用 --&gt;
ElMessage({
  message: '数据拉取已完成。',
  type: 'success',
});

ElMessage.warning('检测到网络延迟，正在重试连接...');</code></pre>
          </div>
        </Transition>
      </div>

      <!-- Notification 通知 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Notification 通知
          </h3>
          <button @click="toggleCode('notification')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.notification ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.notification ? '代码' : '代码' }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mb-4">全局悬浮侧边通知，支持带状态图标和辅助文本的长消息推送。</p>

        <div class="flex flex-wrap items-center gap-3 py-3">
          <el-button @click="triggerNotification('info')">提示通知</el-button>
          <el-button type="success" @click="triggerNotification('success')">成功通知</el-button>
          <el-button type="warning" @click="triggerNotification('warning')">警告通知</el-button>
          <el-button type="danger" @click="triggerNotification('error')">错误通知</el-button>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.notification" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('notification')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 原生 ElNotification 指令调用 --&gt;
ElNotification({
  title: '水防安全通告',
  message: '下游渠道排积已顺利通过，可按常规预警响应降级。',
  type: 'success',
});</code></pre>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 5. Popconfirm 气泡确认框 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Popconfirm 气泡确认框
        </h3>
        <button @click="toggleCode('popconfirm')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.popconfirm ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.popconfirm ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">挂载在原生按钮上的气泡交互确认，自带警告图标与规范的按钮规格。</p>

      <div class="py-3 pl-1">
        <el-popconfirm title="您确定要删除此条实时水文监控数据吗？" confirm-button-text="确定删除" cancel-button-text="取消" @confirm="triggerAction('已确认删除此条数据')">
          <template #reference>
            <el-button type="danger">删除数据项</el-button>
          </template>
        </el-popconfirm>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.popconfirm" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('popconfirm')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 原生 Popconfirm 组件结构 --&gt;
&lt;el-popconfirm
  title="您确定要删除此条数据吗？"
  confirm-button-text="确定删除"
  cancel-button-text="取消"
  @confirm="handleConfirm"
&gt;
  &lt;template #reference&gt;
    &lt;el-button type="danger"&gt;删除数据项&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popconfirm&gt;</code></pre>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

// Toast 状态反馈
const toasts = ref([]);
let toastIdCounter = 0;

const triggerAction = (text) => {
  const id = toastIdCounter++;
  toasts.value.push({ id, text });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 2200);
};

// 交互组件控制
const dialogVisible = ref(false);
const drawerVisible = ref(false);

const confirmDialog = () => {
  dialogVisible.value = false;
  triggerAction('水位预警配置保存成功！');
};

const confirmDrawer = () => {
  drawerVisible.value = false;
  triggerAction('正在重新拉取大坝监测站水文数据...');
};

// MessageBox 调用交互
const openMsgAlert = () => {
  ElMessageBox.alert('您当前正在调整大坝水位阈值的通知参数。保存后此策略将立即下发至各个前端网关设备。', '系统安全警告');
};

const openMsgConfirm = () => {
  ElMessageBox.confirm('此操作将永久清除大坝监控站的所有历史波形记录，数据清除后不可恢复，是否继续？', '危险警告', {
    confirmButtonText: '确定重置',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('历史数据已成功清空并重置归档。');
  }).catch(() => {
    ElMessage.info('已取消重置操作。');
  });
};

const openMsgPrompt = () => {
  ElMessageBox.prompt('请输入要调整到的最大过闸流量上限值（单位：m³/s）：', '出水流量阈值配置', {
    confirmButtonText: '保存并生效',
    cancelButtonText: '取消',
    inputPattern: /^[0-9]+$/,
    inputErrorMessage: '流量值格式必须为正整数',
  }).then(({ value }) => {
    ElMessage.success(`最大流量上限已调整为: ${value} m³/s`);
  }).catch(() => {
    ElMessage.info('已取消输入。');
  });
};

// Message 动态触发
const triggerMessage = (type) => {
  const messages = {
    info: '系统连接防汛大数据平台中心正常。',
    success: '全网水利排涝系统自检已全部通过。',
    warning: '当前库区二号测站水位已越过警戒警示线。',
    error: '注意：水泵运行负荷过高导致通讯暂时受阻。'
  };
  ElMessage({
    message: messages[type],
    type: type,
  });
};

// Notification 动态触发
const triggerNotification = (type) => {
  const config = {
    info: {
      title: '防汛业务公告',
      message: '今日下午14:00起将开展下游干流闸门联合启闭自检，请注意蓄水变动。'
    },
    success: {
      title: '大坝安全简报',
      message: '经多方联动排查，前期出现的坝体渗漏疑点已彻底排除，结构鉴定为绝对安全。'
    },
    warning: {
      title: '水位越线告警',
      message: '南门水库监测站水位超出主防汛警戒值 0.3 米，目前已安排应急排涝开泵工作。'
    },
    error: {
      title: '设备通信中断',
      message: '监测网关 04 发生致命通讯故障，导致下辖 3 个降雨点位数据丢失，请专人赶往排查。'
    }
  };
  ElNotification({
    title: config[type].title,
    message: config[type].message,
    type: type,
  });
};

// 交互代码框折叠控制
const showCode = ref({
  alert: false,
  dialog: false,
  drawer: false,
  messagebox: false,
  message: false,
  notification: false,
  popconfirm: false
});

const toggleCode = (key) => {
  showCode.value[key] = !showCode.value[key];
};

// 复制代码块逻辑
const copyCode = (key) => {
  const codes = {
    alert: `<el-alert title="常规提示" type="info" show-icon :closable="false" />\n<el-alert title="成功状态" type="success" show-icon :closable="false" />\n<el-alert title="警告状态" type="warning" show-icon />\n<el-alert title="错误状态" type="error" show-icon />`,
    dialog: `<el-dialog v-model="dialogVisible" title="水利防汛监控预警配置" width="500">\n  <div>预警配置内容...</div>\n  <template #footer>\n    <el-button @click="dialogVisible = false">取消</el-button>\n    <el-button type="primary" @click="confirmDialog">保存配置</el-button>\n  </template>\n</el-dialog>`,
    drawer: `<el-drawer v-model="drawerVisible" title="实时监测看板" size="400">\n  <div>实时水情看板内容...</div>\n  <template #footer>\n    <el-button @click="drawerVisible = false">关闭</el-button>\n  </template>\n</el-drawer>`,
    messagebox: `ElMessageBox.alert('您当前正在调整大坝水位阈值参数。', '系统提示');\n\nElMessageBox.confirm('是否重置历史数据？', '警告', {\n  confirmButtonText: '确定',\n  cancelButtonText: '取消',\n  type: 'warning'\n});`,
    message: `ElMessage.success('水利排涝系统自检全部通过。');\n\nElMessage.error('通讯暂时受阻。');`,
    notification: `ElNotification({\n  title: '大坝安全简报',\n  message: '渗漏隐患已排除，大坝结构安全。',\n  type: 'success'\n});`,
    popconfirm: `<el-popconfirm title="您确定要删除此条实时水文监控数据吗？" confirm-button-text="确定删除" cancel-button-text="取消" @confirm="triggerAction('删除')">\n  <template #reference>\n    <el-button type="danger">删除数据项</el-button>\n  </template>\n</el-popconfirm>`
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(codes[key])
      .then(() => {
        triggerAction('代码已复制到剪贴板！');
      });
  }
};
</script>

<style scoped>
/* 动效 */
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
