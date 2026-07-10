<template>
  <div class="spec-phone-page" :data-scene="sceneId" :data-side="side">
    <div class="spec-phone-appbar">
      <span class="spec-phone-appbar__context">智慧水利</span>
      <strong>{{ side === 'good' ? '规范场景' : '反例场景' }}</strong>
    </div>
    <div class="spec-scene-placeholder">
      <span>{{ side === 'good' ? '推荐方案' : '常见问题' }}</span>
      <strong>{{ sceneId }}</strong>
      <p>交互场景将在下一实施步骤中接入。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sceneId: string
  side: 'good' | 'bad'
}>()
</script>
