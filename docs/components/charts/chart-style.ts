/**
 * 图表视觉风格层
 * 与 WATER_PALETTE 系列/语义色解耦：只调呈现参数（线宽、光晕、圆角、网格等），
 * 不改 palette hex 源值。
 */
import type { ChartMode, ThemeTokens } from './water-palette'
import {
  rgba,
  linearArea,
  barFill,
  barFillH,
  lineGlow,
  softLegend,
  pieItem,
  chartAnim,
} from './water-palette'

export type VisualStyle = 'liquid' | 'premium' | 'industrial'

export interface StyleMeta {
  id: VisualStyle
  label: string
  labelEn: string
  desc: string
}

export const STYLE_META: StyleMeta[] = [
  {
    id: 'liquid',
    label: '液态玻璃',
    labelEn: 'Hydro-glass',
    desc: '柔和光晕、圆角柱体与丰润面积',
  },
  {
    id: 'premium',
    label: 'Premium',
    labelEn: 'Pro Product',
    desc: '悬浮材质、发丝线、产品级数据感',
  },
  {
    id: 'industrial',
    label: '工业大屏',
    labelEn: 'SCADA',
    desc: '硬切直角、密网格与实心填充',
  },
]

/** ECharts 呈现参数：图表配置工厂据此调整视觉，不改色板 */
export interface StylePresentation {
  id: VisualStyle
  mode: ChartMode
  /** 折线平滑：false / 0~1 */
  smooth: number | false
  /** 基准线宽倍率（相对 chart 内写死的 width） */
  lineWidthMult: number
  /** 绝对推荐线宽（细线风格） */
  lineWidth: number
  /** 光晕倍率，乘在 theme.glowStrength 上 */
  glowMult: number
  /** 面积顶/中透明度倍率 */
  areaTopMult: number
  areaMidMult: number
  /** 柱体圆角 [tl, tr, br, bl] 或统一数值 */
  barRadius: [number, number, number, number]
  barRadiusTop: number
  barRadiusBottom: number
  /** 柱体填充 soft 底端透明度 */
  barSoft: number
  /** 柱体/图形阴影倍率 */
  shadowMult: number
  /** 饼图 padAngle */
  padAngle: number
  /** 饼切片圆角 */
  pieBorderRadius: number
  pieBorderWidth: number
  /** markLine */
  markLineWidth: number
  markLineDash: number[] | 'solid' | 'dashed'
  markLabelRadius: number
  markLabelPad: [number, number]
  /** 是否显示 markPoint（premium 更克制） */
  showMarkPoint: boolean
  markPointSize: number
  /** 网格 */
  gridType: number[] | 'solid' | 'dashed'
  gridWidth: number
  axisLineWidth: number
  /** 轴标签字体 */
  axisFontFamily: string
  axisFontSize: number
  axisFontWeight: number | string
  /** legend */
  legendIcon: 'circle' | 'roundRect' | 'rect'
  legendItemSize: number
  /** 符号 */
  symbolSize: number
  showSymbolDefault: boolean
  /** tooltip 圆角（extraCssText） */
  tooltipRadius: number
  /** 动画 */
  animDuration: number
  animEasing: string
  /** 平行坐标是否平滑 */
  parallelSmooth: boolean
  /** 热力/漏斗/树图圆角 */
  heatmapRadius: number
  funnelRadius: number
  treemapRadius: number
  /** gauge 圆角端 */
  gaugeRoundCap: boolean
  /** 雷达区域透明度倍率 */
  radarAreaMult: number
}

const MONO =
  "ui-monospace, 'SF Mono', 'Cascadia Code', 'Consolas', 'Noto Sans SC', monospace"
const SANS =
  "Outfit, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"

export function getStylePresentation(
  style: VisualStyle = 'liquid',
  mode: ChartMode = 'light',
): StylePresentation {
  const dark = mode === 'dark'

  /**
   * Premium · Pro product (Apple Health / Linear / Grok product charts)
   * NOT "plain white card". Signature: hairline precision + soft depth +
   * refined continuous curves + airy grid + pill bars.
   */
  if (style === 'premium') {
    return {
      id: 'premium',
      mode,
      smooth: 0.55,
      lineWidthMult: 0.85,
      lineWidth: dark ? 2.6 : 2.4,
      glowMult: dark ? 0.35 : 0.18,
      areaTopMult: dark ? 0.34 : 0.26,
      areaMidMult: dark ? 0.12 : 0.09,
      barRadius: [12, 12, 12, 12],
      barRadiusTop: 12,
      barRadiusBottom: 12,
      barSoft: dark ? 0.5 : 0.32,
      shadowMult: 0.65,
      padAngle: 2.5,
      pieBorderRadius: 10,
      pieBorderWidth: 3,
      markLineWidth: 1.1,
      markLineDash: [5, 7],
      markLabelRadius: 10,
      markLabelPad: [5, 10],
      showMarkPoint: false,
      markPointSize: 6,
      gridType: [2, 10],
      gridWidth: 0.8,
      axisLineWidth: 0,
      axisFontFamily: SANS,
      axisFontSize: 11,
      axisFontWeight: 500,
      legendIcon: 'circle',
      legendItemSize: 8,
      symbolSize: 0,
      showSymbolDefault: false,
      tooltipRadius: 16,
      animDuration: 900,
      animEasing: 'cubicOut',
      parallelSmooth: true,
      heatmapRadius: 8,
      funnelRadius: 10,
      treemapRadius: 14,
      gaugeRoundCap: true,
      radarAreaMult: 0.5,
    }
  }

  if (style === 'industrial') {
    return {
      id: 'industrial',
      mode,
      smooth: false,
      lineWidthMult: 1.05,
      lineWidth: 2.5,
      glowMult: 0,
      areaTopMult: dark ? 0.98 : 0.92,
      areaMidMult: dark ? 0.95 : 0.88,
      barRadius: [0, 0, 0, 0],
      barRadiusTop: 0,
      barRadiusBottom: 0,
      barSoft: 1,
      shadowMult: 0.08,
      padAngle: 0,
      pieBorderRadius: 0,
      pieBorderWidth: 1.5,
      markLineWidth: 2,
      markLineDash: [6, 4],
      markLabelRadius: 0,
      markLabelPad: [2, 5],
      showMarkPoint: true,
      markPointSize: 8,
      gridType: 'solid',
      gridWidth: dark ? 1.25 : 1.1,
      axisLineWidth: 1.8,
      axisFontFamily: MONO,
      axisFontSize: 10,
      axisFontWeight: 500,
      legendIcon: 'rect',
      legendItemSize: 8,
      symbolSize: 6,
      showSymbolDefault: true,
      tooltipRadius: 2,
      animDuration: 480,
      animEasing: 'linear',
      parallelSmooth: false,
      heatmapRadius: 0,
      funnelRadius: 0,
      treemapRadius: 0,
      gaugeRoundCap: false,
      radarAreaMult: 1.05,
    }
  }

  // liquid (default) — hydro-glass
  return {
    id: 'liquid',
    mode,
    smooth: 0.42,
    lineWidthMult: 1,
    lineWidth: 2.8,
    glowMult: dark ? 1.15 : 1,
    areaTopMult: 1,
    areaMidMult: 1,
    barRadius: [8, 8, 3, 3],
    barRadiusTop: 8,
    barRadiusBottom: 3,
    barSoft: dark ? 0.55 : 0.38,
    shadowMult: 1,
    padAngle: 2,
    pieBorderRadius: 8,
    pieBorderWidth: 2.5,
    markLineWidth: 1.5,
    markLineDash: 'dashed',
    markLabelRadius: 6,
    markLabelPad: [3, 7],
    showMarkPoint: true,
    markPointSize: 10,
    gridType: [4, 6],
    gridWidth: dark ? 1.2 : 1,
    axisLineWidth: dark ? 1.2 : 1,
    axisFontFamily: SANS,
    axisFontSize: 11,
    axisFontWeight: 500,
    legendIcon: 'circle',
    legendItemSize: 8,
    symbolSize: 7,
    showSymbolDefault: false,
    tooltipRadius: 14,
    animDuration: 900,
    animEasing: 'cubicOut',
    parallelSmooth: true,
    heatmapRadius: 5,
    funnelRadius: 8,
    treemapRadius: 10,
    gaugeRoundCap: true,
    radarAreaMult: 1,
  }
}

/** 将风格倍率合并进 theme 的 glow / area（不改 series hex） */
export function applyStyleToTheme(
  theme: ThemeTokens,
  style: VisualStyle,
): ThemeTokens & { presentation: StylePresentation } {
  const pres = getStylePresentation(style, theme.mode)
  return {
    ...theme,
    glowStrength: Math.max(0, theme.glowStrength * pres.glowMult),
    areaTop: theme.areaTop * pres.areaTopMult,
    areaMid: theme.areaMid * pres.areaMidMult,
    presentation: pres,
  }
}

export type StyledTheme = ThemeTokens & { presentation: StylePresentation }

export function resolveSmooth(
  pres: StylePresentation,
  preferred?: number | false,
): number | false {
  if (pres.smooth === false) return false
  if (preferred === false) return false
  if (typeof preferred === 'number') return preferred
  return pres.smooth
}

export function styledLineWidth(pres: StylePresentation, base = 2.8): number {
  if (pres.id === 'premium') return pres.lineWidth
  if (pres.id === 'industrial') return Math.max(pres.lineWidth, base * pres.lineWidthMult)
  return base * pres.lineWidthMult
}

export function styledLineGlow(
  hex: string,
  baseWidth: number,
  themeGlow: number,
  pres: StylePresentation,
) {
  const width = styledLineWidth(pres, baseWidth)
  const strength = themeGlow * (pres.glowMult > 0 ? 1 : 0)
  // industrial: solid, no glow
  if (pres.id === 'industrial' || strength <= 0.02) {
    return {
      width,
      color: hex,
      shadowBlur: 0,
      shadowColor: 'transparent',
      cap: (pres.id === 'industrial' ? 'butt' : 'round') as 'butt' | 'round',
    }
  }
  // premium: bold continuous stroke + soft product bloom
  if (pres.id === 'premium') {
    return {
      width: Math.max(width, 2.4),
      color: hex,
      shadowBlur: 14,
      shadowColor: rgba(hex, 0.28),
      cap: 'round' as const,
      join: 'round' as const,
    }
  }
  return lineGlow(hex, width, themeGlow)
}

export function styledLinearArea(
  echarts: any,
  hex: string,
  theme: ThemeTokens,
  pres: StylePresentation,
  topScale = 1,
) {
  const top = theme.areaTop * topScale
  const mid = theme.areaMid
  // industrial: flatter, more solid fill
  if (pres.id === 'industrial') {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: rgba(hex, Math.min(top * 1.05, 0.72)) },
      { offset: 0.55, color: rgba(hex, Math.min(mid * 1.4, 0.45)) },
      { offset: 1, color: rgba(hex, Math.min(mid * 0.9, 0.28)) },
    ])
  }
  if (pres.id === 'premium') {
    // Apple Health-style soft area under a continuous line
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: rgba(hex, Math.min(Math.max(top, 0.18), 0.32)) },
      { offset: 0.55, color: rgba(hex, Math.min(Math.max(mid, 0.06), 0.12)) },
      { offset: 1, color: rgba(hex, 0.0) },
    ])
  }
  return linearArea(echarts, hex, top, mid, 0.01)
}

export function styledBarFill(hex: string, theme: ThemeTokens, pres: StylePresentation, soft?: number) {
  const s = soft ?? pres.barSoft
  if (pres.id === 'industrial') {
    // SCADA: flat solid, no soft product gradient
    return hex
  }
  if (pres.id === 'premium') {
    // Pill bars: luminous top → soft base (not flat admin gray)
    return {
      type: 'linear' as const,
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: hex },
        { offset: 0.45, color: rgba(hex, theme.mode === 'dark' ? 0.9 : 0.92) },
        { offset: 1, color: rgba(hex, theme.mode === 'dark' ? 0.42 : Math.max(s, 0.28)) },
      ],
    }
  }
  return barFill(hex, s, true)
}

export function styledBarFillH(hex: string, endHex: string | undefined, pres: StylePresentation) {
  if (pres.id === 'industrial') {
    return hex
  }
  return barFillH(hex, endHex)
}

export function barCornerRadius(
  pres: StylePresentation,
  kind: 'vertical' | 'horizontal-end' | 'stack-top' = 'vertical',
): number | number[] {
  if (pres.id === 'industrial') {
    return 0
  }
  if (kind === 'horizontal-end') {
    const r = pres.barRadiusTop
    return [0, r, r, 0]
  }
  if (kind === 'stack-top') {
    return [pres.barRadiusTop, pres.barRadiusTop, 0, 0]
  }
  return [...pres.barRadius]
}

export function styledShadowBlur(base: number, pres: StylePresentation): number {
  return Math.round(base * pres.shadowMult * 10) / 10
}

export function styledMarkLine(
  theme: ThemeTokens,
  y: number,
  name: string,
  color: string,
  pres: StylePresentation,
) {
  const dash =
    pres.markLineDash === 'solid'
      ? 'solid'
      : pres.markLineDash === 'dashed'
        ? 'dashed'
        : pres.markLineDash

  const premium = pres.id === 'premium'
  return {
    silent: true,
    symbol: 'none',
    lineStyle: {
      color: rgba(color, pres.id === 'industrial' ? 1 : premium ? 0.55 : 0.9),
      type: dash,
      width: pres.markLineWidth,
    },
    label: {
      formatter: name,
      color: premium
        ? theme.mode === 'dark'
          ? theme.surface.inkSoft
          : theme.surface.inkSoft
        : color,
      fontSize: premium ? 10 : 10,
      fontWeight: premium ? 500 : 600,
      fontFamily: pres.axisFontFamily,
      backgroundColor: premium
        ? theme.mode === 'dark'
          ? 'rgba(28,28,30,0.92)'
          : 'rgba(255,255,255,0.92)'
        : pres.id === 'industrial'
          ? rgba(color, theme.mode === 'dark' ? 0.22 : 0.12)
          : rgba(color, theme.mode === 'dark' ? 0.16 : 0.1),
      padding: pres.markLabelPad,
      borderRadius: pres.markLabelRadius,
      borderColor: premium
        ? theme.mode === 'dark'
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(0,0,0,0.06)'
        : rgba(color, theme.mode === 'dark' ? 0.35 : 0.2),
      borderWidth: premium ? 0.5 : 1,
      position: 'insideEndTop' as const,
    },
    data: [{ yAxis: y }],
  }
}

export function styledSoftLegend(
  theme: ThemeTokens,
  pres: StylePresentation,
  extra: Record<string, unknown> = {},
) {
  const premium = pres.id === 'premium'
  const base = softLegend(theme, {
    itemWidth: pres.legendItemSize,
    itemHeight: pres.legendItemSize,
    itemGap: premium ? 16 : 14,
    icon: pres.legendIcon,
    textStyle: {
      color: premium
        ? theme.mode === 'dark'
          ? 'rgba(235,235,245,0.6)'
          : 'rgba(60,60,67,0.65)'
        : theme.surface.inkSoft,
      fontSize: premium ? 10 : 11,
      fontWeight: premium ? 400 : 500,
      fontFamily: pres.axisFontFamily,
      padding: [0, 0, 0, premium ? 3 : 2],
    },
    ...extra,
  })
  return base
}

export function styledPieItem(theme: ThemeTokens, pres: StylePresentation) {
  const base = pieItem(theme)
  if (pres.id === 'premium') {
    return {
      ...base,
      borderRadius: pres.pieBorderRadius,
      borderWidth: pres.pieBorderWidth,
      borderColor: theme.mode === 'dark' ? 'rgba(28,28,30,0.95)' : 'rgba(255,255,255,0.95)',
      shadowBlur: 0,
      shadowColor: 'transparent',
    }
  }
  return {
    ...base,
    borderRadius: pres.pieBorderRadius,
    borderWidth: pres.pieBorderWidth,
    shadowBlur:
      pres.id === 'industrial'
        ? 0
        : styledShadowBlur(theme.mode === 'dark' ? 18 : 12, pres),
    shadowColor:
      pres.id === 'industrial'
        ? 'transparent'
        : theme.mode === 'dark'
          ? 'rgba(40, 120, 220, 0.35)'
          : 'rgba(11, 27, 51, 0.1)',
  }
}

export function styledAnim(pres: StylePresentation, delay = 0) {
  const base = chartAnim(delay)
  return {
    ...base,
    animationDuration: pres.animDuration,
    animationDurationUpdate: Math.round(pres.animDuration * 0.55),
    animationEasing: pres.animEasing as 'cubicOut',
  }
}

export function styledSplitLine(theme: ThemeTokens, pres: StylePresentation) {
  const type =
    pres.gridType === 'solid'
      ? 'solid'
      : pres.gridType === 'dashed'
        ? 'dashed'
        : pres.gridType
  if (pres.id === 'premium') {
    return {
      show: true,
      lineStyle: {
        color:
          theme.mode === 'dark'
            ? 'rgba(235,235,245,0.08)'
            : 'rgba(60,60,67,0.1)',
        type: type as any,
        width: pres.gridWidth,
        opacity: 1,
      },
    }
  }
  return {
    show: true,
    lineStyle: {
      color: theme.surface.grid,
      type,
      width: pres.gridWidth,
      opacity: 1,
    },
  }
}

export function styledAxisLabel(theme: ThemeTokens, pres: StylePresentation, extra: Record<string, unknown> = {}) {
  if (pres.id === 'premium') {
    return {
      color:
        theme.mode === 'dark'
          ? 'rgba(235,235,245,0.42)'
          : 'rgba(60,60,67,0.48)',
      fontSize: pres.axisFontSize,
      fontWeight: pres.axisFontWeight,
      fontFamily: pres.axisFontFamily,
      margin: 10,
      ...extra,
    }
  }
  return {
    color: theme.mode === 'dark' ? theme.surface.inkSoft : theme.surface.inkFaint,
    fontSize: pres.axisFontSize,
    fontWeight: pres.axisFontWeight,
    fontFamily: pres.axisFontFamily,
    ...extra,
  }
}

export function styledTooltipExtra(pres: StylePresentation, mode: ChartMode): string {
  const r = pres.tooltipRadius
  if (pres.id === 'industrial') {
    return mode === 'dark'
      ? `border-radius:${r}px;box-shadow:0 0 0 1px rgba(34,211,238,0.35),0 8px 24px rgba(0,0,0,0.45);font-family:${MONO};`
      : `border-radius:${r}px;box-shadow:0 0 0 1px rgba(0,47,167,0.2),0 8px 20px rgba(11,27,51,0.18);font-family:${MONO};`
  }
  if (pres.id === 'premium') {
    return mode === 'dark'
      ? `border-radius:${r}px;background:rgba(28,28,30,0.82)!important;border:1px solid rgba(255,255,255,0.1);box-shadow:0 18px 50px rgba(0,0,0,0.5),0 0 0 0.5px rgba(255,255,255,0.06);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);`
      : `border-radius:${r}px;background:rgba(255,255,255,0.86)!important;border:1px solid rgba(0,0,0,0.06);box-shadow:0 18px 50px rgba(0,0,0,0.12),0 2px 6px rgba(0,0,0,0.04);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);`
  }
  return mode === 'dark'
    ? `border-radius:${r}px;box-shadow:0 16px 40px rgba(0,0,0,0.4),0 0 0 1px rgba(100,180,255,0.15);`
    : `border-radius:${r}px;box-shadow:0 20px 48px rgba(11,27,51,0.28), inset 0 1px 0 rgba(255,255,255,0.12);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);`
}

/** 给 option 根节点注入轴/网格/tooltip 等全局风格覆盖 */
export function applyGlobalStyleOverlay(
  option: Record<string, unknown>,
  theme: ThemeTokens,
  pres: StylePresentation,
): Record<string, unknown> {
  const S = theme.surface
  const axisLabel = styledAxisLabel(theme, pres)
  const splitLine = styledSplitLine(theme, pres)

  const patchAxis = (axis: unknown): unknown => {
    if (!axis) return axis
    if (Array.isArray(axis)) return axis.map(patchAxis)
    const a = axis as Record<string, unknown>
    const next: Record<string, unknown> = {
      ...a,
      axisLabel: {
        ...(typeof a.axisLabel === 'object' && a.axisLabel ? a.axisLabel : {}),
        ...axisLabel,
        ...(typeof a.axisLabel === 'object' && a.axisLabel
          ? // keep explicit overrides like interval/rotate
            Object.fromEntries(
              Object.entries(a.axisLabel as object).filter(
                ([k]) => !['color', 'fontSize', 'fontWeight', 'fontFamily'].includes(k),
              ),
            )
          : {}),
      },
    }
    if (a.type === 'value' || (!a.type && a.splitLine !== undefined) || a.name) {
      // value axes often rely on theme splitLine; force style grid when not hidden
      const existingSplit = a.splitLine as Record<string, unknown> | undefined
      if (!existingSplit || existingSplit.show !== false) {
        next.splitLine = {
          ...splitLine,
          ...(existingSplit || {}),
          lineStyle: {
            ...splitLine.lineStyle,
            ...((existingSplit?.lineStyle as object) || {}),
            ...splitLine.lineStyle,
          },
        }
      }
    }
    if (a.axisLine && typeof a.axisLine === 'object') {
      const al = a.axisLine as Record<string, unknown>
      const ls = (al.lineStyle as Record<string, unknown>) || {}
      next.axisLine = {
        ...al,
        lineStyle: {
          ...ls,
          width: pres.axisLineWidth,
          color: ls.color ?? S.split,
        },
      }
    } else if (pres.id === 'industrial' && a.type === 'category') {
      next.axisLine = {
        show: true,
        lineStyle: { color: S.split, width: pres.axisLineWidth },
      }
    }

    // industrial SCADA: short category ticks + denser value split
    if (pres.id === 'industrial') {
      if (a.type === 'category' || (!a.type && Array.isArray(a.data))) {
        next.axisTick = {
          show: true,
          alignWithLabel: true,
          length: 4,
          lineStyle: { color: S.split, width: 1 },
        }
      }
      if (a.type === 'value' || a.name) {
        if (typeof a.splitNumber !== 'number') next.splitNumber = 6
        next.minorSplitLine = {
          show: true,
          lineStyle: {
            color: S.grid,
            width: 0.55,
            type: 'solid',
            opacity: theme.mode === 'dark' ? 0.5 : 0.4,
          },
        }
      }
    }
    if (a.nameTextStyle && typeof a.nameTextStyle === 'object') {
      next.nameTextStyle = {
        ...(a.nameTextStyle as object),
        fontFamily: pres.axisFontFamily,
        color: theme.mode === 'dark' ? S.inkSoft : S.inkFaint,
      }
    }
    return next
  }

  const next = { ...option }
  if (next.xAxis) next.xAxis = patchAxis(next.xAxis)
  if (next.yAxis) next.yAxis = patchAxis(next.yAxis)

  // Premium: airy chart padding (product stage, not dense dashboard)
  if (pres.id === 'premium' && next.grid && typeof next.grid === 'object' && !Array.isArray(next.grid)) {
    const g = next.grid as Record<string, unknown>
    next.grid = {
      ...g,
      left: 12,
      right: 18,
      top: typeof g.top === 'number' ? Math.max(g.top as number, 48) : 48,
      bottom: typeof g.bottom === 'number' ? Math.max(g.bottom as number, 28) : 28,
      containLabel: true,
    }
  }

  // tooltip chrome
  const tip = (next.tooltip as Record<string, unknown>) || {}
  next.tooltip = {
    ...tip,
    extraCssText: styledTooltipExtra(pres, theme.mode),
    textStyle: {
      ...(typeof tip.textStyle === 'object' ? tip.textStyle : {}),
      fontFamily: pres.axisFontFamily,
      fontSize: pres.id === 'premium' ? 12.5 : 12,
      fontWeight: pres.id === 'premium' ? 500 : 500,
    },
  }

  // textStyle root
  next.textStyle = {
    ...(typeof next.textStyle === 'object' ? next.textStyle : {}),
    fontFamily: pres.axisFontFamily,
  }

  return next
}
