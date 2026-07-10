---
title: 行政人员
outline: false
aside: false
pageClass: mobile-experience-doc
---

# 行政人员

**待办路径：** 列表分类 + 核心字段认单 → 点进详情分块看依据 → **底部固定**通过 / 驳回 / 补件。  
左侧切场景，顶部读规范，中间左右对比。

<div class="mobile-experience-page">
  <ClientOnly>
    <RoleSpecWorkbench role-id="admin" />
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
