---
sidebar: false
aside: false
outline: false
pageClass: charts-page-full
---

# 数据图表

::: info 设计稿
本组件库对应的设计稿链接地址为：[即时设计 - 设计稿](https://js.design/f/9NpeUc?p=FFE66DC1&mode=design)
:::

水利信息化建设中的数据可视化规范与 ECharts 业务预设。页面采用 **Bento Grid 多栏自适应** 布局，无侧栏，完整展示全局调色盘与 22 个业务图表配置。

同一套 `WATER_PALETTE` 系列/语义色下，支持三种视觉风格（页面顶部切换）：

| 风格 | 说明 |
| --- | --- |
| **液态玻璃** (`liquid`) | Hydro-glass：柔和光晕、圆角柱体、丰润面积；暗色为真实磨砂玻璃 |
| **Premium** (`premium`) | 冷奢发丝边、细线、克制面积与动效 |
| **工业大屏** (`industrial`) | 硬切直角、密网格、实心填充、SCADA 感 |

API：`getChartOption(id, echarts, mode, style)`，其中 `style` 为 `'liquid' | 'premium' | 'industrial'`。

<ClientOnly>
  <ChartsDemo />
</ClientOnly>

<script setup>
import ChartsDemo from './charts/ChartsDemo.vue'
</script>

<style>
/* 本页：仅隐藏侧栏与 aside，不动顶栏导航 */
.charts-page-full .VPSidebar,
.charts-page-full .aside,
.charts-page-full .aside-container {
  display: none !important;
}

.charts-page-full .VPContent.has-sidebar {
  padding-left: 0 !important;
}

.charts-page-full .VPDoc .container,
.charts-page-full .VPDoc .content,
.charts-page-full .content-container {
  max-width: 100% !important;
}

@media (min-width: 960px) {
  .charts-page-full .VPContent {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .charts-page-full .VPDoc {
    padding: 32px 40px 48px !important;
  }
}

@media (min-width: 1440px) {
  .charts-page-full .VPDoc {
    padding: 40px 56px 64px !important;
  }
}

.charts-page-full .vp-doc h1 {
  display: none;
}

/* Light 页底 */
.charts-page-full {
  background:
    radial-gradient(ellipse 90% 55% at 8% -5%, rgba(27, 107, 255, 0.14), transparent 55%),
    linear-gradient(180deg, #dceaf8 0%, #e8f1fa 40%, #eef5fb 100%);
}

/*
 * 暗色页底：只改 pageClass 自身背景。
 * 禁止写 .dark main / 全局 main —— 会误伤 Layout 与导航。
 * VitePress 把 pageClass 挂在 Layout 根上，选择器必须带 .charts-page-full。
 */
html.dark .charts-page-full {
  background:
    radial-gradient(ellipse 100% 55% at 10% 0%, rgba(96, 165, 250, 0.28), transparent 55%),
    radial-gradient(ellipse 80% 45% at 90% 5%, rgba(34, 211, 238, 0.18), transparent 50%),
    linear-gradient(180deg, #132a4a 0%, #0f223d 45%, #0c1a2e 100%);
}

/* 仅打穿文档内容区背景，不动 nav / sidebar / footer */
html.dark .charts-page-full .VPDoc,
html.dark .charts-page-full .VPDoc .container,
html.dark .charts-page-full .VPDoc .content,
html.dark .charts-page-full .VPDoc .content-container,
html.dark .charts-page-full .vp-doc {
  background: transparent !important;
  background-color: transparent !important;
}

.charts-page-full .vp-doc > .info.custom-block {
  max-width: 56rem;
  margin-bottom: 0.75rem;
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.48);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

html.dark .charts-page-full .vp-doc > .info.custom-block {
  background: #1a3558;
  border: 1px solid rgba(147, 197, 253, 0.35);
  color: #d0e4fa;
  box-shadow: inset 0 1px 0 rgba(200, 230, 255, 0.15);
}

html.dark .charts-page-full .vp-doc {
  color: #d0e4fa;
}

/*
 * Premium style paints its own canvas inside ChartsDemo.
 * Soften the outer page field so it doesn't fight zinc product chrome.
 */
html:not(.dark) .charts-page-full:has(.style-premium) {
  background: #ececee !important;
}
html.dark .charts-page-full:has(.style-premium) {
  background: #000000 !important;
}
html:not(.dark) .charts-page-full:has(.style-premium) .vp-doc > .info.custom-block {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.06);
  color: #52525b;
  box-shadow: 0 8px 24px rgba(9, 9, 11, 0.05);
}
html.dark .charts-page-full:has(.style-premium) .vp-doc > .info.custom-block {
  background: #121214;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #a1a1aa;
}
</style>
