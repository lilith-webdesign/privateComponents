---
title: 移动端规范 V2
outline: false
aside: false
pageClass: mobile-spec-v2-doc
---

# 移动端规范 V2

本规范面向微信小程序优先、混合 App / WebView 增强的水利信息化移动产品。内容分为**产品与业务流程规范**和**前端交互与 UI 体系**两个区域，并通过可操作的正反移动端示例展示每条准则的实际差异。

<div class="mobile-spec-v2-page">
  <ClientOnly>
    <MobileSpecV2 />
  </ClientOnly>
</div>

<script setup>
import MobileSpecV2 from '../components/mobile-spec-v2/MobileSpecV2.vue'
</script>

<style>
.mobile-spec-v2-page {
  width: 100%;
  margin-top: 18px;
}

.mobile-spec-v2-doc .VPDoc .container,
.mobile-spec-v2-doc .VPDoc .content,
.mobile-spec-v2-doc .VPDoc .content-container {
  max-width: none;
}

.mobile-spec-v2-doc .VPDoc .content {
  margin: 0;
  padding-right: 0;
  padding-left: 0;
}

.mobile-spec-v2-page button,
.mobile-spec-v2-page select,
.mobile-spec-v2-page input {
  font-family: inherit;
}
</style>
