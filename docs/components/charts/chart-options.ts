/**
 * 水利信息化 · ECharts 业务配置（双主题 × 三视觉风格）
 * getChartOption(id, echarts, mode, style)
 * mode 跟随 VitePress light/dark；style 为 liquid | premium | industrial
 * 系列/语义色仍来自 WATER_PALETTE，风格只改呈现参数
 */
import {
  type ChartMode,
  getTheme,
  rgba,
} from './water-palette'
import {
  type VisualStyle,
  type StyledTheme,
  applyStyleToTheme,
  resolveSmooth,
  styledLineGlow,
  styledLinearArea,
  styledBarFill,
  styledBarFillH,
  barCornerRadius,
  styledShadowBlur,
  styledMarkLine,
  styledSoftLegend,
  styledPieItem,
  styledAnim,
  applyGlobalStyleOverlay,
} from './chart-style'

const hours24 = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const days14 = Array.from({ length: 14 }, (_, i) => `D${i + 1}`)

function baseGrid(extra: Record<string, unknown> = {}) {
  return { left: 6, right: 10, top: 40, bottom: 24, containLabel: true, ...extra }
}

function axisTooltip(theme: StyledTheme, unit = '') {
  return {
    trigger: 'axis' as const,
    axisPointer: {
      type: 'line' as const,
      lineStyle: {
        color: rgba(theme.series[0], theme.mode === 'dark' ? 0.4 : 0.28),
        width: theme.presentation.id === 'premium' ? 1 : 1.5,
        type: 'solid' as const,
      },
      z: 0,
    },
    valueFormatter: (v: unknown) => (unit ? `${v} ${unit}` : String(v)),
  }
}

function markLine(theme: StyledTheme, y: number, name: string, color: string) {
  return styledMarkLine(theme, y, name, color, theme.presentation)
}

export type OptionFactory = (echarts: any, theme: StyledTheme) => Record<string, unknown>

export const CHART_OPTIONS: Record<string, OptionFactory> = {
  'reservoir-level': (echarts, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const S = theme.surface
    const P = theme.presentation
    const level = [118.2, 118.4, 118.6, 118.9, 119.1, 119.4, 119.8, 120.2, 120.6, 120.9, 121.1, 121.0, 120.8, 120.5, 120.3, 120.1, 119.9, 119.7, 119.6, 119.5, 119.4, 119.3, 119.2, 119.1, 119.0]
    const series: Record<string, unknown>[] = [
      {
        name: '库水位',
        type: 'line',
        smooth: resolveSmooth(P, 0.42),
        symbol: 'none',
        lineStyle: styledLineGlow(C[0], 3, theme.glowStrength, P),
        areaStyle: {
          color: styledLinearArea(echarts, C[0], theme, P),
        },
        data: level,
        markLine: markLine(theme, 121.5, '汛限 121.5m', SEM.warning),
      },
      {
        name: '汛限水位',
        type: 'line',
        symbol: 'none',
        lineStyle: { width: 0 },
        data: hours24.map(() => 121.5),
        tooltip: { show: false },
      },
    ]
    if (P.showMarkPoint) {
      ;(series[0] as any).markPoint = {
        symbol: 'circle',
        symbolSize: P.markPointSize,
        data: [{ type: 'max', name: '峰值' }],
        label: { fontSize: 10, fontWeight: 600, color: S.ink, distance: 8 },
        itemStyle: {
          color: C[0],
          borderColor: S.markerBorder,
          borderWidth: 2,
          shadowBlur: styledShadowBlur(12, P),
          shadowColor: rgba(C[0], theme.glowStrength),
        },
      }
    }
    return {
      ...styledAnim(P),
      color: [C[0], SEM.warning],
      tooltip: axisTooltip(theme, 'm'),
      legend: styledSoftLegend(theme, P, { data: ['库水位', '汛限水位'] }),
      grid: baseGrid({ top: 44, bottom: 18 }),
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hours24,
        axisLabel: { interval: 3 },
      },
      yAxis: { type: 'value', name: 'm', min: 117, max: 123, splitNumber: 6 },
      series,
    }
  },

  'inflow-outflow': (_e, theme) => {
    const C = theme.series
    const P = theme.presentation
    const barR = barCornerRadius(P, 'vertical')
    return {
      ...styledAnim(P),
      color: [C[1], C[0], C[6]],
      tooltip: axisTooltip(theme, 'm³/s'),
      legend: styledSoftLegend(theme, P, { data: ['入库', '出库', '发电'] }),
      grid: baseGrid(),
      xAxis: { type: 'category', data: ['00', '04', '08', '12', '16', '20', '24'] },
      yAxis: { type: 'value', name: 'm³/s' },
      series: [
        {
          name: '入库',
          type: 'bar',
          barWidth: 11,
          barGap: '28%',
          itemStyle: {
            borderRadius: barR,
            color: styledBarFill(C[1], theme, P),
            shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 14 : 8, P),
            shadowColor: rgba(C[1], theme.mode === 'dark' ? 0.4 : 0.25),
          },
          data: [820, 960, 1120, 1480, 1320, 1080, 940],
        },
        {
          name: '出库',
          type: 'bar',
          barWidth: 11,
          itemStyle: {
            borderRadius: barR,
            color: styledBarFill(C[0], theme, P),
            shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 14 : 8, P),
            shadowColor: rgba(C[0], theme.mode === 'dark' ? 0.38 : 0.22),
          },
          data: [640, 700, 880, 1020, 980, 860, 720],
        },
        {
          name: '发电',
          type: 'line',
          smooth: resolveSmooth(P, 0.35),
          symbol: 'circle',
          symbolSize: P.symbolSize,
          showSymbol: P.showSymbolDefault || P.id !== 'premium',
          itemStyle: {
            color: C[6],
            borderColor: theme.surface.markerBorder,
            borderWidth: 2,
            shadowBlur: styledShadowBlur(8, P),
            shadowColor: rgba(C[6], 0.45),
          },
          lineStyle: styledLineGlow(C[6], 2.4, theme.glowStrength, P),
          data: [420, 450, 510, 580, 560, 500, 460],
        },
      ],
    }
  },

  'storage-gauge': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    return {
      ...styledAnim(P),
      series: [
        {
          type: 'gauge',
          startAngle: 210,
          endAngle: -30,
          min: 0,
          max: 100,
          radius: '90%',
          center: ['50%', '56%'],
          progress: {
            show: true,
            width: 16,
            roundCap: P.gaugeRoundCap,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 0,
                colorStops: [
                  { offset: 0, color: C[2] },
                  { offset: 0.55, color: C[1] },
                  { offset: 1, color: C[0] },
                ],
              },
              shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 22 : 16, P),
              shadowColor: rgba(C[0], theme.mode === 'dark' ? 0.55 : 0.35),
            },
          },
          axisLine: {
            lineStyle: {
              width: 16,
              color: [[1, rgba(C[0], theme.mode === 'dark' ? 0.14 : 0.08)]],
            },
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          anchor: { show: false },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            fontSize: 32,
            fontWeight: 700,
            color: S.ink,
            offsetCenter: [0, '6%'],
            fontFamily: P.axisFontFamily,
          },
          title: {
            offsetCenter: [0, '40%'],
            fontSize: 12,
            color: S.inkFaint,
            fontWeight: 500,
            fontFamily: P.axisFontFamily,
          },
          data: [{ value: 72.4, name: '兴利库容占比' }],
        },
      ],
    }
  },

  'basin-rainfall': (_e, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const P = theme.presentation
    const barR = barCornerRadius(P, 'vertical')
    return {
      ...styledAnim(P),
      color: [C[3]],
      tooltip: axisTooltip(theme, 'mm'),
      grid: baseGrid({ bottom: 6 }),
      xAxis: {
        type: 'category',
        data: ['汉源', '石泉', '安康', '旬阳', '白河', '丹江口', '襄阳', '仙桃'],
        axisLabel: { rotate: 28, fontSize: 10 },
      },
      yAxis: { type: 'value', name: 'mm' },
      series: [
        {
          type: 'bar',
          barWidth: 18,
          data: [42, 58, 76, 91, 64, 38, 27, 19].map((v) => {
            const tone = v > 70 ? SEM.warning : C[3]
            return {
              value: v,
              itemStyle: {
                borderRadius: barR,
                color: styledBarFill(tone, theme, P),
                shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 14 : 10, P),
                shadowColor: rgba(tone, theme.mode === 'dark' ? 0.4 : 0.28),
              },
            }
          }),
          markLine: markLine(theme, 50, '暴雨阈值 50mm', SEM.warning),
        },
      ],
    }
  },

  'rain-flow-scatter': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    const points = [
      [12, 180], [28, 320], [45, 510], [62, 780], [18, 220],
      [75, 960], [33, 410], [51, 640], [88, 1180], [41, 490],
      [56, 720], [22, 260], [69, 890], [35, 430], [94, 1320],
      [15, 195], [48, 580], [71, 910], [39, 470], [83, 1090],
    ]
    return {
      ...styledAnim(P),
      color: [C[3]],
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => `雨量 ${p.value[0]} mm<br/>洪峰 ${p.value[1]} m³/s`,
      },
      grid: baseGrid(),
      xAxis: {
        type: 'value',
        name: '场次雨量 mm',
        nameLocation: 'middle',
        nameGap: 28,
        splitLine: { lineStyle: { color: S.grid } },
      },
      yAxis: {
        type: 'value',
        name: '洪峰 m³/s',
        splitLine: { lineStyle: { color: S.grid } },
      },
      series: [
        {
          type: 'scatter',
          symbolSize: (val: number[]) => 12 + val[0] / 10,
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.35, y: 0.3, r: 0.7,
              colorStops:
                P.id === 'industrial'
                  ? [
                      { offset: 0, color: C[3] },
                      { offset: 1, color: C[0] },
                    ]
                  : [
                      { offset: 0, color: theme.mode === 'dark' ? rgba(C[3], 0.95) : rgba('#fff', 0.95) },
                      { offset: 0.25, color: rgba(C[3], 0.95) },
                      { offset: 1, color: rgba(C[0], 0.8) },
                    ],
            },
            borderColor: theme.mode === 'dark' ? rgba(C[3], 0.5) : rgba('#fff', 0.7),
            borderWidth: P.id === 'industrial' ? 1 : 1.5,
            shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 18 : 14, P),
            shadowColor: rgba(C[3], theme.mode === 'dark' ? 0.55 : 0.4),
          },
          emphasis: {
            scale: 1.25,
            itemStyle: { shadowBlur: styledShadowBlur(24, P) },
          },
          data: points,
        },
      ],
    }
  },

  'water-quality-donut': (_e, theme) => {
    const Q = theme.waterQuality
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [Q.I, Q.II, Q.III, Q.IV, Q.V, Q.worseV],
      tooltip: { trigger: 'item', formatter: '{b}: {c} 个 ({d}%)' },
      legend: styledSoftLegend(theme, P, {
        orient: 'vertical',
        right: 2,
        top: 'middle',
        left: 'auto',
      }),
      series: [
        {
          type: 'pie',
          radius: ['52%', '74%'],
          center: ['38%', '54%'],
          avoidLabelOverlap: true,
          padAngle: P.padAngle,
          itemStyle: styledPieItem(theme, P),
          label: { show: false },
          emphasis: {
            scaleSize: P.id === 'premium' ? 4 : 8,
            itemStyle: {
              shadowBlur: styledShadowBlur(22, P),
              shadowColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(11,27,51,0.18)',
            },
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 600,
              color: theme.surface.ink,
            },
          },
          data: [
            { name: 'I 类', value: 18 },
            { name: 'II 类', value: 42 },
            { name: 'III 类', value: 31 },
            { name: 'IV 类', value: 9 },
            { name: 'V 类', value: 4 },
            { name: '劣V', value: 2 },
          ],
        },
      ],
    }
  },

  'supply-stack': (_e, theme) => {
    const C = theme.series
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[0], C[1], C[2], C[6]],
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: styledSoftLegend(theme, P, { data: ['生活', '工业', '农业', '生态'] }),
      grid: baseGrid({ top: 44 }),
      xAxis: { type: 'category', data: ['一区', '二区', '三区', '四区', '五区', '六区'] },
      yAxis: { type: 'value', name: '万 m³' },
      series: [
        {
          name: '生活', type: 'bar', stack: 's', barWidth: 24,
          emphasis: { focus: 'series' },
          data: [320, 280, 360, 410, 290, 340],
          itemStyle: { color: styledBarFill(C[0], theme, P, 0.55) },
        },
        {
          name: '工业', type: 'bar', stack: 's',
          emphasis: { focus: 'series' },
          data: [210, 260, 190, 230, 250, 200],
          itemStyle: { color: styledBarFill(C[1], theme, P, 0.55) },
        },
        {
          name: '农业', type: 'bar', stack: 's',
          emphasis: { focus: 'series' },
          data: [480, 520, 450, 390, 510, 470],
          itemStyle: { color: styledBarFill(C[2], theme, P, 0.55) },
        },
        {
          name: '生态', type: 'bar', stack: 's',
          emphasis: { focus: 'series' },
          data: [90, 110, 100, 120, 95, 105],
          itemStyle: {
            color: styledBarFill(C[6], theme, P, 0.45),
            borderRadius: barCornerRadius(P, 'stack-top'),
            shadowBlur: styledShadowBlur(8, P),
            shadowColor: rgba(C[6], 0.25),
          },
        },
      ],
    }
  },

  'section-radar': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    const am = P.radarAreaMult
    return {
      ...styledAnim(P),
      color: [C[0], C[2]],
      legend: styledSoftLegend(theme, P, { data: ['当前', '同期'] }),
      radar: {
        indicator: [
          { name: '流速', max: 100 },
          { name: '水深', max: 100 },
          { name: '含沙', max: 100 },
          { name: '透明度', max: 100 },
          { name: '溶解氧', max: 100 },
          { name: '水温', max: 100 },
        ],
        center: ['50%', '56%'],
        radius: '64%',
        axisName: {
          color: S.inkSoft,
          fontSize: 11,
          fontWeight: 500,
          fontFamily: P.axisFontFamily,
          borderRadius: P.id === 'industrial' ? 0 : 4,
          padding: [2, 4],
        },
        splitNumber: 4,
        splitArea: {
          areaStyle: {
            color: [
              rgba(C[0], (theme.mode === 'dark' ? 0.08 : 0.015) * am),
              rgba(C[0], (theme.mode === 'dark' ? 0.16 : 0.05) * am),
              rgba(C[0], (theme.mode === 'dark' ? 0.1 : 0.02) * am),
              rgba(C[0], (theme.mode === 'dark' ? 0.2 : 0.06) * am),
            ],
          },
        },
        splitLine: {
          lineStyle: {
            color: rgba(C[0], theme.mode === 'dark' ? 0.4 : 0.14),
            type: P.id === 'industrial' ? 'solid' : [4, 4],
            width: P.id === 'industrial' ? 1.2 : 1,
          },
        },
        axisLine: { lineStyle: { color: rgba(C[0], theme.mode === 'dark' ? 0.45 : 0.16) } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              name: '当前',
              value: [78, 65, 42, 70, 86, 58],
              areaStyle: {
                color: {
                  type: 'radial',
                  x: 0.5, y: 0.5, r: 0.7,
                  colorStops: [
                    { offset: 0, color: rgba(C[0], (theme.mode === 'dark' ? 0.55 : 0.32) * am) },
                    { offset: 1, color: rgba(C[0], (theme.mode === 'dark' ? 0.12 : 0.06) * am) },
                  ],
                },
              },
              lineStyle: styledLineGlow(C[0], 2.2, theme.glowStrength, P),
              itemStyle: {
                color: C[0],
                borderColor: S.markerBorder,
                borderWidth: 1.5,
              },
              symbol: 'circle',
              symbolSize: P.symbolSize,
            },
            {
              name: '同期',
              value: [62, 70, 55, 60, 74, 64],
              areaStyle: { color: rgba(C[2], 0.1 * am) },
              lineStyle: { width: 1.6, type: 'dashed', color: C[2] },
              symbol: 'none',
            },
          ],
        },
      ],
    }
  },

  'flood-heatmap': (_e, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const S = theme.surface
    const P = theme.presentation
    const stations = ['寸滩', '宜昌', '沙市', '城陵矶', '汉口', '九江', '大通', '南京']
    const data: [number, number, number][] = []
    stations.forEach((_, si) => {
      days14.forEach((_, di) => {
        const base = Math.max(0, Math.round(Math.sin(si * 0.8 + di * 0.45) * 3 + (si + di) % 4))
        data.push([di, si, base])
      })
    })
    return {
      ...styledAnim(P),
      tooltip: {
        position: 'top',
        formatter: (p: any) => `${stations[p.value[1]]} · ${days14[p.value[0]]}<br/>超警 ${p.value[2]} 次`,
      },
      grid: { left: 56, right: 20, top: 14, bottom: 40 },
      xAxis: {
        type: 'category',
        data: days14,
        splitArea: { show: false },
        axisLabel: { fontSize: 10 },
      },
      yAxis: {
        type: 'category',
        data: stations,
        axisLabel: { fontSize: 11, fontWeight: 500 },
      },
      visualMap: {
        min: 0,
        max: 6,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 2,
        itemWidth: 12,
        itemHeight: 100,
        inRange: {
          color: [
            rgba(C[0], theme.mode === 'dark' ? 0.18 : 0.06),
            rgba(C[3], theme.mode === 'dark' ? 0.75 : 0.55),
            C[3],
            SEM.warning,
            SEM.danger,
          ],
        },
        textStyle: { fontSize: 10, color: S.inkFaint, fontFamily: P.axisFontFamily },
      },
      series: [
        {
          type: 'heatmap',
          data,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: styledShadowBlur(14, P),
              shadowColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(11,27,51,0.25)',
              borderColor: theme.mode === 'dark' ? rgba(C[3], 0.6) : '#fff',
              borderWidth: 2,
            },
          },
          itemStyle: {
            borderRadius: P.heatmapRadius,
            borderColor: theme.mode === 'dark' ? 'rgba(12, 28, 48, 0.9)' : 'rgba(255,255,255,0.65)',
            borderWidth: P.id === 'industrial' ? 1 : 2,
          },
        },
      ],
    }
  },

  'pump-funnel': (_e, theme) => {
    const C = theme.series
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[0], C[1], C[2], C[4], C[11]],
      tooltip: { trigger: 'item', formatter: '{b}: {c} 万 kWh' },
      series: [
        {
          type: 'funnel',
          left: '10%',
          width: '76%',
          top: 22,
          bottom: 14,
          minSize: '16%',
          maxSize: '100%',
          sort: 'descending',
          gap: P.id === 'industrial' ? 4 : 8,
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}\n{c}',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 600,
            fontFamily: P.axisFontFamily,
            textShadowColor: 'rgba(0,0,0,0.45)',
            textShadowBlur: 4,
          },
          itemStyle: {
            borderColor: theme.surface.sliceBorder,
            borderWidth: P.id === 'industrial' ? 1 : 2,
            borderRadius: P.funnelRadius,
            shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 16 : 12, P),
            shadowColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.35)' : 'rgba(11,27,51,0.12)',
          },
          emphasis: {
            label: { fontSize: 12 },
            itemStyle: { shadowBlur: styledShadowBlur(20, P) },
          },
          data: [
            { name: '取水', value: 100 },
            { name: '一级提升', value: 82 },
            { name: '二级提升', value: 64 },
            { name: '管网输送', value: 48 },
            { name: '计量出水', value: 36 },
          ],
        },
      ],
    }
  },

  'irrigation-rose': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[0], C[2], C[6], C[1], C[4], C[7]],
      tooltip: { trigger: 'item' },
      legend: styledSoftLegend(theme, P, {
        itemWidth: Math.max(6, P.legendItemSize - 1),
        itemHeight: Math.max(6, P.legendItemSize - 1),
        textStyle: { fontSize: 10 },
      }),
      series: [
        {
          type: 'pie',
          roseType: 'area',
          radius: ['16%', '70%'],
          center: ['48%', '56%'],
          padAngle: P.padAngle > 0 ? Math.min(P.padAngle, 1.5) : 0,
          itemStyle: styledPieItem(theme, P),
          label: {
            fontSize: 11,
            color: S.inkSoft,
            fontWeight: 500,
            fontFamily: P.axisFontFamily,
          },
          emphasis: {
            scaleSize: P.id === 'premium' ? 3 : 6,
            itemStyle: { shadowBlur: styledShadowBlur(18, P) },
          },
          data: [
            { name: '粮食作物', value: 42 },
            { name: '经济作物', value: 28 },
            { name: '林果', value: 16 },
            { name: '渔业', value: 12 },
            { name: '其他', value: 8 },
          ],
        },
      ],
    }
  },

  'groundwater-box': (_e, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const S = theme.surface
    const P = theme.presentation
    const raw = [
      [2.1, 3.4, 4.2, 5.1, 6.8],
      [4.5, 6.2, 7.8, 9.1, 11.4],
      [8.2, 10.1, 12.4, 14.0, 16.8],
      [3.0, 4.8, 5.9, 7.2, 9.0],
      [12.0, 14.5, 16.2, 18.8, 22.1],
    ]
    return {
      ...styledAnim(P),
      color: [C[0]],
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => {
          if (p.seriesType !== 'boxplot') return ''
          const d = p.data
          return `${p.name}<br/>最小 ${d[1]} · Q1 ${d[2]} · 中位 ${d[3]} · Q3 ${d[4]} · 最大 ${d[5]} m`
        },
      },
      grid: baseGrid(),
      xAxis: {
        type: 'category',
        data: ['平原A', '平原B', '丘陵C', '河谷D', '山前E'],
      },
      yAxis: { type: 'value', name: '埋深 m', inverse: true },
      series: [
        {
          name: '埋深',
          type: 'boxplot',
          data: raw,
          itemStyle: {
            color: rgba(C[0], theme.mode === 'dark' ? 0.18 : 0.14),
            borderColor: C[0],
            borderWidth: P.id === 'industrial' ? 2.2 : 1.8,
            shadowBlur: styledShadowBlur(8, P),
            shadowColor: rgba(C[0], 0.2),
          },
          boxWidth: [16, 30],
        },
        {
          name: '异常点',
          type: 'scatter',
          data: [[2, 19.5], [4, 24.2]],
          symbolSize: P.symbolSize + 3,
          itemStyle: {
            color: SEM.danger,
            borderColor: S.markerBorder,
            borderWidth: 2,
            shadowBlur: styledShadowBlur(12, P),
            shadowColor: rgba(SEM.danger, 0.5),
          },
        },
      ],
    }
  },

  'gate-step': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[0], C[1], C[4]],
      tooltip: axisTooltip(theme, '%'),
      legend: styledSoftLegend(theme, P, { data: ['1#闸', '2#闸', '3#闸'] }),
      grid: baseGrid({ top: 40 }),
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      },
      yAxis: { type: 'value', name: '开度 %', max: 100 },
      series: [0, 1, 4].map((ci, i) => {
        const seriesData = [
          [20, 20, 45, 45, 70, 70, 55, 40],
          [10, 30, 30, 55, 55, 80, 80, 60],
          [0, 15, 15, 35, 50, 50, 65, 65],
        ][i]
        return {
          name: `${i + 1}#闸`,
          type: 'line',
          step: 'end',
          symbol: 'circle',
          symbolSize: P.symbolSize,
          lineStyle: styledLineGlow(C[ci], 2.2, theme.glowStrength, P),
          itemStyle: {
            color: C[ci],
            borderColor: S.markerBorder,
            borderWidth: 2,
          },
          data: seriesData,
        }
      }),
    }
  },

  'quota-bars': (_e, theme) => {
    const C = theme.series
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[0], rgba(C[0], 0.18)],
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: styledSoftLegend(theme, P, { data: ['已用', '剩余指标'] }),
      grid: baseGrid({ left: 10, top: 40 }),
      xAxis: { type: 'value', name: '万 m³', max: 100 },
      yAxis: {
        type: 'category',
        data: ['华钢取水', '城南水厂', '高新园区', '灌区总干', '火电一期'],
      },
      series: [
        {
          name: '已用',
          type: 'bar',
          stack: 'q',
          barWidth: 16,
          data: [78, 64, 52, 88, 71],
          itemStyle: {
            color: styledBarFillH(C[0], C[1], P),
            shadowBlur: styledShadowBlur(8, P),
            shadowColor: rgba(C[0], 0.25),
          },
          label: {
            show: true,
            position: 'insideRight',
            formatter: '{c}%',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: 600,
            fontFamily: P.axisFontFamily,
          },
        },
        {
          name: '剩余指标',
          type: 'bar',
          stack: 'q',
          data: [22, 36, 48, 12, 29],
          itemStyle: {
            color: rgba(C[0], theme.mode === 'dark' ? 0.22 : 0.08),
            borderRadius: barCornerRadius(P, 'horizontal-end'),
            borderColor: rgba(C[0], theme.mode === 'dark' ? 0.4 : 0.12),
            borderWidth: 1,
          },
        },
      ],
    }
  },

  'alert-pie': (_e, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const S = theme.surface
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [SEM.warning, C[3], C[4], C[10]],
      tooltip: { trigger: 'item', formatter: '{b}: {c} 条 ({d}%)' },
      series: [
        {
          type: 'pie',
          radius: ['0%', '70%'],
          center: ['50%', '54%'],
          padAngle: P.padAngle,
          itemStyle: styledPieItem(theme, P),
          label: {
            formatter: '{b}\n{d}%',
            fontSize: 11,
            color: S.inkSoft,
            fontWeight: 500,
            lineHeight: 16,
            fontFamily: P.axisFontFamily,
          },
          labelLine: {
            length: 12,
            length2: 8,
            lineStyle: { color: rgba(S.ink, theme.mode === 'dark' ? 0.2 : 0.15) },
          },
          emphasis: {
            scaleSize: P.id === 'premium' ? 4 : 8,
            itemStyle: { shadowBlur: styledShadowBlur(20, P) },
          },
          data: [
            { name: '水位告警', value: 34 },
            { name: '雨量告警', value: 28 },
            { name: '水质告警', value: 18 },
            { name: '设备离线', value: 20 },
          ],
        },
      ],
    }
  },

  'capacity-curve': (echarts, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const S = theme.surface
    const P = theme.presentation
    const curve = [
      [100, 0.2], [105, 0.8], [110, 2.1], [115, 4.6],
      [118, 7.2], [120, 9.8], [122, 13.1], [124, 17.4],
      [126, 22.8], [128, 29.5], [130, 38.0],
    ]
    return {
      ...styledAnim(P),
      color: [C[0], SEM.danger],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const p = params[0]
          return `水位 ${p.value[0]} m<br/>库容 ${p.value[1]} 亿 m³`
        },
      },
      grid: baseGrid(),
      xAxis: {
        type: 'value',
        name: '水位 m',
        min: 100,
        max: 132,
        splitLine: { lineStyle: { color: S.grid } },
      },
      yAxis: {
        type: 'value',
        name: '库容 亿m³',
        splitLine: { lineStyle: { color: S.grid } },
      },
      series: [
        {
          name: '库容曲线',
          type: 'line',
          smooth: resolveSmooth(P, 0.45),
          symbol: 'none',
          lineStyle: styledLineGlow(C[0], 3, theme.glowStrength, P),
          areaStyle: {
            color: styledLinearArea(echarts, C[0], theme, P, 0.85),
          },
          data: curve,
        },
        {
          name: '当前运行点',
          type: 'effectScatter',
          symbolSize: P.id === 'premium' ? 12 : 16,
          rippleEffect: {
            brushType: 'stroke',
            scale: P.id === 'industrial' ? 2.2 : 3.2,
            period: P.id === 'premium' ? 4 : 3,
            color: SEM.danger,
          },
          data: [[119.0, 8.6]],
          itemStyle: {
            color: SEM.danger,
            shadowBlur: styledShadowBlur(16, P),
            shadowColor: rgba(SEM.danger, 0.55),
          },
          label: {
            show: true,
            formatter: '当前',
            position: 'top',
            color: SEM.danger,
            fontSize: 11,
            fontWeight: 700,
            distance: 10,
            fontFamily: P.axisFontFamily,
          },
          z: 10,
        },
      ],
    }
  },

  'admin-treemap': (_e, theme) => {
    const C = theme.series
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[0], C[1], C[2], C[3], C[4], C[6], C[7], C[10]],
      tooltip: { formatter: '{b}: {c} 亿 m³' },
      series: [
        {
          type: 'treemap',
          roam: false,
          nodeClick: false,
          breadcrumb: { show: false },
          label: {
            show: true,
            formatter: '{b}\n{c}',
            fontSize: 12,
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: P.axisFontFamily,
            textShadowColor: 'rgba(0,0,0,0.45)',
            textShadowBlur: 4,
          },
          upperLabel: { show: false },
          itemStyle: {
            borderColor: theme.surface.sliceBorder,
            borderWidth: P.id === 'industrial' ? 2 : 3,
            gapWidth: P.id === 'industrial' ? 2 : 4,
            borderRadius: P.treemapRadius,
            shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 12 : 8, P),
            shadowColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.35)' : 'rgba(11,27,51,0.1)',
          },
          levels: [
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: P.id === 'industrial' ? 3 : 5,
                borderRadius: P.treemapRadius,
              },
            },
          ],
          data: [
            { name: '武汉', value: 28.4 },
            { name: '襄阳', value: 16.2 },
            { name: '宜昌', value: 14.8 },
            { name: '荆州', value: 12.1 },
            { name: '黄冈', value: 9.6 },
            { name: '十堰', value: 8.3 },
            { name: '孝感', value: 7.5 },
            { name: '其他', value: 11.2 },
          ],
        },
      ],
    }
  },

  'runoff-waterfall': (_e, theme) => {
    const C = theme.series
    const SEM = theme.semantic
    const P = theme.presentation
    const categories = ['基流', '降雨产流', '区间汇入', '水库调蓄', '蒸发损耗', '净径流量']
    const placeholder = [0, 42, 68, 95, 0, 0]
    const positive = [42, 26, 27, 0, 0, 88]
    const negative = [0, 0, 0, 12, 18, 0]
    const topR = barCornerRadius(P, 'stack-top')
    return {
      ...styledAnim(P),
      color: [C[0], SEM.danger],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const p = params.find((x: any) => x.seriesName !== '辅助')
          if (!p) return ''
          const sign = p.seriesName === '损耗' ? '-' : ''
          return `${p.name}<br/>${sign}${p.value} 亿 m³`
        },
      },
      grid: baseGrid({ top: 28 }),
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { fontSize: 10, interval: 0 },
      },
      yAxis: { type: 'value', name: '亿 m³' },
      series: [
        {
          name: '辅助',
          type: 'bar',
          stack: 'w',
          itemStyle: { borderColor: 'transparent', color: 'transparent' },
          emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
          data: placeholder,
        },
        {
          name: '增量',
          type: 'bar',
          stack: 'w',
          barWidth: 30,
          itemStyle: {
            borderRadius: topR,
            color: styledBarFill(C[0], theme, P, theme.mode === 'dark' ? 0.55 : 0.4),
            shadowBlur: styledShadowBlur(10, P),
            shadowColor: rgba(C[0], 0.28),
          },
          data: positive,
        },
        {
          name: '损耗',
          type: 'bar',
          stack: 'w',
          itemStyle: {
            borderRadius: topR,
            color: styledBarFill(SEM.danger, theme, P, 0.4),
            shadowBlur: styledShadowBlur(8, P),
            shadowColor: rgba(SEM.danger, 0.3),
          },
          data: negative,
        },
      ],
    }
  },

  'tide-level': (echarts, theme) => {
    const C = theme.series
    const P = theme.presentation
    const tide = [1.2, 1.8, 2.4, 2.9, 3.1, 2.8, 2.2, 1.5, 0.9, 0.6, 0.8, 1.4, 2.1, 2.7, 3.0, 2.6, 2.0, 1.3, 0.8, 0.5, 0.7, 1.2, 1.9, 2.5, 2.8]
    const upstream = [2.8, 2.9, 2.9, 3.0, 3.1, 3.2, 3.2, 3.3, 3.3, 3.4, 3.4, 3.5, 3.5, 3.4, 3.4, 3.3, 3.3, 3.2, 3.1, 3.1, 3.0, 3.0, 2.9, 2.9, 2.8]
    return {
      ...styledAnim(P),
      color: [C[5], C[0]],
      tooltip: axisTooltip(theme, 'm'),
      legend: styledSoftLegend(theme, P, { data: ['潮位', '上游来水水位'] }),
      grid: baseGrid({ top: 44 }),
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hours24,
        axisLabel: { interval: 3 },
      },
      yAxis: { type: 'value', name: 'm', min: 0, max: 4.5 },
      series: [
        {
          name: '潮位',
          type: 'line',
          smooth: resolveSmooth(P, 0.55),
          symbol: 'none',
          lineStyle: styledLineGlow(C[5], 3, theme.glowStrength, P),
          areaStyle: {
            color: styledLinearArea(echarts, C[5], theme, P),
          },
          data: tide,
        },
        {
          name: '上游来水水位',
          type: 'line',
          smooth: resolveSmooth(P, 0.35),
          symbol: 'none',
          lineStyle: {
            width: P.id === 'premium' ? 1.5 : 2,
            type: 'dashed',
            color: C[0],
            opacity: theme.mode === 'dark' ? 0.75 : 0.85,
          },
          data: upstream,
        },
      ],
    }
  },

  'device-online': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    const barR = barCornerRadius(P, 'vertical')
    return {
      ...styledAnim(P),
      color: [C[0], C[1], C[2], C[4]],
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: baseGrid({ left: 6, bottom: 6 }),
      xAxis: {
        type: 'category',
        data: ['雨量站', '水位站', '水质站', '视频'],
      },
      yAxis: { type: 'value', name: '%', max: 100 },
      series: [
        {
          type: 'bar',
          barWidth: 32,
          data: [
            { value: 98.2, tone: C[0] },
            { value: 96.5, tone: C[1] },
            { value: 91.8, tone: C[2] },
            { value: 88.4, tone: C[4] },
          ].map((d) => ({
            value: d.value,
            itemStyle: {
              borderRadius: barR,
              color: styledBarFill(d.tone, theme, P),
              shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 16 : 12, P),
              shadowColor: rgba(d.tone, theme.mode === 'dark' ? 0.45 : 0.3),
            },
          })),
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%',
            fontSize: 12,
            color: S.inkSoft,
            fontWeight: 700,
            distance: 6,
            fontFamily: P.axisFontFamily,
          },
        },
      ],
    }
  },

  'parallel-stations': (_e, theme) => {
    const C = theme.series
    const S = theme.surface
    const P = theme.presentation
    const schema = [
      { name: '水位(m)', index: 0, min: 10, max: 40 },
      { name: '流量(m³/s)', index: 1, min: 100, max: 5000 },
      { name: '雨量(mm)', index: 2, min: 0, max: 100 },
      { name: '含沙(kg/m³)', index: 3, min: 0, max: 8 },
      { name: '水温(℃)', index: 4, min: 5, max: 30 },
    ]
    const stations = [
      { name: '寸滩', data: [28.4, 3200, 42, 3.2, 18] },
      { name: '宜昌', data: [32.1, 4100, 28, 2.1, 17] },
      { name: '沙市', data: [35.6, 3800, 55, 2.8, 19] },
      { name: '城陵矶', data: [31.2, 2900, 61, 1.9, 20] },
      { name: '汉口', data: [24.8, 2600, 33, 1.4, 21] },
      { name: '九江', data: [19.5, 3100, 47, 1.8, 22] },
      { name: '大通', data: [14.2, 4500, 22, 1.1, 23] },
      { name: '南京', data: [11.8, 4800, 18, 0.9, 24] },
    ]
    return {
      ...styledAnim(P),
      color: [C[0]],
      tooltip: {
        formatter: (params: any) => {
          const s = stations[params.dataIndex]
          if (!s) return ''
          return `<b>${s.name}</b><br/>` + schema.map((g, i) => `${g.name}: ${s.data[i]}`).join('<br/>')
        },
      },
      parallelAxis: schema.map((s, i) => ({
        dim: i,
        name: s.name,
        min: s.min,
        max: s.max,
        nameTextStyle: {
          color: S.inkSoft,
          fontSize: 11,
          fontWeight: 500,
          fontFamily: P.axisFontFamily,
        },
        axisLine: { lineStyle: { color: S.split, width: P.axisLineWidth } },
        axisLabel: {
          color: S.inkFaint,
          fontSize: 10,
          fontFamily: P.axisFontFamily,
        },
        areaSelectStyle: {
          width: 14,
          borderWidth: 0,
          color: rgba(C[0], theme.mode === 'dark' ? 0.2 : 0.12),
          opacity: 1,
        },
      })),
      parallel: {
        left: 48,
        right: 48,
        top: 42,
        bottom: 28,
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'end',
          nameGap: 14,
        },
      },
      series: [
        {
          type: 'parallel',
          smooth: P.parallelSmooth,
          lineStyle: {
            width: P.id === 'premium' ? 1.6 : P.id === 'industrial' ? 2.4 : 2.2,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: C[0] },
                { offset: 0.5, color: C[1] },
                { offset: 1, color: C[2] },
              ],
            },
            opacity: theme.mode === 'dark' ? 0.8 : 0.72,
            shadowBlur: styledShadowBlur(theme.mode === 'dark' ? 10 : 6, P),
            shadowColor: rgba(C[0], 0.3),
          },
          emphasis: {
            lineStyle: { width: P.id === 'premium' ? 2.4 : 3.8, opacity: 1 },
          },
          data: stations.map((s) => s.data),
        },
      ],
    }
  },

  'sediment-area': (echarts, theme) => {
    const C = theme.series
    const P = theme.presentation
    return {
      ...styledAnim(P),
      color: [C[7], C[0]],
      tooltip: axisTooltip(theme, 'kg/m³'),
      legend: styledSoftLegend(theme, P, { data: ['今年', '多年平均'] }),
      grid: baseGrid({ top: 40 }),
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
      },
      yAxis: { type: 'value', name: 'kg/m³' },
      series: [
        {
          name: '今年',
          type: 'line',
          smooth: resolveSmooth(P, 0.45),
          symbol: 'none',
          lineStyle: styledLineGlow(C[7], 2.8, theme.glowStrength, P),
          areaStyle: {
            color: styledLinearArea(echarts, C[7], theme, P),
          },
          data: [0.4, 0.5, 0.9, 1.8, 3.6, 5.2, 6.8, 5.9, 3.1, 1.4, 0.7, 0.5],
        },
        {
          name: '多年平均',
          type: 'line',
          smooth: resolveSmooth(P, 0.45),
          symbol: 'none',
          lineStyle: {
            width: P.id === 'premium' ? 1.4 : 1.8,
            type: 'dashed',
            color: C[0],
            opacity: theme.mode === 'dark' ? 0.65 : 0.75,
          },
          data: [0.5, 0.6, 1.0, 2.0, 3.2, 4.8, 5.5, 4.6, 2.8, 1.2, 0.8, 0.6],
        },
      ],
    }
  },
}

export function getChartOption(
  id: string,
  echarts: any,
  mode: ChartMode = 'light',
  style: VisualStyle = 'liquid',
) {
  const factory = CHART_OPTIONS[id]
  if (!factory) return null
  const theme = applyStyleToTheme(getTheme(mode), style)
  const option = factory(echarts, theme)
  return applyGlobalStyleOverlay(option, theme, theme.presentation)
}
