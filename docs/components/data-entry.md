# 数据录入组件

数据录入组件用于在水利业务表单、参数配置、后台管理等业务场景中，承载不同类别的数据录入与配置。我们根据设计规范完成了单选框、多选框、开关、输入框、选择器、日期/时间选择器、表单容器、滑块、上传、穿梭框、评分组件的统一样式重置。

---

## 交互设计规范演示

<ClientOnly>
  <DataEntryDemo />
</ClientOnly>

---

## 主题定制说明

所有数据录入组件均 100% 使用 **Element Plus** 原生组件。我们不需要在各个子页面或组件内部强行指定宽度、高度、边框和改色等 inline style，所有风格配置全部统一通过全局覆盖 CSS 变量或在 `uno.config.ts` 中针对原生类名重写来打理。

### 1. 变量关系映射

主要控制数据录入组件外观的全局变量配置位于 `uno.config.ts` 中：

* **全局聚焦高亮色**：
  在表单聚焦（Focus）、多选框/单选框选中时，组件的描边与填充底色会自动继承自 `--el-color-primary` (水利深蓝 `#002FA7`)。
* **禁用状态置灰**：
  所有的输入框与下拉选择框的禁用状态均会自动应用 `--el-disabled-bg-color` 等原生禁用变量，实现轻量置灰。
* **验证失败报错红线**：
  若 Form 表单验证失败，红框报错和报错文字的颜色由 `--el-color-danger` (`#E33232`) 统一控制。
* **多尺寸圆角对齐**：
  我们在 `uno.config.ts` 的 `preflights` 样式中增加了对 `.el-input`、`.el-select` 及其大中小规格原生类的全局样式覆盖，强制使其在各种尺寸（如 `el-input--small`）下的圆角变量都始终对齐全局的 `--el-border-radius-base`（`4px`）。

### 2. 推荐使用方式

直接在业务代码中像平常一样编写标准的 Element Plus 模板即可：

```html
<!-- 基础单选框组 -->
<el-radio-group v-model="radioVal">
  <el-radio label="1">选项一</el-radio>
  <el-radio label="2">选项二</el-radio>
</el-radio-group>

<!-- 尺寸规格输入框 (无需 inline style 圆角依然强行对齐全局 4px) -->
<el-input size="large" placeholder="大尺寸输入框" />
<el-input size="small" placeholder="小尺寸输入框" />
```

<script setup>
import DataEntryDemo from './DataEntryDemo.vue'
</script>
