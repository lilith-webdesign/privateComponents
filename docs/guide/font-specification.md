---
aside: false
---

# 字体设计规范白皮书 (左右对比指南)

本规范致力于统一公司组件库和业务系统大屏在排版美学与数字孪生展示上的字体水准。通过建立严格的字体使用分级，消除排版混乱、中英文不对齐和数值更新抖动等问题。

> [!TIP]
> **设计与开发指南**
> 本规范是前端同学与 UI 同学协作的视觉基准：
> - **UI 同学**：在设计原型图（如 Figma/Sketch）时，应严格采用本指南规定的层级、字重和 Fallback 链进行出图。
> - **前端同学**：在编写 CSS / 样式主题时，应按本手册中的属性规范及声明顺序编写代码，确保高保真还原。

---

## 📐 字体使用核心分级与设计思想

为满足水利行业信息化及 B 端政企风格的沉稳科技感，我们指定了三种特定作用的字体家族进行多维协作：

1. **工业科技张力 —— 阿里妈妈数黑体 (AlimamaShuHeiTi)**
   - **字重规定**：必须使用极粗的字重（`900` / `font-black`）。
   - **设计理念**：该字体专门用于主视觉 Slogan、大屏大标题和子系统徽标名称。其笔画拐角硬朗，粗细对比强烈，极具工业信息化张力，奠定科技感基准。

2. **端正政企风范 —— 思源黑体 (Source Han Sans CN)**
   - **字重规定**：常规大段描述使用 `400`，子标题或区块强调使用 `500` / `700`。
   - **设计理念**：思源黑体具备优秀的呼吸间距与中缝几何感，无衬线的中性设计确保了长篇幅业务描述、感知网络拓扑文本的极高阅读流畅性。

3. **紧凑表单控件与防抖数据 —— Inter 字体**
   - **字重规定**：表单控件、英文及数据指标统一采用 `500` / `600`。
   - **设计理念**：Inter 是一款针对用户界面精心打磨的无衬线英文字体。它的数字高度、英文基线与中文字体（如思源黑体）能够完美水平对齐，确保账号、密码输入时无偏差。更关键的是，它支持 **`tabular-nums` (等宽数字)** 特征，能够彻底解决监控数据刷新时的排版震颤。

4. **工业大屏与仪器数字展示 —— DS-Digital 液晶数字字体**
   - **字重规定**：建议使用普通字重 `400`。
   - **设计理念**：DS-Digital 是典型的液晶数码管（七段式发光二极管）数字字体，被广泛应用于水利枢纽控制台、瞬时出库流量仪表、压力监控组件及大屏的核心数字孪生节点上。它能够极高地还原真实的物理数码表盘质感，彰显工业控制的美感；相比之下，普通无衬线数字字体（如 Inter）在此类工业控制仪表展示中会显得过于扁平，缺乏工业现场的临场感与力量感。

---

## 🆚 左右横向对比演示手册

以下为按照字体设计规范与不按照字体设计规范的实测对比。请在左侧（规范）与右侧（不规范）的实时渲染效果中体会设计细节：

<ClientOnly>
  <FontSpecDemo />
</ClientOnly>

---

## 🔧 技术集成指南

### 1. 为什么必须要开启 `tabular-nums`？
在大屏监控或工业看板中，水位、流量和压力等数据是以毫秒级进行动态刷新的。
* 如果采用默认的**非等宽数字（Proportional Nums）**，由于数字 `1` 极窄而数字 `8` 极宽，每一次数值变动，数字总长度就会不断缩放，从而导致**小数点和右侧单位发生高频物理位移（晃动抖动）**。这在视觉上会产生严重的闪烁感，降低大屏的质感。
* 通过在 CSS 中开启 `font-variant-numeric: tabular-nums`，将使每个数字（$0 - 9$）占用的物理宽度完全均等。这样数值刷新时只有数值字符本身更替，排版框架稳如泰山。

### 2. CSS 标准样式载入规范
在构建项目全局样式时，我们推荐在 CSS 中按如下方式统一预设规范：

```css
/* 全局引入 Inter 字体链接 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

/* 1. Slogan 主标题规范 */
.slogan-title {
  font-family: 'AlimamaShuHeiTi', 'Alimama ShuHeiTi', 'Impact', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* 2. 业务大段描述规范 */
.content-desc {
  font-family: 'Source Han Sans CN', 'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 400;
  line-height: 1.65;
}

/* 3. 表单控件与常规组件规范 */
.font-inter {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 4. 水利指标等宽数字规范 */
.metric-tabular {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-variant-numeric: tabular-nums;
  -moz-font-feature-settings: "tnum";
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
}

/* 5. 工业大屏液晶数字规范 */
.metric-digital {
  font-family: 'DS-Digital', 'DS-DIGI', 'Impact', sans-serif;
}
```

<script setup>
import FontSpecDemo from '../components/FontSpecDemo.vue'
</script>

<style>
.vp-doc {
  max-width: 100% !important;
}
</style>
