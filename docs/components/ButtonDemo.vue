<template>
  <div class="button-demo-root space-y-8 text-slate-800 dark:text-slate-200">
    <!-- Toast 通知浮层 -->
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-lg border border-slate-700/30 dark:border-slate-200/50 flex items-center gap-2 z-50">
        <span class="i-ep-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></span>
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>

    <!-- 返回顶部全局实装 -->
    <el-backtop :right="40" :bottom="40">
      <div class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
        <span class="i-ep-caret-top text-xl text-blue-600 dark:text-blue-400"></span>
      </div>
    </el-backtop>
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          主要按钮 (Primary Button)
        </h3>
        <button @click="toggleCode('primary')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.primary ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.primary ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">通过修改全局主题 CSS 变量（`--el-color-primary`等）完成改色，高度和尺寸自动由 Element Plus 托管，无需写死高度。</p>

      <div class="flex flex-col gap-6 py-2">
        <!-- 基础状态 -->
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-start gap-1.5">
            <el-button type="primary" @click="triggerAction('主要按钮')">主要按钮</el-button>
            <span class="text-[10px] text-slate-400 font-mono">标准状态 (默认圆角)</span>
          </div>

          <div class="flex flex-col items-start gap-1.5">
            <el-button type="primary" disabled>主要按钮</el-button>
            <span class="text-[10px] text-slate-400 font-mono">禁用状态: disabled</span>
          </div>

          <div class="flex flex-col items-start gap-1.5">
            <el-button type="primary" @click="triggerAction('带图标的保存按钮')">
              <span class="i-ep-document-checked mr-1.5 text-sm"></span>
              <span>保存</span>
            </el-button>
            <span class="text-[10px] text-slate-400 font-mono">带前置图标</span>
          </div>
        </div>

        <!-- 规格尺寸 -->
        <div class="flex flex-wrap items-center gap-6 border-t border-slate-100 dark:border-slate-800/60 pt-4">
          <div class="flex flex-col items-start gap-1.5">
            <el-button type="primary" size="large" @click="triggerAction('大尺寸按钮')">大按钮 (Large)</el-button>
            <span class="text-[10px] text-slate-400 font-mono">大尺寸 (Large, H-40px)</span>
          </div>

          <div class="flex flex-col items-start gap-1.5">
            <el-button type="primary" @click="triggerAction('默认尺寸按钮')">中按钮 (Default)</el-button>
            <span class="text-[10px] text-slate-400 font-mono">默认/中尺寸 (Default, H-32px)</span>
          </div>

          <div class="flex flex-col items-start gap-1.5">
            <el-button type="primary" size="small" @click="triggerAction('小尺寸按钮')">小按钮 (Small)</el-button>
            <span class="text-[10px] text-slate-400 font-mono">小尺寸 (Small, H-24px)</span>
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.primary" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('primary')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础用法 --&gt;
&lt;el-button type="primary"&gt;主要按钮&lt;/el-button&gt;
&lt;el-button type="primary" disabled&gt;主要按钮&lt;/el-button&gt;
&lt;el-button type="primary"&gt;
  &lt;span class="i-ep-document-checked mr-1.5"&gt;&lt;/span&gt;
  &lt;span&gt;保存&lt;/span&gt;
&lt;/el-button&gt;

&lt;!-- 尺寸规格 (圆角统一为 4px) --&gt;
&lt;el-button type="primary" size="large"&gt;大按钮&lt;/el-button&gt;
&lt;el-button type="primary"&gt;中按钮&lt;/el-button&gt;
&lt;el-button type="primary" size="small"&gt;小按钮&lt;/el-button&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 2. Button Types 按钮类型分类 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-slate-700 rounded"></span>
          按钮类型分类 (Button Types)
        </h3>
        <button @click="toggleCode('types')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.types ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.types ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">次要描边按钮采用 Element 默认不设 type 的样式，文字按钮使用 `link` 属性。</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        <!-- 描边次要按钮 -->
        <div>
          <h4 class="text-xs font-bold text-slate-500 mb-3 font-mono">次要按钮 (Secondary Outline)</h4>
          <div class="flex flex-wrap items-center gap-3">
            <el-button @click="triggerAction('次要按钮')">次要按钮</el-button>
            <el-button disabled>禁用</el-button>
          </div>
        </div>

        <!-- 文字按钮 -->
        <div>
          <h4 class="text-xs font-bold text-slate-500 mb-3 font-mono">文字按钮 (Text Link Button)</h4>
          <div class="flex flex-wrap items-center gap-4">
            <el-button link type="primary" @click="triggerAction('文字按钮')">文字按钮</el-button>
            <el-button link type="primary" disabled>禁用</el-button>
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.types" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('types')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 次要描边按钮 --&gt;
&lt;el-button&gt;次要按钮&lt;/el-button&gt;
&lt;el-button disabled&gt;禁用&lt;/el-button&gt;

&lt;!-- 文字链接按钮 --&gt;
&lt;el-button link type="primary"&gt;文字按钮&lt;/el-button&gt;
&lt;el-button link type="primary" disabled&gt;禁用&lt;/el-button&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 3. Status Buttons 状态类型按钮 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-rose-500 rounded"></span>
          状态类型按钮 (Status Buttons)
        </h3>
        <button @click="toggleCode('status')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.status ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.status ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `danger`、`success`、`warning` 属性，轻量级禁用使用 `plain disabled` 属性组合。</p>

      <div class="space-y-4 py-2">
        <!-- 错误/危险 -->
        <div class="flex items-center gap-6">
          <span class="w-16 text-[11px] font-mono text-slate-400">错误/危险:</span>
          <div class="flex items-center gap-3">
            <el-button type="danger" @click="triggerAction('危险操作')">危险操作</el-button>
            <el-button type="danger" plain disabled>轻量禁用</el-button>
          </div>
        </div>

        <!-- 成功 -->
        <div class="flex items-center gap-6">
          <span class="w-16 text-[11px] font-mono text-slate-400">成功:</span>
          <div class="flex items-center gap-3">
            <el-button type="success" @click="triggerAction('成功提交')">成功提交</el-button>
            <el-button type="success" plain disabled>轻量禁用</el-button>
          </div>
        </div>

        <!-- 警告 -->
        <div class="flex items-center gap-6">
          <span class="w-16 text-[11px] font-mono text-slate-400">警告:</span>
          <div class="flex items-center gap-3">
            <el-button type="warning" @click="triggerAction('警示提示')">警示提示</el-button>
            <el-button type="warning" plain disabled>轻量禁用</el-button>
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.status" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('status')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 危险/错误按钮 --&gt;
&lt;el-button type="danger"&gt;危险操作&lt;/el-button&gt;
&lt;el-button type="danger" plain disabled&gt;轻量禁用&lt;/el-button&gt;

&lt;!-- 成功按钮 --&gt;
&lt;el-button type="success"&gt;成功提交&lt;/el-button&gt;
&lt;el-button type="success" plain disabled&gt;轻量禁用&lt;/el-button&gt;

&lt;!-- 警告按钮 --&gt;
&lt;el-button type="warning"&gt;警示提示&lt;/el-button&gt;
&lt;el-button type="warning" plain disabled&gt;轻量禁用&lt;/el-button&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 5. Icons & Badges & Tags & BackTop -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 图标按钮 & 徽标 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-teal-500 rounded"></span>
            图标与徽标 (Icons & Badges)
          </h3>
          <button @click="toggleCode('icons')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.icons ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.icons ? '代码' : '代码' }}
          </button>
        </div>

        <div class="space-y-6 py-2">
          <!-- 图标按钮 -->
          <div>
            <h4 class="text-xs font-bold text-slate-500 mb-3 font-mono">圆形图标按钮 (Circular Icons)</h4>
            <div class="flex items-center gap-4">
              <el-button circle @click="triggerAction('搜索动作')">
                <span class="i-ep-search text-base"></span>
              </el-button>
              <el-button type="danger" circle @click="triggerAction('下载文件动作')">
                <span class="i-ep-download text-base"></span>
              </el-button>
              <el-button type="primary" circle @click="triggerAction('添加项目动作')">
                <span class="i-ep-plus text-base"></span>
              </el-button>
            </div>
          </div>

          <!-- 徽标数 -->
          <div>
            <h4 class="text-xs font-bold text-slate-500 mb-3 font-mono">徽标数 / 小红点 (El-Badge)</h4>
            <div class="flex items-center gap-8">
              <!-- 数字徽标 -->
              <el-badge :value="5" class="item">
                <el-button>消息箱</el-button>
              </el-badge>

              <!-- 红点 -->
              <el-badge is-dot class="item">
                <el-button>通知</el-button>
              </el-badge>
            </div>
          </div>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.icons" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('icons')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 圆形按钮 --&gt;
&lt;el-button circle&gt;&lt;span class="i-ep-search"&gt;&lt;/span&gt;&lt;/el-button&gt;

&lt;!-- 徽标消息箱 --&gt;
&lt;el-badge :value="5"&gt;
  &lt;el-button&gt;消息箱&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;!-- 红点通知 --&gt;
&lt;el-badge is-dot&gt;
  &lt;el-button&gt;通知&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
          </div>
        </Transition>
      </div>

      <!-- 标签与辅助组件 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-indigo-500 rounded"></span>
            标签与辅助组件 (Tags & BackTop)
          </h3>
          <button @click="toggleCode('tags')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.tags ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.tags ? '代码' : '代码' }}
          </button>
        </div>

        <div class="space-y-6 py-2">
          <!-- 标签 -->
          <div>
            <h4 class="text-xs font-bold text-slate-500 mb-3 font-mono">Tag 标签 (使用 El-Tag，支持关闭)</h4>
            <div class="flex flex-wrap items-center gap-2">
              <TransitionGroup name="tag">
                <el-tag 
                  v-for="tag in activeTags" 
                  :key="tag.type" 
                  :type="tag.type" 
                  closable 
                  @close="removeTag(tag)"
                >
                  {{ tag.name }}
                </el-tag>
              </TransitionGroup>
              <button v-if="activeTags.length === 0" @click="resetTags" class="text-xs text-blue-500 hover:underline">重置标签</button>
            </div>
          </div>

          <!-- 返回顶部说明 -->
          <div>
            <h4 class="text-xs font-bold text-slate-500 mb-3 font-mono">BackTop 返回顶部按钮</h4>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-950/20">
                <span class="i-ep-caret-top text-xl text-slate-400"></span>
              </div>
              <span class="text-xs text-slate-400">页面下滑时右下角会出现悬浮返回顶部按钮，支持平滑滚动。</span>
            </div>
          </div>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.tags" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('tags')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- El-Tag 标签 --&gt;
&lt;el-tag closable type="primary"&gt;标签&lt;/el-tag&gt;
&lt;el-tag closable type="success"&gt;标签&lt;/el-tag&gt;

&lt;!-- El-Backtop 全局返回顶部 --&gt;
&lt;el-backtop :right="40" :bottom="40" /&gt;</code></pre>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Toast 通知
const toasts = ref([]);
let toastIdCounter = 0;

const triggerAction = (actionName) => {
  const id = toastIdCounter++;
  toasts.value.push({ id, text: `触发操作: ${actionName}` });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 2200);
};

const showCode = ref({
  primary: false,
  types: false,
  status: false,
  icons: false,
  tags: false
});

const toggleCode = (key) => {
  showCode.value[key] = !showCode.value[key];
};

const copyCode = (key) => {
  const codes = {
    primary: `<el-button type="primary">主要按钮</el-button>\n<el-button type="primary" disabled>主要按钮</el-button>\n<el-button type="primary">\n  <span class="i-ep-document-checked mr-1.5"></span>\n  <span>保存</span>\n</el-button>\n\n<!-- 尺寸规格 -->\n<el-button type="primary" size="large">大按钮</el-button>\n<el-button type="primary">中按钮</el-button>\n<el-button type="primary" size="small">小按钮</el-button>`,
    types: `<el-button>次要按钮</el-button>\n<el-button disabled>禁用</el-button>\n\n<el-button link type="primary">文字按钮</el-button>\n<el-button link type="primary" disabled>禁用</el-button>`,
    status: `<el-button type="danger">危险操作</el-button>\n<el-button type="danger" plain disabled>轻量禁用</el-button>\n\n<el-button type="success">成功提交</el-button>\n<el-button type="success" plain disabled>轻量禁用</el-button>\n\n<el-button type="warning">警示提示</el-button>\n<el-button type="warning" plain disabled>轻量禁用</el-button>`,
    icons: `<el-button circle><span class="i-ep-search"></span></el-button>`,
    tags: `<el-tag closable type="primary">标签</el-tag>`
  };
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codes[key])
      .then(() => {
        triggerAction('代码已复制到剪贴板！');
      });
  }
};

const defaultTags = [
  { name: '标签', type: 'info' },
  { name: '标签', type: 'success' },
  { name: '标签', type: 'warning' },
  { name: '标签', type: 'danger' }
];
const activeTags = ref([...defaultTags]);

const removeTag = (tag) => {
  activeTags.value = activeTags.value.filter(t => t.type !== tag.type);
  triggerAction(`移除了 ${tag.type} 类型的标签`);
};

const resetTags = () => {
  activeTags.value = [...defaultTags];
  triggerAction('已重置所有标签');
};
</script>

<style scoped>
/* 动效过渡 */
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

.tag-enter-active,
.tag-leave-active {
  transition: all 0.2s ease;
}
.tag-enter-from,
.tag-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
