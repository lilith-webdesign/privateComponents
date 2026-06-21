# 数据展示组件

数据展示组件用于在水利业务、监控平台、后台报表等场景中，直观、清晰地呈现大量复杂数据或关联信息。我们根据最新的设计规范，对头像 (Avatar)、徽标 (Badge)、标签 (Tag)、文字提示 (Tooltip)、气泡卡片 (Popover)、表格 (Table)、列表 (List)、折叠面板 (Collapse) 和时间轴 (Timeline) 进行了统一的主题重置与视觉规范覆盖。

---

## 交互设计规范演示

<ClientOnly>
  <DataDisplayDemo />
</ClientOnly>

---

## 主题定制说明

所有数据展示组件均 100% 基于 **Element Plus** 原生组件渲染。与按钮和导航组件类似，数据展示组件的任何视觉调整（如表头背景色、行 Hover 状态、折叠面板边框线等）均已通过 `uno.config.ts` 中的全局 preflights 声明直接覆盖原生类名对应的 CSS 变量与样式，**开发过程中无需编写自定义样式类，也无需在标签中添加 inline style**。

### 1. 变量关系映射

主要影响数据展示组件的全局样式覆盖规则位于 `uno.config.ts` 中：

* **表格边框与表头 (#e4e6eb / #f5f5f5)**：
  在 `uno.config.ts` 中覆盖了 `.el-table` 的 `--el-table-border-color` 和 `--el-table-header-bg-color`，使表头背景自动置为灰色，并加粗显示文字；边框则对齐整体的浅灰分割线颜色。
* **表格滑过高亮 (rgba(0, 47, 167, 0.04))**：
  将表格滑过行时的底色 `--el-table-row-hover-bg-color` 覆写为轻量的水利深蓝透明度叠底，带来自然且统一的 Hover 高亮效果。
* **折叠面板边框与头部粗细**：
  对 `.el-collapse` 及其子元素进行了全局样式注入，统一使用 `#e4e6eb` 作为顶部/底部和项目间的分割线，并将 `.el-collapse-item__header`（折叠面板标题）字体设为粗体，更加醒目。
* **圆角规范继承**：
  方形头像、徽标、标签、气泡卡片等组件的圆角默认完美对齐全局的 `--el-border-radius-base`（`4px`）与 `--el-border-radius-small`（`2px`），实现了全组件库维度的视觉契合。

### 2. 推荐使用方式

直接在业务代码中像平常一样编写标准的 Element Plus 模板即可：

```html
<!-- 原生 Table 结构（样式自动在全局对齐设计稿，无需自定义 class） -->
<el-table :data="tableData" border style="width: 100%">
  <el-table-column type="selection" width="55" />
  <el-table-column prop="name" label="监控点名称" />
  <el-table-column prop="status" label="运行状态" />
</el-table>

<!-- 原生 Collapse 折叠面板 -->
<el-collapse v-model="activeCollapse">
  <el-collapse-item title="项目基本情况介绍" name="1">
    <div>水利防汛多维实时数据采集集成说明...</div>
  </el-collapse-item>
</el-collapse>
```

<script setup>
import DataDisplayDemo from './DataDisplayDemo.vue'
</script>
