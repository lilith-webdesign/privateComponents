export type RoleId = 'water-keeper' | 'engineer' | 'dispatcher' | 'admin' | 'public'

/** 单场景：业务范围 → 数据视野 → UI 交互规范（对比区必须兑现） */
export interface RoleSceneSpec {
  id: string
  title: string
  /** SpecScenario / scenario-content 场景 id */
  sceneId: string
  /** 本场景覆盖的业务范围 */
  businessScope: string
  /** 本场景需要看见的数据 */
  dataView: string
  /** 由此推出的 UI 交互规范（顶部主文案，视觉权重最高） */
  uiNorm: string
  recommend: string
  avoid: string
  /** 一句话场景摘要（次要） */
  summary?: string
}

export interface RoleProfile {
  id: RoleId
  name: string
  duty: string
  permissions: string[]
  dataScope: string[]
  philosophy: string
  rules: string[]
  homeIa: string
  platform: string
  checkpoints: string[]
  /** 该角色默认场景 id（对应 SpecScenario / scenario-content） */
  defaultSceneId: string
  scenes: RoleSceneSpec[]
}

export const roleProfiles: RoleProfile[] = [
  {
    id: 'water-keeper',
    name: '管水员',
    duty: '管辖片区综合管护：设施巡检养护、工单发起与跟进、报警预警处置、水源水质查看与异常上报。先定业务与数据视野，再定现场 UI。',
    permissions: [
      '巡检：任务执行、设施状态录入、异常拍照上报',
      '工单：现场异常转工单/派发跟进（权限内）',
      '报警预警：接收、确认、续办处置',
      '水源水质：片区水源与水质监测查看、超标上报',
      '离线：本地暂存与同步队列',
    ],
    dataScope: [
      '片区巡检任务与设施台账',
      '本人相关工单进度与回执',
      '报警/预警等级、对象、阈值与确认态',
      '水源点与水质指标（值·单位·时间·质量）',
      '待同步记录与冲突项',
    ],
    philosophy: '片区现场以事件与任务驱动：巡检、告警、工单、水质异常混排优先；地图与下半屏操作服务现场；水质与告警必须可信最小集，禁止九宫格与假成功。',
    rules: [
      '工作台：巡检/告警/工单/水质事件驱动，全业务二级入口。',
      '巡检：下半屏主操作 + 地图任务上下文 + 轻采集。',
      '工单：从异常一键带出对象与证据，短路径发送，可跟进度。',
      '报警：生命周期可见（确认≠关闭），深链到对象。',
      '水质：对象·指标·单位·时间·质量同屏，超标给下一步。',
      '离线：仅本地/待同步/已确认分离。',
    ],
    homeIa: '片区工作台（事件混排）→ 巡检/告警/工单/水质详情 → 二级台账与历史',
    platform: '小程序：告警触达、轻巡检、工单发起、水质查看；Hybrid：强离线、轨迹、大批量附件。',
    checkpoints: [
      '工作台是事件流而非九宫格',
      '巡检可单手完成主路径并支持离线暂存',
      '告警可确认且能进入处置/转工单',
      '水质卡具备单位时间质量，超标有动作',
      '工单发送带对象与证据，可回看进度',
    ],
    defaultSceneId: 'wk-workbench',
    scenes: [
      {
        id: 'workbench',
        title: '片区工作台',
        sceneId: 'wk-workbench',
        businessScope: '管水员当日片区内跨线待办：巡检、告警、工单回执、水质异常等。',
        dataView: '事件类型、等级/时限、对象、消息；二级才是台账与历史入口。',
        uiNorm: '工作台以事件与消息驱动，而不是巡检/工单/水质/台账九宫格。主区事件流，消息引导处置，全业务放二级。',
        recommend: '消息条 + 事件卡片（巡检/告警/工单/水质）+ 「片区台账」二级入口。',
        avoid: '巡检、工单、报警、水质、报表做成同等模块墙。',
      },
      {
        id: 'patrol',
        title: '现场巡检',
        sceneId: 'wk-patrol',
        businessScope: '按任务对设施巡查、状态录入、异常取证，常单手弱网。',
        dataView: '任务对象、位置/距离、检查项、照片、网络与暂存态。',
        uiNorm: '巡检主操作沉在下半屏；地图与列表是同一任务两种编排；能扫码/定位带入的不手填。',
        recommend: '任务上下文 + 下半屏「开始检查/拍照/暂存」大热区。',
        avoid: '主操作在右上小图标，或先填一长串空白表。',
      },
      {
        id: 'workorder',
        title: '工单发送',
        sceneId: 'wk-workorder',
        businessScope: '现场发现异常后发起/跟进工单，把问题交给工程或值班续办。',
        dataView: '对象设施、异常摘要、附件证据、紧急度、接收方、工单状态。',
        uiNorm: '工单从当前异常上下文一键带出对象与证据，短路径确认发送；发送后可看进度，禁止空白工单从零填写。',
        recommend: '顶卡：设施+异常已带入；补紧急度与说明；主按钮发送并跟踪。',
        avoid: '离开现场上下文进空白建单页，重填编码与位置。',
      },
      {
        id: 'alarm',
        title: '报警预警',
        sceneId: 'wk-alarm',
        businessScope: '接收片区报警/预警，确认并决定巡查、转工单或继续观察。',
        dataView: '等级、对象、当前值/阈值、持续时间、确认态、建议动作。',
        uiNorm: '报警是生命周期对象：触达→确认→处置/转工单→关闭；确认≠关闭；禁止只闪 Toast。',
        recommend: '告警详情：等级+对象+值/阈值+时间线 +「确认并巡查/转工单」。',
        avoid: '红色 Toast「已知晓」后无记录无下一步。',
      },
      {
        id: 'water-quality',
        title: '水源水质',
        sceneId: 'wk-water-quality',
        businessScope: '查看管辖水源地/供水点水质与相关监测，发现超标及时上报。',
        dataView: '水源点、指标名、值、单位、采样/更新时间、质量状态、阈值、历史趋势入口。',
        uiNorm: '水质是可信数据卡不是装饰大数：对象·指标·单位·时间·质量必显；超标给上报/转工单，不做无单位仪表盘。',
        recommend: '水源选择 + 指标卡（值单位时间质量）+ 超标主操作。',
        avoid: '只有一个绿色大数字，无水源无单位无时间。',
      },
      {
        id: 'offline',
        title: '离线暂存',
        sceneId: 'wk-offline',
        businessScope: '库区/管网弱网下继续巡检填报与取证，恢复后同步。',
        dataView: '网络态、待同步条数、每条本地/确认状态、失败原因。',
        uiNorm: '离线是完整工作模式：顶栏持续可见队列；仅本地与已确认必须分离；禁止本地保存显示「提交成功」。',
        recommend: '「已存本机 · N 项待同步」+ 队列列表 + 逐项重试。',
        avoid: '断网整页禁用，或 Toast 提交成功实为未同步。',
      },
    ],
  },
  {
    id: 'engineer',
    name: '工程人员',
    duty: '业务范围由现场工程与经营末梢共同构成：施工抢修、安装、调试、水费收缴、用户服务、验收闭环。先定业务与数据视野，再定 UI。',
    permissions: [
      '施工/抢修：接单、节点推进、安全与质量存档',
      '安装：户表/设备安装登记与铅封',
      '调试：参数联调记录与结果确认',
      '收缴：催缴、收款登记、开票申请',
      '用户：档案查询、报修续办（权限内）',
      '验收：材料齐备后提交，不可假成功',
    ],
    dataScope: [
      '事件/消息/待办（驱动入口）',
      '工单节点、附件、操作者·时间·来源',
      '户档与表计（安装/收缴所需最小集）',
      '设定值/反馈值/阈值（调试）',
      '欠费期数与收款状态（收缴）',
      '验收材料清单状态',
    ],
    philosophy: '业务范围决定看见什么数据；数据视野决定做成事件驱动还是档案驱动；UI 只服务「短路径 + 可追溯」，禁止九宫格与假成功。',
    rules: [
      '工作台：事件/消息驱动，二级入口收纳全业务，不做模块墙。',
      '节点类：能拍照/自动带入就不手填，路径短但不牺牲档案完整性。',
      '安装类：顶部用户回显卡建立「装对户」信赖，再进入最少字段。',
      '调试类：设定/反馈/责任人/时间同屏。',
      '收缴/用户：短路径办结，敏感字段收敛。',
    ],
    homeIa: '事件与消息工作台 → 按事件类型进施工/安装/调试/收缴 → 档案与验收',
    platform: '小程序：事件接单、安装、收缴、用户查询；Hybrid：重附件施工、离线催缴、联调曲线。',
    checkpoints: [
      '工作台一眼是事件流，不是九宫格',
      '节点页能看出自动带入/拍照存档，而非空白手填',
      '安装页顶部能确认当前户/表，再动手填',
      '调试有设定与反馈对比',
      '验收缺件不可显示成功',
    ],
    defaultSceneId: 'eng-workbench',
    scenes: [
      {
        id: 'workbench',
        title: '工程工作台',
        sceneId: 'eng-workbench',
        businessScope: '工程人员当日要处理的跨线待办：抢修、调试预约、催缴、验收等。',
        dataView: '事件类型、紧急度/时限、对象、消息提醒；二级才是全业务入口。',
        uiNorm: '工作台以事件与消息驱动入口，而不是九宫格模块墙。主区是待办事件流，消息条引导处置，全业务放进二级入口。',
        recommend: '顶部消息/待办摘要 + 事件卡片（类型·对象·时限·下一步）+ 「全部业务」二级入口。',
        avoid: '施工、安装、收费、用户、物资、配置做成同等九宫格，紧急抢修被淹没。',
      },
      {
        id: 'construction',
        title: '施工节点',
        sceneId: 'eng-construction',
        businessScope: '现场施工/抢修按节点推进，并留下可验收、可追责的档案。',
        dataView: '节点状态、操作者、时间、照片/附件、关联备件与许可。',
        uiNorm: '节点流程类：能拍照或自动带入的不手填；服务路径要短，但不牺牲档案完整性（人、时、证齐全）。',
        recommend: '节点时间线 + 当前节点「拍照存档并完成」；已完成节点可见人/时/附件。',
        avoid: '单选「施工中」一键提交，无人无时无证。',
      },
      {
        id: 'install',
        title: '安装登记',
        sceneId: 'eng-install',
        businessScope: '对新用户或新表完成安装登记，并保证装的是当前正确对象。',
        dataView: '户号/户主/地址回显、表号、铅封、定位、安装说明。',
        uiNorm: '安装前用顶部用户回显 Card 建立「是否为当前用户/当前户」的信赖感；能扫码/定位带入的字段禁止空白手填。',
        recommend: '顶卡：户主·户号·地址·已核验；下方仅铅封与说明等必要人工项。',
        avoid: '无回显直接空白大表，县镇村户主身份证经纬度全手填。',
      },
      {
        id: 'debug',
        title: '调试联调',
        sceneId: 'eng-debug',
        businessScope: '设备参数调试与泵站/闸控联调，结果必须可复核。',
        dataView: '设定值、反馈值、偏差、阈值、责任人、开始时间、数据新鲜度。',
        uiNorm: '调试页是「可信对照」不是「填一个数」：设定与反馈同屏，责任人与时间可见，禁止裸数字成功态。',
        recommend: '设定/反馈指标卡并排 + 责任条 + 记录本步。',
        avoid: '只显示一个频率数字点保存，无单位无反馈无操作者。',
      },
      {
        id: 'billing',
        title: '水费收缴',
        sceneId: 'eng-billing',
        businessScope: '片区催缴与现场收款登记（经营末梢，仍属工程外勤常见职责）。',
        dataView: '户名户号、欠费金额、期数、上次触达、收款/开票动作。',
        uiNorm: '收缴工作台按欠费事件列表驱动，主操作是收款/登记；禁止把报表中心、系统配置当现场首页。',
        recommend: '欠费户卡片 + 金额期数 + 主按钮收款；支持扫码/搜户。',
        avoid: '综合查询、报表、费率配置平铺成入口。',
      },
      {
        id: 'user',
        title: '用户档案',
        sceneId: 'eng-user-mgmt',
        businessScope: '服务路径上的用户查询与续办（催缴、报修、换表上下文）。',
        dataView: '基础信息（脱敏）、用表安装、欠费摘要、服务记录；敏感字段默认收敛。',
        uiNorm: '档案分层：先摘要卡再分组展开；主操作是续办业务，不是「编辑全部字段」。',
        recommend: '顶部分层摘要 + 分组列表 + 催缴/报修续办。',
        avoid: '身份证银行合同全量平铺，单屏编辑全部。',
      },
      {
        id: 'accept',
        title: '验收闭环',
        sceneId: 'eng-acceptance',
        businessScope: '安装/施工完成后的验收申请与材料齐套。',
        dataView: '材料清单项、齐套状态、缺件项、提交条件。',
        uiNorm: '验收是清单驱动：材料不齐不可提交成功；缺件须可定位补传。',
        recommend: '材料时间线/清单 5/6 + 补传并提交。',
        avoid: '一键提交成功且无材料校验。',
      },
    ],
  },
  {
    id: 'dispatcher',
    name: '调度员',
    duty: '负责县域水资源的统筹调度、应急响应与运行监控。',
    permissions: ['全域监测查看', '调度指令下发', '应急预案启动', '水位/流量远程调控'],
    dataScope: ['县域全域实时监测', '历史调度记录', '流域关联分析', '气象预报信息'],
    philosophy: '先看清再动手：只读实时态 → 摘要 → 身份复核 → 分阶段反馈 → 审计时间线；成功必须同时看到过程反馈与实时数据变化。',
    rules: [
      '禁止列表上一键开闸；控制必须从对象详情进入。',
      '摘要页固定：目标、影响范围、动作、对象、数据时戳。',
      '反馈分阶段：已校验 / 已下发 / 执行中 / 已回执 / 超时未知。',
      '禁止单独 Toast「调度成功」；须绑定影响对象实时数据刷新。',
      '生产控制禁止离线排队。',
    ],
    homeIa: '态势摘要 + 异常对象 + 进行中指令 → 对象详情 → 控制协议',
    platform: '高风险调控以 Hybrid + 安全通道为主；小程序可看数与发起审批，无安全能力不直控。',
    checkpoints: [
      '无摘要、无实时态无法触达下发',
      '成功态同时具备过程阶段与数据变化',
      '审计可回放参数与回执',
    ],
    defaultSceneId: 'high-risk',
    scenes: [
      { id: 'state', title: '态势与可信数据', sceneId: 'trustworthy-data', summary: '全域 KPI 最小可信集。' },
      { id: 'risk', title: '控制协议', sceneId: 'high-risk', summary: '摘要 → 复核 → 下发。' },
      { id: 'feedback', title: '真实过程', sceneId: 'truthful-feedback', summary: '阶段进度，非假成功。' },
      { id: 'alarm', title: '告警生命周期', sceneId: 'alarm', summary: '确认与关闭语义分离。' },
    ],
  },
  {
    id: 'admin',
    name: '行政人员',
    duty: '负责水务业务的行政审批、督查督办与政策管理。',
    permissions: ['审批流程处理', '督查任务下发', '公文流转', '统计报表查看与导出'],
    dataScope: ['审批业务数据', '督查整改进度', '部门效能统计', '政策法规库'],
    philosophy: '依据先行、动作简单：先看清批什么、依据是什么，再通过/驳回/补件；统计只读优先。',
    rules: [
      '首页默认待我审批 / 督查待办。',
      '详情分层：申请摘要 → 附件依据 → 历史意见 → 操作。',
      '驳回必须填原因；关键附件缺失不可盲批。',
      '不做闸控与片区巡检地图主路径。',
    ],
    homeIa: '待办审批 → 督查 → 流转中 → 统计 / 法规库',
    platform: '小程序适合待办触达与轻审批；大批量导出可降级 Web/桌面。',
    checkpoints: [
      '可不进无关业务模块完成审批',
      '无依据时有明确阻断',
      '督办进度状态可读',
    ],
    defaultSceneId: 'actions',
    scenes: [
      { id: 'todo', title: '待办主次', sceneId: 'actions', summary: '一个主操作，次要收纳。' },
      { id: 'nav', title: '返回连续', sceneId: 'navigation', summary: '从详情返回保留列表上下文。' },
      { id: 'states', title: '状态覆盖', sceneId: 'ui-states', summary: '无权限/无结果要说清楚。' },
    ],
  },
  {
    id: 'public',
    name: '公众用户',
    duty: '县域内用水居民、企业等普通公众的服务与预警接收。',
    permissions: ['用水信息查询', '在线报修/投诉', '水费缴纳', '政策资讯浏览', '应急预警接收'],
    dataScope: ['个人用水记录', '服务进度查询', '公告通知', '服务网点信息'],
    philosophy: '短路径、低概念、强进度：查得到、报得了、看得到办到哪；预警能看懂、能知道怎么办。',
    rules: [
      '首页：常用服务大卡 + 公告/预警条。',
      '报修极简表单 + 拍照；进度时间轴用生活语言。',
      '不暴露内部调度、工单池、设施台账。',
      '预警含等级文案与建议行动。',
    ],
    homeIa: '服务（缴费/报修/查询）→ 我的进度 → 公告预警',
    platform: '以小程序为主，一般不需要 Hybrid。',
    checkpoints: [
      '首次用户可不经培训完成报修',
      '进度状态生活化',
      '看不到内部角色数据视野',
    ],
    defaultSceneId: 'form',
    scenes: [
      { id: 'form', title: '报修表单', sceneId: 'form', summary: '单列、标签置顶、少字段。' },
      { id: 'feedback', title: '进度反馈', sceneId: 'feedback', summary: '结果贴对象，不连环 Toast。' },
      { id: 'touch', title: '大热区入口', sceneId: 'touch', summary: '服务主按钮可点中。' },
    ],
  },
]

export function getRoleProfile(id: string): RoleProfile {
  return roleProfiles.find((item) => item.id === id) ?? roleProfiles[0]
}
