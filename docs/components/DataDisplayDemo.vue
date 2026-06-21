<template>
  <div class="data-display-demo-root space-y-8 text-slate-800 dark:text-slate-200">
    <!-- Toast 提示 -->
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-lg border border-slate-700/30 dark:border-slate-200/50 flex items-center gap-2 z-50">
        <span class="i-ep-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></span>
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>

    <!-- 1. Avatar 头像 & Badge 徽标数 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Avatar 头像 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Avatar 头像
          </h3>
          <button @click="toggleCode('avatar')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.avatar ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.avatar ? '代码' : '代码' }}
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-6 py-2">
          <div class="flex flex-col items-center gap-1">
            <el-avatar :size="40" icon="i-ep-user" />
            <span class="text-[9px] text-slate-400 font-mono">默认/圆</span>
          </div>

          <div class="flex flex-col items-center gap-1">
            <el-avatar shape="square" :size="40" icon="i-ep-user" />
            <span class="text-[9px] text-slate-400 font-mono">方形 (4px圆角)</span>
          </div>

          <div class="flex flex-col items-center gap-1">
            <el-avatar :size="40">水利</el-avatar>
            <span class="text-[9px] text-slate-400 font-mono">文字</span>
          </div>

          <div class="flex flex-col items-center gap-1">
            <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span class="text-[9px] text-slate-400 font-mono">图片</span>
          </div>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.avatar" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('avatar')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 圆形头像 --&gt;
&lt;el-avatar icon="i-ep-user" /&gt;

&lt;!-- 方形头像 (圆角继承全局 4px) --&gt;
&lt;el-avatar shape="square" icon="i-ep-user" /&gt;

&lt;!-- 文字头像 --&gt;
&lt;el-avatar&gt;水利&lt;/el-avatar&gt;</code></pre>
          </div>
        </Transition>
      </div>

      <!-- Badge 徽标数 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Badge 徽标数
          </h3>
          <button @click="toggleCode('badge')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.badge ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.badge ? '代码' : '代码' }}
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-8 py-3">
          <el-badge :value="12" class="item">
            <el-button size="small">未读消息</el-button>
          </el-badge>

          <el-badge :value="99" :max="10" class="item">
            <el-button size="small">告警上限</el-button>
          </el-badge>

          <el-badge is-dot class="item">
            <span class="text-xs text-slate-500 font-medium">系统通知</span>
          </el-badge>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.badge" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('badge')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 数字徽标 --&gt;
&lt;el-badge :value="12"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;!-- 限制最大值展示 --&gt;
&lt;el-badge :value="99" :max="10"&gt;
  &lt;el-button&gt;告警&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;!-- 小红点通知 --&gt;
&lt;el-badge is-dot&gt;通知&lt;/el-badge&gt;</code></pre>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 2. Tag 标签 & Tooltip 文字提示 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Tag 标签 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Tag 标签
          </h3>
          <button @click="toggleCode('tag')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.tag ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.tag ? '代码' : '代码' }}
          </button>
        </div>

        <div class="space-y-4 py-2">
          <!-- 状态色 -->
          <div class="flex flex-wrap items-center gap-2">
            <el-tag>常规标签</el-tag>
            <el-tag type="success">成功状态</el-tag>
            <el-tag type="warning">警告状态</el-tag>
            <el-tag type="danger">危险状态</el-tag>
          </div>

          <!-- 规格与可关闭 -->
          <div class="flex flex-wrap items-center gap-2">
            <el-tag size="large" closable @close="triggerAction('关闭了大标签')">大规格标签 (Large)</el-tag>
            <el-tag closable @close="triggerAction('关闭了默认标签')">默认规格</el-tag>
            <el-tag size="small" closable @close="triggerAction('关闭了小标签')">小规格 (Small)</el-tag>
          </div>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.tag" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('tag')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 状态类型标签 --&gt;
&lt;el-tag type="success"&gt;成功&lt;/el-tag&gt;
&lt;el-tag type="danger"&gt;危险&lt;/el-tag&gt;

&lt;!-- 尺寸规格与可关闭 (圆角继承全局 4px) --&gt;
&lt;el-tag size="large" closable&gt;大规格&lt;/el-tag&gt;
&lt;el-tag size="small" closable&gt;小规格&lt;/el-tag&gt;</code></pre>
          </div>
        </Transition>
      </div>

      <!-- Tooltip 文字提示 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Tooltip 文字提示
          </h3>
          <button @click="toggleCode('tooltip')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.tooltip ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.tooltip ? '代码' : '代码' }}
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-4 py-3">
          <el-tooltip content="这是上方气泡提示" placement="top">
            <el-button size="small">上方提示</el-button>
          </el-tooltip>

          <el-tooltip content="这是下方气泡提示" placement="bottom">
            <el-button size="small">下方提示</el-button>
          </el-tooltip>

          <el-tooltip content="暗色背景主题" effect="dark" placement="left">
            <el-button size="small">左侧暗色</el-button>
          </el-tooltip>

          <el-tooltip content="亮色背景主题" effect="light" placement="right">
            <el-button size="small">右侧亮色</el-button>
          </el-tooltip>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.tooltip" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('tooltip')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 顶部常规文字提示 --&gt;
&lt;el-tooltip content="提示内容" placement="top"&gt;
  &lt;el-button&gt;上方提示&lt;/el-button&gt;
&lt;/el-tooltip&gt;

&lt;!-- 亮色底气泡提示 --&gt;
&lt;el-tooltip content="亮色气泡" effect="light" placement="right"&gt;
  &lt;el-button&gt;右侧亮色&lt;/el-button&gt;
&lt;/el-tooltip&gt;</code></pre>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 3. Popover 气泡卡片 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Popover 气泡卡片 (12 种方向方位展示)
        </h3>
        <button @click="toggleCode('popover')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.popover ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.popover ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">通过悬浮/点击触发 12 个不同方位的气泡卡片弹出，内部信息流布局自适应，风格高度统一。</p>

      <!-- 12 宫格按钮布局 -->
      <div class="mx-auto max-w-2xl py-4 flex flex-col items-center gap-4">
        <!-- Top 行 -->
        <div class="flex items-center gap-3">
          <el-popover placement="top-start" title="上左方向" :width="200" trigger="hover" content="这里是 top-start 弹出的详细业务数据。">
            <template #reference><el-button size="small">TL</el-button></template>
          </el-popover>
          <el-popover placement="top" title="上中方向" :width="200" trigger="hover" content="这里是 top 正上方弹出的信息内容。">
            <template #reference><el-button size="small">Top</el-button></template>
          </el-popover>
          <el-popover placement="top-end" title="上右方向" :width="200" trigger="hover" content="这里是 top-end 正上偏右弹出的卡片。">
            <template #reference><el-button size="small">TR</el-button></template>
          </el-popover>
        </div>

        <!-- Middle 行 (Left & Right) -->
        <div class="flex items-center gap-32">
          <div class="flex flex-col gap-3">
            <el-popover placement="left-start" title="左上方向" :width="200" trigger="hover" content="这里是 left-start 左上偏上弹出的卡片。">
              <template #reference><el-button size="small">LT</el-button></template>
            </el-popover>
            <el-popover placement="left" title="左中方向" :width="200" trigger="hover" content="这里是 left 正左偏中弹出的详细数据。">
              <template #reference><el-button size="small">Left</el-button></template>
            </el-popover>
            <el-popover placement="left-end" title="左右方向" :width="200" trigger="hover" content="这里是 left-end 左下偏底弹出的卡片。">
              <template #reference><el-button size="small">LB</el-button></template>
            </el-popover>
          </div>

          <div class="flex flex-col gap-3">
            <el-popover placement="right-start" title="右上方向" :width="200" trigger="hover" content="这里是 right-start 右侧偏上弹出的卡片。">
              <template #reference><el-button size="small">RT</el-button></template>
            </el-popover>
            <el-popover placement="right" title="右中方向" :width="200" trigger="hover" content="这里是 right 正右偏中弹出的详细数据。">
              <template #reference><el-button size="small">Right</el-button></template>
            </el-popover>
            <el-popover placement="right-end" title="右下方向" :width="200" trigger="hover" content="这里是 right-end 右下偏底弹出的卡片。">
              <template #reference><el-button size="small">RB</el-button></template>
            </el-popover>
          </div>
        </div>

        <!-- Bottom 行 -->
        <div class="flex items-center gap-3">
          <el-popover placement="bottom-start" title="下左方向" :width="200" trigger="hover" content="这里是 bottom-start 底部偏左侧弹出的详细内容。">
            <template #reference><el-button size="small">BL</el-button></template>
          </el-popover>
          <el-popover placement="bottom" title="下中方向" :width="200" trigger="hover" content="这里是 bottom 正下方弹出的基本信息。">
            <template #reference><el-button size="small">Bottom</el-button></template>
          </el-popover>
          <el-popover placement="bottom-end" title="下右方向" :width="200" trigger="hover" content="这里是 bottom-end 底部偏右侧弹出的详细内容。">
            <template #reference><el-button size="small">BR</el-button></template>
          </el-popover>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.popover" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('popover')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 12 种方向的 Popover 使用示例 --&gt;
&lt;el-popover placement="top-start" title="上左方向" :width="200" trigger="hover" content="内容"&gt;
  &lt;template #reference&gt;&lt;el-button&gt;TL&lt;/el-button&gt;&lt;/template&gt;
&lt;/el-popover&gt;

&lt;el-popover placement="bottom" title="正下方向" :width="200" trigger="hover" content="内容"&gt;
  &lt;template #reference&gt;&lt;el-button&gt;Bottom&lt;/el-button&gt;&lt;/template&gt;
&lt;/el-popover&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 4. Table 表格 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Table 表格与数据分页
        </h3>
        <button @click="toggleCode('table')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.table ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.table ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">表格表头、边框颜色、多选框以及滑过行（Hover 态）的浅蓝底色，皆已统一配置在 `uno.config.ts` 中，拒绝任何多余 Class。</p>

      <div class="py-2 space-y-4">
        <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="监控点名称" />
          <el-table-column label="运行状态">
            <template #default="scope">
              <span class="flex items-center gap-1.5 text-xs">
                <span :class="scope.row.status === '正常' ? 'bg-emerald-500' : 'bg-rose-500'" class="w-1.5 h-1.5 rounded-full"></span>
                <span>{{ scope.row.status }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" />
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <div class="flex items-center gap-2">
                <el-button link type="primary" size="small" @click="triggerAction(`编辑: ${scope.row.name}`)">编辑</el-button>
                <el-button link type="primary" size="small" @click="triggerAction(`查看详情: ${scope.row.name}`)">详情</el-button>
                <el-button link type="danger" size="small" @click="triggerAction(`删除: ${scope.row.name}`)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 表格附带的分页器 -->
        <div class="flex justify-end pt-2">
          <el-pagination background layout="prev, pager, next, total" :total="30" :page-size="10" @current-change="(page) => triggerAction(`表格数据：切换到第 ${page} 页`)" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.table" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('table')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 原生 Table 结构 --&gt;
&lt;el-table :data="tableData" border style="width: 100%"&gt;
  &lt;el-table-column type="selection" width="55" /&gt;
  &lt;el-table-column prop="name" label="名称" /&gt;
  &lt;el-table-column label="操作"&gt;
    &lt;template #default="scope"&gt;
      &lt;el-button link type="primary"&gt;编辑&lt;/el-button&gt;
    &lt;/template&gt;
  &lt;/el-table-column&gt;
&lt;/el-table&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 5. List 列表 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          List 列表 (大、中、小规格)
        </h3>
        <button @click="toggleCode('list')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.list ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.list ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">通过简单 Flex 和基础 padding 工具类定义，实现三种不同松紧密度的列表排版，组件无额外复杂 CSS。</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
        <!-- 大号列表 -->
        <div class="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/30 dark:bg-slate-950/20">
          <span class="text-[10px] text-slate-400 font-mono mb-2 block">大号列表 (Large, py-4)</span>
          <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <div v-for="i in 3" :key="i" class="py-4 flex justify-between items-center text-xs">
              <span class="font-bold text-slate-700 dark:text-slate-200">大号数据项 {{ i }}</span>
              <el-button link type="primary" size="small" @click="triggerAction(`操作大号数据 ${i}`)">操作</el-button>
            </div>
          </div>
        </div>

        <!-- 中号列表 -->
        <div class="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/30 dark:bg-slate-950/20">
          <span class="text-[10px] text-slate-400 font-mono mb-2 block">中号列表 (Default, py-2.5)</span>
          <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <div v-for="i in 4" :key="i" class="py-2.5 flex justify-between items-center text-xs">
              <span class="text-slate-600 dark:text-slate-300">中号数据项 {{ i }}</span>
              <el-button link type="primary" size="small" @click="triggerAction(`操作中号数据 ${i}`)">操作</el-button>
            </div>
          </div>
        </div>

        <!-- 小号列表 -->
        <div class="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/30 dark:bg-slate-950/20">
          <span class="text-[10px] text-slate-400 font-mono mb-2 block">小号列表 (Small, py-1.5)</span>
          <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <div v-for="i in 5" :key="i" class="py-1.5 flex justify-between items-center text-[11px]">
              <span class="text-slate-500 dark:text-slate-400">小号数据项 {{ i }}</span>
              <el-button link type="primary" size="small" @click="triggerAction(`操作小号数据 ${i}`)">操作</el-button>
            </div>
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.list" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('list')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 列表均采用 Flex 原子类结构直接编写，不新增特定业务 CSS 类 --&gt;
&lt;div class="divide-y divide-slate-100"&gt;
  &lt;div class="py-4 flex justify-between items-center"&gt;
    &lt;span&gt;数据项&lt;/span&gt;
    &lt;el-button link type="primary"&gt;操作&lt;/el-button&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 6. Collapse 折叠面板 & Timeline 时间轴 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Collapse 折叠面板 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Collapse 折叠面板
          </h3>
          <button @click="toggleCode('collapse')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.collapse ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.collapse ? '代码' : '代码' }}
          </button>
        </div>

        <div class="py-2">
          <el-collapse v-model="activeCollapse" @change="(val) => triggerAction(`折叠项状态变为: ${val}`)">
            <el-collapse-item title="项目基本情况介绍" name="1">
              <div class="text-xs text-slate-500 space-y-1">
                <p>本项目致力于打通水利防汛体系中的多维实时数据采集，将大坝水位、雨量回波及下属泵站进行高度统一集成。</p>
              </div>
            </el-collapse-item>
            <el-collapse-item title="系统安全对接协议" name="2">
              <div class="text-xs text-slate-500">
                <p>所有数据传输均需通过加密通道。在提交表单时，系统会执行前置校验，不符合规范的录入将拒绝入库。</p>
              </div>
            </el-collapse-item>
            <el-collapse-item title="联系我们与技术支持" name="3">
              <div class="text-xs text-slate-500">
                <p>如果在使用组件库时发现任何变量冲突或圆角不对齐，可以直接向架构组提报重构反馈。</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.collapse" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('collapse')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 折叠面板组件 --&gt;
&lt;el-collapse v-model="activeCollapse"&gt;
  &lt;el-collapse-item title="标题" name="1"&gt;
    &lt;div&gt;展开内容&lt;/div&gt;
  &lt;/el-collapse-item&gt;
&lt;/el-collapse&gt;</code></pre>
          </div>
        </Transition>
      </div>

      <!-- Timeline 时间轴 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
            Timeline 时间轴
          </h3>
          <button @click="toggleCode('timeline')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.timeline ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.timeline ? '代码' : '代码' }}
          </button>
        </div>

        <div class="py-2 pl-2">
          <el-timeline>
            <el-timeline-item timestamp="2026/06/21" placement="top" type="primary">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-200">完成了数据展示类目组件的二次提纯</span>
              <p class="text-[10px] text-slate-400 mt-1">彻底清空了 CSS 类污染，通过全局变量管理，让表格、折叠面板与时间轴自动融入水利蓝设计体系。</p>
            </el-timeline-item>
            <el-timeline-item timestamp="2026/06/20" placement="top">
              <span class="text-xs text-slate-600 dark:text-slate-300">集成了 Mars3D 地图容器</span>
              <p class="text-[10px] text-slate-400 mt-1">完成了在 VitePress 中对 Cesium / Mars3D 的 SSR 构建安全防护与 Key 校验配置。</p>
            </el-timeline-item>
            <el-timeline-item timestamp="2026/06/18" placement="top" type="info">
              <span class="text-xs text-slate-500">工程项目初始化</span>
              <p class="text-[10px] text-slate-400 mt-1">初始化组件库工程，配置好 UnoCSS 并整合 Element Plus 主题底色。</p>
            </el-timeline-item>
          </el-timeline>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.timeline" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('timeline')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- 原生时间轴 --&gt;
&lt;el-timeline&gt;
  &lt;el-timeline-item timestamp="2026/06/21" type="primary"&gt;
    &lt;span class="font-bold"&gt;事件一&lt;/span&gt;
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2026/06/20"&gt;
    &lt;span&gt;事件二&lt;/span&gt;
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Toast 通知反馈
const toasts = ref([]);
let toastIdCounter = 0;

const triggerAction = (text) => {
  const id = toastIdCounter++;
  toasts.value.push({ id, text });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 2200);
};

// 代码块折叠控制
const showCode = ref({
  avatar: false,
  badge: false,
  tag: false,
  tooltip: false,
  popover: false,
  table: false,
  list: false,
  collapse: false,
  timeline: false
});

const toggleCode = (key) => {
  showCode.value[key] = !showCode.value[key];
};

// 复制代码块
const copyCode = (key) => {
  const codes = {
    avatar: `<el-avatar icon="i-ep-user" />\n<el-avatar shape="square" icon="i-ep-user" />\n<el-avatar>水利</el-avatar>`,
    badge: `<el-badge :value="12">\n  <el-button>消息</el-button>\n</el-badge>\n<el-badge is-dot>通知</el-badge>`,
    tag: `<el-tag type="success">成功</el-tag>\n<el-tag size="large" closable>大规格</el-tag>`,
    tooltip: `<el-tooltip content="提示" placement="top">\n  <el-button>上方提示</el-button>\n</el-tooltip>`,
    popover: `<el-popover placement="top-start" title="上左" trigger="hover" content="内容">\n  <template #reference><el-button>TL</el-button></template>\n</el-popover>`,
    table: `<el-table :data="tableData" border>\n  <el-table-column prop="name" label="名称" />\n</el-table>`,
    list: `<div class="divide-y divide-slate-100">\n  <div class="py-4 flex justify-between">\n    <span>数据项</span>\n  </div>\n</div>`,
    collapse: `<el-collapse v-model="activeCollapse">\n  <el-collapse-item title="标题" name="1">\n    <div>展开内容</div>\n  </el-collapse-item>\n</el-collapse>`,
    timeline: `<el-timeline>\n  <el-timeline-item timestamp="2026/06/21" type="primary">\n    <span>完成</span>\n  </el-timeline-item>\n</el-timeline>`
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(codes[key])
      .then(() => {
        triggerAction('代码已复制到剪贴板！');
      });
  }
};

// 4. Table 数据
const tableData = ref([
  { name: '大坝渗漏量监测站-01', status: '正常', date: '2026-06-21 09:47:00' },
  { name: '泵站流量采集仪-02', status: '异常', date: '2026-06-20 18:32:00' },
  { name: '南门水库水位感应装置-03', status: '正常', date: '2026-06-18 10:15:00' }
]);

const handleSelectionChange = (val) => {
  const names = val.map(item => item.name);
  triggerAction(`已选择行: ${names.join(', ')}`);
};

// 6. Collapse 状态
const activeCollapse = ref(['1']);
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
