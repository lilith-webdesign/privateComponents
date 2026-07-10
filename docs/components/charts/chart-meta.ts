/** 图表卡片元数据 · 水利业务场景 */

export type ChartSpan = 'sm' | 'md' | 'lg' | 'xl' | 'hero'

export interface ChartMeta {
  id: string
  title: string
  subtitle: string
  domain: string
  span: ChartSpan
  height: number
}

/**
 * 22 个水利信息化业务图表
 * span 与 bento 列布局配合：hero=8, xl=6, lg=5, md=4, sm=3（12 列体系）
 */
export const CHART_CATALOG: ChartMeta[] = [
  {
    id: 'reservoir-level',
    title: '水库水位过程线',
    subtitle: '清江水库 · 近 24h 库水位与汛限水位',
    domain: '水情监测',
    span: 'hero',
    height: 320,
  },
  {
    id: 'inflow-outflow',
    title: '入出库流量对比',
    subtitle: '入库 / 出库 / 发电流量实时对照',
    domain: '水情监测',
    span: 'lg',
    height: 300,
  },
  {
    id: 'storage-gauge',
    title: '水库蓄水率',
    subtitle: '当前蓄水量占兴利库容',
    domain: '工情运行',
    span: 'sm',
    height: 300,
  },
  {
    id: 'basin-rainfall',
    title: '流域面雨量',
    subtitle: '汉江上游各子流域 24h 累计降雨',
    domain: '雨情监测',
    span: 'md',
    height: 300,
  },
  {
    id: 'rain-flow-scatter',
    title: '雨量—流量响应',
    subtitle: '场次洪水降雨与洪峰流量相关',
    domain: '水文分析',
    span: 'md',
    height: 300,
  },
  {
    id: 'water-quality-donut',
    title: '水质类别构成',
    subtitle: '省控断面本月水质类别占比',
    domain: '水质监测',
    span: 'sm',
    height: 300,
  },
  {
    id: 'supply-stack',
    title: '分区供水量',
    subtitle: '生活 / 工业 / 农业 / 生态供水结构',
    domain: '水资源调度',
    span: 'xl',
    height: 300,
  },
  {
    id: 'section-radar',
    title: '河道断面指标雷达',
    subtitle: '流速 · 水深 · 含沙 · 透明度 · 溶解氧',
    domain: '河道监测',
    span: 'md',
    height: 300,
  },
  {
    id: 'flood-heatmap',
    title: '洪水风险热力',
    subtitle: '干流控制站近 14 日超警频次',
    domain: '防汛预警',
    span: 'lg',
    height: 300,
  },
  {
    id: 'pump-funnel',
    title: '泵站能耗漏斗',
    subtitle: '取水—提升—输送—计量损耗',
    domain: '泵站工情',
    span: 'sm',
    height: 300,
  },
  {
    id: 'irrigation-rose',
    title: '灌区用水结构',
    subtitle: '粮食 / 经济作物 / 林果 / 渔业',
    domain: '灌区管理',
    span: 'md',
    height: 300,
  },
  {
    id: 'groundwater-box',
    title: '地下水埋深分布',
    subtitle: '五个监测分区埋深箱线统计',
    domain: '地下水',
    span: 'lg',
    height: 300,
  },
  {
    id: 'gate-step',
    title: '闸门开度过程',
    subtitle: '节制闸 1#–3# 开度阶梯时序',
    domain: '闸站工情',
    span: 'md',
    height: 280,
  },
  {
    id: 'quota-bars',
    title: '取水许可配额',
    subtitle: '重点取水户年度指标完成度',
    domain: '取水许可',
    span: 'md',
    height: 280,
  },
  {
    id: 'alert-pie',
    title: '水文告警分布',
    subtitle: '水位 / 雨量 / 水质 / 设备告警',
    domain: '运行告警',
    span: 'sm',
    height: 280,
  },
  {
    id: 'capacity-curve',
    title: '库容—水位关系',
    subtitle: '水位—库容曲线与当前运行点',
    domain: '水库调度',
    span: 'lg',
    height: 300,
  },
  {
    id: 'admin-treemap',
    title: '行政区用水量',
    subtitle: '地市本年度累计用水量占比',
    domain: '水资源统计',
    span: 'md',
    height: 300,
  },
  {
    id: 'runoff-waterfall',
    title: '年际径流量构成',
    subtitle: '基流 · 降雨产流 · 调蓄 · 蒸发损耗',
    domain: '水文分析',
    span: 'lg',
    height: 300,
  },
  {
    id: 'tide-level',
    title: '感潮河段水位',
    subtitle: '潮位与上游来水叠加过程',
    domain: '河口监测',
    span: 'xl',
    height: 300,
  },
  {
    id: 'device-online',
    title: '监测设备在线率',
    subtitle: '雨量站 / 水位站 / 水质站 / 视频',
    domain: '物联网',
    span: 'sm',
    height: 280,
  },
  {
    id: 'parallel-stations',
    title: '多站水情平行坐标',
    subtitle: '八个控制站水位、流量、雨量对照',
    domain: '流域联防',
    span: 'hero',
    height: 320,
  },
  {
    id: 'sediment-area',
    title: '含沙量季节变化',
    subtitle: '干流控制站月均含沙量面积图',
    domain: '泥沙监测',
    span: 'md',
    height: 280,
  },
]

export const KPI_STRIP = [
  { label: '在线测站', value: '1,286', unit: '座', delta: '+12', tone: 'safe' as const },
  { label: '超警站点', value: '7', unit: '处', delta: '-3', tone: 'warning' as const },
  { label: '今日面雨量', value: '28.6', unit: 'mm', delta: '+4.2', tone: 'info' as const },
  { label: '总蓄水率', value: '72.4', unit: '%', delta: '+1.1', tone: 'safe' as const },
  { label: '水质达标率', value: '94.8', unit: '%', delta: '+0.6', tone: 'safe' as const },
]
