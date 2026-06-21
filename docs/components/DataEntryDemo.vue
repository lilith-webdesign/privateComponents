<template>
  <div class="data-entry-demo-root space-y-8 text-slate-800 dark:text-slate-200">
    <!-- Toast 提示反馈 -->
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-lg border border-slate-700/30 dark:border-slate-200/50 flex items-center gap-2 z-50">
        <span class="i-ep-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></span>
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>

    <!-- 1. Radio 单选框 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Radio 单选框
        </h3>
        <button @click="toggleCode('radio')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.radio ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.radio ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="space-y-6 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">基础单选框 / 禁用状态</span>
          <div class="flex flex-wrap gap-6">
            <el-radio-group v-model="radioVal1" @change="(val) => triggerAction(`Radio 1 切换为: ${val}`)">
              <el-radio label="A">选项 A</el-radio>
              <el-radio label="B">选项 B</el-radio>
              <el-radio label="C" disabled>选项 C (禁用)</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">按钮样式单选框 (Radio Button)</span>
          <el-radio-group v-model="radioVal2" @change="(val) => triggerAction(`Radio Button 切换为: ${val}`)">
            <el-radio-button label="上海" />
            <el-radio-button label="北京" />
            <el-radio-button label="广州" disabled />
            <el-radio-button label="深圳" />
          </el-radio-group>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.radio" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('radio')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础单选框 --&gt;
&lt;el-radio-group v-model="radioVal"&gt;
  &lt;el-radio label="A"&gt;选项 A&lt;/el-radio&gt;
  &lt;el-radio label="B"&gt;选项 B&lt;/el-radio&gt;
  &lt;el-radio label="C" disabled&gt;选项 C&lt;/el-radio&gt;
&lt;/el-radio-group&gt;

&lt;!-- 按钮式单选框 --&gt;
&lt;el-radio-group v-model="cityVal"&gt;
  &lt;el-radio-button label="上海" /&gt;
  &lt;el-radio-button label="北京" /&gt;
  &lt;el-radio-button label="广州" disabled /&gt;
&lt;/el-radio-group&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 2. Checkbox 多选框 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Checkbox 多选框
        </h3>
        <button @click="toggleCode('checkbox')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.checkbox ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.checkbox ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="space-y-6 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">基础多选框与半选状态 (Indeterminate)</span>
          <div class="flex items-center gap-6">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
              <el-checkbox label="杭州" disabled>杭州 (禁用)</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">按钮样式多选框 (Checkbox Button)</span>
          <el-checkbox-group v-model="checkedCities2" @change="(val) => triggerAction(`已选按钮城市: ${val.join(', ')}`)">
            <el-checkbox-button label="上海" />
            <el-checkbox-button label="北京" />
            <el-checkbox-button label="深圳" />
            <el-checkbox-button label="广州" disabled />
          </el-checkbox-group>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.checkbox" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('checkbox')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 半选与多选框组 --&gt;
&lt;el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"&gt;全选&lt;/el-checkbox&gt;
&lt;el-checkbox-group v-model="checkedCities"&gt;
  &lt;el-checkbox label="北京" /&gt;
  &lt;el-checkbox label="上海" /&gt;
&lt;/el-checkbox-group&gt;

&lt;!-- 按钮式多选 --&gt;
&lt;el-checkbox-group v-model="checkedCities"&gt;
  &lt;el-checkbox-button label="北京" /&gt;
  &lt;el-checkbox-button label="上海" /&gt;
&lt;/el-checkbox-group&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 3. Switch 开关 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Switch 开关
        </h3>
        <button @click="toggleCode('switch')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.switch ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.switch ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-8 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">基础状态</span>
          <div class="flex items-center gap-4">
            <el-switch v-model="switchVal1" @change="(val) => triggerAction(`Switch 1 状态: ${val}`)" />
            <el-switch v-model="switchVal2" disabled />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">带文字与图标描述</span>
          <div class="flex items-center gap-4">
            <el-switch v-model="switchVal3" inline-prompt active-text="开启" inactive-text="关闭" />
            <el-switch v-model="switchVal4" inline-prompt active-icon="i-ep-check" inactive-icon="i-ep-close" />
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.switch" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('switch')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 默认开关 --&gt;
&lt;el-switch v-model="switchVal" /&gt;

&lt;!-- 内嵌文字与图标 --&gt;
&lt;el-switch v-model="switchVal" inline-prompt active-text="开" inactive-text="关" /&gt;
&lt;el-switch v-model="switchVal" inline-prompt active-icon="i-ep-check" inactive-icon="i-ep-close" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 4. Input 输入框 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Input 输入框
        </h3>
        <button @click="toggleCode('input')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.input ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.input ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="space-y-6 py-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-[10px] text-slate-400 font-mono">基础输入框 / 禁用态</span>
            <div class="space-y-3">
              <el-input v-model="inputVal1" placeholder="请输入内容" clearable />
              <el-input v-model="inputVal2" disabled placeholder="禁用输入状态" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <span class="text-[10px] text-slate-400 font-mono">带前置/后置图标及前后缀</span>
            <div class="space-y-3">
              <el-input v-model="inputVal3" placeholder="请输入搜索关键词">
                <template #prefix><span class="i-ep-search text-slate-400"></span></template>
              </el-input>
              <el-input v-model="inputVal4" placeholder="请输入网址">
                <template #prepend>https://</template>
                <template #append>.com</template>
              </el-input>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/60 pt-4">
          <span class="text-[10px] text-slate-400 font-mono">不同尺寸规格下圆角对齐验证 (大 H-40px、默认 H-32px、小 H-24px)</span>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <el-input size="large" v-model="inputValSize" placeholder="大尺寸输入框 (Large)" />
            <el-input v-model="inputValSize" placeholder="默认尺寸输入框 (Default)" />
            <el-input size="small" v-model="inputValSize" placeholder="小尺寸输入框 (Small)" />
          </div>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.input" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('input')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础输入框 --&gt;
&lt;el-input v-model="val" placeholder="请输入..." clearable /&gt;

&lt;!-- 带图标前缀 --&gt;
&lt;el-input v-model="val"&gt;
  &lt;template #prefix&gt;&lt;span class="i-ep-search"&gt;&lt;/span&gt;&lt;/template&gt;
&lt;/el-input>

&lt;!-- 带前后缀 --&gt;
&lt;el-input v-model="val"&gt;
  &lt;template #prepend&gt;https://&lt;/template&gt;
  &lt;template #append&gt;.com&lt;/template&gt;
&lt;/el-input&gt;

&lt;!-- 尺寸规格展示 (圆角继承全局 4px) --&gt;
&lt;el-input size="large" placeholder="大尺寸" /&gt;
&lt;el-input placeholder="默认" /&gt;
&lt;el-input size="small" placeholder="小尺寸" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 5. Select 选择器 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Select 选择器
        </h3>
        <button @click="toggleCode('select')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.select ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.select ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">单选模式</span>
          <el-select v-model="selectVal1" placeholder="请选择" @change="(val) => triggerAction(`单选选中: ${val}`)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">禁用状态</span>
          <el-select v-model="selectVal2" disabled placeholder="请选择">
            <el-option label="选项 1" value="1" />
          </el-select>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">多选模式 (Tags)</span>
          <el-select v-model="selectVal3" multiple collapse-tags placeholder="可多选" @change="(val) => triggerAction(`多选目前包含: ${val.join(', ')}`)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.select" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('select')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 单选 --&gt;
&lt;el-select v-model="val" placeholder="请选择"&gt;
  &lt;el-option v-for="i in options" :key="i.val" :label="i.label" :value="i.val" /&gt;
&lt;/el-select&gt;

&lt;!-- 多选带 Tag 折叠 --&gt;
&lt;el-select v-model="val" multiple collapse-tags&gt;
  &lt;el-option v-for="i in options" :key="i.val" :label="i.label" :value="i.val" /&gt;
&lt;/el-select&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 6. DatePicker 日期选择器 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          DatePicker 日期选择器
        </h3>
        <button @click="toggleCode('datepicker')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.datepicker ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.datepicker ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">单个日期选择</span>
          <el-date-picker v-model="dateVal1" type="date" placeholder="选择具体日期" @change="(val) => triggerAction(`已选日期: ${val}`)" style="width: 100%" />
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">日期范围选择 (Range)</span>
          <el-date-picker v-model="dateVal2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="(val) => triggerAction(`选择日期范围: ${val[0]} 到 ${val[1]}`)" style="width: 100%" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.datepicker" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('datepicker')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 单个日期 --&gt;
&lt;el-date-picker v-model="date" type="date" placeholder="选择日期" /&gt;

&lt;!-- 日期范围选择 --&gt;
&lt;el-date-picker v-model="range" type="daterange" range-separator="至" start-placeholder="开始" end-placeholder="结束" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 7. TimePicker 时间选择器 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          TimePicker 时间选择器
        </h3>
        <button @click="toggleCode('timepicker')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.timepicker ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.timepicker ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">单个时间点选择</span>
          <el-time-picker v-model="timeVal1" placeholder="选择时间" @change="(val) => triggerAction(`选中时间: ${val}`)" style="width: 100%" />
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">时间范围选择</span>
          <el-time-picker v-model="timeVal2" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="(val) => triggerAction(`选择时间范围: ${val[0]} 到 ${val[1]}`)" style="width: 100%" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.timepicker" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('timepicker')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 单时间选择 --&gt;
&lt;el-time-picker v-model="time" placeholder="选择时间" /&gt;

&lt;!-- 时间范围选择 --&gt;
&lt;el-time-picker v-model="timeRange" is-range range-separator="至" start-placeholder="开始" end-placeholder="结束" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 8. Form 表单 & 验证错误演示 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Form 表单与错误报错校验 (Form Validation)
        </h3>
        <button @click="toggleCode('form')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.form ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.form ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <p class="text-xs text-slate-400 mb-4">进行表单提交时，若不满足校验规则（例如姓名必填且多于2字符，手机号必填且符合11位格式，必须勾选条款），组件的红框报错会完全基于全局定制的明度状态变量自动渲染。</p>

      <div class="max-w-xl bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200/40 dark:border-slate-800/80">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px" label-position="left">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formModel.username" placeholder="请输入用户名 (至少2位)" />
          </el-form-item>

          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formModel.phone" placeholder="请输入11位手机号" />
          </el-form-item>

          <el-form-item label="对接板块" prop="section">
            <el-select v-model="formModel.section" placeholder="请选择板块" style="width: 100%">
              <el-option label="防汛防台指挥" value="fx" />
              <el-option label="水资源量算中心" value="szy" />
              <el-option label="大坝安全监测" value="db" />
            </el-select>
          </el-form-item>

          <el-form-item label="服务条款" prop="agree">
            <el-checkbox v-model="formModel.agree">我已阅读并完全同意上述组件参数配置条款</el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">提交数据</el-button>
            <el-button @click="resetForm">重置表单</el-button>
          </el-form-item>
        </el-form>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.form" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('form')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 带有校验的 Form --&gt;
&lt;el-form :model="formModel" :rules="formRules" ref="formRef"&gt;
  &lt;el-form-item label="姓名" prop="username"&gt;
    &lt;el-input v-model="formModel.username" /&gt;
  &lt;/el-form-item&gt;
  &lt;el-form-item label="同意" prop="agree"&gt;
    &lt;el-checkbox v-model="formModel.agree" /&gt;
  &lt;/el-form-item&gt;
&lt;/el-form&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 9. Slider 滑块 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Slider 滑块
        </h3>
        <button @click="toggleCode('slider')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.slider ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.slider ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">基础滑块 (当前值: {{ sliderVal1 }})</span>
          <el-slider v-model="sliderVal1" @change="(val) => triggerAction(`滑块 1 改变为: ${val}`)" />
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">带区间范围选择 (当前值: [{{ sliderVal2[0] }}, {{ sliderVal2[1] }}])</span>
          <el-slider v-model="sliderVal2" range show-stops :max="10" @change="(val) => triggerAction(`区间滑块改变为: ${val[0]} - ${val[1]}`)" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.slider" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('slider')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础单滑块 --&gt;
&lt;el-slider v-model="val" /&gt;

&lt;!-- 区间双滑块 --&gt;
&lt;el-slider v-model="rangeVal" range show-stops :max="10" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 10. Upload 上传 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Upload 上传
        </h3>
        <button @click="toggleCode('upload')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.upload ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.upload ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">拖拽式上传区域 (Drag Upload)</span>
          <el-upload
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            @success="() => triggerAction('文件拖拽上传模拟成功！')"
            @error="() => triggerAction('上传完成！')"
          >
            <span class="i-ep-upload-filled text-4xl text-slate-300 block mb-2 mx-auto"></span>
            <div class="el-upload__text text-xs">
              拖拽文件到此处，或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip text-[10px] text-slate-400">
                支持上传 pdf, zip, png 等类型文件，大小不超过 10MB
              </div>
            </template>
          </el-upload>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">照片墙样式上传 (Picture Card)</span>
          <el-upload
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="() => triggerAction('照片已移除')"
          >
            <span class="i-ep-plus text-lg"></span>
          </el-upload>
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.upload" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('upload')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 拖拽上传 --&gt;
&lt;el-upload drag action="/api/upload"&gt;
  &lt;span class="i-ep-upload-filled"&gt;&lt;/span&gt;
  &lt;div class="el-upload__text"&gt;拖拽文件在此处，或&lt;em&gt;点击上传&lt;/em&gt;&lt;/div&gt;
&lt;/el-upload&gt;

&lt;!-- 照片墙上传 --&gt;
&lt;el-upload list-type="picture-card" action="/api/upload"&gt;
  &lt;span class="i-ep-plus"&gt;&lt;/span&gt;
&lt;/el-upload&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 11. Transfer 穿梭框 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Transfer 穿梭框
        </h3>
        <button @click="toggleCode('transfer')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.transfer ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.transfer ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="py-2 overflow-x-auto flex justify-center">
        <el-transfer v-model="transferVal" :data="transferData" @change="(val) => triggerAction(`已移至右侧面板的选项ID: ${val.join(', ')}`)" />
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.transfer" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('transfer')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 原生穿梭框 --&gt;
&lt;el-transfer v-model="transferVal" :data="transferData" /&gt;</code></pre>
        </div>
      </Transition>
    </div>

    <!-- 12. Rate 评分 -->
    <div class="demo-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span class="w-1.5 h-4 bg-[#002FA7] rounded"></span>
          Rate 评分
        </h3>
        <button @click="toggleCode('rate')" class="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          <span :class="showCode.rate ? 'i-ep-arrow-up' : 'i-ep-arrow-down'"></span>
          {{ showCode.rate ? '隐藏代码' : '查看代码' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">基础五星评分</span>
          <el-rate v-model="rateVal1" @change="(val) => triggerAction(`评分切换为: ${val} 星`)" />
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 font-mono">带文本辅助说明评分</span>
          <el-rate v-model="rateVal2" show-text :texts="['差', '一般', '好', '很好', '非常好']" @change="(val) => triggerAction(`辅助评分切换为: ${val}`)" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-if="showCode.rate" class="mt-4 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 relative">
          <button @click="copyCode('rate')" class="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-400 hover:text-white rounded border border-slate-700 transition-colors">复制代码</button>
          <pre><code>&lt;!-- 基础评分 --&gt;
&lt;el-rate v-model="score" /&gt;

&lt;!-- 文本提示评分 --&gt;
&lt;el-rate v-model="score" show-text :texts="['极差', '差', '一般', '好', '极致']" /&gt;</code></pre>
        </div>
      </Transition>
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

// 折叠代码段状态控制
const showCode = ref({
  radio: false,
  checkbox: false,
  switch: false,
  input: false,
  select: false,
  datepicker: false,
  timepicker: false,
  form: false,
  slider: false,
  upload: false,
  transfer: false,
  rate: false
});

const toggleCode = (key) => {
  showCode.value[key] = !showCode.value[key];
};

// 复制代码块
const copyCode = (key) => {
  const codes = {
    radio: `<el-radio-group v-model="radioVal">\n  <el-radio label="A">选项 A</el-radio>\n  <el-radio label="B">选项 B</el-radio>\n</el-radio-group>`,
    checkbox: `<el-checkbox-group v-model="checkedCities">\n  <el-checkbox label="北京" />\n  <el-checkbox label="上海" />\n</el-checkbox-group>`,
    switch: `<el-switch v-model="switchVal" />`,
    input: `<el-input v-model="val" placeholder="请输入..." clearable />`,
    select: `<el-select v-model="val">\n  <el-option label="选项 1" value="1" />\n</el-select>`,
    datepicker: `<el-date-picker v-model="date" type="date" placeholder="选择日期" />`,
    timepicker: `<el-time-picker v-model="time" placeholder="选择时间" />`,
    form: `<el-form :model="formModel" :rules="formRules" ref="formRef">\n  <el-form-item label="姓名" prop="username">\n    <el-input v-model="formModel.username" />\n  </el-form-item>\n</el-form>`,
    slider: `<el-slider v-model="val" />`,
    upload: `<el-upload drag action="/api/upload">\n  <span class="i-ep-upload-filled"></span>\n</el-upload>`,
    transfer: `<el-transfer v-model="transferVal" :data="transferData" />`,
    rate: `<el-rate v-model="score" />`
  };
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codes[key])
      .then(() => {
        triggerAction('代码已复制到剪贴板！');
      });
  }
};

// 1. Radio 状态
const radioVal1 = ref('A');
const radioVal2 = ref('上海');

// 2. Checkbox 状态
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref(['北京']);
const checkedCities2 = ref(['上海', '北京']);
const cities = ['北京', '上海', '广州'];

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
  triggerAction(`Checkbox 全选改变: ${val ? '全选' : '全不选'}`);
};

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
  triggerAction(`选中多选城市: ${value.join(', ')}`);
};

// 3. Switch 状态
const switchVal1 = ref(true);
const switchVal2 = ref(false);
const switchVal3 = ref(true);
const switchVal4 = ref(false);

// 4. Input 状态
const inputVal1 = ref('');
const inputVal2 = ref('');
const inputVal3 = ref('');
const inputVal4 = ref('');
const inputValSize = ref('');

// 5. Select 选项
const selectVal1 = ref('');
const selectVal2 = ref('');
const selectVal3 = ref([]);
const options = [
  { value: '选项1', label: '对接板块数据包' },
  { value: '选项2', label: '水流信息收集' },
  { value: '选项3', label: '监测点回流归口' }
];

// 6. DatePicker 状态
const dateVal1 = ref('');
const dateVal2 = ref('');

// 7. TimePicker 状态
const timeVal1 = ref('');
const timeVal2 = ref('');

// 8. Form 表单状态与提交校验
const formRef = ref(null);
const formModel = ref({
  username: '',
  phone: '',
  section: '',
  agree: false
});

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, message: '长度应至少为 2 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号格式', trigger: 'blur' }
  ],
  section: [
    { required: true, message: '请选择要对接的业务板块', trigger: 'change' }
  ],
  agree: [
    { 
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('必须勾选同意条款以对接数据'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
};

const submitForm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      triggerAction('表单验证成功！已模拟完成数据录入对接。');
    } else {
      triggerAction('表单验证失败，请修正红色错误字段。');
    }
  });
};

const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  triggerAction('表单字段重置成功');
};

// 9. Slider 状态
const sliderVal1 = ref(38);
const sliderVal2 = ref([3, 7]);

// 10. Upload 状态
const handlePictureCardPreview = () => {
  triggerAction('触发照片大图预览动作！');
};

// 11. Transfer 穿梭数据
const transferVal = ref([1, 4]);
const generateTransferData = () => {
  const data = [];
  const labels = ['防汛指挥权', '量算预警报', '大坝渗漏仪', '水力大屏端', '雨量回波库'];
  labels.forEach((label, i) => {
    data.push({
      key: i + 1,
      label: label,
      disabled: i === 2
    });
  });
  return data;
};
const transferData = ref(generateTransferData());

// 12. Rate 评分
const rateVal1 = ref(4);
const rateVal2 = ref(3.7);
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
