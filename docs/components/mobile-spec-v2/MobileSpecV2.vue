<template>
  <section class="mobile-spec-v2" aria-labelledby="mobile-spec-v2-title">
    <header class="msv2-intro">
      <div>
        <span class="msv2-kicker">水利移动体验体系</span>
        <h2 id="mobile-spec-v2-title">从业务判断到前端落地</h2>
        <p>围绕水利移动作业，把产品流程约束与高频 UI 模式放进同一套可操作、可比较、可验收的工作台。</p>
      </div>
      <div class="msv2-intro__meta" aria-label="规范规模">
        <strong>24</strong>
        <span>组交互准则</span>
      </div>
    </header>

    <div class="msv2-area-switch" aria-label="内容区域">
      <button
        v-for="area in specAreas"
        :key="area.id"
        type="button"
        :class="{ 'is-active': activeAreaId === area.id }"
        :aria-pressed="activeAreaId === area.id"
        @click="selectArea(area.id)"
      >
        <span>{{ area.index }}</span>
        <strong>{{ area.title }}</strong>
      </button>
    </div>

    <div class="msv2-mobile-selector">
      <label for="msv2-principle-select">当前准则</label>
      <select
        id="msv2-principle-select"
        :value="activePrincipleId"
        @change="selectPrincipleFromEvent"
      >
        <option
          v-for="principle in activeArea.principles"
          :key="principle.id"
          :value="principle.id"
        >
          {{ String(principle.number).padStart(2, '0') }} · {{ principle.title }}
        </option>
      </select>
    </div>

    <div class="msv2-workbench">
      <nav class="msv2-principle-rail" :aria-label="`${activeArea.title}准则`">
        <p>{{ activeArea.description }}</p>
        <button
          v-for="principle in activeArea.principles"
          :key="principle.id"
          type="button"
          :class="{ 'is-active': activePrincipleId === principle.id }"
          :aria-current="activePrincipleId === principle.id ? 'true' : undefined"
          @click="selectPrinciple(principle.id)"
        >
          <span>{{ String(principle.number).padStart(2, '0') }}</span>
          <strong>{{ principle.title }}</strong>
        </button>
      </nav>

      <main class="msv2-content">
        <article class="msv2-principle-copy">
          <div class="msv2-principle-copy__heading">
            <span>{{ activePrinciple.eyebrow }}</span>
            <h3>{{ activePrinciple.title }}</h3>
            <p>{{ activePrinciple.summary }}</p>
          </div>

          <ul class="msv2-rule-list">
            <li v-for="rule in activePrinciple.rules" :key="rule">{{ rule }}</li>
          </ul>

          <div class="msv2-do-dont">
            <div class="msv2-do-dont__item msv2-do-dont__item--do">
              <span>推荐</span>
              <p>{{ activePrinciple.recommend }}</p>
            </div>
            <div class="msv2-do-dont__item msv2-do-dont__item--dont">
              <span>避免</span>
              <p>{{ activePrinciple.avoid }}</p>
            </div>
          </div>
        </article>

        <div class="msv2-demo-toolbar">
          <div class="msv2-device-switch" aria-label="设备外壳">
            <button
              type="button"
              :class="{ 'is-active': device === 'pixel' }"
              :aria-pressed="device === 'pixel'"
              @click="device = 'pixel'"
            >Pixel</button>
            <button
              type="button"
              :class="{ 'is-active': device === 'iphone' }"
              :aria-pressed="device === 'iphone'"
              @click="device = 'iphone'"
            >iPhone</button>
          </div>
          <button type="button" class="msv2-reset" @click="resetScenario">重置场景</button>
        </div>

        <SpecComparison
          :device="device"
          :principle="activePrinciple"
          :reset-key="resetKey"
        />

        <footer class="msv2-checkpoints">
          <strong>验收观察点</strong>
          <ul>
            <li v-for="item in activePrinciple.checkpoints" :key="item">{{ item }}</li>
          </ul>
        </footer>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SpecComparison from './SpecComparison.vue'
import { specAreas } from './mobile-spec-v2-data'
import type { DeviceKind, SpecAreaId } from './mobile-spec-v2-data'
import './mobile-spec-v2.css'

const activeAreaId = ref<SpecAreaId>('business')
const activePrincipleId = ref(specAreas[0].principles[0].id)
const device = ref<DeviceKind>('pixel')
const resetKey = ref(0)

const activeArea = computed(() => specAreas.find((area) => area.id === activeAreaId.value) ?? specAreas[0])
const activePrinciple = computed(() => (
  activeArea.value.principles.find((item) => item.id === activePrincipleId.value)
  ?? activeArea.value.principles[0]
))

function selectArea(id: SpecAreaId) {
  activeAreaId.value = id
  activePrincipleId.value = specAreas.find((area) => area.id === id)?.principles[0].id ?? specAreas[0].principles[0].id
  resetKey.value += 1
}

function selectPrinciple(id: string) {
  activePrincipleId.value = id
  resetKey.value += 1
}

function selectPrincipleFromEvent(event: Event) {
  selectPrinciple((event.target as HTMLSelectElement).value)
}

function resetScenario() {
  resetKey.value += 1
}
</script>
