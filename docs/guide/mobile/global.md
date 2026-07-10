---
title: 全局交互规范
outline: false
aside: false
pageClass: mobile-experience-doc
---

# 全局交互规范

全角色共用 UI 底盘。**左侧切换模式，顶部看推荐/避免，中间大区域做正反对比**（左规范推荐 · Varlet，右常见反例）。

核心原则：数据最小可读 · 轻采集 · 触达可闭环 · 主操作在拇指区 · 离线可暂存且控制禁止离线排队。

<div class="mobile-experience-page">
  <ClientOnly>
    <GlobalSpecWorkbench />
  </ClientOnly>
</div>

<script setup>
import GlobalSpecWorkbench from '../../components/mobile-experience/GlobalSpecWorkbench.vue'
</script>

<style>
.mobile-experience-page {
  width: 100%;
  margin-top: 8px;
}
.mobile-experience-doc .VPDoc .container,
.mobile-experience-doc .VPDoc .content,
.mobile-experience-doc .VPDoc .content-container {
  max-width: none;
}
.mobile-experience-doc .VPDoc .content {
  margin: 0;
  padding-right: 0;
  padding-left: 0;
}
</style>
