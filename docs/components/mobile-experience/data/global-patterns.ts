export interface GlobalPattern {
  id: string
  number: number
  title: string
  summary: string
  rules: string[]
  recommend: string
  avoid: string
  sceneId: string
  checkpoints: string[]
}

/** 全局交互模式：驱动条文区 + 正反对比场景 */
export const globalPatterns: GlobalPattern[] = [
  {
    id: 'layout-shell',
    number: 1,
    title: '布局骨架',
    summary: '页面稳定分为上下文区、内容区、底部主操作区。加载时骨架与终态同构，主操作落在拇指区。',
    rules: [
      '禁止把 PC 多栏后台整体缩小塞进手机。',
      '手机默认单列任务流；宽屏才升级列表+详情。',
      '一屏最多一个视觉主按钮。',
      '固定栏预留安全区，刷新不造成布局跳动。',
    ],
    recommend: '上下文固定 + 内容滚动 + 底部通栏主操作。',
    avoid: '主操作挤在右上角小图标，加载时整页被菊花替换。',
    sceneId: 'stable-shell',
    checkpoints: ['主操作在下半屏', '刷新无明显跳动', '无页面横向滚动'],
  },
  {
    id: 'list-card',
    number: 2,
    title: 'List / Card',
    summary: '列表只负责识别、比较、进入下一步。标题业务可读，状态文案+色彩，一行最多一个主动作。',
    rules: [
      '标题禁止纯编号；须对象+事件可读。',
      '元信息控制在 2～4 个关键字段。',
      '危险操作不得与主前进动作贴邻同权。',
      '空态区分：无数据 / 筛选无结果 / 无权限 / 离线。',
    ],
    recommend: '状态标签 + 标题 + 时限/位置 + 单一「继续处置」。',
    avoid: '九宫格模块墙，或一行塞十余字段与多个同权按钮。',
    sceneId: 'priority',
    checkpoints: ['3 秒内可读懂对象与是否待我处理', '主次动作清晰'],
  },
  {
    id: 'actions',
    number: 3,
    title: '按钮与操作区',
    summary: '当前阶段唯一主路径用底部实心主按钮；次要降级；危险隔离。现场采集入口带明确标签。',
    rules: [
      '主按钮高度建议 48～56，文案跟阶段走。',
      '次要操作用文本/描边/更多。',
      '手势可有，但必须有显式等价入口。',
      '顶部图标不得作为唯一核心入口。',
    ],
    recommend: '底部「开始检查」全宽主按钮，扫码/定位为大热区次入口。',
    avoid: '右上角一排 20px 图标承担全部主路径。',
    sceneId: 'field-operation',
    checkpoints: ['拇指区可达', '危险操作隔离', '文案与阶段一致'],
  },
  {
    id: 'core-data',
    number: 4,
    title: '核心数据展示',
    summary: '最小字段、最大业务信息量：对象、主值+单位、质量状态、更新时间、来源；过期不得伪造成功绿。',
    rules: [
      '禁止只有无单位大数字。',
      '列表中的数须自带单位或状态词。',
      '图表保留对象、指标、时间范围、阈值说明。',
      '过程态禁止把接口 200 写成设备成功。',
    ],
    recommend: '28.46 m · 南门水库 · 2 分钟前 · 遥测正常。',
    avoid: '绿色大字 28.46，无对象无时间无来源。',
    sceneId: 'trustworthy-data',
    checkpoints: ['单位可见', '时间可见', '质量态可读'],
  },
  {
    id: 'light-capture',
    number: 5,
    title: '轻采集',
    summary: '能自动则自动且可改：扫码/定位/拍照回填；键盘只留给判断字段；附件失败可单项重试。',
    rules: [
      '人员、时间、任务号、设施编码优先自动带入。',
      '回填旁显示来源并允许纠正。',
      '长表单自动草稿并显示保存时间。',
      '附件失败行内状态，不整单作废。',
    ],
    recommend: '扫码后自动填充站点，用户只补异常描述与照片。',
    avoid: '逐项手填已有编码、位置、部门。',
    sceneId: 'assisted-input',
    checkpoints: ['自动值可核验', '手工字段显著减少'],
  },
  {
    id: 'reach-feedback',
    number: 6,
    title: '触达与反馈',
    summary: '通知必须深链到可处理对象；反馈按影响分层；Toast 不承担告警生命周期。',
    rules: [
      '触达带对象类型与 ID。',
      '字段错误行内；页面异常用持续 Banner。',
      '高风险用摘要/确认流。',
      '短暂提示仅用于弱结论（如已加入同步队列）。',
    ],
    recommend: '上传失败贴在附件行并提供重试。',
    avoid: '连环 Toast，或告警只闪一次再消失。',
    sceneId: 'feedback',
    checkpoints: ['反馈贴对象', '重要信息不自动永久消失'],
  },
  {
    id: 'offline-sync',
    number: 7,
    title: '离线与同步',
    summary: '离线是完整工作模式：仅本地/待同步/同步中/已确认/冲突可区分；控制类禁止离线排队。',
    rules: [
      '网络与队列状态持续可见。',
      '失败保留输入与附件。',
      '冲突展示差异，禁止静默覆盖。',
      '生产控制指令禁止离线排队。',
    ],
    recommend: '显示「已保存到本机，3 项等待同步」并进队列。',
    avoid: '断网整页禁用，或本地保存显示「提交成功」。',
    sceneId: 'offline',
    checkpoints: ['本地与服务端语义分离', '可逐项重试'],
  },
]

export function getGlobalPattern(id: string): GlobalPattern {
  return globalPatterns.find((item) => item.id === id) ?? globalPatterns[0]
}
