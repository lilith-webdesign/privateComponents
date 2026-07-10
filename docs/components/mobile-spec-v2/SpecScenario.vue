<template>
  <div
    class="spec-phone-page"
    :class="[`spec-phone-page--${side}`, `spec-phone-page--${content.pattern}`, { 'is-wide-preview': widePreview }]"
    :data-scene="sceneId"
    :data-side="side"
  >
    <div class="spec-phone-appbar">
      <span class="spec-phone-appbar__context">{{ view.context }}</span>
      <strong>{{ view.title }}</strong>
      <span class="spec-phone-appbar__more" aria-hidden="true">•••</span>
    </div>

    <div class="spec-phone-body">
      <div v-if="content.pattern === 'role' || content.pattern === 'density'" class="scene-role-switch">
        <template v-if="side === 'good'">
          <VarChip
            v-for="(role, index) in roles"
            :key="role"
            size="small"
            :type="roleIndex === index ? 'primary' : 'default'"
            :plain="roleIndex !== index"
            @click="roleIndex = index"
          >{{ role }}</VarChip>
        </template>
        <template v-else>
          <button v-for="role in roles" :key="role" type="button">{{ role }}</button>
        </template>
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
        <template v-if="side === 'good'">
          <div v-for="index in 3" :key="index" class="scene-shell-loading__row">
            <span /><span />
          </div>
        </template>
        <div v-else class="scene-shell-loading__spinner">Loading...</div>
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
          <span>{{ side === 'good' ? '警戒线 29.20 m' : '未标注曲线' }}</span>
        </div>

        <div v-if="view.fields?.length" class="scene-form" :class="{ 'scene-form--bad': side === 'bad' }">
          <label v-for="field in view.fields" :key="field.label">
            <span>{{ field.label }}</span>
            <VarInput
              v-if="side === 'good'"
              v-model="fieldValues[field.label]"
              size="small"
              variant="outlined"
              :type="field.label.includes('开度') ? 'number' : 'text'"
              :inputmode="field.label.includes('开度') ? 'decimal' : 'text'"
              :placeholder="field.placeholder"
              :readonly="Boolean(field.value)"
            />
            <input
              v-else
              v-model="fieldValues[field.label]"
              :placeholder="field.placeholder || field.label"
            >
            <small v-if="fieldErrors[field.label]" class="scene-field-error">{{ fieldErrors[field.label] }}</small>
          </label>
        </div>

        <div v-if="displayItems.length" class="scene-list" :class="{ 'scene-list--dense': side === 'bad' || denseMode }">
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
            <VarChip
              v-if="side === 'good' && item.status"
              class="scene-list-item__chip"
              size="mini"
              :type="toneToVarlet(item.tone)"
              :plain="item.tone === 'neutral' || !item.tone"
            >{{ item.status }}</VarChip>
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
          <VarProgress
            v-if="side === 'good'"
            :value="progress"
            :color="progress >= 100 ? '#087f5b' : '#006b5f'"
            track-color="#dce8e5"
            line-width="7"
          />
          <div v-else class="scene-progress__bad"><span :style="{ width: `${progress}%` }" /></div>
          <small>{{ progressLabel }}</small>
        </div>

        <div v-if="content.pattern === 'risk' && side === 'good'" class="scene-risk-consent">
          <span>我已核对对象、目标值和影响范围</span>
          <VarSwitch v-model="riskChecked" size="22" color="#006b5f" />
        </div>

        <div v-if="content.pattern === 'conflict' && side === 'good'" class="scene-conflict-choice">
          <button
            type="button"
            :class="{ 'is-active': conflictChoice === 'merge' }"
            @click="conflictChoice = 'merge'"
          >合并两方记录</button>
          <button
            type="button"
            :class="{ 'is-active': conflictChoice === 'local' }"
            @click="conflictChoice = 'local'"
          >保留本机版本</button>
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
      <VarButton
        v-if="side === 'good'"
        block
        type="primary"
        size="normal"
        :loading="busy"
        :disabled="content.pattern === 'risk' && !riskChecked"
        color="#006b5f"
        @click="handlePrimary"
      >{{ actionLabel }}</VarButton>
      <button v-else type="button" class="scene-bad-primary" @click="handlePrimary">{{ actionLabel }}</button>

      <button
        v-if="view.secondary"
        type="button"
        class="scene-secondary"
        @click="handleSecondary"
      >{{ view.secondary }}</button>
    </div>

    <div v-if="overlayOpen" class="scene-overlay" role="dialog" aria-modal="true" aria-label="操作确认">
      <div class="scene-overlay__sheet">
        <span>最终确认</span>
        <strong>调整东干渠 2# 闸门至 45%</strong>
        <p>当前开度 12%，实时状态更新于 09:42:18。执行后影响下游一、二灌区。</p>
        <div>
          <button type="button" @click="overlayOpen = false">返回复核</button>
          <button type="button" @click="confirmRisk">确认身份并下发</button>
        </div>
      </div>
    </div>

    <div v-if="toast" class="scene-toast" role="status">{{ toast }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import VarButton from '@varlet/ui/es/button/index.mjs'
import VarChip from '@varlet/ui/es/chip/index.mjs'
import VarInput from '@varlet/ui/es/input/index.mjs'
import VarProgress from '@varlet/ui/es/progress/index.mjs'
import VarSwitch from '@varlet/ui/es/switch/index.mjs'
import '@varlet/ui/es/button/style/index.mjs'
import '@varlet/ui/es/chip/style/index.mjs'
import '@varlet/ui/es/input/style/index.mjs'
import '@varlet/ui/es/progress/style/index.mjs'
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
const roleIndex = ref(0)
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
const denseMode = computed(() => content.pattern === 'density' && roleIndex.value === 1)

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

function toneToVarlet(tone?: ScenarioTone) {
  if (tone === 'danger') return 'danger'
  if (tone === 'warning') return 'warning'
  if (tone === 'success') return 'success'
  if (tone === 'info') return 'info'
  return 'default'
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
