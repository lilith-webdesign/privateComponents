---
title: 工程人员
outline: false
aside: false
pageClass: mobile-experience-doc
---

# 工程人员

先定**业务范围**与**数据视野**，再定**UI 交互规范**；左右对比必须兑现该规范，而不是同类列表换文案。

**链路：** 业务（施工·安装·调试·收缴·用户·验收）→ 要看见的数据 → 事件驱动 / 回显卡 / 节点存档等交互。

<div class="mobile-experience-page">
  <ClientOnly>
    <RoleSpecWorkbench role-id="engineer" />
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
