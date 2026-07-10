---
title: 管水员
outline: false
aside: false
pageClass: mobile-experience-doc
---

# 管水员

先定**业务范围**（巡检 · 工单 · 报警预警 · 水源水质 · 离线）与**数据视野**，再定**UI 交互规范**。  
左侧切场景，顶部读规范链，中间左右对比必须兑现该规范。

<div class="mobile-experience-page">
  <ClientOnly>
    <RoleSpecWorkbench role-id="water-keeper" />
  </ClientOnly>
</div>

<script setup>
import RoleSpecWorkbench from '../../../components/mobile-experience/RoleSpecWorkbench.vue'
</script>

<style>
.mobile-experience-page { width: 100%; margin-top: 8px; }
.mobile-experience-doc .VPDoc .container,
.mobile-experience-doc .VPDoc .content,
.mobile-experience-doc .VPDoc .content-container { max-width: none; }
.mobile-experience-doc .VPDoc .content { margin: 0; padding-right: 0; padding-left: 0; }
</style>
