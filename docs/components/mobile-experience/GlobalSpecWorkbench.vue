<template>
  <section class="mex-workbench" aria-label="全局交互正反对比">
    <div class="mex-workbench__body">
      <nav class="mex-pattern-rail" aria-label="全局模式">
        <p>全角色共用 UI 底盘。点左侧切换，对比区无需滚动即可看到。</p>
        <button
          v-for="pattern in globalPatterns"
          :key="pattern.id"
          type="button"
          :class="{ 'is-active': activeId === pattern.id }"
          @click="selectPattern(pattern.id)"
        >
          <span>{{ String(pattern.number).padStart(2, '0') }}</span>
          <strong>{{ pattern.title }}</strong>
        </button>
      </nav>

      <div class="mex-workbench__main">
        <div class="mex-main-head">
          <div class="mex-copy mex-copy--inline">
            <div class="mex-copy__heading">
              <span>全局交互</span>
              <h3>{{ active.title }}</h3>
              <p>{{ active.summary }}</p>
            </div>
            <div class="mex-do-dont mex-do-dont--compact">
              <div class="mex-do-dont__item mex-do-dont__item--do">
                <span>推荐</span>
                <p>{{ active.recommend }}</p>
              </div>
              <div class="mex-do-dont__item mex-do-dont__item--dont">
                <span>避免</span>
                <p>{{ active.avoid }}</p>
              </div>
            </div>
          </div>
          <div class="mex-workbench__toolbar mex-workbench__toolbar--inline">
            <div class="mex-device-switch" aria-label="设备外壳">
              <button type="button" :class="{ 'is-active': device === 'pixel' }" @click="device = 'pixel'">Pixel</button>
              <button type="button" :class="{ 'is-active': device === 'iphone' }" @click="device = 'iphone'">iPhone</button>
            </div>
            <button type="button" class="mex-reset" @click="resetKey += 1">重置场景</button>
          </div>
        </div>

        <div class="mex-comparison-zone">
          <SpecComparison
            :device="device"
            :principle="comparisonPrinciple"
            :reset-key="resetKey"
          />
        </div>

        <footer class="mex-checkpoints mex-checkpoints--compact">
          <strong>验收</strong>
          <ul>
            <li v-for="item in active.checkpoints" :key="item">{{ item }}</li>
          </ul>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SpecComparison from '../mobile-spec-v2/SpecComparison.vue'
import type { DeviceKind } from '../mobile-spec-v2/mobile-spec-v2-data'
import { globalPatterns } from './data/global-patterns'
import '../mobile-spec-v2/mobile-spec-v2.css'
import './styles/mobile-experience.css'

const activeId = ref(globalPatterns[0].id)
const device = ref<DeviceKind>('pixel')
const resetKey = ref(0)

const active = computed(() => globalPatterns.find((item) => item.id === activeId.value) ?? globalPatterns[0])

const comparisonPrinciple = computed(() => ({
  id: active.value.id,
  number: active.value.number,
  title: active.value.title,
  eyebrow: 'GLOBAL',
  summary: active.value.summary,
  rules: active.value.rules,
  recommend: active.value.recommend,
  avoid: active.value.avoid,
  sceneId: active.value.sceneId,
  checkpoints: active.value.checkpoints,
}))

function selectPattern(id: string) {
  activeId.value = id
  resetKey.value += 1
}
</script>
