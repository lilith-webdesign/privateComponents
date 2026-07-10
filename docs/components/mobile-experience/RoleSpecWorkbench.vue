<template>
  <section class="mex-workbench mex-workbench--role" :aria-label="`${profile.name}业务规范对比`">
    <div class="mex-workbench__body">
      <nav class="mex-pattern-rail" aria-label="场景菜单">
        <div class="mex-rail-role">
          <span>角色</span>
          <strong>{{ profile.name }}</strong>
          <p>{{ profile.duty }}</p>
        </div>
        <p class="mex-rail-label">业务场景</p>
        <button
          v-for="(scene, index) in profile.scenes"
          :key="scene.id"
          type="button"
          :class="{ 'is-active': activeSceneId === scene.id }"
          @click="selectScene(scene.id)"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ scene.title }}</strong>
        </button>
      </nav>

      <div class="mex-workbench__main">
        <!-- 顶部：业务→数据→UI 规范（视觉主权重） -->
        <header class="mex-spec-banner">
          <div class="mex-spec-banner__top">
            <div>
              <span class="mex-spec-banner__kicker">{{ profile.name }} · UI 交互规范</span>
              <h3>{{ activeScene.title }}</h3>
            </div>
            <div class="mex-workbench__toolbar mex-workbench__toolbar--inline">
              <div class="mex-device-switch" aria-label="设备外壳">
                <button type="button" :class="{ 'is-active': device === 'pixel' }" @click="device = 'pixel'">Pixel</button>
                <button type="button" :class="{ 'is-active': device === 'iphone' }" @click="device = 'iphone'">iPhone</button>
              </div>
              <button type="button" class="mex-reset" @click="resetKey += 1">重置</button>
            </div>
          </div>

          <p class="mex-spec-banner__norm">{{ sceneUiNorm }}</p>

          <div class="mex-spec-banner__chain" v-if="hasSceneChain">
            <div class="mex-spec-banner__chip">
              <span>业务范围</span>
              <p>{{ activeScene.businessScope }}</p>
            </div>
            <div class="mex-spec-banner__chip">
              <span>数据视野</span>
              <p>{{ activeScene.dataView }}</p>
            </div>
          </div>

          <div class="mex-do-dont mex-do-dont--compact mex-do-dont--banner">
            <div class="mex-do-dont__item mex-do-dont__item--do">
              <span>对比应看到（推荐）</span>
              <p>{{ sceneRecommend }}</p>
            </div>
            <div class="mex-do-dont__item mex-do-dont__item--dont">
              <span>对比应看到（避免）</span>
              <p>{{ sceneAvoid }}</p>
            </div>
          </div>
        </header>

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
            <li v-for="item in profile.checkpoints" :key="item">{{ item }}</li>
          </ul>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SpecComparison from '../mobile-spec-v2/SpecComparison.vue'
import type { DeviceKind } from '../mobile-spec-v2/mobile-spec-v2-data'
import { getRoleProfile, type RoleId, type RoleSceneSpec } from './data/role-profiles'
import '../mobile-spec-v2/mobile-spec-v2.css'
import './styles/mobile-experience.css'

const props = defineProps<{
  roleId: RoleId
}>()

const profile = computed(() => getRoleProfile(props.roleId))
const activeSceneId = ref(profile.value.scenes[0].id)
const device = ref<DeviceKind>('pixel')
const resetKey = ref(0)

watch(() => props.roleId, () => {
  activeSceneId.value = getRoleProfile(props.roleId).scenes[0].id
  resetKey.value += 1
})

const activeScene = computed(() => (
  profile.value.scenes.find((item) => item.id === activeSceneId.value)
  ?? profile.value.scenes[0]
))

const sceneSpec = computed(() => activeScene.value as RoleSceneSpec)

const hasSceneChain = computed(() => Boolean(sceneSpec.value.businessScope && sceneSpec.value.dataView))

const sceneUiNorm = computed(() => (
  sceneSpec.value.uiNorm
  || sceneSpec.value.summary
  || profile.value.philosophy
))

const sceneRecommend = computed(() => (
  sceneSpec.value.recommend || profile.value.philosophy
))

const sceneAvoid = computed(() => (
  sceneSpec.value.avoid || '忽略业务范围与数据视野，用同类列表或九宫格应付。'
))

const comparisonPrinciple = computed(() => ({
  id: `${profile.value.id}-${activeScene.value.id}`,
  number: 1,
  title: `${profile.value.name} · ${activeScene.value.title}`,
  eyebrow: profile.value.name,
  summary: sceneUiNorm.value,
  rules: profile.value.rules,
  recommend: sceneRecommend.value,
  avoid: sceneAvoid.value,
  sceneId: activeScene.value.sceneId,
  checkpoints: profile.value.checkpoints,
}))

function selectScene(id: string) {
  activeSceneId.value = id
  resetKey.value += 1
}
</script>
