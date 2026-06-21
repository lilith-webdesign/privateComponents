<template>
  <div class="navigation-demo-root space-y-8 text-slate-800 dark:text-slate-200">
    <!-- Toast 提示 -->
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-lg border border-slate-700/30 dark:border-slate-200/50 flex items-center gap-2 z-50">
        <span class="i-ep-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></span>
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>

    <!-- 1. Pagination 分页 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Pagination 分页
        </h3>
        <button @click="toggleCode('pagination')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.pagination ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.pagination ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `el-pagination` 组件，高度和按钮大小随 size 参数自动调整，高亮颜色自动引用预设主题色。</p>

      <div class="space-y-6 py-2">
        <!-- 基础分页 -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">基础分页 (默认尺寸, 高度 32px)</span>
          <el-pagination 
            layout="prev, pager, next" 
            :total="90" 
            :default-current-page="currentPage1"
            @current-change="(val) => { currentPage1 = val; triggerAction(`基础分页：切换到第 ${val} 页`); }"
          />
        </div>

        <!-- 连续分页 -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">带背景连续分页 (带省略号，高度 32px)</span>
          <el-pagination 
            background
            layout="prev, pager, next" 
            :total="100" 
            :page-size="10"
            :default-current-page="currentPage2"
            @current-change="(val) => { currentPage2 = val; triggerAction(`背景分页：切换到第 ${val} 页`); }"
          />
        </div>

        <!-- 快速跳转与总页数 -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">复合型分页 (总数及快速跳转)</span>
          <el-pagination 
            background
            layout="prev, pager, next, jumper" 
            :total="50" 
            :page-size="10"
            :default-current-page="currentPage3"
            @current-change="(val) => { currentPage3 = val; triggerAction(`复合分页：切换到第 ${val} 页`); }"
          />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.pagination" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('pagination')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础分页 --&gt;
&lt;el-pagination layout="prev, pager, next" :total="90" /&gt;

&lt;!-- 带背景的连续分页 --&gt;
&lt;el-pagination background layout="prev, pager, next" :total="100" /&gt;

&lt;!-- 带跳转复合分页 --&gt;
&lt;el-pagination background layout="prev, pager, next, jumper" :total="50" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 2. Tabs 标签页 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#144BCC] rounded"></span>
          Tabs 标签页
        </h3>
        <button @click="toggleCode('tabs')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.tabs ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.tabs ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `el-tabs` 组件。高亮下划线及文字状态完全根据全局 CSS 变量进行渲染。</p>

      <div class="space-y-6 py-2">
        <!-- 基础下划线式 -->
        <div>
          <span class="text-[10px] text-slate-400 font-mono mb-2 block">常规高亮式</span>
          <el-tabs v-model="tabActiveName1" @tab-click="(pane) => triggerAction(`常规 Tabs: 切换至 ${pane.props.label}`)">
            <el-tab-pane label="选中标签" name="tab1">选中标签内容区</el-tab-pane>
            <el-tab-pane label="可选标签" name="tab2">可选标签内容区</el-tab-pane>
            <el-tab-pane label="不可选标签" name="tab3" disabled>不可选标签内容区</el-tab-pane>
          </el-tabs>
        </div>

        <!-- 带图标式 -->
        <div>
          <span class="text-[10px] text-slate-400 font-mono mb-2 block">前置图标标签式</span>
          <el-tabs v-model="tabActiveName2" @tab-click="(pane) => triggerAction(`图标 Tabs: 切换至 ${pane.props.name}`)">
            <el-tab-pane name="first">
              <template #label>
                <span class="flex items-center gap-1.5">
                  <span class="i-ep-grid text-sm"></span>
                  <span>选中标签</span>
                </span>
              </template>
              选中标签内容区
            </el-tab-pane>
            <el-tab-pane name="second">
              <template #label>
                <span class="flex items-center gap-1.5">
                  <span class="i-ep-location text-sm"></span>
                  <span>可选标签</span>
                </span>
              </template>
              可选标签内容区
            </el-tab-pane>
            <el-tab-pane name="third" disabled>
              <template #label>
                <span class="flex items-center gap-1.5">
                  <span class="i-ep-circle-close text-sm"></span>
                  <span>不可选标签</span>
                </span>
              </template>
              不可选标签内容区
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 卡片式 -->
        <div>
          <span class="text-[10px] text-slate-400 font-mono mb-2 block">卡片式 (Card Type)</span>
          <el-tabs v-model="tabActiveName3" type="card" @tab-click="(pane) => triggerAction(`卡片 Tabs: 切换至 ${pane.props.label}`)">
            <el-tab-pane label="选中标签" name="tab1">选中标签内容区</el-tab-pane>
            <el-tab-pane label="可选标签" name="tab2">可选标签内容区</el-tab-pane>
            <el-tab-pane label="不可选标签" name="tab3" disabled>不可选标签内容区</el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.tabs" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('tabs')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础下划线标签页 --&gt;
&lt;el-tabs v-model="activeName"&gt;
  &lt;el-tab-pane label="选中标签" name="first"&gt;内容&lt;/el-tab-pane&gt;
  &lt;el-tab-pane label="可选标签" name="second"&gt;内容&lt;/el-tab-pane&gt;
  &lt;el-tab-pane label="不可选标签" name="third" disabled&gt;内容&lt;/el-tab-pane&gt;
&lt;/el-tabs&gt;

&lt;!-- 带图标的标签页 --&gt;
&lt;el-tabs v-model="activeName"&gt;
  &lt;el-tab-pane name="first"&gt;
    &lt;template #label&gt;
      &lt;span class="flex items-center gap-1.5"&gt;
        &lt;span class="i-ep-grid"&gt;&lt;/span&gt;
        &lt;span&gt;主要分类&lt;/span&gt;
      &lt;/span&gt;
    &lt;/template&gt;
  &lt;/el-tab-pane&gt;
&lt;/el-tabs&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 3. Dropdown 下拉菜单 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-indigo-500 rounded"></span>
          Dropdown 下拉菜单
        </h3>
        <button @click="toggleCode('dropdown')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.dropdown ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.dropdown ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `el-dropdown` 和 `el-button`，通过 `size` 选项调整高度尺寸，免去高度硬编码。</p>

      <div class="flex flex-wrap items-center gap-8 py-2">
        <!-- 描边下拉 -->
        <div class="flex flex-col items-start gap-2">
          <span class="text-[10px] text-slate-400 font-mono">描边次要下拉菜单 (小 H-24px、默认 H-32px、大 H-40px)</span>
          <div class="flex items-center gap-3">
            <!-- 24px (small) -->
            <el-dropdown size="small" @command="(cmd) => triggerAction(`次要下拉(24px) 触发: ${cmd}`)">
              <el-button size="small">
                下拉菜单<span class="i-ep-arrow-down ml-1 text-[10px]"></span>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="下拉选项一">下拉选项一</el-dropdown-item>
                  <el-dropdown-item command="下拉选项二">下拉选项二</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 32px (default) -->
            <el-dropdown @command="(cmd) => triggerAction(`次要下拉(32px) 触发: ${cmd}`)">
              <el-button>
                下拉菜单<span class="i-ep-arrow-down ml-1 text-[10px]"></span>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="下拉选项一">下拉选项一</el-dropdown-item>
                  <el-dropdown-item command="下拉选项二">下拉选项二</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 40px (large) -->
            <el-dropdown size="large" @command="(cmd) => triggerAction(`次要下拉(40px) 触发: ${cmd}`)">
              <el-button size="large">
                下拉菜单<span class="i-ep-arrow-down ml-1 text-[10px]"></span>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="下拉选项一">下拉选项一</el-dropdown-item>
                  <el-dropdown-item command="下拉选项二">下拉选项二</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <!-- 填充主要下拉 -->
        <div class="flex flex-col items-start gap-2">
          <span class="text-[10px] text-slate-400 font-mono">主要填充下拉菜单 (小 H-24px、默认 H-32px、大 H-40px)</span>
          <div class="flex items-center gap-3">
            <!-- 24px (small) -->
            <el-dropdown size="small" @command="(cmd) => triggerAction(`主要下拉(24px) 触发: ${cmd}`)">
              <el-button type="primary" size="small">
                下拉菜单<span class="i-ep-arrow-down ml-1 text-[10px]"></span>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="下拉选项一">下拉选项一</el-dropdown-item>
                  <el-dropdown-item command="下拉选项二">下拉选项二</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 32px (default) -->
            <el-dropdown @command="(cmd) => triggerAction(`主要下拉(32px) 触发: ${cmd}`)">
              <el-button type="primary">
                下拉菜单<span class="i-ep-arrow-down ml-1 text-[10px]"></span>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="下拉选项一">下拉选项一</el-dropdown-item>
                  <el-dropdown-item command="下拉选项二">下拉选项二</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 40px (large) -->
            <el-dropdown size="large" @command="(cmd) => triggerAction(`主要下拉(40px) 触发: ${cmd}`)">
              <el-button type="primary" size="large">
                下拉菜单<span class="i-ep-arrow-down ml-1 text-[10px]"></span>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="下拉选项一">下拉选项一</el-dropdown-item>
                  <el-dropdown-item command="下拉选项二">下拉选项二</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.dropdown" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('dropdown')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 描边下拉 (小 H-24px) --&gt;
&lt;el-dropdown size="small"&gt;
  &lt;el-button size="small"&gt;下拉菜单&lt;/el-button&gt;
&lt;/el-dropdown&gt;

&lt;!-- 主要填充下拉 (默认 H-32px) --&gt;
&lt;el-dropdown&gt;
  &lt;el-button type="primary"&gt;下拉菜单&lt;/el-button&gt;
&lt;/el-dropdown&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 4. PageHeader 页头 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-teal-500 rounded"></span>
          PageHeader 页头
        </h3>
        <button @click="toggleCode('pageheader')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.pageheader ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.pageheader ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `el-page-header`、`el-breadcrumb` 组件定制，布局整洁标准。</p>

      <div class="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200/40 dark:border-slate-800/80">
        <el-page-header @back="triggerAction('页头：点击返回上一页')">
          <!-- 面包屑 -->
          <template #breadcrumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>一级页面</el-breadcrumb-item>
              <el-breadcrumb-item>二级页面</el-breadcrumb-item>
              <el-breadcrumb-item>当前页面</el-breadcrumb-item>
            </el-breadcrumb>
          </template>

          <!-- 标题 -->
          <template #content>
            <span class="text-base font-black text-slate-900 dark:text-white">分页浏览详情</span>
          </template>

          <!-- 动作区 -->
          <template #extra>
            <div class="flex items-center gap-2">
              <el-button @click="triggerAction('页头：分享数据')">分享数据</el-button>
              <el-button type="primary" @click="triggerAction('页头：导出数据')">导出数据</el-button>
            </div>
          </template>

          <!-- 元数据摘要 -->
          <template #main>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/60">
              <div class="space-y-1">
                <span class="text-slate-400 block">创建人:</span>
                <span class="font-bold text-slate-700 dark:text-slate-200">代刷商</span>
              </div>
              <div class="space-y-1">
                <span class="text-slate-400 block">关联单据:</span>
                <a href="javascript:;" @click="triggerAction('点击了单据号 659856525655')" class="font-bold text-blue-600 dark:text-blue-400 hover:underline">659856525655</a>
              </div>
              <div class="space-y-1">
                <span class="text-slate-400 block">单据状态:</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>已完成对接，数据稳定</span>
                </span>
              </div>
            </div>
          </template>
        </el-page-header>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.pageheader" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('pageheader')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- PageHeader 元数据配置 --&gt;
&lt;el-page-header @back="onBack"&gt;
  &lt;template #breadcrumb&gt;
    &lt;el-breadcrumb separator="/"&gt;
      &lt;el-breadcrumb-item&gt;一目录&lt;/el-breadcrumb-item&gt;
      &lt;el-breadcrumb-item&gt;二目录&lt;/el-breadcrumb-item&gt;
    &lt;/el-breadcrumb&gt;
  &lt;/template&gt;
  &lt;template #content&gt;
    &lt;span class="font-bold"&gt;分页浏览详情&lt;/span&gt;
  &lt;/template&gt;
&lt;/el-page-header&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 5. Steps 步骤条 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-emerald-500 rounded"></span>
          Steps 步骤条 (基于 El-Steps)
        </h3>
        <button @click="toggleCode('steps')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.steps ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.steps ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="flex items-center justify-between mb-4">
        <p class="text-xs text-slate-400">调用 Element Plus 原生 `el-steps` 与 `el-step`，可通过主题变量全局调整步骤节点的圆圈背景和线条颜色。</p>
        <el-button size="small" type="primary" plain @click="nextStep">
          {{ currentStep === 3 ? '重新开始' : '模拟下一步' }}
        </el-button>
      </div>

      <div class="space-y-8 py-2">
        <!-- 横向步骤条 -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono mb-2">横向步骤条 (当前步骤: {{ currentStep }})</span>
          <el-steps :active="currentStep" finish-status="success">
            <el-step title="正在处理" />
            <el-step title="等待处理" />
            <el-step title="处理完成" />
          </el-steps>
        </div>

        <!-- 纵向带描述 -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono mb-2">纵向步骤条 (带说明描述)</span>
          <div class="max-w-xl pl-4">
            <el-steps :active="currentStep" direction="vertical" style="height: 250px" finish-status="success">
              <el-step title="已完成" description="这是步骤一的补充说明文件，包含了所有已审批流程。" />
              <el-step title="进行中" description="正在对业务系统对接数据包进行数据量算和汇总。" />
              <el-step title="等待中" description="系统已经准备好归档，等待管理员执行最后的审核。" />
            </el-steps>
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.steps" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('steps')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 横向步骤条 --&gt;
&lt;el-steps :active="currentStep" finish-status="success"&gt;
  &lt;el-step title="正在处理" /&gt;
  &lt;el-step title="等待处理" /&gt;
  &lt;el-step title="处理完成" /&gt;
&lt;/el-steps&gt;

&lt;!-- 纵向步骤条 --&gt;
&lt;el-steps :active="currentStep" direction="vertical" style="height: 200px"&gt;
  &lt;el-step title="一阶段" description="补充说明" /&gt;
  &lt;el-step title="二阶段" description="正在进行" /&gt;
&lt;/el-steps&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 6. SideMenu & Anchor 侧边导航与锚点 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 垂直侧边导航 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-slate-700 rounded"></span>
            Side Menu 侧边导航
          </h3>
          <button @click="toggleCode('sidemenu')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.sidemenu ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.sidemenu ? '代码' : '代码' }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `el-menu` 组件。激活背景、边框及悬浮效果已全量在 UnoCSS 全局变量中定义。</p>

        <div class="w-60 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div class="text-[10px] text-slate-400 font-mono px-4 py-2 font-bold uppercase tracking-wider">产品名称 / 模块</div>
          <el-menu 
            default-active="1-2" 
            class="el-menu-vertical-demo border-none bg-transparent"
            @select="(index) => triggerAction(`选中二级菜单: ${index}`)"
          >
            <el-sub-menu index="1">
              <template #title>
                <span class="i-ep-folder mr-2 text-blue-500"></span>
                <span class="text-xs font-semibold">一级菜单展开</span>
              </template>
              <el-menu-item index="1-1" class="text-xs">二级菜单未选中</el-menu-item>
              <el-menu-item index="1-2" class="text-xs">二级菜单选中</el-menu-item>
              <el-menu-item index="1-3" class="text-xs">二级菜单未选中</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <span class="i-ep-folder-checked mr-2 text-slate-400"></span>
                <span class="text-xs font-semibold">一级菜单收起</span>
              </template>
            </el-sub-menu>

            <el-menu-item index="3">
              <span class="i-ep-setting mr-2 text-slate-400"></span>
              <template #title><span class="text-xs font-semibold">全局设置</span></template>
            </el-menu-item>
          </el-menu>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.sidemenu" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('sidemenu')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- El-Menu 侧边导航菜单 --&gt;
&lt;el-menu default-active="1-2"&gt;
  &lt;el-sub-menu index="1"&gt;
    &lt;template #title&gt;
      &lt;span class="i-ep-folder mr-2"&gt;&lt;/span&gt;
      &lt;span&gt;一级菜单展开&lt;/span&gt;
    &lt;/template&gt;
    &lt;el-menu-item index="1-1"&gt;二级菜单未选中&lt;/el-menu-item&gt;
    &lt;el-menu-item index="1-2"&gt;二级菜单选中&lt;/el-menu-item&gt;
  &lt;/el-sub-menu&gt;
&lt;/el-menu&gt;</code></pre>
          </div>
        </Transition>
      </div>

      <!-- Anchor 锚点 -->
      <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="w-1.5 h-4 bg-indigo-500 rounded"></span>
            Anchor 锚点
          </h3>
          <button @click="toggleCode('anchor')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            <span :class="showCode.anchor ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
            {{ showCode.anchor ? '代码' : '代码' }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mb-4">使用 Element Plus 原生 `el-anchor` 锚点导航，自带小圆点滑块与选中状态，完全无任何硬编码样式。</p>

        <!-- 模拟长容器以承载锚点高亮显示 -->
        <div class="flex gap-8 items-start border border-slate-100 dark:border-slate-800 p-4 rounded-xl">
          <div class="w-32 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg">
            <el-anchor :container="containerRef" @change="(val) => triggerAction(`锚点跳转定位至: ${val}`)">
              <el-anchor-link href="#part1" title="导航栏一" />
              <el-anchor-link href="#part2" title="数据输入" />
              <el-anchor-link href="#part3" title="数据展示" />
              <el-anchor-link href="#part4" title="反馈设置" />
            </el-anchor>
          </div>

          <div ref="containerRef" class="flex-1 h-36 overflow-y-auto border border-slate-100 dark:border-slate-800/80 p-3 text-xs space-y-4 font-mono scroll-smooth bg-white dark:bg-slate-900">
            <div id="part1" class="h-24 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded">
              <div class="font-bold text-slate-700 dark:text-slate-300"># 导航栏一</div>
              <p class="text-[10px] text-slate-400 mt-1">这里是导航栏一对应的内容区块，支持在上方滑动时自动高亮左侧小圆点。</p>
            </div>
            <div id="part2" class="h-24 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded">
              <div class="font-bold text-slate-700 dark:text-slate-300"># 数据输入</div>
              <p class="text-[10px] text-slate-400 mt-1">这里是数据输入模块。用户可以在此处看到所有表单信息录入。</p>
            </div>
            <div id="part3" class="h-24 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded">
              <div class="font-bold text-slate-700 dark:text-slate-300"># 数据展示</div>
              <p class="text-[10px] text-slate-400 mt-1">这里是数据大屏展示区，承载水库水位降雨量监控。</p>
            </div>
            <div id="part4" class="h-24 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded">
              <div class="font-bold text-slate-700 dark:text-slate-300"># 反馈设置</div>
              <p class="text-[10px] text-slate-400 mt-1">这里是系统的反馈控制中心。</p>
            </div>
          </div>
        </div>

        <Transition name="slide-fade">
          <div v-if="showCode.anchor" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
            <button @click="copyCode('anchor')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
            <pre><code>&lt;!-- El-Anchor 锚点定位组件 --&gt;
&lt;el-anchor :container="containerRef"&gt;
  &lt;el-anchor-link href="#part1" title="导航栏一" /&gt;
  &lt;el-anchor-link href="#part2" title="数据输入" /&gt;
  &lt;el-anchor-link href="#part3" title="数据展示" /&gt;
&lt;/el-anchor&gt;</code></pre>
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

const triggerAction = (text) => {
  const id = toastIdCounter++;
  toasts.value.push({ id, text });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 2200);
};

const showCode = ref({
  pagination: false,
  tabs: false,
  dropdown: false,
  pageheader: false,
  steps: false,
  sidemenu: false,
  anchor: false
});

const toggleCode = (key) => {
  showCode.value[key] = !showCode.value[key];
};

const copyCode = (key) => {
  const codes = {
    pagination: `<el-pagination layout="prev, pager, next" :total="90" />`,
    tabs: `<el-tabs v-model="activeTab">\n  <el-tab-pane label="选标签" name="first" />\n</el-tabs>`,
    dropdown: `<el-dropdown size="small">\n  <el-button size="small">下拉菜单</el-button>\n</el-dropdown>`,
    pageheader: `<el-page-header>\n  <template #content>标题</template>\n</el-page-header>`,
    steps: `<el-steps :active="currentStep">\n  <el-step title="处理中" />\n</el-steps>`,
    sidemenu: `<el-menu default-active="1-2">\n  <el-menu-item index="1-1">二级菜单</el-menu-item>\n</el-menu>`,
    anchor: `<el-anchor :container="containerRef">\n  <el-anchor-link href="#part1" title="页一部分" />\n</el-anchor>`
  };
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codes[key])
      .then(() => {
        triggerAction('代码已复制代码到剪贴板！');
      });
  }
};

// 1. Pagination 状态
const currentPage1 = ref(2);
const currentPage2 = ref(5);
const currentPage3 = ref(1);

// 2. Tabs 状态
const tabActiveName1 = ref('tab1');
const tabActiveName2 = ref('first');
const tabActiveName3 = ref('tab1');

// 5. Steps 状态
const currentStep = ref(1);
const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
    triggerAction(`步骤进度已推进至第 ${currentStep.value} 步`);
  } else {
    currentStep.value = 1;
    triggerAction('重置步骤进度');
  }
};

// 7. Anchor 容器引用
const containerRef = ref(null);
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
