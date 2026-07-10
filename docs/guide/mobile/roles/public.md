---
title: 公众用户
outline: false
aside: false
pageClass: mobile-experience-doc
---

# 公众用户

用水查询、报修投诉、缴费与预警接收。短路径、低概念，不暴露内部数据视野。

<div class="mobile-experience-page">
  <ClientOnly>
    <RoleSpecWorkbench role-id="public" />
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
