<template>
  <main
    class="charts-demo overflow-x-hidden w-full max-w-full"
    :class="[
      `style-${visualStyle}`,
      { 'is-dark': mode === 'dark', 'is-premium': isPremium },
    ]"
  >
    <div class="charts-demo__ambient" aria-hidden="true">
      <div class="orb orb-a" />
      <div class="orb orb-b" />
    </div>

    <!-- Premium product chrome: floating app bar -->
    <nav v-if="isPremium" class="pro-nav" aria-label="Premium product bar">
      <div class="pro-nav__brand">
        <span class="pro-nav__mark" aria-hidden="true" />
        <div class="pro-nav__brand-text">
          <strong>Hydroline</strong>
          <span>Chart System</span>
        </div>
      </div>
      <div
        class="charts-demo__style-switch pro-nav__switch"
        role="tablist"
        aria-label="图表视觉风格"
      >
        <button
          v-for="s in styleMeta"
          :key="s.id"
          type="button"
          role="tab"
          class="charts-demo__style-btn"
          :class="{ 'is-active': visualStyle === s.id }"
          :aria-selected="visualStyle === s.id"
          @click="setVisualStyle(s.id)"
        >
          <span class="charts-demo__style-btn-label">{{ s.label }}</span>
        </button>
      </div>
      <div class="pro-nav__meta">
        <span class="pro-nav__live"><i /> Live</span>
        <span>{{ mode === 'dark' ? 'Dark' : 'Light' }}</span>
      </div>
    </nav>

    <!-- Hero -->
    <header class="charts-demo__hero" :class="{ 'charts-demo__hero--pro': isPremium }">
      <div class="charts-demo__hero-inner">
        <p class="charts-demo__eyebrow">{{ activeStyleMeta.labelEn }} · Water Conservancy</p>
        <h1 class="charts-demo__title">
          <template v-if="isPremium">数据，像产品一样被设计。</template>
          <template v-else>水利信息化数据图表体系</template>
        </h1>
        <p class="charts-demo__lead">
          <template v-if="isPremium">
            同一调色盘，三种呈现语言。Premium 用焦点舞台、指标轨与全宽图行，
            而不是卡片墙。
          </template>
          <template v-else>
            同一全局调色盘下的三种视觉风格：液态玻璃、Premium、工业大屏。
            风格切换只刷新图表呈现，不改业务色板。
          </template>
        </p>

        <div v-if="!isPremium" class="charts-demo__status-row">
          <p class="charts-demo__mode-tag" :data-mode="mode">
            主题 · {{ mode === 'dark' ? 'Dark / 大屏' : 'Light / 文档' }}
          </p>
          <p class="charts-demo__style-tag">
            风格 · {{ activeStyleMeta.label }}
          </p>
        </div>

        <div
          v-if="!isPremium"
          class="charts-demo__style-switch"
          role="tablist"
          aria-label="图表视觉风格"
        >
          <button
            v-for="s in styleMeta"
            :key="s.id"
            type="button"
            role="tab"
            class="charts-demo__style-btn"
            :class="{ 'is-active': visualStyle === s.id }"
            :aria-selected="visualStyle === s.id"
            @click="setVisualStyle(s.id)"
          >
            <span class="charts-demo__style-btn-label">{{ s.label }}</span>
            <span class="charts-demo__style-btn-desc">{{ s.desc }}</span>
          </button>
        </div>

        <div class="charts-demo__hero-actions">
          <a href="#gallery" class="charts-demo__btn charts-demo__btn--primary group">
            <span>{{ isPremium ? '查看图表' : '浏览图表' }}</span>
            <span class="charts-demo__btn-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M7 17L17 7M17 7H9M17 7v8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
          <a v-if="!isPremium" href="#palette" class="charts-demo__btn charts-demo__btn--ghost">
            查看调色盘
          </a>
        </div>
      </div>
    </header>

    <!-- Featured stage: first chart is the product hero visual -->
    <section
      v-if="featured"
      class="charts-demo__stage"
      :class="{ 'charts-demo__stage--pro': isPremium }"
      aria-label="焦点图表"
    >
      <article class="glass-card glass-card--chart glass-card--featured">
        <div class="glass-card__shine" aria-hidden="true" />
        <div class="glass-card__tint" aria-hidden="true" />
        <div class="glass-card__body glass-card__body--chart">
          <header class="charts-demo__card-head charts-demo__card-head--featured">
            <div class="charts-demo__card-head-main">
              <div class="charts-demo__card-kicker">
                <span class="charts-demo__domain">{{ featured.domain }}</span>
                <span v-if="isPremium" class="charts-demo__live-dot">Realtime</span>
              </div>
              <h3 class="charts-demo__card-title">{{ featured.title }}</h3>
              <p class="charts-demo__card-sub">{{ featured.subtitle }}</p>
            </div>
            <div v-if="isPremium" class="charts-demo__feature-stats">
              <div>
                <span>Peak</span>
                <strong>121.1 m</strong>
              </div>
              <div>
                <span>Limit</span>
                <strong>121.5 m</strong>
              </div>
              <div>
                <span>Trend</span>
                <strong class="is-down">-0.4</strong>
              </div>
            </div>
            <button
              v-else
              type="button"
              class="charts-demo__code-toggle"
              @click="toggleCode(featured.id)"
            >
              {{ openCode[featured.id] ? '收起' : '配置' }}
            </button>
          </header>

          <div
            :ref="(el) => setChartRef(featured.id, el)"
            class="charts-demo__chart charts-demo__chart--featured"
            :style="{ height: isPremium ? '420px' : `${featured.height}px` }"
            role="img"
            :aria-label="featured.title"
          />
        </div>
      </article>
    </section>

    <!-- KPI: cards for liquid/industrial, metrics rail for premium -->
    <section
      class="charts-demo__kpi"
      :class="{ 'charts-demo__kpi--rail': isPremium }"
      aria-label="关键运行指标"
    >
      <div
        v-for="kpi in kpis"
        :key="kpi.label"
        class="glass-card glass-card--kpi"
      >
        <div class="glass-card__shine" aria-hidden="true" />
        <div class="glass-card__body">
          <span class="charts-demo__kpi-label">{{ kpi.label }}</span>
          <div class="charts-demo__kpi-value-row">
            <span class="charts-demo__kpi-value">{{ kpi.value }}</span>
            <span class="charts-demo__kpi-unit">{{ kpi.unit }}</span>
          </div>
          <span
            class="charts-demo__kpi-delta"
            :class="`is-${kpi.tone}`"
          >{{ kpi.delta }}</span>
        </div>
      </div>
    </section>

    <!-- Palette: compact in premium, full otherwise -->
    <section
      v-if="!isPremium"
      id="palette"
      class="charts-demo__section"
    >
      <div class="charts-demo__section-head">
        <div>
          <p class="charts-demo__eyebrow">Global Palette</p>
          <h2 class="charts-demo__h2">全局图表调色盘</h2>
        </div>
        <p class="charts-demo__section-desc">
          与品牌主色 <code>#002FA7</code> 对齐。三种视觉风格共享同一调色盘，只改变呈现参数。
        </p>
      </div>

      <div class="glass-card glass-card--wide">
        <div class="glass-card__shine" aria-hidden="true" />
        <div class="glass-card__body glass-card__body--pad">
          <div class="charts-demo__swatches">
            <div
              v-for="sw in swatches"
              :key="sw.hex + sw.name"
              class="charts-demo__swatch"
            >
              <div
                class="charts-demo__swatch-chip"
                :style="{ background: sw.hex }"
              />
              <div class="charts-demo__swatch-meta">
                <span class="charts-demo__swatch-name">{{ sw.name }}</span>
                <span class="charts-demo__swatch-role">{{ sw.role }}</span>
                <code class="charts-demo__swatch-hex">{{ sw.hex }}</code>
              </div>
            </div>
          </div>
          <div class="charts-demo__series-row">
            <span class="charts-demo__series-label">Series · 12</span>
            <div class="charts-demo__series-bars">
              <div
                v-for="(c, i) in series"
                :key="c"
                class="charts-demo__series-bar"
                :style="{ background: c }"
                :title="`${i + 1}. ${c}`"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery: bento for liquid/industrial, full-width rows for premium -->
    <section id="gallery" class="charts-demo__section charts-demo__section--gallery">
      <div class="charts-demo__section-head">
        <div>
          <p class="charts-demo__eyebrow">{{ isPremium ? 'Library' : 'Business Gallery' }}</p>
          <h2 class="charts-demo__h2">
            {{ isPremium ? '全部业务图表' : '业务图表配置示例' }}
          </h2>
        </div>
        <p class="charts-demo__section-desc">
          当前 <strong>{{ activeStyleMeta.label }}</strong>：{{ activeStyleMeta.desc }}
        </p>
      </div>

      <div
        class="charts-demo__bento"
        :class="{ 'charts-demo__bento--rows': isPremium }"
      >
        <article
          v-for="(item, index) in restCatalog"
          :key="item.id"
          class="glass-card glass-card--chart"
          :class="isPremium ? 'span-hero' : `span-${item.span}`"
          :style="{ '--enter-delay': `${Math.min(index * 35, 420)}ms` }"
        >
          <div class="glass-card__shine" aria-hidden="true" />
          <div class="glass-card__tint" aria-hidden="true" />
          <div class="glass-card__body glass-card__body--chart">
            <header class="charts-demo__card-head">
              <div class="charts-demo__card-head-main">
                <span class="charts-demo__domain">{{ item.domain }}</span>
                <h3 class="charts-demo__card-title">{{ item.title }}</h3>
                <p class="charts-demo__card-sub">{{ item.subtitle }}</p>
              </div>
              <button
                type="button"
                class="charts-demo__code-toggle"
                @click="toggleCode(item.id)"
              >
                {{ openCode[item.id] ? '收起' : '配置' }}
              </button>
            </header>

            <div
              :ref="(el) => setChartRef(item.id, el)"
              class="charts-demo__chart"
              :style="{ height: `${isPremium ? Math.max(item.height, 300) : item.height}px` }"
              role="img"
              :aria-label="item.title"
            />

            <Transition name="code-slide">
              <div v-if="openCode[item.id]" class="charts-demo__snippet">
                <div class="charts-demo__snippet-bar">
                  <span>{{ item.id }}.option</span>
                  <button type="button" @click="copySnippet(item.id)">复制</button>
                </div>
                <pre><code>{{ snippetOf(item.id) }}</code></pre>
              </div>
            </Transition>
          </div>
        </article>
      </div>
    </section>

    <footer class="charts-demo__footer">
      <div class="charts-demo__footer-inner">
        <p>
          <code>getChartOption(id, echarts, mode, style)</code>
          · style: <code>liquid | premium | industrial</code>
        </p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, computed, nextTick } from 'vue'
import * as echarts from 'echarts'
import {
  type ChartMode,
  PALETTE_SWATCHES_LIGHT,
  PALETTE_SWATCHES_DARK,
  getTheme,
  detectChartMode,
  registerWaterThemes,
} from './water-palette'
import { CHART_CATALOG, KPI_STRIP } from './chart-meta'
import { getChartOption } from './chart-options'
import { type VisualStyle, STYLE_META } from './chart-style'

const catalog = CHART_CATALOG
const kpis = KPI_STRIP
const mode = ref<ChartMode>('light')
const visualStyle = ref<VisualStyle>('liquid')
const styleMeta = STYLE_META
const activeStyleMeta = computed(
  () => STYLE_META.find((s) => s.id === visualStyle.value) || STYLE_META[0],
)
const isPremium = computed(() => visualStyle.value === 'premium')
const featured = computed(() => catalog[0] || null)
const restCatalog = computed(() => catalog.slice(1))

const swatches = computed(() =>
  mode.value === 'dark' ? PALETTE_SWATCHES_DARK : PALETTE_SWATCHES_LIGHT,
)
const series = computed(() => getTheme(mode.value).series)

const openCode = reactive<Record<string, boolean>>({})
const chartEls: Record<string, HTMLElement | null> = {}
/** 实例只 init 一次，主题/风格切换仅 setOption，避免 0 尺寸 DOM 崩溃 */
const instanceMap = new Map<string, echarts.ECharts>()
let ro: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null
let themeTimer: ReturnType<typeof setTimeout> | null = null
let themesReady = false

function snippetFor(id: string) {
  return `getChartOption('${id}', echarts, mode, style)`
}

const SNIPPETS: Record<string, string> = Object.fromEntries(
  catalog.map((c) => [c.id, snippetFor(c.id)]),
)

function setChartRef(id: string, el: unknown) {
  chartEls[id] = (el as HTMLElement) || null
}

function toggleCode(id: string) {
  openCode[id] = !openCode[id]
}

function snippetOf(id: string) {
  return SNIPPETS[id] || snippetFor(id)
}

function setVisualStyle(next: VisualStyle) {
  if (next === visualStyle.value) return
  visualStyle.value = next
  // Premium 会改 DOM 结构（顶栏/焦点台/全宽行），等布局落稳再刷 option + resize
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      refreshChartOptions(mode.value, next)
      setTimeout(() => {
        refreshChartOptions(mode.value, next)
        instanceMap.forEach((c) => {
          try {
            c.resize()
          } catch {
            /* ignore */
          }
        })
      }, 100)
    })
  })
}

async function copySnippet(id: string) {
  try {
    await navigator.clipboard.writeText(snippetOf(id))
  } catch {
    /* ignore */
  }
}

function ensureThemes() {
  if (themesReady) return
  try {
    registerWaterThemes(echarts)
    themesReady = true
  } catch {
    themesReady = true
  }
}

function isReadyDom(el: HTMLElement) {
  return el.clientWidth > 0 && el.clientHeight > 0
}

function getOrCreateChart(id: string, el: HTMLElement) {
  const existing = instanceMap.get(id)
  if (existing && !existing.isDisposed()) return existing

  if (!isReadyDom(el)) return null

  // 不绑定 echarts theme 名：option 已含完整样式，避免切换主题 dispose 重建
  const chart = echarts.init(el, undefined, { renderer: 'canvas' })
  instanceMap.set(id, chart)
  return chart
}

/** 首次初始化或补齐未创建成功的实例 */
function initCharts() {
  ensureThemes()

  for (const item of catalog) {
    const el = chartEls[item.id]
    if (!el) continue
    const chart = getOrCreateChart(item.id, el)
    if (!chart) continue
    const option = getChartOption(item.id, echarts, mode.value, visualStyle.value)
    if (option) {
      chart.setOption(option, true)
      chart.resize()
    }
  }

  if (!ro) {
    ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        const id = Object.keys(chartEls).find((k) => chartEls[k] === el)
        if (!id) continue
        if (!isReadyDom(el)) continue
        let chart = instanceMap.get(id)
        if (!chart || chart.isDisposed()) {
          chart = getOrCreateChart(id, el) || undefined
          if (!chart) continue
          try {
            const option = getChartOption(id, echarts, mode.value, visualStyle.value)
            if (option) chart.setOption(option, true)
          } catch {
            /* ignore */
          }
        }
        chart.resize()
      }
    })
  }
  // 每次 init 都补 observe（幂等）
  Object.values(chartEls).forEach((el) => {
    if (el) ro?.observe(el)
  })
}

/** 主题/风格切换后，对「当时尺寸为 0」的实例在变可见时补刷 */
function refreshStaleCharts() {
  for (const item of catalog) {
    const el = chartEls[item.id]
    if (!el || !isReadyDom(el)) continue
    const chart = instanceMap.get(item.id)
    if (!chart || chart.isDisposed()) continue
    try {
      const option = getChartOption(item.id, echarts, mode.value, visualStyle.value)
      if (option) chart.setOption(option, { notMerge: true })
      chart.resize()
    } catch {
      /* ignore */
    }
  }
}

/** 主题/风格切换：只 setOption，绝不 dispose（dispose 时 DOM 可能为 0 导致整页异常） */
function refreshChartOptions(current: ChartMode, style: VisualStyle = visualStyle.value) {
  ensureThemes()
  for (const item of catalog) {
    const el = chartEls[item.id]
    if (!el || !isReadyDom(el)) continue
    const chart = getOrCreateChart(item.id, el)
    if (!chart) continue
    const option = getChartOption(item.id, echarts, current, style)
    if (option) {
      try {
        chart.setOption(option, { notMerge: true, lazyUpdate: false })
        chart.resize()
      } catch {
        /* 单图失败不拖垮整页 */
      }
    }
  }
  // 布局稳定后再扫一遍，补刷切换瞬间尺寸为 0 的图
  requestAnimationFrame(() => {
    setTimeout(() => refreshStaleCharts(), 80)
  })
}

function disposeCharts() {
  if (themeTimer) {
    clearTimeout(themeTimer)
    themeTimer = null
  }
  ro?.disconnect()
  ro = null
  instanceMap.forEach((c) => {
    try {
      c.dispose()
    } catch {
      /* ignore */
    }
  })
  instanceMap.clear()
}

function onThemeClassChange() {
  // 防抖：VitePress 切换 class 可能连触发多次
  if (themeTimer) clearTimeout(themeTimer)
  themeTimer = setTimeout(() => {
    const next = detectChartMode()
    if (next === mode.value) return
    mode.value = next
    // 等布局稳定后再刷新 option
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        refreshChartOptions(next)
      })
    })
  }, 50)
}

onMounted(async () => {
  await nextTick()
  mode.value = detectChartMode()

  // 双 rAF：等 bento 布局完成，避免 clientWidth=0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initCharts()
      // 部分卡首次可能仍为 0，延迟补一次
      setTimeout(() => initCharts(), 120)
    })
  })

  themeObserver = new MutationObserver(() => {
    onThemeClassChange()
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
  themeObserver = null
  disposeCharts()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

.charts-demo {
  --ink: #0b1b33;
  --ink-soft: #3d5270;
  --ink-faint: #7b90a8;
  --brand: #002fa7;
  --brand-soft: #1b6bff;
  --ease: cubic-bezier(0.32, 0.72, 0, 1);
  --glass-bg: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.42) 42%,
    rgba(230, 242, 255, 0.38) 100%
  );
  --glass-border: rgba(255, 255, 255, 0.72);
  --glass-border-outer: rgba(255, 255, 255, 0.35);
  --glass-shadow:
    0 4px 24px rgba(11, 45, 90, 0.06),
    0 18px 48px rgba(11, 45, 90, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    inset 0 -1px 0 rgba(11, 45, 90, 0.04);
  position: relative;
  /* 禁止 isolation/stacking 把装饰层抬到内容之上 */
  font-family: Outfit, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: var(--ink);
  background: transparent;
  padding-bottom: 4.5rem;
  min-height: 100%;
}

/* ========== Ambient：只做背景光斑，绝不盖住内容 ========== */
.charts-demo__ambient {
  pointer-events: none !important;
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: orb-drift 22s var(--ease) infinite alternate;
}

.orb-a {
  width: min(52vw, 640px);
  height: min(52vw, 640px);
  top: -8%;
  left: -6%;
  background: radial-gradient(circle, rgba(27, 107, 255, 0.42) 0%, rgba(27, 107, 255, 0) 70%);
  animation-duration: 26s;
}

.orb-b {
  width: min(44vw, 520px);
  height: min(44vw, 520px);
  top: 12%;
  right: -8%;
  background: radial-gradient(circle, rgba(0, 180, 216, 0.38) 0%, rgba(0, 180, 216, 0) 70%);
  animation-duration: 30s;
  animation-delay: -6s;
}

.orb-c {
  width: min(48vw, 560px);
  height: min(48vw, 560px);
  bottom: 18%;
  left: 22%;
  background: radial-gradient(circle, rgba(20, 201, 168, 0.28) 0%, rgba(20, 201, 168, 0) 70%);
  animation-duration: 28s;
  animation-delay: -12s;
}

.orb-d {
  width: min(36vw, 400px);
  height: min(36vw, 400px);
  top: 48%;
  right: 18%;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.26) 0%, rgba(129, 140, 248, 0) 70%);
  animation-duration: 24s;
  animation-delay: -3s;
}

/* 全屏 blend 层是黑屏元凶之一：默认禁用 */
.caustic,
.grain {
  display: none;
}

@keyframes orb-drift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(24px, 18px, 0) scale(1.06); }
}

/* 内容层永远在 ambient 之上 */
.charts-demo > *:not(.charts-demo__ambient) {
  position: relative;
  z-index: 2;
}

/* ========== Card ========== */
.glass-card {
  position: relative;
  border-radius: 1.65rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(22px) saturate(1.55);
  -webkit-backdrop-filter: blur(22px) saturate(1.55);
  overflow: hidden;
  transition:
    transform 0.65s var(--ease),
    box-shadow 0.65s var(--ease),
    border-color 0.65s var(--ease);
}

/*
 * 关键：旧版 ::before 用 mask 做边框，但 z-index:3 压在 body 上；
 * mask 一旦失效/不兼容，整张卡会被伪元素盖成黑块。
 * 现改为简单边框，禁止任何压在内容上的全卡伪元素。
 */
.glass-card::before,
.glass-card::after {
  content: none !important;
  display: none !important;
}

/* 装饰高光：必须在 body 之下，且不接收事件 */
.glass-card__shine {
  position: absolute;
  top: -40%;
  left: -20%;
  width: 70%;
  height: 70%;
  background: radial-gradient(
    ellipse at 30% 20%,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.1) 35%,
    transparent 70%
  );
  pointer-events: none !important;
  z-index: 0;
  opacity: 0.85;
}

.glass-card__tint {
  position: absolute;
  inset: auto -10% -30% auto;
  width: 55%;
  height: 55%;
  background: radial-gradient(circle, rgba(27, 107, 255, 0.1) 0%, transparent 70%);
  pointer-events: none !important;
  z-index: 0;
}

/* 内容与图表：最高层 */
.glass-card__body {
  position: relative;
  z-index: 1;
}

.glass-card__body--pad {
  padding: 1.35rem;
}

.glass-card__body--chart {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.05rem 1.1rem 0.85rem;
}

@media (min-width: 768px) {
  .glass-card__body--pad {
    padding: 1.75rem;
  }
  .glass-card__body--chart {
    padding: 1.2rem 1.25rem 0.95rem;
  }
}

.glass-card--kpi {
  border-radius: 1.35rem;
  min-height: 5.75rem;
}

.glass-card--kpi .glass-card__body {
  padding: 1.05rem 1.15rem;
}

.glass-card--chart {
  animation: card-enter 0.9s var(--ease) both;
  animation-delay: var(--enter-delay, 0ms);
}

.glass-card--chart:hover {
  transform: translateY(-4px) scale(1.005);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 8px 28px rgba(11, 45, 90, 0.08),
    0 28px 64px rgba(11, 45, 90, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(11, 45, 90, 0.04);
}

.glass-card--chart:hover .glass-card__shine {
  opacity: 1;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb,
  .glass-card--chart {
    animation: none !important;
  }
  .glass-card--chart:hover {
    transform: none;
  }
}

/* ========== Hero ========== */
.charts-demo__hero {
  padding: 3.25rem 0 1.75rem;
}

.charts-demo__hero-inner {
  max-width: 56rem;
}

.charts-demo__eyebrow {
  display: inline-flex;
  align-items: center;
  margin: 0 0 1rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--brand);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.charts-demo__title {
  margin: 0;
  max-width: 56rem;
  font-size: clamp(2rem, 4.2vw, 3.35rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--ink);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}

.charts-demo__lead {
  margin: 1.2rem 0 0;
  max-width: 38rem;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--ink-soft);
}

.charts-demo__status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.charts-demo__mode-tag,
.charts-demo__style-tag {
  display: inline-flex;
  margin: 0;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--brand-soft);
  background: rgba(27, 107, 255, 0.08);
  border: 1px solid rgba(27, 107, 255, 0.14);
}

.charts-demo__mode-tag[data-mode='dark'] {
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.22);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.12);
}

/* Style segmented control */
.charts-demo__style-switch {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 1.35rem;
  max-width: 40rem;
  padding: 0.35rem;
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

@media (min-width: 640px) {
  .charts-demo__style-switch {
    grid-template-columns: repeat(3, 1fr);
  }
}

.charts-demo__style-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.65rem 0.8rem;
  border: 1px solid transparent;
  border-radius: 0.85rem;
  background: transparent;
  color: var(--ink-soft);
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition:
    background 0.4s var(--ease),
    border-color 0.4s var(--ease),
    box-shadow 0.4s var(--ease),
    color 0.4s var(--ease);
}

.charts-demo__style-btn-label {
  font-size: 0.82rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.charts-demo__style-btn-desc {
  font-size: 0.65rem;
  line-height: 1.35;
  color: var(--ink-faint);
}

.charts-demo__style-btn:hover {
  background: rgba(255, 255, 255, 0.45);
}

.charts-demo__style-btn.is-active {
  background: rgba(255, 255, 255, 0.72);
  border-color: rgba(27, 107, 255, 0.18);
  box-shadow:
    0 6px 16px rgba(11, 45, 90, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.charts-demo__style-btn.is-active .charts-demo__style-btn-label {
  color: var(--brand);
}

.charts-demo__hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.charts-demo__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.72rem 1.3rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.5s var(--ease), background 0.5s var(--ease), box-shadow 0.5s var(--ease);
}

.charts-demo__btn:active {
  transform: scale(0.98);
}

.charts-demo__btn--primary {
  background: linear-gradient(145deg, #1a56db 0%, #002fa7 55%, #001a6b 100%);
  color: #fff;
  box-shadow:
    0 12px 28px rgba(0, 47, 167, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.charts-demo__btn--primary:hover {
  box-shadow:
    0 16px 36px rgba(0, 47, 167, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.charts-demo__btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  transition: transform 0.5s var(--ease);
}

.charts-demo__btn--primary:hover .charts-demo__btn-icon {
  transform: translate(2px, -1px) scale(1.05);
}

.charts-demo__btn--ghost {
  background: rgba(255, 255, 255, 0.42);
  color: var(--ink);
  border: 1px solid rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.charts-demo__btn--ghost:hover {
  background: rgba(255, 255, 255, 0.58);
}

/* ========== KPI ========== */
.charts-demo__kpi {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin: 0.35rem 0 2.75rem;
}

@media (min-width: 768px) {
  .charts-demo__kpi {
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
}

.charts-demo__kpi-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
}

.charts-demo__kpi-value-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-top: 0.4rem;
}

.charts-demo__kpi-value {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.charts-demo__kpi-unit {
  font-size: 0.75rem;
  color: var(--ink-faint);
}

.charts-demo__kpi-delta {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
}

.charts-demo__kpi-delta.is-safe { color: #059669; }
.charts-demo__kpi-delta.is-warning { color: #d97706; }
.charts-demo__kpi-delta.is-info { color: #1b6bff; }

/* ========== Sections ========== */
.charts-demo__section {
  margin-bottom: 3.75rem;
}

.charts-demo__section-head {
  display: grid;
  gap: 0.75rem 2rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 900px) {
  .charts-demo__section-head {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    align-items: end;
  }
}

.charts-demo__h2 {
  margin: 0.35rem 0 0;
  font-size: clamp(1.5rem, 2.5vw, 2.05rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.charts-demo__section-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ink-soft);
}

.charts-demo__section-desc code {
  font-size: 0.85em;
  padding: 0.12em 0.4em;
  border-radius: 0.4rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.7);
  color: var(--brand);
}

/* ========== Palette ========== */
.charts-demo__swatches {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

@media (min-width: 640px) {
  .charts-demo__swatches {
    grid-template-columns: repeat(5, 1fr);
  }
}

.charts-demo__swatch {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.charts-demo__swatch-chip {
  height: 3.4rem;
  border-radius: 0.95rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 8px 18px rgba(11, 45, 90, 0.12);
}

.charts-demo__swatch-meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.charts-demo__swatch-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink);
}

.charts-demo__swatch-role {
  font-size: 0.65rem;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.charts-demo__swatch-hex {
  font-size: 0.7rem;
  color: var(--ink-soft);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.charts-demo__series-row {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(11, 27, 51, 0.07);
}

.charts-demo__series-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.charts-demo__series-bars {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.4rem;
  height: 2.4rem;
}

.charts-demo__series-bar {
  border-radius: 0.55rem;
  min-width: 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 10px rgba(11, 45, 90, 0.1);
  transition: transform 0.45s var(--ease);
}

.charts-demo__series-bar:hover {
  transform: scaleY(1.14);
}

.charts-demo__code {
  margin: 1.35rem 0 0;
  padding: 1.05rem 1.2rem;
  border-radius: 1.1rem;
  background: linear-gradient(160deg, #0b1b33 0%, #0f2744 100%);
  color: #c7d7eb;
  font-size: 0.72rem;
  line-height: 1.55;
  overflow-x: auto;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.charts-demo__code code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* ========== Bento ========== */
.charts-demo__bento {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.05rem;
  grid-auto-flow: dense;
}

@media (min-width: 768px) {
  .charts-demo__bento {
    grid-template-columns: repeat(6, 1fr);
    gap: 1.15rem;
  }

  .span-sm { grid-column: span 2; }
  .span-md { grid-column: span 3; }
  .span-lg { grid-column: span 3; }
  .span-xl { grid-column: span 4; }
  .span-hero { grid-column: span 6; }
}

@media (min-width: 1200px) {
  .charts-demo__bento {
    grid-template-columns: repeat(12, 1fr);
    gap: 1.2rem;
  }

  .span-sm { grid-column: span 3; }
  .span-md { grid-column: span 4; }
  .span-lg { grid-column: span 5; }
  .span-xl { grid-column: span 6; }
  .span-hero { grid-column: span 8; }
}

.charts-demo__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.charts-demo__card-head-main {
  min-width: 0;
}

.charts-demo__domain {
  display: inline-flex;
  align-items: center;
  font-size: 0.6rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-soft);
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  background: rgba(27, 107, 255, 0.08);
  border: 1px solid rgba(27, 107, 255, 0.1);
}

.charts-demo__card-title {
  margin: 0.4rem 0 0;
  font-size: 1.02rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1.3;
}

.charts-demo__card-sub {
  margin: 0.28rem 0 0;
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--ink-faint);
}

.charts-demo__code-toggle {
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.65);
  background: rgba(255, 255, 255, 0.4);
  color: var(--brand);
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  backdrop-filter: blur(8px);
  transition: background 0.4s var(--ease), transform 0.4s var(--ease);
}

.charts-demo__code-toggle:hover {
  background: rgba(255, 255, 255, 0.65);
}

.charts-demo__code-toggle:active {
  transform: scale(0.97);
}

.charts-demo__chart {
  width: 100%;
  min-height: 220px;
}

.charts-demo__snippet {
  margin-top: 0.45rem;
  margin-bottom: 0.25rem;
  border-radius: 0.95rem;
  overflow: hidden;
  background: linear-gradient(160deg, #0b1b33 0%, #0f2744 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.charts-demo__snippet-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0.8rem;
  font-size: 0.65rem;
  color: #8aa0b8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.charts-demo__snippet-bar button {
  border: 0;
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  font-size: 0.65rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
}

.charts-demo__snippet pre {
  margin: 0;
  padding: 0.8rem;
  font-size: 0.7rem;
  line-height: 1.5;
  color: #c7d7eb;
  overflow-x: auto;
  white-space: pre-wrap;
}

.code-slide-enter-active,
.code-slide-leave-active {
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
}

.code-slide-enter-from,
.code-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ========== Footer ========== */
.charts-demo__footer {
  margin-top: 0.5rem;
  padding: 1.75rem 0 0;
  border-top: 1px solid rgba(11, 27, 51, 0.07);
}

.charts-demo__footer-inner {
  max-width: 48rem;
}

.charts-demo__footer p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

.charts-demo__footer code {
  font-size: 0.82em;
  padding: 0.1em 0.35em;
  border-radius: 0.35rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.charts-demo__footer-path {
  margin-top: 0.5rem !important;
  font-size: 0.75rem !important;
  color: var(--ink-faint) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

/*
 * 暗色样式：仅挂在本组件 root 的 .is-dark 上
 * 禁止 :global(.dark) / :global(html.dark) —— 会污染 VitePress 导航与整站
 */
.charts-demo.is-dark {
  --ink: #f4f9ff;
  --ink-soft: #d0e4fa;
  --ink-faint: #9bb6d4;
  --brand: #60a5fa;
  --brand-soft: #93c5fd;
  color: var(--ink);
}

.charts-demo.is-dark .orb-a {
  background: radial-gradient(circle, rgba(96, 165, 250, 0.35) 0%, transparent 70%);
}

.charts-demo.is-dark .orb-b {
  background: radial-gradient(circle, rgba(34, 211, 238, 0.28) 0%, transparent 70%);
}

.charts-demo.is-dark .charts-demo__title {
  color: #f8fbff;
}

.charts-demo.is-dark .charts-demo__eyebrow {
  background: rgba(96, 165, 250, 0.18);
  border-color: rgba(147, 197, 253, 0.35);
  color: #bfdbfe;
}

.charts-demo.is-dark .charts-demo__mode-tag,
.charts-demo.is-dark .charts-demo__style-tag {
  color: #7dd3fc;
  background: rgba(34, 211, 238, 0.14);
  border-color: rgba(34, 211, 238, 0.35);
}

.charts-demo.is-dark .charts-demo__style-switch {
  background: rgba(20, 48, 82, 0.55);
  border-color: rgba(147, 197, 253, 0.28);
  box-shadow: inset 0 1px 0 rgba(200, 230, 255, 0.12);
}

.charts-demo.is-dark .charts-demo__style-btn:hover {
  background: rgba(40, 80, 130, 0.45);
}

.charts-demo.is-dark .charts-demo__style-btn.is-active {
  background: rgba(40, 90, 150, 0.55);
  border-color: rgba(147, 197, 253, 0.4);
  box-shadow:
    0 6px 18px rgba(0, 12, 32, 0.25),
    inset 0 1px 0 rgba(200, 230, 255, 0.16);
}

.charts-demo.is-dark .charts-demo__style-btn.is-active .charts-demo__style-btn-label {
  color: #bfdbfe;
}

.charts-demo.is-dark .charts-demo__btn--primary {
  background: linear-gradient(145deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.4);
}

.charts-demo.is-dark .charts-demo__btn--ghost {
  background: rgba(33, 69, 114, 0.72);
  border-color: rgba(147, 197, 253, 0.4);
  color: #e0f2fe;
}

.charts-demo.is-dark .charts-demo__btn--ghost:hover {
  background: rgba(42, 86, 138, 0.85);
}

.charts-demo.is-dark .charts-demo__domain {
  background: rgba(96, 165, 250, 0.22);
  border-color: rgba(147, 197, 253, 0.4);
  color: #bfdbfe;
}

.charts-demo.is-dark .charts-demo__code-toggle {
  background: rgba(37, 74, 117, 0.75);
  border-color: rgba(147, 197, 253, 0.4);
  color: #dbeafe;
}

.charts-demo.is-dark .charts-demo__code-toggle:hover {
  background: rgba(47, 92, 143, 0.9);
}

.charts-demo.is-dark .charts-demo__kpi-delta {
  background: rgba(8, 24, 48, 0.35);
}

.charts-demo.is-dark .charts-demo__kpi-delta.is-safe { color: #4ade80; }
.charts-demo.is-dark .charts-demo__kpi-delta.is-warning { color: #facc15; }
.charts-demo.is-dark .charts-demo__kpi-delta.is-info { color: #38bdf8; }

.charts-demo.is-dark .charts-demo__section-desc code {
  background: rgba(33, 69, 114, 0.75);
  border-color: rgba(147, 197, 253, 0.3);
  color: #bfdbfe;
}

.charts-demo.is-dark .charts-demo__series-row {
  border-top-color: rgba(147, 197, 253, 0.22);
}

.charts-demo.is-dark .charts-demo__footer {
  border-top-color: rgba(147, 197, 253, 0.2);
}

.charts-demo.is-dark .charts-demo__footer code {
  background: rgba(33, 69, 114, 0.75);
  border-color: rgba(147, 197, 253, 0.28);
  color: #dbeafe;
}

.charts-demo.is-dark .charts-demo__code,
.charts-demo.is-dark .charts-demo__snippet {
  background: #0f2340;
  border: 1px solid rgba(120, 180, 255, 0.22);
}

.charts-demo.is-dark .charts-demo__chart {
  position: relative;
  z-index: 1;
  min-height: 220px;
  background: transparent;
}

/* ========== style-liquid：Hydro-glass（亮 frosted / 暗 elevated glass） ========== */
.charts-demo.style-liquid.is-dark {
  /* 更透：让页底光晕透出，避免泥蓝实心板 */
  --glass-bg: linear-gradient(
    155deg,
    rgba(56, 120, 190, 0.34) 0%,
    rgba(28, 64, 110, 0.28) 48%,
    rgba(20, 52, 92, 0.32) 100%
  );
  --glass-border: rgba(255, 255, 255, 0.28);
  --glass-shadow:
    0 12px 36px rgba(0, 8, 24, 0.28),
    0 0 0 1px rgba(140, 200, 255, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    inset 0 -1px 0 rgba(0, 20, 50, 0.18);
}

.charts-demo.style-liquid.is-dark .glass-card {
  backdrop-filter: blur(32px) saturate(1.75);
  -webkit-backdrop-filter: blur(32px) saturate(1.75);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

/* shine 仅在 body 下，不盖内容 */
.charts-demo.style-liquid.is-dark .glass-card__shine {
  display: block;
  opacity: 0.7;
  background: radial-gradient(
    ellipse at 28% 18%,
    rgba(255, 255, 255, 0.38) 0%,
    rgba(140, 200, 255, 0.1) 40%,
    transparent 70%
  );
}

.charts-demo.style-liquid.is-dark .glass-card__tint {
  display: block;
  opacity: 0.85;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%);
}

.charts-demo.style-liquid.is-dark .glass-card--chart:hover {
  border-color: rgba(255, 255, 255, 0.38);
  box-shadow:
    0 16px 44px rgba(0, 8, 24, 0.36),
    0 0 0 1px rgba(160, 220, 255, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  background: linear-gradient(
    155deg,
    rgba(70, 140, 210, 0.4) 0%,
    rgba(36, 78, 130, 0.34) 50%,
    rgba(28, 64, 110, 0.36) 100%
  );
}

/* 暗色液态：加强 ambient 让玻璃有折射对象 */
.charts-demo.style-liquid.is-dark .orb-a {
  opacity: 1;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%);
}
.charts-demo.style-liquid.is-dark .orb-b {
  opacity: 1;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%);
}

/*
 * ========== style-premium · Pro Product (Apple / Linear / Grok) ==========
 * Signature is NOT "remove effects". Signature is:
 * 1) canvas vs elevated surface contrast
 * 2) double-bezel nested cards
 * 3) large editorial type + micro labels
 * 4) refined chart strokes (set in chart-style.ts)
 */
.charts-demo.style-premium {
  --ink: #0a0a0b;
  --ink-soft: #52525b;
  --ink-faint: #a1a1aa;
  --brand: #2563eb;
  --brand-soft: #3b82f6;
  --glass-bg: #ffffff;
  --glass-border: rgba(9, 9, 11, 0.06);
  --glass-shadow:
    0 1px 1px rgba(9, 9, 11, 0.03),
    0 8px 24px rgba(9, 9, 11, 0.05),
    0 24px 48px rgba(9, 9, 11, 0.04);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--ink);
  /* own canvas — breaks free from hydro page blue */
  background:
    radial-gradient(ellipse 70% 40% at 50% -10%, rgba(37, 99, 235, 0.07), transparent 55%),
    linear-gradient(180deg, #f4f4f5 0%, #ececee 45%, #e4e4e7 100%);
  margin: 0 -0.5rem;
  padding: 0.5rem 0.5rem 4.5rem;
  border-radius: 0;
}

.charts-demo.style-premium .charts-demo__ambient {
  opacity: 0.55;
}
.charts-demo.style-premium .orb {
  filter: blur(100px);
}
.charts-demo.style-premium .orb-a {
  opacity: 0.55;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, transparent 70%);
}
.charts-demo.style-premium .orb-b {
  opacity: 0.4;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%);
}

/* Double-bezel: outer tray + inner surface */
.charts-demo.style-premium .glass-card {
  border-radius: 22px;
  padding: 5px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.55));
  border: 1px solid rgba(9, 9, 11, 0.06);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 1px 1px rgba(9, 9, 11, 0.03),
    0 10px 30px rgba(9, 9, 11, 0.06),
    0 28px 56px rgba(9, 9, 11, 0.04);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
}

.charts-demo.style-premium .glass-card__body {
  border-radius: 17px;
  background: #ffffff;
  box-shadow:
    0 0 0 1px rgba(9, 9, 11, 0.03),
    0 1px 0 rgba(255, 255, 255, 1) inset;
}

.charts-demo.style-premium .glass-card__body--pad {
  padding: 1.5rem 1.5rem 1.35rem;
}

.charts-demo.style-premium .glass-card__body--chart {
  padding: 1.15rem 1.2rem 1rem;
}

.charts-demo.style-premium .glass-card__shine {
  display: block;
  opacity: 0.55;
  z-index: 0;
  background: radial-gradient(
    ellipse 80% 50% at 20% 0%,
    rgba(255, 255, 255, 0.95) 0%,
    transparent 55%
  );
}

.charts-demo.style-premium .glass-card__tint {
  display: block;
  opacity: 0.5;
  background: radial-gradient(circle at 90% 100%, rgba(37, 99, 235, 0.06), transparent 55%);
}

.charts-demo.style-premium .glass-card--kpi {
  border-radius: 20px;
  padding: 4px;
}
.charts-demo.style-premium .glass-card--kpi .glass-card__body {
  border-radius: 16px;
  padding: 1.15rem 1.2rem 1.05rem;
  min-height: 6.25rem;
}

.charts-demo.style-premium .glass-card--chart {
  animation: none;
}
.charts-demo.style-premium .glass-card--chart:hover {
  transform: translateY(-4px);
  border-color: rgba(9, 9, 11, 0.08);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 12px 32px rgba(9, 9, 11, 0.08),
    0 36px 64px rgba(9, 9, 11, 0.07);
}

/* Hero type: wide editorial, not "docs title" */
.charts-demo.style-premium .charts-demo__hero {
  padding: 3.75rem 0 2rem;
}
.charts-demo.style-premium .charts-demo__title {
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.05;
  text-shadow: none;
  color: #09090b;
  font-size: clamp(2.35rem, 5vw, 3.75rem);
  max-width: 18ch;
}
.charts-demo.style-premium .charts-demo__lead {
  color: #52525b;
  font-size: 1.08rem;
  max-width: 34rem;
  line-height: 1.55;
  margin-top: 1.35rem;
}

.charts-demo.style-premium .charts-demo__eyebrow {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.06);
  border-radius: 999px;
  color: #2563eb;
  letter-spacing: 0.14em;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  box-shadow: 0 1px 2px rgba(9, 9, 11, 0.04);
  backdrop-filter: none;
  padding: 0.35rem 0.8rem;
}

.charts-demo.style-premium .charts-demo__mode-tag,
.charts-demo.style-premium .charts-demo__style-tag {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.06);
  color: #52525b;
  box-shadow: 0 1px 2px rgba(9, 9, 11, 0.03);
  font-weight: 550;
  letter-spacing: 0.02em;
}

/* Floating pill switcher */
.charts-demo.style-premium .charts-demo__style-switch {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.06);
  border-radius: 18px;
  backdrop-filter: none;
  box-shadow:
    0 1px 2px rgba(9, 9, 11, 0.04),
    0 12px 32px rgba(9, 9, 11, 0.06);
  padding: 0.3rem;
  gap: 0.25rem;
  max-width: 44rem;
}

.charts-demo.style-premium .charts-demo__style-btn {
  border-radius: 14px;
  border: 1px solid transparent;
  padding: 0.75rem 0.85rem;
}

.charts-demo.style-premium .charts-demo__style-btn:hover {
  background: #f4f4f5;
}

.charts-demo.style-premium .charts-demo__style-btn.is-active {
  background: #0a0a0b;
  border-color: #0a0a0b;
  box-shadow: 0 8px 20px rgba(9, 9, 11, 0.18);
}

.charts-demo.style-premium .charts-demo__style-btn.is-active .charts-demo__style-btn-label {
  color: #fafafa;
}
.charts-demo.style-premium .charts-demo__style-btn.is-active .charts-demo__style-btn-desc {
  color: rgba(250, 250, 250, 0.55);
}

.charts-demo.style-premium .charts-demo__style-btn-label {
  font-weight: 650;
  font-size: 0.84rem;
  letter-spacing: -0.02em;
}

.charts-demo.style-premium .charts-demo__style-btn-desc {
  color: #a1a1aa;
  font-size: 0.64rem;
}

/* Nested CTA: primary solid + icon island */
.charts-demo.style-premium .charts-demo__btn {
  border-radius: 999px;
  font-weight: 600;
  padding: 0.78rem 1.15rem 0.78rem 1.35rem;
  letter-spacing: -0.01em;
  transition:
    transform 0.35s var(--ease),
    box-shadow 0.35s var(--ease),
    background 0.35s var(--ease);
}

.charts-demo.style-premium .charts-demo__btn:active {
  transform: scale(0.98);
}

.charts-demo.style-premium .charts-demo__btn--primary {
  background: #0a0a0b;
  color: #fafafa;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.12) inset,
    0 10px 28px rgba(9, 9, 11, 0.2);
}

.charts-demo.style-premium .charts-demo__btn--primary:hover {
  background: #18181b;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.14) inset,
    0 14px 36px rgba(9, 9, 11, 0.26);
}

.charts-demo.style-premium .charts-demo__btn-icon {
  width: 1.85rem;
  height: 1.85rem;
  background: rgba(255, 255, 255, 0.12);
  margin-left: 0.15rem;
}

.charts-demo.style-premium .charts-demo__btn--ghost {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.08);
  color: #0a0a0b;
  backdrop-filter: none;
  box-shadow: 0 1px 2px rgba(9, 9, 11, 0.04);
}

.charts-demo.style-premium .charts-demo__btn--ghost:hover {
  background: #fafafa;
  border-color: rgba(9, 9, 11, 0.12);
}

/* KPI: big product metrics */
.charts-demo.style-premium .charts-demo__kpi {
  gap: 0.9rem;
  margin: 0.75rem 0 3rem;
}
.charts-demo.style-premium .charts-demo__kpi-label {
  color: #a1a1aa;
  font-weight: 500;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.charts-demo.style-premium .charts-demo__kpi-value {
  font-weight: 700;
  letter-spacing: -0.055em;
  font-size: 1.85rem;
  font-variant-numeric: tabular-nums;
  color: #0a0a0b;
}
.charts-demo.style-premium .charts-demo__kpi-unit {
  color: #a1a1aa;
  font-weight: 500;
}
.charts-demo.style-premium .charts-demo__kpi-delta {
  background: #f4f4f5;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.68rem;
  padding: 0.18rem 0.5rem;
}
.charts-demo.style-premium .charts-demo__kpi-delta.is-safe { color: #16a34a; background: #f0fdf4; }
.charts-demo.style-premium .charts-demo__kpi-delta.is-warning { color: #d97706; background: #fffbeb; }
.charts-demo.style-premium .charts-demo__kpi-delta.is-info { color: #2563eb; background: #eff6ff; }

/* Chart card header */
.charts-demo.style-premium .charts-demo__domain {
  border-radius: 999px;
  background: #f4f4f5;
  border: none;
  color: #71717a;
  letter-spacing: 0.08em;
  font-weight: 600;
  font-size: 0.58rem;
}
.charts-demo.style-premium .charts-demo__card-title {
  font-weight: 650;
  letter-spacing: -0.03em;
  font-size: 1.05rem;
  margin-top: 0.45rem;
}
.charts-demo.style-premium .charts-demo__card-sub {
  color: #a1a1aa;
  font-size: 0.76rem;
}
.charts-demo.style-premium .charts-demo__code-toggle {
  border-radius: 999px;
  background: #f4f4f5;
  border: none;
  color: #0a0a0b;
  backdrop-filter: none;
  font-weight: 600;
  padding: 0.42rem 0.8rem;
}
.charts-demo.style-premium .charts-demo__code-toggle:hover {
  background: #e4e4e7;
}

.charts-demo.style-premium .charts-demo__chart {
  margin-top: 0.15rem;
}

.charts-demo.style-premium .charts-demo__h2 {
  font-weight: 700;
  letter-spacing: -0.04em;
  font-size: clamp(1.65rem, 2.8vw, 2.15rem);
}
.charts-demo.style-premium .charts-demo__section {
  margin-bottom: 4rem;
}
.charts-demo.style-premium .charts-demo__section-desc {
  color: #71717a;
}
.charts-demo.style-premium .charts-demo__section-desc code {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.06);
  color: #0a0a0b;
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(9, 9, 11, 0.03);
}

.charts-demo.style-premium .charts-demo__swatch-chip {
  border-radius: 12px;
  height: 3.6rem;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.35) inset,
    0 8px 18px rgba(9, 9, 11, 0.1);
  border: none;
}
.charts-demo.style-premium .charts-demo__series-bar {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(9, 9, 11, 0.08);
}

.charts-demo.style-premium .charts-demo__bento {
  gap: 1.15rem;
}

.charts-demo.style-premium .charts-demo__code,
.charts-demo.style-premium .charts-demo__snippet {
  background: linear-gradient(165deg, #18181b 0%, #09090b 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(9, 9, 11, 0.18);
}

.charts-demo.style-premium .charts-demo__footer {
  border-top-color: rgba(9, 9, 11, 0.08);
}
.charts-demo.style-premium .charts-demo__footer code {
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.06);
}

/* ---- Premium dark: OLED pro product ---- */
.charts-demo.style-premium.is-dark {
  --ink: #fafafa;
  --ink-soft: #a1a1aa;
  --ink-faint: #71717a;
  --brand: #60a5fa;
  --brand-soft: #93c5fd;
  --glass-bg: #121214;
  --glass-border: rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(ellipse 70% 40% at 50% -8%, rgba(59, 130, 246, 0.14), transparent 55%),
    linear-gradient(180deg, #09090b 0%, #0c0c0e 50%, #000000 100%);
}

.charts-demo.style-premium.is-dark .glass-card {
  background:
    linear-gradient(180deg, rgba(39, 39, 42, 0.55), rgba(24, 24, 27, 0.35));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 12px 36px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(22px) saturate(1.25);
  -webkit-backdrop-filter: blur(22px) saturate(1.25);
}

.charts-demo.style-premium.is-dark .glass-card__body {
  background: #121214;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 1px 0 rgba(255, 255, 255, 0.03) inset;
}

.charts-demo.style-premium.is-dark .glass-card__shine {
  display: block;
  opacity: 0.35;
  background: radial-gradient(
    ellipse 70% 45% at 18% 0%,
    rgba(255, 255, 255, 0.14) 0%,
    transparent 55%
  );
}

.charts-demo.style-premium.is-dark .glass-card__tint {
  display: block;
  opacity: 0.7;
  background: radial-gradient(circle at 90% 100%, rgba(59, 130, 246, 0.12), transparent 55%);
}

.charts-demo.style-premium.is-dark .glass-card--chart:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.08) inset,
    0 16px 40px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(96, 165, 250, 0.12);
}

.charts-demo.style-premium.is-dark .charts-demo__title {
  color: #fafafa;
}
.charts-demo.style-premium.is-dark .charts-demo__lead {
  color: #a1a1aa;
}

.charts-demo.style-premium.is-dark .charts-demo__eyebrow,
.charts-demo.style-premium.is-dark .charts-demo__mode-tag,
.charts-demo.style-premium.is-dark .charts-demo__style-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #a1a1aa;
  box-shadow: none;
}
.charts-demo.style-premium.is-dark .charts-demo__eyebrow {
  color: #93c5fd;
}

.charts-demo.style-premium.is-dark .charts-demo__style-switch {
  background: rgba(24, 24, 27, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.charts-demo.style-premium.is-dark .charts-demo__style-btn:hover {
  background: rgba(255, 255, 255, 0.04);
}

.charts-demo.style-premium.is-dark .charts-demo__style-btn.is-active {
  background: #fafafa;
  border-color: #fafafa;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.charts-demo.style-premium.is-dark .charts-demo__style-btn.is-active .charts-demo__style-btn-label {
  color: #09090b;
}
.charts-demo.style-premium.is-dark .charts-demo__style-btn.is-active .charts-demo__style-btn-desc {
  color: #71717a;
}
.charts-demo.style-premium.is-dark .charts-demo__style-btn-label {
  color: #e4e4e7;
}
.charts-demo.style-premium.is-dark .charts-demo__style-btn-desc {
  color: #71717a;
}

.charts-demo.style-premium.is-dark .charts-demo__btn--primary {
  background: #fafafa;
  color: #09090b;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}
.charts-demo.style-premium.is-dark .charts-demo__btn--primary:hover {
  background: #ffffff;
}
.charts-demo.style-premium.is-dark .charts-demo__btn-icon {
  background: rgba(0, 0, 0, 0.08);
  color: #09090b;
}
.charts-demo.style-premium.is-dark .charts-demo__btn--ghost {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fafafa;
  box-shadow: none;
}

.charts-demo.style-premium.is-dark .charts-demo__kpi-value {
  color: #fafafa;
}
.charts-demo.style-premium.is-dark .charts-demo__kpi-label,
.charts-demo.style-premium.is-dark .charts-demo__kpi-unit {
  color: #71717a;
}
.charts-demo.style-premium.is-dark .charts-demo__kpi-delta {
  background: rgba(255, 255, 255, 0.06);
}
.charts-demo.style-premium.is-dark .charts-demo__kpi-delta.is-safe { color: #4ade80; background: rgba(74, 222, 128, 0.1); }
.charts-demo.style-premium.is-dark .charts-demo__kpi-delta.is-warning { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
.charts-demo.style-premium.is-dark .charts-demo__kpi-delta.is-info { color: #60a5fa; background: rgba(96, 165, 250, 0.12); }

.charts-demo.style-premium.is-dark .charts-demo__domain {
  background: rgba(255, 255, 255, 0.06);
  color: #a1a1aa;
}
.charts-demo.style-premium.is-dark .charts-demo__card-sub {
  color: #71717a;
}
.charts-demo.style-premium.is-dark .charts-demo__code-toggle {
  background: rgba(255, 255, 255, 0.06);
  color: #fafafa;
}
.charts-demo.style-premium.is-dark .charts-demo__code-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.charts-demo.style-premium.is-dark .charts-demo__section-desc {
  color: #a1a1aa;
}
.charts-demo.style-premium.is-dark .charts-demo__section-desc code {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fafafa;
}

.charts-demo.style-premium.is-dark .charts-demo__code,
.charts-demo.style-premium.is-dark .charts-demo__snippet {
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.charts-demo.style-premium.is-dark .charts-demo__footer {
  border-top-color: rgba(255, 255, 255, 0.08);
}
.charts-demo.style-premium.is-dark .charts-demo__footer code {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e4e4e7;
}

.charts-demo.style-premium.is-dark .orb-a {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, transparent 70%);
}
.charts-demo.style-premium.is-dark .orb-b {
  background: radial-gradient(circle, rgba(129, 140, 248, 0.18) 0%, transparent 70%);
}

/* ========== Premium PRODUCT SHELL (layout, not just card skin) ========== */
.charts-demo.is-premium {
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.pro-nav {
  position: sticky;
  top: 0.75rem;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0 0.25rem;
  padding: 0.55rem 0.65rem 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(9, 9, 11, 0.07);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 10px 40px rgba(9, 9, 11, 0.08);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
}

.pro-nav__brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}
.pro-nav__mark {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 0.55rem;
  background: linear-gradient(145deg, #2563eb 0%, #0a0a0b 100%);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
  flex-shrink: 0;
}
.pro-nav__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.pro-nav__brand-text strong {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0a0a0b;
}
.pro-nav__brand-text span {
  font-size: 0.62rem;
  color: #a1a1aa;
  font-weight: 500;
}

.pro-nav__switch {
  margin: 0 !important;
  max-width: none !important;
  flex: 1;
  min-width: 0;
}
.pro-nav__switch .charts-demo__style-btn-desc {
  display: none;
}
.pro-nav__switch .charts-demo__style-btn {
  align-items: center;
  text-align: center;
  padding: 0.45rem 0.5rem;
}

.pro-nav__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 600;
  color: #71717a;
  padding-right: 0.35rem;
}
.pro-nav__live {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #16a34a;
}
.pro-nav__live i {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  display: block;
}

.charts-demo.is-dark .pro-nav {
  background: rgba(18, 18, 20, 0.82);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}
.charts-demo.is-dark .pro-nav__brand-text strong {
  color: #fafafa;
}
.charts-demo.is-dark .pro-nav__meta {
  color: #a1a1aa;
}

.charts-demo__hero--pro {
  padding: 2.5rem 0 1.25rem;
}
.charts-demo__hero--pro .charts-demo__title {
  max-width: 14ch;
}

/* Featured stage */
.charts-demo__stage {
  margin: 0 0 1.5rem;
}
.charts-demo__stage--pro {
  margin-bottom: 1.75rem;
}
.glass-card--featured {
  border-radius: 28px !important;
}
.glass-card--featured .glass-card__body--chart {
  padding: 1.35rem 1.4rem 1.15rem !important;
}
.charts-demo__chart--featured {
  min-height: 360px;
}
.charts-demo__card-head--featured {
  align-items: flex-end;
  gap: 1.25rem;
  margin-bottom: 0.5rem;
}
.charts-demo__card-kicker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.charts-demo__live-dot {
  font-size: 0.62rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #16a34a;
  background: #f0fdf4;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
}
.charts-demo.is-dark .charts-demo__live-dot {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.12);
}
.charts-demo__feature-stats {
  display: flex;
  gap: 1.25rem;
  flex-shrink: 0;
}
.charts-demo__feature-stats > div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 4.5rem;
}
.charts-demo__feature-stats span {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #a1a1aa;
}
.charts-demo__feature-stats strong {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #0a0a0b;
  font-variant-numeric: tabular-nums;
}
.charts-demo__feature-stats strong.is-down {
  color: #2563eb;
}
.charts-demo.is-dark .charts-demo__feature-stats strong {
  color: #fafafa;
}
.charts-demo.is-dark .charts-demo__feature-stats strong.is-down {
  color: #60a5fa;
}

/* Metrics rail: one continuous product strip */
.charts-demo__kpi--rail {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0 !important;
  margin: 0 0 2.75rem !important;
  padding: 0.35rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(9, 9, 11, 0.06);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.85) inset,
    0 16px 40px rgba(9, 9, 11, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
}
.charts-demo__kpi--rail .glass-card--kpi {
  border-radius: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}
.charts-demo__kpi--rail .glass-card--kpi + .glass-card--kpi {
  border-left: 1px solid rgba(9, 9, 11, 0.06) !important;
}
.charts-demo__kpi--rail .glass-card__body {
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  min-height: 5.5rem;
  padding: 1.1rem 1rem 1rem !important;
}
.charts-demo__kpi--rail .glass-card__shine {
  display: none !important;
}
.charts-demo.is-dark .charts-demo__kpi--rail {
  background: rgba(18, 18, 20, 0.75);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}
.charts-demo.is-dark .charts-demo__kpi--rail .glass-card--kpi + .glass-card--kpi {
  border-left-color: rgba(255, 255, 255, 0.08) !important;
}

/* Full-width chart rows instead of bento mosaic */
.charts-demo__bento--rows {
  display: flex !important;
  flex-direction: column;
  gap: 1.35rem !important;
}
.charts-demo__bento--rows .glass-card--chart {
  grid-column: auto !important;
  width: 100%;
}
.charts-demo__bento--rows .glass-card--chart:hover {
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .pro-nav {
    flex-wrap: wrap;
    border-radius: 1.25rem;
  }
  .pro-nav__switch {
    order: 3;
    width: 100%;
  }
  .charts-demo__kpi--rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .charts-demo__kpi--rail .glass-card--kpi:nth-child(odd) {
    border-left: none !important;
  }
  .charts-demo__kpi--rail .glass-card--kpi:nth-child(n + 3) {
    border-top: 1px solid rgba(9, 9, 11, 0.06) !important;
  }
  .charts-demo.is-dark .charts-demo__kpi--rail .glass-card--kpi:nth-child(n + 3) {
    border-top-color: rgba(255, 255, 255, 0.08) !important;
  }
  .charts-demo__card-head--featured {
    flex-direction: column;
    align-items: flex-start;
  }
  .charts-demo__feature-stats {
    width: 100%;
    justify-content: space-between;
  }
  .charts-demo__chart--featured {
    height: 300px !important;
    min-height: 300px;
  }
}

/* ========== style-industrial：硬切 SCADA 面板 ========== */
.charts-demo.style-industrial {
  --glass-bg: #f0f4f8;
  --glass-border: rgba(0, 90, 160, 0.35);
  --glass-shadow: none;
  font-feature-settings: 'tnum' 1;
}

.charts-demo.style-industrial .glass-card {
  border-radius: 3px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  /* 角标装饰：不盖 body 内容 */
  overflow: visible;
}

.charts-demo.style-industrial .glass-card__body {
  overflow: hidden;
  border-radius: 2px;
}

.charts-demo.style-industrial .glass-card__shine,
.charts-demo.style-industrial .glass-card__tint {
  display: none;
}

/* 四角 HUD ticks：挂在 body 上的伪元素会污染内容；用 box-shadow 描边即可 */
.charts-demo.style-industrial .glass-card--kpi,
.charts-demo.style-industrial .glass-card--chart,
.charts-demo.style-industrial .glass-card--wide {
  position: relative;
  box-shadow:
    inset 0 0 0 1px rgba(0, 120, 200, 0.06),
    0 0 0 1px transparent;
}

.charts-demo.style-industrial .glass-card--chart:hover {
  transform: none;
  border-color: rgba(0, 140, 220, 0.55);
  box-shadow:
    inset 0 0 0 1px rgba(0, 140, 220, 0.1),
    0 0 0 1px rgba(0, 140, 220, 0.12);
}

.charts-demo.style-industrial .charts-demo__eyebrow {
  border-radius: 2px;
  background: rgba(0, 47, 167, 0.06);
  border: 1px solid rgba(0, 90, 160, 0.25);
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  letter-spacing: 0.14em;
  box-shadow: none;
  backdrop-filter: none;
}

.charts-demo.style-industrial .charts-demo__title {
  letter-spacing: -0.02em;
  text-shadow: none;
  font-weight: 700;
}

.charts-demo.style-industrial .charts-demo__domain {
  border-radius: 2px;
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  letter-spacing: 0.1em;
  background: rgba(0, 90, 160, 0.08);
  border: 1px solid rgba(0, 120, 200, 0.28);
  color: #005a9e;
}

.charts-demo.style-industrial .charts-demo__kpi-label {
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.charts-demo.style-industrial .charts-demo__kpi-value {
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  font-weight: 700;
}

.charts-demo.style-industrial .charts-demo__kpi-delta {
  border-radius: 2px;
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
}

.charts-demo.style-industrial .charts-demo__style-switch {
  border-radius: 3px;
  background: rgba(0, 47, 167, 0.04);
  border: 1px solid rgba(0, 90, 160, 0.28);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
  padding: 0.25rem;
}

.charts-demo.style-industrial .charts-demo__style-btn {
  border-radius: 2px;
}

.charts-demo.style-industrial .charts-demo__style-btn.is-active {
  background: rgba(0, 90, 160, 0.1);
  border-color: rgba(0, 140, 220, 0.45);
  box-shadow: none;
}

.charts-demo.style-industrial .charts-demo__btn {
  border-radius: 2px;
}

.charts-demo.style-industrial .charts-demo__btn--ghost {
  background: #f0f4f8;
  border: 1px solid rgba(0, 90, 160, 0.35);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
}

.charts-demo.style-industrial .charts-demo__btn--primary {
  background: #002fa7;
  box-shadow: none;
}

.charts-demo.style-industrial .charts-demo__code-toggle {
  border-radius: 2px;
  background: #e8eef5;
  border: 1px solid rgba(0, 90, 160, 0.3);
  backdrop-filter: none;
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
}

.charts-demo.style-industrial .charts-demo__mode-tag,
.charts-demo.style-industrial .charts-demo__style-tag {
  border-radius: 2px;
  font-family: ui-monospace, 'SF Mono', Consolas, monospace;
}

.charts-demo.style-industrial .charts-demo__swatch-chip {
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.charts-demo.style-industrial .charts-demo__series-bar {
  border-radius: 1px;
}

.charts-demo.style-industrial .orb {
  opacity: 0.2;
  filter: blur(40px);
}

.charts-demo.style-industrial.is-dark {
  --glass-bg: #0f243c;
  --glass-border: rgba(34, 211, 238, 0.4);
}

.charts-demo.style-industrial.is-dark .glass-card {
  background: var(--glass-bg);
  border-color: var(--glass-border);
  box-shadow:
    inset 0 0 0 1px rgba(34, 211, 238, 0.06),
    0 0 12px rgba(34, 211, 238, 0.04);
}

.charts-demo.style-industrial.is-dark .glass-card--chart:hover {
  border-color: rgba(34, 211, 238, 0.65);
  background: #122a46;
  box-shadow:
    inset 0 0 0 1px rgba(34, 211, 238, 0.1),
    0 0 16px rgba(34, 211, 238, 0.08);
}

.charts-demo.style-industrial.is-dark .charts-demo__domain {
  background: rgba(34, 211, 238, 0.08);
  border-color: rgba(34, 211, 238, 0.35);
  color: #67e8f9;
}

.charts-demo.style-industrial.is-dark .charts-demo__eyebrow {
  background: rgba(34, 211, 238, 0.08);
  border-color: rgba(34, 211, 238, 0.3);
  color: #a5f3fc;
}

.charts-demo.style-industrial.is-dark .charts-demo__style-switch {
  background: rgba(8, 24, 42, 0.7);
  border-color: rgba(34, 211, 238, 0.3);
}

.charts-demo.style-industrial.is-dark .charts-demo__style-btn.is-active {
  background: rgba(34, 211, 238, 0.1);
  border-color: rgba(34, 211, 238, 0.45);
}

.charts-demo.style-industrial.is-dark .charts-demo__btn--ghost {
  background: #122a46;
  border-color: rgba(34, 211, 238, 0.4);
  color: #e0f2fe;
}

.charts-demo.style-industrial.is-dark .charts-demo__btn--primary {
  background: #0ea5e9;
  box-shadow: 0 0 16px rgba(14, 165, 233, 0.25);
}

.charts-demo.style-industrial.is-dark .charts-demo__code-toggle {
  background: #122a46;
  border-color: rgba(34, 211, 238, 0.35);
  color: #a5f3fc;
}
</style>
