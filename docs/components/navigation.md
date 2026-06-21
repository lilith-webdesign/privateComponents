# 导航类目组件

导航组件用于在不同的页面、功能或章节间进行流程的引导与定位。我们根据设计规范定义了完整的 Pagination 分页、Tabs 标签页、Dropdown 下拉菜单、PageHeader 页头、Steps 步骤条、SideMenu 侧边导航及 Anchor 锚点组件。

---

## 交互设计规范演示

<ClientOnly>
  <NavigationDemo />
</ClientOnly>

---

## 主题定制说明

所有导航类目组件（分页、标签页、下拉菜单、步骤条、页头等）完全基于 **Element Plus** 原生组件渲染。当您直接声明 Element 组件时，其样式细节（激活状态、高亮背景、节点连线等）会自动继承来自全局的 CSS 变量。

开发人员无需在组件上强行编写任何有关位置对齐、颜色伪类或自定义圆角的 inline style。

### 1. 变量关系映射

主要影响导航组件的全局变量如下：

* **高亮激活主色**：统一由 `--el-color-primary` 接管（影响选中的 Tab、选中的页码、选中的菜单激活背景等）。
* **二级悬浮背景**：统一由 `--el-color-primary-light-9` 等变体接管（影响下拉选项悬浮、菜单项悬浮底色等）。
* **辅助圆角系统**：默认的输入框、页码块的圆角大小均由 `--el-border-radius-base` 控制。

### 2. 推荐使用方式

直接编写标准的 Element Plus 组件代码，系统将自动适配全局的样式：

```html
<!-- 原生分页组件 -->
<el-pagination background layout="prev, pager, next" :total="100" />

<!-- 原生标签页组件 -->
<el-tabs v-model="activeName">
  <el-tab-pane label="分类一" name="1" />
  <el-tab-pane label="分类二" name="2" />
</el-tabs>

<!-- 原生步骤条组件 -->
<el-steps :active="activeStep" finish-status="success">
  <el-step title="步骤 1" />
  <el-step title="步骤 2" />
</el-steps>
```

<script setup>
import NavigationDemo from './NavigationDemo.vue'
</script>
