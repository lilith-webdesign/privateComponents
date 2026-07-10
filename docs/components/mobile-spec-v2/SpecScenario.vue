<template>
  <div
    class="spec-phone-page"
    :class="[`spec-phone-page--${side}`, `spec-phone-page--${content.pattern}`, { 'is-wide-preview': widePreview }]"
    :data-scene="sceneId"
    :data-side="side"
  >
    <!-- Soft Structuralism x Material 3 / Varlet -->
    <div
      v-if="side === 'good'"
      class="spec-phone-page__varlet"
      :class="{ 'is-mounted': goodMounted }"
      :style="goodThemeVars"
    >
      <div class="good-grain" aria-hidden="true" />
      <div class="good-orb good-orb--a" aria-hidden="true" />
      <div class="good-orb good-orb--b" aria-hidden="true" />

      <header class="good-top-island">
        <div class="good-top-island__shell">
          <div class="good-top-island__core">
            <div class="good-appbar-titles">
              <small>{{ view.context }}</small>
              <strong>{{ view.title }}</strong>
            </div>
            <VarButton
              text
              round
              icon-container
              color="#e7f3ef"
              text-color="#0f3d36"
              aria-label="更多"
            >
              <VarIcon name="dots-vertical" color="#0f3d36" :size="18" />
            </VarButton>
          </div>
        </div>
      </header>

      <div class="spec-phone-body spec-phone-body--good">
        <div
          v-if="content.pattern === 'role' || content.pattern === 'density'"
          class="good-reveal good-segment"
          style="--reveal-i: 0"
        >
          <VarSpace :size="[0, 8]" wrap>
            <VarChip
              v-for="role in roles"
              :key="role"
              size="small"
              :type="roleValue === role ? 'primary' : 'default'"
              :plain="roleValue !== role"
              :color="roleValue === role ? '#0f6b5c' : undefined"
              :text-color="roleValue === role ? '#ffffff' : '#3d5651'"
              @click="roleValue = role"
            >{{ role }}</VarChip>
          </VarSpace>
        </div>

        <div
          v-if="displayStatus"
          class="good-reveal"
          style="--reveal-i: 1"
        >
          <VarAlert
            class="good-alert"
            :type="toneToAlert(displayStatusTone)"
            variant="tonal"
            :elevation="0"
            :title="displayStatus"
          />
        </div>

        <div
          v-if="content.pattern === 'responsive'"
          class="good-reveal good-bezel"
          style="--reveal-i: 2"
        >
          <div class="good-responsive good-surface">
            <div class="scene-responsive-preview__canvas">
              <span>站点</span><span>状态</span><span>当前值</span><span v-if="widePreview">更新时间</span>
            </div>
            <small>{{ widePreview ? '中等宽度：增加辅助列' : '紧凑宽度：只保留关键列' }}</small>
          </div>
        </div>

        <div v-if="content.pattern === 'shell' && busy" class="good-skeleton-stack">
          <div
            v-for="index in 3"
            :key="index"
            class="good-reveal good-bezel"
            :style="{ '--reveal-i': index }"
          >
            <VarSkeleton
              class="good-surface"
              :loading="true"
              title
              :rows="2"
              :rows-width="['100%', '62%']"
            />
          </div>
        </div>

        <template v-else>
          <div
            v-if="view.metrics?.length"
            class="good-reveal good-metrics"
            :class="view.metrics.length === 1 ? 'good-metrics--hero' : 'good-metrics--bento'"
            style="--reveal-i: 2"
          >
            <div
              v-for="(metric, metricIndex) in view.metrics"
              :key="metric.label"
              class="good-bezel"
              :class="{ 'good-bezel--hero': view.metrics.length > 1 && metricIndex === 0 }"
            >
              <div
                class="good-metric good-surface"
                :class="metric.tone ? `good-metric--${metric.tone}` : undefined"
              >
                <span>{{ metric.label }}</span>
                <strong>{{ metric.value }} <small v-if="metric.unit">{{ metric.unit }}</small></strong>
                <em v-if="metric.meta">{{ metric.meta }}</em>
              </div>
            </div>
          </div>

          <div
            v-if="['state-first', 'trustworthy-data', 'data-ui'].includes(sceneId)"
            class="good-reveal good-bezel"
            style="--reveal-i: 3"
          >
            <div class="good-chart good-surface" aria-label="指标趋势示意">
              <header class="good-chart__head">
                <span>近 6 小时趋势</span>
                <em>警戒 29.20 m</em>
              </header>
              <div class="scene-mini-chart__grid" />
              <div class="scene-mini-chart__threshold" />
              <svg viewBox="0 0 260 74" role="img" aria-label="最近六小时趋势">
                <defs>
                  <linearGradient :id="`goodChartFill-${sceneId}`" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0f6b5c" stop-opacity="0.28" />
                    <stop offset="100%" stop-color="#0f6b5c" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="4,70 4,58 46,52 88,55 130,38 172,42 214,26 256,31 256,70" :fill="`url(#goodChartFill-${sceneId})`" />
                <polyline points="4,58 46,52 88,55 130,38 172,42 214,26 256,31" />
                <circle cx="214" cy="26" r="4" />
              </svg>
            </div>
          </div>

          <div
            v-if="view.fields?.length"
            class="good-reveal good-form good-bezel"
            style="--reveal-i: 3"
          >
            <div class="good-form__panel good-surface">
              <div v-for="field in view.fields" :key="field.label" class="good-form__field">
                <VarInput
                  v-model="fieldValues[field.label]"
                  variant="outlined"
                  size="small"
                  :hint="true"
                  :placeholder="field.label"
                  :type="field.label.includes('开度') ? 'number' : 'text'"
                  :inputmode="field.label.includes('开度') ? 'decimal' : 'text'"
                  :readonly="Boolean(field.value)"
                  :is-force-error-effect="Boolean(fieldErrors[field.label])"
                  focus-color="#0f6b5c"
                />
                <small v-if="fieldErrors[field.label]" class="scene-field-error">{{ fieldErrors[field.label] }}</small>
              </div>
            </div>
          </div>

          <div v-if="displayItems.length" class="good-list">
            <div
              v-for="(item, index) in displayItems"
              :key="`${item.title}-${index}`"
              class="good-reveal good-bezel"
              :style="{ '--reveal-i': 3 + index }"
            >
              <div
                class="good-list-item good-surface"
                :class="[
                  item.tone ? `good-list-item--${item.tone}` : undefined,
                  { 'is-selected': selectedItem === index },
                ]"
                role="button"
                tabindex="0"
                @click="selectedItem = index"
                @keydown.enter.prevent="selectedItem = index"
              >
                <VarCell
                  :title="item.title"
                  :description="item.meta"
                  :border="false"
                  :ripple="false"
                >
                  <template #extra>
                    <span v-if="item.value" class="good-list-value">{{ item.value }}</span>
                    <VarChip
                      v-else-if="item.status"
                      size="small"
                      :type="toneToVarlet(item.tone)"
                      :plain="item.tone === 'neutral' || !item.tone"
                    >{{ item.status }}</VarChip>
                  </template>
                </VarCell>
              </div>
            </div>
          </div>

          <div
            v-if="view.steps?.length"
            class="good-reveal good-bezel"
            style="--reveal-i: 4"
          >
            <div class="good-steps-wrap good-surface">
              <VarSteps
                :active="activeStepIndex"
                direction="vertical"
                active-color="#0f6b5c"
                inactive-color="#c5d3cf"
              >
                <VarStep v-for="step in dynamicSteps" :key="step.label">
                  <div class="good-step-copy">
                    <strong>{{ step.label }}</strong>
                    <small>{{ step.meta }}</small>
                  </div>
                </VarStep>
              </VarSteps>
            </div>
          </div>

          <div
            v-if="showProgress"
            class="good-reveal good-bezel"
            style="--reveal-i: 4"
          >
            <div class="good-progress good-surface">
              <div class="good-progress__meta">
                <span>执行进度</span>
                <strong>{{ Math.round(progress) }}%</strong>
              </div>
              <VarProgress
                :value="progress"
                color="#0f6b5c"
                track-color="#dce8e5"
                line-width="10"
              />
              <small>{{ progressLabel }}</small>
            </div>
          </div>

          <div
            v-if="content.pattern === 'risk'"
            class="good-reveal good-risk"
            style="--reveal-i: 5"
          >
            <div>
              <strong>风险确认</strong>
              <span>我已核对对象、目标值和影响范围</span>
            </div>
            <VarSwitch v-model="riskChecked" size="24" color="#0f6b5c" />
          </div>

          <div
            v-if="content.pattern === 'conflict'"
            class="good-reveal good-bezel"
            style="--reveal-i: 5"
          >
            <div class="good-conflict good-surface">
              <strong class="good-conflict__title">选择冲突处理方式</strong>
              <VarRadioGroup
                v-model="conflictChoice"
                direction="vertical"
                :options="conflictOptions"
              />
            </div>
          </div>

          <div
            v-if="feedbackMessage"
            class="good-reveal"
            style="--reveal-i: 6"
          >
            <VarAlert
              class="good-feedback"
              :type="feedbackTone === 'danger' ? 'danger' : feedbackTone === 'info' ? 'info' : 'success'"
              variant="tonal"
              :elevation="0"
              :title="feedbackMessage"
            />
          </div>

          <div
            v-if="view.note"
            class="good-reveal"
            style="--reveal-i: 6"
          >
            <VarAlert
              type="info"
              variant="outlined"
              :elevation="0"
              :title="view.note"
            />
          </div>

          <div
            v-if="expanded"
            class="good-reveal good-bezel"
            style="--reveal-i: 6"
          >
            <div class="good-expanded good-surface">
              <strong>{{ expandedTitle }}</strong>
              <p>{{ expandedCopy }}</p>
            </div>
          </div>
        </template>
      </div>

      <div class="scene-actions scene-actions--good">
        <div class="scene-actions__island">
          <button
            type="button"
            class="good-cta"
            :class="{ 'is-disabled': content.pattern === 'risk' && !riskChecked, 'is-loading': busy }"
            :disabled="content.pattern === 'risk' && !riskChecked || busy"
            @click="handlePrimary"
          >
            <span class="good-cta__label">{{ busy ? '处理中' : actionLabel }}</span>
            <span class="good-cta__orb" aria-hidden="true">
              <VarIcon name="chevron-right" color="#0f3d36" :size="16" />
            </span>
          </button>
          <VarButton
            v-if="view.secondary"
            block
            text
            type="primary"
            size="normal"
            text-color="#0f6b5c"
            @click="handleSecondary"
          >{{ view.secondary }}</VarButton>
        </div>
      </div>

      <div v-if="overlayOpen" class="scene-overlay" role="dialog" aria-modal="true" aria-label="操作确认">
        <div class="scene-overlay__sheet scene-overlay__sheet--good">
          <div class="scene-overlay__handle" aria-hidden="true" />
          <VarChip type="warning" size="small" plain>最终确认</VarChip>
          <strong>调整东干渠 2# 闸门至 45%</strong>
          <p>当前开度 12%，实时状态更新于 09:42:18。执行后影响下游一、二灌区。</p>
          <div class="good-overlay-actions">
            <VarButton block outline type="primary" color="#0f6b5c" text-color="#0f6b5c" @click="overlayOpen = false">返回复核</VarButton>
            <VarButton block type="danger" @click="confirmRisk">确认身份并下发</VarButton>
          </div>
        </div>
      </div>
    </div>

    <!-- 常见反例：刻意原生/粗糙控件，突出反模式 -->
    <template v-else>
      <div class="spec-phone-appbar">
        <span class="spec-phone-appbar__context">{{ view.context }}</span>
        <strong>{{ view.title }}</strong>
        <span class="spec-phone-appbar__more" aria-hidden="true">•••</span>
      </div>

      <div class="spec-phone-body">
        <div v-if="content.pattern === 'role' || content.pattern === 'density'" class="scene-role-switch">
          <button v-for="role in roles" :key="role" type="button">{{ role }}</button>
        </div>

        <div
          v-if="displayStatus"
          class="scene-status"
          :class="`scene-status--${displayStatusTone}`"
          role="status"
        >
          <span class="scene-status__mark" aria-hidden="true" />
          <span>{{ displayStatus }}</span>
        </div>

        <div v-if="content.pattern === 'responsive'" class="scene-responsive-preview">
          <div class="scene-responsive-preview__canvas">
            <span>站点</span><span>状态</span><span>当前值</span><span v-if="widePreview">更新时间</span>
          </div>
          <small>{{ widePreview ? '中等宽度：增加辅助列' : '紧凑宽度：只保留关键列' }}</small>
        </div>

        <div v-if="content.pattern === 'shell' && busy" class="scene-shell-loading">
          <div class="scene-shell-loading__spinner">Loading...</div>
        </div>

        <template v-else>
          <div v-if="view.metrics?.length" class="scene-metrics">
            <article
              v-for="metric in view.metrics"
              :key="metric.label"
              class="scene-metric"
              :class="metric.tone ? `scene-metric--${metric.tone}` : undefined"
            >
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }} <small v-if="metric.unit">{{ metric.unit }}</small></strong>
              <em v-if="metric.meta">{{ metric.meta }}</em>
            </article>
          </div>

          <div
            v-if="['state-first', 'trustworthy-data', 'data-ui'].includes(sceneId)"
            class="scene-mini-chart"
            aria-label="指标趋势示意"
          >
            <div class="scene-mini-chart__grid" />
            <div class="scene-mini-chart__threshold" />
            <svg viewBox="0 0 260 74" role="img" aria-label="最近六小时趋势">
              <polyline points="4,58 46,52 88,55 130,38 172,42 214,26 256,31" />
              <circle cx="214" cy="26" r="4" />
            </svg>
            <span>未标注曲线</span>
          </div>

          <div v-if="view.fields?.length" class="scene-form scene-form--bad">
            <label v-for="field in view.fields" :key="field.label">
              <span>{{ field.label }}</span>
              <input
                v-model="fieldValues[field.label]"
                :placeholder="field.placeholder || field.label"
              >
              <small v-if="fieldErrors[field.label]" class="scene-field-error">{{ fieldErrors[field.label] }}</small>
            </label>
          </div>

          <div v-if="displayItems.length" class="scene-list scene-list--dense">
            <button
              v-for="(item, index) in displayItems"
              :key="`${item.title}-${index}`"
              type="button"
              class="scene-list-item"
              :class="[item.tone ? `scene-list-item--${item.tone}` : undefined, { 'is-selected': selectedItem === index }]"
              @click="selectedItem = index"
            >
              <span class="scene-list-item__main">
                <strong>{{ item.title }}</strong>
                <small>{{ item.meta }}</small>
              </span>
              <span v-if="item.value" class="scene-list-item__value">{{ item.value }}</span>
              <span v-else-if="item.status" class="scene-list-item__bad-status">{{ item.status }}</span>
            </button>
          </div>

          <div v-if="view.steps?.length" class="scene-timeline">
            <div
              v-for="(step, index) in dynamicSteps"
              :key="step.label"
              class="scene-timeline__step"
              :class="`is-${step.state}`"
            >
              <span class="scene-timeline__dot">{{ step.state === 'done' ? '✓' : index + 1 }}</span>
              <div><strong>{{ step.label }}</strong><small>{{ step.meta }}</small></div>
            </div>
          </div>

          <div v-if="showProgress" class="scene-progress">
            <div class="scene-progress__bad"><span :style="{ width: `${progress}%` }" /></div>
            <small>{{ progressLabel }}</small>
          </div>

          <div v-if="feedbackMessage" class="scene-inline-feedback" :class="`scene-inline-feedback--${feedbackTone}`">
            {{ feedbackMessage }}
          </div>

          <p v-if="view.note" class="scene-note">{{ view.note }}</p>

          <div v-if="expanded" class="scene-expanded">
            <strong>{{ expandedTitle }}</strong>
            <p>{{ expandedCopy }}</p>
          </div>
        </template>
      </div>

      <div class="scene-actions">
        <button type="button" class="scene-bad-primary" @click="handlePrimary">{{ actionLabel }}</button>
        <button
          v-if="view.secondary"
          type="button"
          class="scene-secondary"
          @click="handleSecondary"
        >{{ view.secondary }}</button>
      </div>

      <div v-if="toast" class="scene-toast" role="status">{{ toast }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import VarAlert from '@varlet/ui/es/alert/index.mjs'
import VarButton from '@varlet/ui/es/button/index.mjs'
import VarCell from '@varlet/ui/es/cell/index.mjs'
import VarChip from '@varlet/ui/es/chip/index.mjs'
import VarIcon from '@varlet/ui/es/icon/index.mjs'
import VarInput from '@varlet/ui/es/input/index.mjs'
import VarProgress from '@varlet/ui/es/progress/index.mjs'
import VarRadioGroup from '@varlet/ui/es/radio-group/index.mjs'
import VarSkeleton from '@varlet/ui/es/skeleton/index.mjs'
import VarSpace from '@varlet/ui/es/space/index.mjs'
import VarStep from '@varlet/ui/es/step/index.mjs'
import VarSteps from '@varlet/ui/es/steps/index.mjs'
import VarSwitch from '@varlet/ui/es/switch/index.mjs'
import '@varlet/ui/es/styles/common.css'
import '@varlet/ui/es/styles/elevation.css'
import '@varlet/ui/es/alert/style/index.mjs'
import '@varlet/ui/es/button/style/index.mjs'
import '@varlet/ui/es/cell/style/index.mjs'
import '@varlet/ui/es/chip/style/index.mjs'
import '@varlet/ui/es/icon/style/index.mjs'
import '@varlet/ui/es/input/style/index.mjs'
import '@varlet/ui/es/progress/style/index.mjs'
import '@varlet/ui/es/radio-group/style/index.mjs'
import '@varlet/ui/es/radio/style/index.mjs'
import '@varlet/ui/es/skeleton/style/index.mjs'
import '@varlet/ui/es/space/style/index.mjs'
import '@varlet/ui/es/step/style/index.mjs'
import '@varlet/ui/es/steps/style/index.mjs'
import '@varlet/ui/es/switch/style/index.mjs'
import { scenarioContent } from './scenario-content'
import type { ScenarioItem, ScenarioStep, ScenarioTone } from './scenario-content'

const props = defineProps<{
  sceneId: string
  side: 'good' | 'bad'
}>()

const content = scenarioContent[props.sceneId] ?? scenarioContent['role-task']
const view = computed(() => content[props.side])
const fieldValues = reactive<Record<string, string>>(Object.fromEntries((view.value.fields ?? []).map((field) => [field.label, field.value])))
const fieldErrors = reactive<Record<string, string>>({})
const roles = ['巡检', '值班', '管理']
const roleValue = ref(roles[0])
const roleIndex = computed({
  get: () => Math.max(0, roles.indexOf(roleValue.value)),
  set: (index: number) => { roleValue.value = roles[index] ?? roles[0] },
})
const selectedItem = ref(-1)
const stepIndex = ref(0)
const progress = ref(props.sceneId === 'crud-recovery' ? 66 : 35)
const busy = ref(false)
const expanded = ref(false)
const widePreview = ref(false)
const riskChecked = ref(false)
const overlayOpen = ref(false)
const conflictChoice = ref<'merge' | 'local' | ''>('')
const feedbackMessage = ref('')
const feedbackTone = ref<'info' | 'success' | 'danger'>('info')
const toast = ref('')
const uiStateIndex = ref(0)
const navigationDetail = ref(false)
const goodMounted = ref(false)
const denseMode = computed(() => content.pattern === 'density' && roleIndex.value === 1)

const conflictOptions = [
  { label: '合并两方记录', value: 'merge' },
  { label: '保留本机版本', value: 'local' },
]

onMounted(() => {
  requestAnimationFrame(() => {
    goodMounted.value = true
  })
})

/** Soft Structuralism + Material 3 水利青绿 */
const goodThemeVars = {
  '--hsl-primary': '168, 75%, 24%',
  '--color-primary': '#0f6b5c',
  '--hsl-on-primary': '0, 0%, 100%',
  '--color-on-primary': '#ffffff',
  '--hsl-primary-container': '160, 42%, 90%',
  '--color-primary-container': '#d8f0e9',
  '--hsl-on-primary-container': '168, 42%, 16%',
  '--color-on-primary-container': '#0f3d36',
  '--hsl-body': '150, 22%, 97%',
  '--color-body': '#f4f7f5',
  '--hsl-text': '200, 22%, 13%',
  '--color-text': '#15262c',
  '--hsl-surface-container': '0, 0%, 100%',
  '--color-surface-container': '#ffffff',
  '--hsl-surface-container-low': '150, 18%, 96%',
  '--color-surface-container-low': '#eef4f1',
  '--hsl-on-surface-variant': '180, 8%, 36%',
  '--color-on-surface-variant': '#56666b',
  '--hsl-outline': '170, 10%, 72%',
  '--color-outline': 'rgba(74, 98, 96, 0.12)',
  '--hsl-success': '160, 70%, 30%',
  '--color-success': '#0f7a5c',
  '--hsl-warning': '36, 90%, 44%',
  '--color-warning': '#c47a0a',
  '--hsl-danger': '4, 72%, 48%',
  '--color-danger': '#c0393b',
  '--hsl-info': '196, 70%, 38%',
  '--color-info': '#1d7fa8',
  '--button-border-radius': '999px',
  '--button-large-height': '48px',
  '--button-normal-height': '40px',
  '--button-large-font-size': '13px',
  '--chip-border-radius': '999px',
  '--chip-normal-height': '28px',
  '--chip-small-height': '26px',
  '--chip-small-font-size': '11px',
  '--alert-border-radius': '18px',
  '--alert-padding': '12px 13px',
  '--alert-title-font-size': '11px',
  '--alert-title-font-weight': '650',
  '--alert-icon-size': '16px',
  '--alert-icon-margin': '1px 8px 0 0',
  '--cell-font-size': '12px',
  '--cell-description-font-size': '10px',
  '--cell-padding': '13px 12px',
  '--cell-min-height': '58px',
  '--cell-description-color': '#56666b',
  '--input-input-height': '42px',
  '--field-decorator-line-border-radius': '16px',
  '--field-decorator-placeholder-size': '12px',
  '--field-decorator-blur-color': '#7a8b8f',
  '--field-decorator-focus-color': '#0f6b5c',
  '--step-tag-size': '24px',
  '--step-tag-font-size': '11px',
  '--step-content-font-size': '11px',
  '--step-content-margin': '2px 0 16px',
  '--progress-font-size': '10px',
  '--radio-icon-size': '18px',
  '--skeleton-content-padding': '12px',
  '--skeleton-content-border-radius': '20px',
  '--font-size-md': '12px',
  '--font-size-sm': '11px',
  '--font-size-xs': '10px',
}

const roleItems: Record<number, ScenarioItem[]> = {
  0: [
    { title: '南门水库溢洪道巡检', meta: '09:30 前 · 距离 1.2 km', status: '进行中', tone: 'info' },
    { title: '东干渠闸门复核', meta: '11:00 前 · 离线包已下载', status: '待开始', tone: 'neutral' },
  ],
  1: [
    { title: '北河站水位越警戒', meta: '持续 18 分钟 · 一级告警', status: '待确认', tone: 'danger' },
    { title: '泵站通讯波动', meta: '3 次重连 · 当前在线', status: '观察中', tone: 'warning' },
  ],
  2: [
    { title: '全域防汛态势', meta: '1 处高风险 · 3 处关注', status: '查看摘要', tone: 'warning' },
    { title: '联合调度审批', meta: '方案 B · 2 人已复核', status: '待批示', tone: 'info' },
  ],
}

const uiStates = [
  { text: '筛选无结果', tone: 'neutral' as ScenarioTone, item: { title: '没有符合条件的任务', meta: '高风险 · 今日 · 我的任务', status: '清除筛选' } },
  { text: '网络请求失败', tone: 'danger' as ScenarioTone, item: { title: '暂时无法刷新', meta: '上次数据仍可查看', status: '重试' } },
  { text: '暂无访问权限', tone: 'warning' as ScenarioTone, item: { title: '需要防汛值班权限', meta: '可向项目管理员申请', status: '申请权限' } },
  { text: '数据已经过期', tone: 'warning' as ScenarioTone, item: { title: '最后更新于 42 分钟前', meta: '请确认后再用于决策', status: '立即刷新' } },
]

const displayItems = computed<ScenarioItem[]>(() => {
  if ((content.pattern === 'role' || content.pattern === 'density') && props.side === 'good') return roleItems[roleIndex.value]
  if (content.pattern === 'states' && props.side === 'good') return [uiStates[uiStateIndex.value].item]
  if (content.pattern === 'navigation' && navigationDetail.value) {
    return [{ title: '北河站水位越线', meta: '详情页 · 状态与处置记录', status: '返回列表', tone: 'danger' }]
  }
  if (content.pattern === 'hierarchy' && expanded.value && props.side === 'good') {
    return [
      ...(view.value.items ?? []),
      { title: '设备详情', meta: '编码 G-002 · 责任人王工 · 固件 1.3.2', status: '已展开', tone: 'info' },
    ]
  }
  return view.value.items ?? []
})

const displayStatus = computed(() => {
  if (content.pattern === 'role' && props.side === 'good') return `${roles[roleIndex.value]}模式 · ${roleItems[roleIndex.value].length} 项优先工作`
  if (content.pattern === 'density' && props.side === 'good') return `当前：${roles[roleIndex.value]} · ${denseMode.value ? '标准密度' : '舒适密度'}`
  if (content.pattern === 'states' && props.side === 'good') return uiStates[uiStateIndex.value].text
  if (content.pattern === 'offline' && stepIndex.value > 0 && props.side === 'good') return stepIndex.value > 1 ? '3 项已得到服务端确认' : '网络已恢复 · 正在同步 3 项'
  if (content.pattern === 'alarm' && stepIndex.value > 0 && props.side === 'good') return stepIndex.value > 1 ? '处置中 · 王工负责' : '已确认 · 准备处置'
  if (content.pattern === 'command' && progress.value >= 100 && props.side === 'good') return '设备遥信已确认目标开度 45%'
  return view.value.status
})

const displayStatusTone = computed<ScenarioTone>(() => {
  if (content.pattern === 'states' && props.side === 'good') return uiStates[uiStateIndex.value].tone
  if (['offline', 'alarm'].includes(content.pattern) && stepIndex.value > 1 && props.side === 'good') return 'success'
  if (content.pattern === 'command' && progress.value >= 100 && props.side === 'good') return 'success'
  return view.value.statusTone ?? 'neutral'
})

const dynamicSteps = computed<ScenarioStep[]>(() => (view.value.steps ?? []).map((step, index) => {
  if (!['alarm', 'command'].includes(content.pattern) || props.side === 'bad') return step
  if (index < stepIndex.value + 1) return { ...step, state: 'done' as const }
  if (index === stepIndex.value + 1) return { ...step, state: 'active' as const }
  return { ...step, state: 'waiting' as const }
}))

const activeStepIndex = computed(() => {
  const steps = dynamicSteps.value
  const active = steps.findIndex((step) => step.state === 'active')
  if (active >= 0) return active
  const done = steps.filter((step) => step.state === 'done').length
  return Math.max(0, done - 1)
})

const showProgress = computed(() => ['offline', 'command', 'upload'].includes(content.pattern))
const progressLabel = computed(() => {
  if (content.pattern === 'offline') return progress.value >= 100 ? '服务端已确认全部记录' : `${progress.value}% · 保留本地副本`
  if (content.pattern === 'upload') return progress.value >= 100 ? '3/3 项已同步' : '2/3 项完成 · 失败项可单独重试'
  return progress.value >= 100 ? '设备遥信已确认' : '等待设备执行与回执'
})

const actionLabel = computed(() => {
  if (content.pattern === 'navigation' && navigationDetail.value) return props.side === 'good' ? '返回并恢复列表位置' : '返回系统首页'
  if (content.pattern === 'command' && progress.value >= 100) return '查看最终回执'
  if (content.pattern === 'upload' && progress.value >= 100) return '完成并返回任务'
  if (content.pattern === 'offline' && progress.value >= 100) return '查看服务端记录'
  return view.value.primary
})

const expandedTitle = computed(() => {
  if (content.pattern === 'timeline') return '审计详情：设备遥信 T-884'
  if (content.pattern === 'data') return '图表语义已展开'
  if (content.pattern === 'hierarchy') return '完整信息进入详情层'
  return '操作结果'
})

const expandedCopy = computed(() => {
  if (content.pattern === 'timeline') return '执行人李工，现场定位 31.23, 121.47；目标开度 45%，设备反馈 45%。'
  if (content.pattern === 'data') return '横轴为今日时间，纵轴单位为 m；橙色虚线表示警戒水位 29.20 m。'
  if (content.pattern === 'hierarchy') return '列表保持可扫描，设备编码、责任人和固件信息只在需要时出现。'
  return feedbackMessage.value || '当前状态已经更新。'
})

watch(roleValue, () => {
  selectedItem.value = -1
})

function toneToVarlet(tone?: ScenarioTone) {
  if (tone === 'danger') return 'danger'
  if (tone === 'warning') return 'warning'
  if (tone === 'success') return 'success'
  if (tone === 'info') return 'info'
  return 'default'
}

function toneToAlert(tone?: ScenarioTone) {
  if (tone === 'danger') return 'danger'
  if (tone === 'warning') return 'warning'
  if (tone === 'success') return 'success'
  if (tone === 'info') return 'info'
  return 'info'
}

function showFeedback(message: string, tone: 'info' | 'success' | 'danger' = 'success') {
  feedbackMessage.value = message
  feedbackTone.value = tone
}

function showToast(message: string) {
  toast.value = message
  window.setTimeout(() => { toast.value = '' }, 1800)
}

function validateForm() {
  Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key])
  const editable = (view.value.fields ?? []).filter((field) => !field.value)
  editable.forEach((field) => {
    if (!fieldValues[field.label]?.trim()) fieldErrors[field.label] = props.side === 'good' ? '请完成此项，已保留其他输入' : '错误'
  })
  if (!Object.keys(fieldErrors).length) showFeedback('校验通过，草稿已保存')
}

function handlePrimary() {
  switch (content.pattern) {
    case 'role':
    case 'density':
      roleIndex.value = (roleIndex.value + 1) % roles.length
      break
    case 'tasks':
      showFeedback(props.side === 'good' ? '已进入最高优先级事件' : '仍需在功能树中继续查找', props.side === 'good' ? 'success' : 'danger')
      break
    case 'metric':
      showFeedback(props.side === 'good' ? '数据已刷新：09:43，遥测正常' : '数字刷新，但仍无法判断来源')
      break
    case 'incident':
      showFeedback(props.side === 'good' ? '告警已确认，责任人更新为当前用户' : '已进入大屏，异常仍未确认', props.side === 'good' ? 'success' : 'danger')
      break
    case 'field':
      stepIndex.value += 1
      showFeedback(props.side === 'good' ? `已进入检查步骤 ${Math.min(stepIndex.value + 2, 5)}/5` : '小图标命中失败，请重新点击', props.side === 'good' ? 'success' : 'danger')
      break
    case 'capture':
      if (props.side === 'good') {
        fieldValues['异常描述'] = '闸门反馈开度与指令不一致'
        showFeedback('扫码、定位和照片已回填，请核验后提交')
      } else showToast('请先完整填写全部字段')
      break
    case 'offline':
      stepIndex.value += 1
      progress.value = Math.min(100, progress.value + 40)
      if (props.side === 'bad') showToast('提交成功（实际未同步）')
      break
    case 'alarm':
      stepIndex.value = Math.min(2, stepIndex.value + 1)
      if (props.side === 'bad') showToast('知道了')
      break
    case 'command':
      progress.value = Math.min(100, progress.value + 35)
      stepIndex.value = Math.min(3, stepIndex.value + 1)
      if (props.side === 'bad') showToast('成功')
      break
    case 'risk':
      if (props.side === 'good') overlayOpen.value = true
      else showToast('指令已立即下发')
      break
    case 'conflict':
      if (props.side === 'good' && conflictChoice.value) showFeedback(`已选择：${conflictChoice.value === 'merge' ? '合并两方记录' : '保留本机版本'}`)
      else showFeedback(props.side === 'good' ? '请先选择冲突处理方式' : '表单已清空', 'danger')
      break
    case 'timeline':
      expanded.value = !expanded.value
      break
    case 'responsive':
      widePreview.value = !widePreview.value
      break
    case 'shell':
      busy.value = true
      window.setTimeout(() => {
        busy.value = false
        showFeedback(props.side === 'good' ? '列表原位更新，没有布局跳动' : '整页重载完成，滚动位置已丢失', props.side === 'good' ? 'success' : 'danger')
      }, 700)
      break
    case 'navigation':
      navigationDetail.value = !navigationDetail.value
      if (!navigationDetail.value) showFeedback(props.side === 'good' ? '已恢复：高风险筛选 · 第 3 项' : '已回到首页，筛选和位置丢失', props.side === 'good' ? 'success' : 'danger')
      break
    case 'hierarchy':
      expanded.value = !expanded.value
      break
    case 'touch':
      showFeedback(props.side === 'good' ? '48px 热区已命中' : '误触了相邻“删除”', props.side === 'good' ? 'success' : 'danger')
      break
    case 'form':
      validateForm()
      break
    case 'states':
      uiStateIndex.value = (uiStateIndex.value + 1) % uiStates.length
      break
    case 'feedback':
      if (props.side === 'good') {
        fieldErrors['异常描述'] = '至少输入 5 个字，照片 2 可单独重试'
        showFeedback('页面保留全部内容，请修正标记项', 'danger')
      } else showToast('操作失败')
      break
    case 'actions':
      showFeedback(props.side === 'good' ? '告警已确认，正在建立处置记录' : '无法判断执行了哪个同权操作', props.side === 'good' ? 'success' : 'danger')
      break
    case 'upload':
      progress.value = Math.min(100, progress.value + 34)
      showFeedback(props.side === 'good' ? '仅重试失败附件，表单未重复提交' : '再次创建了一条重复记录', props.side === 'good' ? 'success' : 'danger')
      break
    case 'data':
      expanded.value = !expanded.value
      break
    default:
      showFeedback('状态已更新')
  }
}

function handleSecondary() {
  showFeedback(props.side === 'good' ? '次级操作已打开，主任务保持不变' : '次级操作与主操作没有层级', props.side === 'good' ? 'info' : 'danger')
}

function confirmRisk() {
  overlayOpen.value = false
  progress.value = 60
  showFeedback('身份已复核，指令已发送；等待设备回执', 'info')
}
</script>
