---
title: 移动端规范（已迁移）
---

# 移动端规范已迁移

原「移动端规范」条文已并入 **[全局交互规范](./mobile/global)**。

完整体系入口：**[移动端体验规范](./mobile/)**。

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
onMounted(() => {
  router.go('/guide/mobile/global')
})
</script>
