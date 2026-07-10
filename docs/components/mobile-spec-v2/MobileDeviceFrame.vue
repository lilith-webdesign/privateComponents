<template>
  <div
    class="mobile-device-stage"
    :class="`mobile-device-stage--${device}`"
    :aria-label="label"
  >
    <div v-if="loading" class="mobile-device-placeholder" role="status">
      <span class="mobile-device-placeholder__speaker" aria-hidden="true" />
      <span class="mobile-device-placeholder__text">正在准备设备预览</span>
    </div>

    <component
      :is="tagName"
      v-else-if="ready"
      class="mobile-device-component"
      mode="light"
    >
      <div class="mobile-device-screen">
        <slot />
      </div>
    </component>

    <div v-else class="mobile-device-fallback">
      <div class="mobile-device-fallback__status" aria-hidden="true">
        <span>09:41</span>
        <span>5G&nbsp;&nbsp;86%</span>
      </div>
      <div class="mobile-device-screen mobile-device-screen--fallback">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { DeviceKind } from './mobile-spec-v2-data'
import './mobile-spec-v2.css'

const props = withDefaults(defineProps<{
  device?: DeviceKind
  label: string
}>(), {
  device: 'pixel',
})

const ready = ref(false)
const failed = ref(false)
const loading = computed(() => !ready.value && !failed.value)
const tagName = computed(() => props.device === 'iphone' ? 'iphone-16-max' : 'pixel-9-pro')

onMounted(async () => {
  try {
    await Promise.all([
      import('@sneas/telephone/pixel-9-pro.js'),
      import('@sneas/telephone/iphone-16-max.js'),
    ])
    ready.value = true
  } catch (error) {
    failed.value = true
    console.warn('[MobileSpecV2] Device frame package unavailable; using CSS fallback.', error)
  }
})
</script>
