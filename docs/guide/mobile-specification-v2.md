---
title: 移动端规范 V2（已迁移）
---

# 移动端规范 V2 已迁移

原 V2 能力已拆入：

- [全局交互规范](./mobile/global)
- [分角色业务规范总览](./mobile/)

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
onMounted(() => {
  router.go('/guide/mobile/')
})
</script>
