/**
 * 水利信息化 · 全局图表调色盘
 * 双主题：light（文档/管理端）+ dark（大屏主场景）
 * 跟随 VitePress html.dark 切换
 */

export type ChartMode = 'light' | 'dark'

/** 品牌色（两主题共用） */
export const WATER_BRAND = {
  primary: '#002FA7',
  primarySoft: '#1A56DB',
  primaryMist: '#E8F0FF',
  primaryDeep: '#001A6B',
} as const

/** 语义色：暗色下略提亮度保证可读 */
const SEMANTIC_LIGHT = {
  safe: '#10B981',
  watch: '#0EA5E9',
  warning: '#F59E0B',
  danger: '#EF4444',
  offline: '#94A3B8',
  muted: '#64748B',
} as const

const SEMANTIC_DARK = {
  safe: '#4ADE80',
  watch: '#38BDF8',
  warning: '#FACC15',
  danger: '#FB7185',
  offline: '#94A3B8',
  muted: '#CBD5E1',
} as const

const QUALITY_LIGHT = {
  I: '#22D3EE',
  II: '#34D399',
  III: '#A3E635',
  IV: '#FBBF24',
  V: '#FB923C',
  worseV: '#F87171',
} as const

const QUALITY_DARK = {
  I: '#22D3EE',
  II: '#4ADE80',
  III: '#A3E635',
  IV: '#FACC15',
  V: '#FB923C',
  worseV: '#FB7185',
} as const

/** 亮色系列：在浅色玻璃上清晰 */
const SERIES_LIGHT = [
  '#1B6BFF',
  '#00B4D8',
  '#14C9A8',
  '#38BDF8',
  '#818CF8',
  '#22D3EE',
  '#34D399',
  '#FBBF24',
  '#FB923C',
  '#F87171',
  '#A78BFA',
  '#94A3B8',
] as const

/**
 * 暗色系列：大屏荧光色（必须亮，不能沉）
 * 在抬升后的深蓝面板上仍保持高对比
 */
const SERIES_DARK = [
  '#60A5FA', // 水位 · 亮蓝
  '#22D3EE', // 流量 · 青
  '#2DD4BF', // 蓄水 · 青绿
  '#7DD3FC', // 雨量 · 天蓝
  '#A78BFA', // 水质 · 紫
  '#67E8F9', // 潮位 · 浅青
  '#4ADE80', // 正常 · 绿
  '#FACC15', // 预警 · 黄
  '#FB923C', // 超警 · 橙
  '#FB7185', // 危险 · 玫红
  '#C084FC', // 设备 · 亮紫
  '#94A3B8', // 基线
] as const

const SURFACE_LIGHT = {
  page: '#E8F1FA',
  card: 'rgba(255, 255, 255, 0.55)',
  ink: '#0B1B33',
  inkSoft: '#3D5270',
  inkFaint: '#7B90A8',
  line: 'rgba(11, 27, 51, 0.07)',
  grid: 'rgba(11, 27, 51, 0.055)',
  split: 'rgba(11, 27, 51, 0.1)',
  /** 饼图/树图等切片描边 */
  sliceBorder: 'rgba(255, 255, 255, 0.72)',
  /** 数据点白边 */
  markerBorder: '#FFFFFF',
  tooltipBg: 'rgba(11, 27, 51, 0.82)',
  tooltipBorder: 'rgba(255, 255, 255, 0.12)',
  tooltipText: '#F0F7FF',
} as const

/**
 * 暗色表面：指挥舱面板，不是“黑布”
 * 卡片/面板本身要抬亮，网格与文字要清晰
 */
const SURFACE_DARK = {
  page: '#0C1A2E',
  card: '#17304F',
  ink: '#F4F9FF',
  inkSoft: '#D0E4FA',
  inkFaint: '#9BB6D4',
  line: 'rgba(148, 210, 255, 0.22)',
  grid: 'rgba(130, 190, 255, 0.16)',
  split: 'rgba(150, 200, 255, 0.28)',
  sliceBorder: 'rgba(12, 28, 48, 0.85)',
  markerBorder: '#FFFFFF',
  tooltipBg: 'rgba(12, 28, 52, 0.94)',
  tooltipBorder: 'rgba(120, 190, 255, 0.35)',
  tooltipText: '#F4F9FF',
} as const

export type ThemeTokens = {
  mode: ChartMode
  brand: typeof WATER_BRAND
  series: readonly string[]
  semantic: typeof SEMANTIC_LIGHT | typeof SEMANTIC_DARK
  waterQuality: typeof QUALITY_LIGHT | typeof QUALITY_DARK
  floodAlert: {
    blue: string
    yellow: string
    orange: string
    red: string
  }
  surface: typeof SURFACE_LIGHT | typeof SURFACE_DARK
  /** 折线光晕强度 */
  glowStrength: number
  /** 面积顶层透明度 */
  areaTop: number
  areaMid: number
}

export function getTheme(mode: ChartMode = 'light'): ThemeTokens {
  if (mode === 'dark') {
    return {
      mode: 'dark',
      brand: WATER_BRAND,
      series: SERIES_DARK,
      semantic: SEMANTIC_DARK,
      waterQuality: QUALITY_DARK,
      floodAlert: {
        blue: '#60A5FA',
        yellow: '#FACC15',
        orange: '#FB923C',
        red: '#FB7185',
      },
      surface: SURFACE_DARK,
      // 大屏：更强光晕 + 更实的面积填充，避免“一坨黑”
      glowStrength: 0.85,
      areaTop: 0.55,
      areaMid: 0.22,
    }
  }
  return {
    mode: 'light',
    brand: WATER_BRAND,
    series: SERIES_LIGHT,
    semantic: SEMANTIC_LIGHT,
    waterQuality: QUALITY_LIGHT,
    floodAlert: {
      blue: '#3B82F6',
      yellow: '#EAB308',
      orange: '#F97316',
      red: '#DC2626',
    },
    surface: SURFACE_LIGHT,
    glowStrength: 0.45,
    areaTop: 0.4,
    areaMid: 0.14,
  }
}

/**
 * 兼容旧引用：默认 light 快照
 * 业务代码请优先使用 getTheme(mode)
 */
export const WATER_PALETTE = {
  brand: WATER_BRAND,
  series: SERIES_LIGHT,
  semantic: SEMANTIC_LIGHT,
  waterQuality: QUALITY_LIGHT,
  floodAlert: {
    blue: '#3B82F6',
    yellow: '#EAB308',
    orange: '#F97316',
    red: '#DC2626',
  },
  surface: SURFACE_LIGHT,
  gradient: {
    water: ['rgba(27, 107, 255, 0.38)', 'rgba(27, 107, 255, 0.02)'],
    flow: ['rgba(0, 180, 216, 0.34)', 'rgba(0, 180, 216, 0.02)'],
    rain: ['rgba(56, 189, 248, 0.4)', 'rgba(56, 189, 248, 0.02)'],
    storage: ['rgba(20, 201, 168, 0.36)', 'rgba(20, 201, 168, 0.02)'],
    danger: ['rgba(248, 113, 113, 0.28)', 'rgba(248, 113, 113, 0.02)'],
  },
} as const

export type WaterSeriesColor = (typeof SERIES_LIGHT)[number]

export const WATER_CHART_THEME = 'water-conservancy'
export const WATER_CHART_THEME_DARK = 'water-conservancy-dark'

export const PALETTE_SWATCHES_LIGHT = [
  { name: '品牌蓝', hex: WATER_BRAND.primary, role: 'Brand' },
  { name: '深水蓝', hex: SERIES_LIGHT[0], role: '水位' },
  { name: '碧涛青', hex: SERIES_LIGHT[1], role: '流量' },
  { name: '湖绿', hex: SERIES_LIGHT[2], role: '蓄水' },
  { name: '天青', hex: SERIES_LIGHT[3], role: '雨量' },
  { name: '靛蓝', hex: SERIES_LIGHT[4], role: '水质' },
  { name: '安全', hex: SEMANTIC_LIGHT.safe, role: '正常' },
  { name: '预警', hex: SEMANTIC_LIGHT.warning, role: '警戒' },
  { name: '危险', hex: SEMANTIC_LIGHT.danger, role: '超限' },
  { name: '劣V', hex: QUALITY_LIGHT.worseV, role: '水质' },
] as const

export const PALETTE_SWATCHES_DARK = [
  { name: '品牌蓝', hex: '#60A5FA', role: 'Brand' },
  { name: '亮水蓝', hex: SERIES_DARK[0], role: '水位' },
  { name: '荧光青', hex: SERIES_DARK[1], role: '流量' },
  { name: '湖绿', hex: SERIES_DARK[2], role: '蓄水' },
  { name: '天青', hex: SERIES_DARK[3], role: '雨量' },
  { name: '亮紫', hex: SERIES_DARK[4], role: '水质' },
  { name: '安全', hex: SEMANTIC_DARK.safe, role: '正常' },
  { name: '预警', hex: SEMANTIC_DARK.warning, role: '警戒' },
  { name: '危险', hex: SEMANTIC_DARK.danger, role: '超限' },
  { name: '劣V', hex: QUALITY_DARK.worseV, role: '水质' },
] as const

/** @deprecated 使用 PALETTE_SWATCHES_LIGHT / 按 mode 选择 */
export const PALETTE_SWATCHES = PALETTE_SWATCHES_LIGHT

export function rgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function linearArea(
  echarts: any,
  hex: string,
  top = 0.42,
  mid = 0.12,
  bottom = 0.01,
) {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: rgba(hex, top) },
    { offset: 0.55, color: rgba(hex, mid) },
    { offset: 1, color: rgba(hex, bottom) },
  ])
}

/**
 * 柱体竖向渐变。
 * floorSoft：暗底可读性下限；premium 亮色可传更低 soft 且 floorSoft=false 以保持冷奢淡洗。
 */
export function barFill(hex: string, soft = 0.42, floorSoft = true) {
  const bottom = floorSoft ? Math.max(soft, 0.4) : Math.max(soft, 0.12)
  return {
    type: 'linear' as const,
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: hex },
      { offset: 0.4, color: rgba(hex, 0.98) },
      { offset: 1, color: rgba(hex, bottom) },
    ],
  }
}

export function barFillH(hex: string, endHex?: string) {
  return {
    type: 'linear' as const,
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      { offset: 0, color: hex },
      { offset: 1, color: endHex || rgba(hex, 0.55) },
    ],
  }
}

export function lineGlow(hex: string, width = 2.8, strength = 0.45) {
  return {
    width: strength > 0.6 ? width + 0.4 : width,
    color: hex,
    shadowBlur: strength > 0.6 ? 22 : 14,
    shadowColor: rgba(hex, Math.min(strength, 0.95)),
    cap: 'round' as const,
  }
}

export function softLegend(theme: ThemeTokens, extra: Record<string, unknown> = {}) {
  return {
    top: 2,
    right: 4,
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 14,
    icon: 'circle',
    textStyle: {
      color: theme.surface.inkSoft,
      fontSize: 11,
      fontWeight: 500,
      padding: [0, 0, 0, 2],
    },
    ...extra,
  }
}

export function pieItem(theme: ThemeTokens) {
  return {
    borderRadius: 8,
    borderColor: theme.surface.sliceBorder,
    borderWidth: 2.5,
    shadowBlur: theme.mode === 'dark' ? 18 : 12,
    shadowColor:
      theme.mode === 'dark' ? 'rgba(40, 120, 220, 0.35)' : 'rgba(11, 27, 51, 0.1)',
  }
}

export function chartAnim(delay = 0) {
  return {
    animation: true,
    animationDuration: 900,
    animationDurationUpdate: 500,
    animationEasing: 'cubicOut' as const,
    animationDelay: delay,
  }
}

export function detectChartMode(root?: HTMLElement | null): ChartMode {
  if (typeof document === 'undefined') return 'light'
  const el = root || document.documentElement
  if (el.classList.contains('dark')) return 'dark'
  if (document.body?.classList.contains('dark')) return 'dark'
  if (document.querySelector('html.dark, .dark .Layout, body.dark')) return 'dark'
  return 'light'
}

/** 注册 ECharts 主题（light / dark 各一份） */
export function buildWaterChartTheme(mode: ChartMode = 'light') {
  const t = getTheme(mode)
  const s = t.surface
  const isDark = mode === 'dark'
  return {
    color: [...t.series],
    backgroundColor: 'transparent',
    textStyle: {
      fontFamily: "Outfit, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      color: s.inkSoft,
      fontWeight: 500,
    },
    title: {
      textStyle: { color: s.ink, fontWeight: 600, fontSize: 14 },
      subtextStyle: { color: s.inkFaint, fontSize: 11 },
    },
    legend: {
      textStyle: { color: s.inkSoft, fontSize: 11, fontWeight: 500 },
      pageTextStyle: { color: s.inkFaint },
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
    },
    tooltip: {
      backgroundColor: s.tooltipBg,
      borderWidth: 1,
      borderColor: s.tooltipBorder,
      padding: [12, 16],
      textStyle: { color: s.tooltipText, fontSize: 12, fontWeight: 500 },
      extraCssText: isDark
        ? 'border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,0.4),0 0 0 1px rgba(100,180,255,0.15);'
        : 'border-radius:14px;box-shadow:0 20px 48px rgba(11,27,51,0.28), inset 0 1px 0 rgba(255,255,255,0.12);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);',
    },
    categoryAxis: {
      axisLine: { lineStyle: { color: s.split, width: isDark ? 1.2 : 1 } },
      axisTick: { show: false },
      axisLabel: {
        color: isDark ? s.inkSoft : s.inkFaint,
        fontSize: 11,
        fontWeight: 500,
        margin: 12,
      },
      splitLine: { show: false },
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: isDark ? s.inkSoft : s.inkFaint,
        fontSize: 11,
        fontWeight: 500,
        margin: 10,
      },
      splitLine: {
        lineStyle: {
          color: s.grid,
          type: [4, 6],
          width: isDark ? 1.2 : 1,
          opacity: 1,
        },
      },
      nameTextStyle: {
        color: isDark ? s.inkSoft : s.inkFaint,
        fontSize: 11,
        padding: [0, 0, 0, 4],
      },
    },
  }
}

export function themeName(mode: ChartMode) {
  return mode === 'dark' ? WATER_CHART_THEME_DARK : WATER_CHART_THEME
}

export function registerWaterThemes(echarts: any) {
  echarts.registerTheme(WATER_CHART_THEME, buildWaterChartTheme('light'))
  echarts.registerTheme(WATER_CHART_THEME_DARK, buildWaterChartTheme('dark'))
}
