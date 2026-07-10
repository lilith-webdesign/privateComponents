<template>
  <div class="spec-comparison" aria-label="正反移动端交互对比">
    <section class="spec-comparison__item spec-comparison__item--good">
      <header class="spec-comparison__header">
        <span class="spec-comparison__signal" aria-hidden="true" />
        <div>
          <strong>规范推荐</strong>
          <span>Material 3 · Varlet</span>
        </div>
      </header>
      <div class="spec-comparison__stage">
        <MobileDeviceFrame :device="device" :label="`${principle.title}规范推荐示例`">
          <SpecScenario
            :key="`${principle.sceneId}-good-${resetKey}`"
            :scene-id="principle.sceneId"
            side="good"
          />
        </MobileDeviceFrame>
      </div>
    </section>

    <section class="spec-comparison__item spec-comparison__item--bad">
      <header class="spec-comparison__header">
        <span class="spec-comparison__signal" aria-hidden="true" />
        <div>
          <strong>常见反例</strong>
          <span>原生反模式</span>
        </div>
      </header>
      <div class="spec-comparison__stage">
        <MobileDeviceFrame :device="device" :label="`${principle.title}常见反例`">
          <SpecScenario
            :key="`${principle.sceneId}-bad-${resetKey}`"
            :scene-id="principle.sceneId"
            side="bad"
          />
        </MobileDeviceFrame>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import MobileDeviceFrame from './MobileDeviceFrame.vue'
import SpecScenario from './SpecScenario.vue'
import type { DeviceKind, SpecPrinciple } from './mobile-spec-v2-data'

defineProps<{
  device: DeviceKind
  principle: SpecPrinciple
  resetKey: number
}>()
</script>
