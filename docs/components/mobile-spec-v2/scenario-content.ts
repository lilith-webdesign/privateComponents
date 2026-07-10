export type ScenarioTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

export interface ScenarioMetric {
  label: string
  value: string
  unit?: string
  meta?: string
  tone?: ScenarioTone
}

export interface ScenarioItem {
  title: string
  meta: string
  value?: string
  status?: string
  tone?: ScenarioTone
}

export interface ScenarioField {
  label: string
  value: string
  placeholder?: string
}

export interface ScenarioStep {
  label: string
  meta: string
  state: 'done' | 'active' | 'waiting' | 'error'
}

export interface ScenarioView {
  title: string
  context: string
  status?: string
  statusTone?: ScenarioTone
  metrics?: ScenarioMetric[]
  items?: ScenarioItem[]
  fields?: ScenarioField[]
  steps?: ScenarioStep[]
  primary: string
  secondary?: string
  note?: string
}

export interface ScenarioContent {
  pattern: string
  good: ScenarioView
  bad: ScenarioView
}

export const scenarioContent: Record<string, ScenarioContent> = {
  'role-task': {
    pattern: 'role',
    good: {
      title: '我的工作', context: '防汛巡检 · 今日', status: '2 项需要优先处理', statusTone: 'warning',
      items: [
        { title: '南门水库溢洪道巡检', meta: '09:30 前 · 距离 1.2 km', status: '进行中', tone: 'info' },
        { title: '东干渠闸门复核', meta: '11:00 前 · 已下载离线包', status: '待开始', tone: 'neutral' },
      ],
      primary: '继续当前任务', secondary: '查看全部任务',
    },
    bad: {
      title: '智慧水利平台', context: '全部业务模块',
      items: [
        { title: '水情监测', meta: '进入模块' }, { title: '工程管理', meta: '进入模块' },
        { title: '防汛会商', meta: '进入模块' }, { title: '水资源管理', meta: '进入模块' },
        { title: '系统配置', meta: '进入模块' }, { title: '统计报表', meta: '进入模块' },
      ],
      primary: '更多应用', note: '不同角色看到完全相同的入口。',
    },
  },
  'priority': {
    pattern: 'tasks',
    good: {
      title: '待处理', context: '按风险与时限排序', status: '1 项已超时', statusTone: 'danger',
      items: [
        { title: '北河站水位越警戒', meta: '持续 18 分钟 · 影响 3 处', status: '立即处置', tone: 'danger' },
        { title: '泵站巡检即将到期', meta: '剩余 45 分钟', status: '临期', tone: 'warning' },
        { title: '日报待复核', meta: '今天 17:00 前', status: '常规', tone: 'neutral' },
      ],
      primary: '处置最高优先项', secondary: '打开任务筛选',
    },
    bad: {
      title: '功能中心', context: '按系统建设目录排序',
      items: [
        { title: '基础信息管理', meta: '12 个子模块' }, { title: '监测数据管理', meta: '18 个子模块' },
        { title: '业务应用管理', meta: '24 个子模块' }, { title: '综合查询统计', meta: '9 个子模块' },
      ],
      primary: '展开全部目录', note: '紧急任务被埋在功能树之后。',
    },
  },
  'trustworthy-data': {
    pattern: 'metric',
    good: {
      title: '南门水库', context: '实时水情', status: '遥测正常 · 2 分钟前', statusTone: 'success',
      metrics: [
        { label: '库水位', value: '28.46', unit: 'm', meta: '警戒 29.20 m', tone: 'info' },
        { label: '入库流量', value: '126.8', unit: 'm³/s', meta: '较 1h 前 +4.2%' },
      ],
      primary: '刷新实时数据', secondary: '查看数据来源', note: '来源：南门水库遥测站 A1',
    },
    bad: {
      title: '监测数据', context: '概览',
      metrics: [{ label: '水位', value: '28.46', tone: 'success' }],
      primary: '查看', note: '没有单位、来源、时间或质量状态。',
    },
  },
  'state-first': {
    pattern: 'incident',
    good: {
      title: '闸门反馈异常', context: '东干渠 2# 闸门', status: '高风险 · 未确认', statusTone: 'danger',
      metrics: [
        { label: '指令开度', value: '45', unit: '%' }, { label: '反馈开度', value: '12', unit: '%', tone: 'danger' },
      ],
      items: [
        { title: '影响范围', meta: '下游 2 个灌区供水可能受限' },
        { title: '当前责任人', meta: '值班员 王工 · 尚未接单' },
      ],
      primary: '确认并开始处置', secondary: '联系现场人员',
    },
    bad: {
      title: '数字孪生总览', context: '科技驾驶舱',
      metrics: [
        { label: '综合指数', value: '86', unit: '分' }, { label: '在线率', value: '92', unit: '%' },
        { label: '今日数据', value: '24K' },
      ],
      items: [{ title: '提示', meta: '角落有 1 条异常消息', status: '1', tone: 'danger' }],
      primary: '进入大屏', note: '视觉装饰压过了异常对象和影响。',
    },
  },
  'field-operation': {
    pattern: 'field',
    good: {
      title: '溢洪道现场检查', context: '步骤 2/5 · 现场模式', status: '定位正常 · 精度 6m', statusTone: 'success',
      items: [
        { title: '闸墩外观', meta: '检查裂缝、渗水与剥蚀', status: '待检查' },
        { title: '消力池', meta: '检查淤积与冲刷', status: '下一项' },
      ],
      primary: '开始本项检查', secondary: '扫码确认设施',
    },
    bad: {
      title: '巡检详情', context: '操作集中在右上角',
      items: [
        { title: '溢洪道', meta: '点击右上角第 3 个图标开始' },
        { title: '操作', meta: '编辑  扫码  定位  上传  提交' },
      ],
      primary: '⋯', note: '小图标密集排列，戴手套时难以命中。',
    },
  },
  'assisted-input': {
    pattern: 'capture',
    good: {
      title: '异常快速上报', context: '任务 #FX-20260710-08', status: '已自动填充 4 项', statusTone: 'info',
      fields: [
        { label: '设施', value: '东干渠 2# 闸门' }, { label: '位置', value: '已定位 · 31.23, 121.47' },
        { label: '异常描述', value: '', placeholder: '补充现场判断' },
      ],
      items: [{ title: '现场照片', meta: '已采集 2 张 · 原图本地保留', status: '完成', tone: 'success' }],
      primary: '扫码并补充证据', secondary: '语音描述',
    },
    bad: {
      title: '新增异常记录', context: '请完整填写以下信息',
      fields: [
        { label: '设备编码', value: '' }, { label: '设备名称', value: '' }, { label: '经度', value: '' },
        { label: '纬度', value: '' }, { label: '所属部门', value: '' }, { label: '上报人员', value: '' },
      ],
      primary: '继续填写', note: '系统已有的信息被要求重复录入。',
    },
  },
  'offline': {
    pattern: 'offline',
    good: {
      title: '离线任务', context: '网络不可用', status: '3 项保存在本机', statusTone: 'warning',
      items: [
        { title: '溢洪道巡检记录', meta: '表单完整 · 2 张照片', status: '等待同步', tone: 'warning' },
        { title: '东干渠设备照片', meta: '原图 4.8 MB', status: '等待同步', tone: 'warning' },
        { title: '泵站检查草稿', meta: '还缺 1 个必填项', status: '本地草稿', tone: 'neutral' },
      ],
      primary: '模拟恢复网络', secondary: '查看同步队列',
    },
    bad: {
      title: '巡检上报', context: '连接已断开', status: '提交成功', statusTone: 'success',
      items: [{ title: '记录 #0812', meta: '实际上仅写入浏览器缓存', status: '已提交', tone: 'success' }],
      primary: '返回首页', note: '本地保存被错误表达为服务端成功。',
    },
  },
  'alarm': {
    pattern: 'alarm',
    good: {
      title: '水位越线告警', context: '北河站 · 一级告警', status: '新告警 · 持续 18 分钟', statusTone: 'danger',
      metrics: [{ label: '当前水位', value: '32.18', unit: 'm', meta: '警戒 31.80 m', tone: 'danger' }],
      steps: [
        { label: '告警产生', meta: '09:18 · 自动监测', state: 'done' },
        { label: '等待确认', meta: '值班组尚未接单', state: 'active' },
        { label: '处置与恢复', meta: '等待后续记录', state: 'waiting' },
      ],
      primary: '确认并开始处置', secondary: '转派值班组',
    },
    bad: {
      title: '首页', context: '提示将在 3 秒后消失', status: '水位异常！', statusTone: 'danger',
      items: [{ title: '系统消息', meta: '北河站可能存在异常', status: '知道了' }],
      primary: '知道了', note: '消息消失后没有告警对象和处理记录。',
    },
  },
  'truthful-feedback': {
    pattern: 'command',
    good: {
      title: '闸门控制进度', context: '东干渠 2# · 目标开度 45%', status: '正在等待设备回执', statusTone: 'info',
      steps: [
        { label: '状态预检查', meta: '设备在线，联锁正常', state: 'done' },
        { label: '平台已受理', meta: '指令 ID C-18402', state: 'done' },
        { label: '设备执行', meta: '等待遥信确认', state: 'active' },
        { label: '目标状态确认', meta: '尚未完成', state: 'waiting' },
      ],
      primary: '推进模拟回执', secondary: '查看指令详情',
    },
    bad: {
      title: '控制结果', context: '接口响应 200', status: '闸门开启成功', statusTone: 'success',
      metrics: [{ label: '目标开度', value: '45', unit: '%' }],
      primary: '完成', note: '尚未收到设备反馈，却提前宣告业务成功。',
    },
  },
  'high-risk': {
    pattern: 'risk',
    good: {
      title: '执行前复核', context: '高风险生产控制', status: '在线 · 数据更新于 09:42:18', statusTone: 'warning',
      items: [
        { title: '控制对象', meta: '东干渠 2# 闸门' }, { title: '执行动作', meta: '开度由 12% 调整至 45%' },
        { title: '影响范围', meta: '下游一、二灌区流量将增加' }, { title: '审批要求', meta: '需要第二值班员复核' },
      ],
      primary: '身份复核并继续', secondary: '取消操作',
    },
    bad: {
      title: '设备列表', context: '点击开关立即下发',
      items: [
        { title: '东干渠 1# 闸门', meta: '当前 38%', status: '开启' },
        { title: '东干渠 2# 闸门', meta: '状态 10 分钟前', status: '开启' },
        { title: '东干渠 3# 闸门', meta: '当前 50%', status: '关闭' },
      ],
      primary: '一键全部开启', note: '无实时校验、影响摘要与身份复核。',
    },
  },
  'recovery': {
    pattern: 'conflict',
    good: {
      title: '发现数据冲突', context: '巡检记录 #0812', status: '你的现场内容已安全保留', statusTone: 'warning',
      items: [
        { title: '本机版本', meta: '09:38 · 你 · “闸墩出现新裂缝”', status: '2 张照片', tone: 'info' },
        { title: '服务端版本', meta: '09:40 · 李工 · “已安排复核”', status: '1 条处置', tone: 'neutral' },
      ],
      primary: '选择合并结果', secondary: '稍后处理',
    },
    bad: {
      title: '保存失败', context: '未知错误', status: '请重新填写', statusTone: 'danger',
      items: [{ title: '表单内容', meta: '已被清空', status: '0 项' }],
      primary: '重新开始', note: '既不保留内容，也不说明冲突来源。',
    },
  },
  'audit': {
    pattern: 'timeline',
    good: {
      title: '事件处置记录', context: '闸门反馈异常 #A-2041', status: '已恢复 · 全程 42 分钟', statusTone: 'success',
      steps: [
        { label: '王工确认告警', meta: '09:18 · 移动值班端', state: 'done' },
        { label: '李工现场复核', meta: '09:31 · 定位与照片已存档', state: 'done' },
        { label: '设备恢复 45% 开度', meta: '10:00 · 遥信 ID T-884', state: 'done' },
      ],
      primary: '展开完整审计信息', secondary: '导出处置记录',
    },
    bad: {
      title: '历史记录', context: '事件 #A-2041',
      steps: [{ label: '已完成', meta: '今天', state: 'done' }],
      primary: '返回', note: '没有人员、参数、设备回执和时间依据。',
    },
  },
  'responsive': {
    pattern: 'responsive',
    good: {
      title: '测站列表', context: '响应式重新编排', status: '手机单列摘要', statusTone: 'info',
      items: [
        { title: '南门水库', meta: '水位 28.46 m · 2 分钟前', status: '正常', tone: 'success' },
        { title: '北河站', meta: '水位 32.18 m · 1 分钟前', status: '越线', tone: 'danger' },
      ],
      primary: '切换宽屏预览', secondary: '查看字段优先级',
    },
    bad: {
      title: '桌面监测表格', context: '整体缩放 42%',
      items: [
        { title: '站名 水位 流量 雨量 在线率 更新时间 操作', meta: '南门水库 28.46 126.8 12.0 99% 09:42 编辑 删除' },
        { title: '北河站 32.18 88.2 16.3 97% 09:41 编辑 删除', meta: '内容需要横向拖动' },
      ],
      primary: '横向滚动', note: '字号和热区随页面一起缩小。',
    },
  },
  'stable-shell': {
    pattern: 'shell',
    good: {
      title: '实时测站', context: '保留内容局部刷新', status: '数据已更新', statusTone: 'success',
      items: [
        { title: '南门水库', meta: '28.46 m · 2 分钟前', status: '正常', tone: 'success' },
        { title: '北河站', meta: '32.18 m · 1 分钟前', status: '越线', tone: 'danger' },
        { title: '东干渠', meta: '流量 88.2 m³/s', status: '正常', tone: 'success' },
      ],
      primary: '模拟局部刷新', secondary: '刷新设置',
    },
    bad: {
      title: '实时测站', context: '刷新即清空整页', status: '加载完成后内容将跳回', statusTone: 'warning',
      items: [{ title: 'Loading...', meta: '请等待所有接口完成' }],
      primary: '重新加载整页', note: '操作位置和列表高度持续变化。',
    },
  },
  'navigation': {
    pattern: 'navigation',
    good: {
      title: '待处理任务', context: '筛选：高风险 · 第 3 项', status: '返回后保持当前位置', statusTone: 'info',
      items: [
        { title: '北河站水位越线', meta: '列表位置 3/18', status: '待处理', tone: 'danger' },
        { title: '东干渠闸门复核', meta: '列表位置 4/18', status: '临期', tone: 'warning' },
      ],
      primary: '进入第 3 项再返回', secondary: '编辑筛选',
    },
    bad: {
      title: '系统首页', context: '从详情返回后', status: '筛选已重置', statusTone: 'warning',
      items: [{ title: '全部任务', meta: '重新从 1/246 开始查找' }],
      primary: '重新搜索', note: '返回破坏了用户的任务上下文。',
    },
  },
  'hierarchy': {
    pattern: 'hierarchy',
    good: {
      title: '工程设施', context: '摘要列表',
      items: [
        { title: '东干渠 2# 闸门', meta: '开度 12% · 2 分钟前', status: '反馈异常', tone: 'danger' },
        { title: '南门泵站', meta: '2 台运行 · 5 分钟前', status: '正常', tone: 'success' },
        { title: '北河测站', meta: '水位 32.18 m · 1 分钟前', status: '越线', tone: 'danger' },
      ],
      primary: '展开首项详情', secondary: '筛选设施',
    },
    bad: {
      title: '工程设施', context: '全部字段平铺',
      items: [
        { title: '东干渠2#闸门 编码 G-002 所属东干渠 管理单位一所 负责人王工', meta: '开度12% 电压220V 信号-78dBm 固件1.3.2 更新时间09:42 编辑 删除 控制' },
      ],
      primary: '更多字段', note: '扫描、比较和操作都挤在同一行。',
    },
  },
  'touch': {
    pattern: 'touch',
    good: {
      title: '任务操作', context: '48px 触控热区', status: '所有动作都有显式入口', statusTone: 'success',
      items: [
        { title: '现场照片', meta: '视觉图标 24px · 热区 48px', status: '拍摄' },
        { title: '设备位置', meta: '视觉图标 24px · 热区 48px', status: '定位' },
      ],
      primary: '测试主操作热区', secondary: '打开更多操作',
    },
    bad: {
      title: '任务操作', context: '精细点击模式',
      items: [{ title: '拍照 定位 删除 编辑 上传', meta: '每个文字约 16px，且相邻无间距' }],
      primary: '左滑才可提交', note: '功能不可发现，且容易误触相邻危险动作。',
    },
  },
  'form': {
    pattern: 'form',
    good: {
      title: '巡检记录', context: '单列移动表单',
      fields: [
        { label: '设施名称', value: '东干渠 2# 闸门' },
        { label: '反馈开度（%）', value: '', placeholder: '请输入 0-100' },
        { label: '现场说明', value: '', placeholder: '描述异常现象' },
      ],
      primary: '校验并保存', secondary: '保存草稿',
    },
    bad: {
      title: '巡检记录', context: '桌面表单压缩',
      fields: [
        { label: '设施', value: '', placeholder: '请输入' }, { label: '开度', value: '', placeholder: '请输入' },
        { label: '说明', value: '', placeholder: '请输入' }, { label: '部门', value: '', placeholder: '请输入' },
      ],
      primary: '提交', note: '左右标签拥挤，占位符在输入后消失。',
    },
  },
  'ui-states': {
    pattern: 'states',
    good: {
      title: '任务列表状态', context: '每种状态提供不同下一步', status: '筛选无结果', statusTone: 'neutral',
      items: [{ title: '没有符合条件的任务', meta: '当前：高风险 · 今日 · 我的任务', status: '清除筛选' }],
      primary: '切换下一种状态', secondary: '清除筛选',
    },
    bad: {
      title: '任务列表', context: '统一空白状态',
      items: [{ title: '暂无数据', meta: '可能是加载、失败、无权限或真的为空' }],
      primary: '刷新', note: '用户不知道发生了什么，也不知道下一步。',
    },
  },
  'feedback': {
    pattern: 'feedback',
    good: {
      title: '异常上报', context: '反馈靠近问题对象', status: '附件 2 上传失败', statusTone: 'warning',
      fields: [{ label: '异常描述', value: '', placeholder: '至少输入 5 个字' }],
      items: [
        { title: '现场照片 1', meta: '2.1 MB · 已上传', status: '完成', tone: 'success' },
        { title: '现场照片 2', meta: '网络中断 · 内容仍在本机', status: '重试', tone: 'danger' },
      ],
      primary: '触发分层反馈', secondary: '仅重试照片 2',
    },
    bad: {
      title: '异常上报', context: '所有问题使用 Toast', status: '操作失败', statusTone: 'danger',
      items: [{ title: '提示 1 / 提示 2 / 提示 3', meta: '消息自动消失，无法判断对应字段' }],
      primary: '再弹一次 Toast', note: '反馈与错误对象脱离。',
    },
  },
  'actions': {
    pattern: 'actions',
    good: {
      title: '告警详情', context: '下一步明确', status: '待确认', statusTone: 'danger',
      items: [
        { title: '北河站水位越线', meta: '32.18 m · 警戒 31.80 m' },
        { title: '建议动作', meta: '先确认告警，再进入处置记录' },
      ],
      primary: '确认并开始处置', secondary: '转派或联系现场',
    },
    bad: {
      title: '告警详情', context: '所有动作同权',
      items: [{ title: '可用操作', meta: '保存 提交 转派 关闭 删除 返回' }],
      primary: '保存 / 提交 / 转派 / 关闭', note: '用户无法判断此刻最合理的下一步。',
    },
  },
  'crud-recovery': {
    pattern: 'upload',
    good: {
      title: '提交巡检记录', context: '自动草稿 · 09:42 已保存', status: '2/3 项已同步', statusTone: 'info',
      items: [
        { title: '表单数据', meta: '服务端已确认', status: '完成', tone: 'success' },
        { title: '现场照片 1', meta: '2.1 MB', status: '完成', tone: 'success' },
        { title: '现场照片 2', meta: '4.8 MB · 网络中断', status: '等待重试', tone: 'warning' },
      ],
      primary: '重试失败附件', secondary: '返回任务（内容已保留）',
    },
    bad: {
      title: '提交记录', context: '多次点击可重复创建', status: '提交失败，请重试', statusTone: 'danger',
      items: [{ title: '表单与附件', meta: '失败后已被清空', status: '0/3' }],
      primary: '连续点击提交', note: '既可能重复创建，又无法恢复输入。',
    },
  },
  'data-ui': {
    pattern: 'data',
    good: {
      title: '南门水库水位趋势', context: '今日 00:00-09:42', status: '最新 28.46 m · 2 分钟前', statusTone: 'success',
      metrics: [{ label: '当前水位', value: '28.46', unit: 'm', meta: '警戒线 29.20 m' }],
      items: [
        { title: '趋势', meta: '近 3 小时 +0.18 m', status: '缓慢上涨', tone: 'warning' },
        { title: '异常点', meta: '08:20 数据质量标记为估算', status: '1 个', tone: 'info' },
      ],
      primary: '查看图表语义', secondary: '查看原始数据',
    },
    bad: {
      title: '趋势图', context: '蓝色曲线',
      metrics: [{ label: '当前', value: '28.46' }],
      items: [{ title: '────────╮___', meta: '无单位、时间范围、阈值或异常说明' }],
      primary: '放大曲线', note: '图形存在，但无法支持业务判断。',
    },
  },
  'role-density': {
    pattern: 'density',
    good: {
      title: '角色化工作台', context: '共用组件 · 调整信息密度', status: '当前：现场巡检', statusTone: 'info',
      items: [
        { title: '南门水库溢洪道', meta: '舒适行高 · 现场主动作', status: '继续巡检', tone: 'info' },
        { title: '东干渠闸门复核', meta: '关键字段 2 项', status: '待开始' },
      ],
      primary: '切换下一角色', secondary: '查看密度规则',
    },
    bad: {
      title: '统一工作台', context: '所有人同一套密度',
      items: [
        { title: '巡检 值班 领导 共用', meta: '指标、按钮、图表、审批、配置全部同屏' },
        { title: '信息密度', meta: '无论场景都固定为高密度' },
      ],
      primary: '更多内容', note: '角色需求被迫迁就同一页面。',
    },
  },

  /* —— 管水员：业务范围→数据视野→UI 规范 —— */
  'wk-workbench': {
    pattern: 'tasks',
    good: {
      title: '片区工作台', context: '事件驱动 · 管水员',
      status: '消息：北河站水质氨氮超标 · 点此查看', statusTone: 'danger',
      items: [
        { title: '【巡检】南门溢洪道今日巡查', meta: '截止 11:00 · 距离 1.2 km', status: '开始', tone: 'info' },
        { title: '【报警】北河站水位越线', meta: '一级 · 持续 18 分 · 未确认', status: '确认', tone: 'danger' },
        { title: '【工单】东干渠渗漏跟进', meta: '已派工程 · 待回执', status: '查看', tone: 'warning' },
        { title: '【水质】城东水源地例行查看', meta: '2 项接近阈值', status: '打开', tone: 'warning' },
        { title: '二级入口 · 片区台账', meta: '设施台账 / 历史巡检 / 全部业务', status: '进入', tone: 'neutral' },
      ],
      primary: '处理最高优先事件', secondary: '消息中心',
      note: '主区=巡检/告警/工单/水质事件；台账与全业务在二级。',
    },
    bad: {
      title: '管水业务', context: '模块九宫格',
      items: [
        { title: '巡检', meta: '模块' }, { title: '工单', meta: '模块' }, { title: '报警', meta: '模块' },
        { title: '水质', meta: '模块' }, { title: '台账', meta: '模块' }, { title: '报表', meta: '模块' },
        { title: '养护', meta: '模块' }, { title: '设置', meta: '模块' }, { title: '更多', meta: '模块' },
      ],
      primary: '进入模块', note: '报警与巡检被模块墙淹没。',
    },
  },
  'wk-patrol': {
    pattern: 'field',
    good: {
      title: '现场巡检', context: '南门溢洪道 · 任务 T-092',
      status: '下半屏主操作 · 定位已带入', statusTone: 'info',
      items: [
        { title: '巡检对象', meta: '南门溢洪道 · 片区已核验', status: '地图', tone: 'info' },
        { title: '检查要点', meta: '3/5 已勾选 · 异常项可拍照', status: '继续', tone: 'warning' },
      ],
      primary: '拍照/扫码并暂存', secondary: '打开地图任务点',
      note: '主按钮在拇指区；地图是任务上下文不是展览。',
    },
    bad: {
      title: '巡检表单', context: '桌面移植',
      fields: [
        { label: '设施编码', value: '' }, { label: '设施名称', value: '' },
        { label: '经度', value: '' }, { label: '纬度', value: '' },
        { label: '检查说明', value: '', placeholder: '长文本' },
      ],
      primary: '右上角 ✓', note: '主操作在顶部小图标，全手填无地图。',
    },
  },
  'wk-workorder': {
    pattern: 'capture',
    good: {
      title: '发起工单', context: '从异常现场带入',
      status: '对象与证据已带入 · 请确认后发送', statusTone: 'success',
      items: [
        { title: '工单对象（回显）', meta: '东干渠桩号 K3+200 · 渗漏异常', status: '已带入', tone: 'success' },
        { title: '现场证据', meta: '照片 2 · 定位 09:41 · 来源本机', status: '已附', tone: 'info' },
      ],
      fields: [
        { label: '紧急度', value: '高 · 影响行人安全' },
        { label: '补充说明', value: '', placeholder: '仅补充判断（可选）' },
      ],
      primary: '发送工单并跟踪', secondary: '改派接收班组',
      note: '短路径发送；禁止离开上下文从零建单。',
    },
    bad: {
      title: '新建工单', context: '空白',
      fields: [
        { label: '设施编码', value: '' }, { label: '类型', value: '' },
        { label: '地址', value: '' }, { label: '描述', value: '' },
        { label: '附件', value: '' },
      ],
      primary: '提交', note: '现场证据与对象未带入，易填错对象。',
    },
  },
  'wk-alarm': {
    pattern: 'incident',
    good: {
      title: '报警预警', context: '北河站 · 水位越线',
      status: '一级告警 · 未确认 · 持续 18 分钟', statusTone: 'danger',
      metrics: [
        { label: '当前水位', value: '32.18', unit: 'm', meta: '阈值 31.50 m', tone: 'danger' },
        { label: '更新', value: '1', unit: '分钟前', meta: '遥测 · 质量正常' },
      ],
      items: [
        { title: '影响范围', meta: '下游堤段需关注 · 已通知值班' },
        { title: '建议动作', meta: '确认后现场巡查或转工单' },
      ],
      steps: [
        { label: '已送达', meta: '09:18 推送', state: 'done' },
        { label: '待确认', meta: '确认≠关闭', state: 'active' },
        { label: '处置/转工单', meta: '确认后解锁', state: 'waiting' },
      ],
      primary: '确认并去巡查', secondary: '转工单给工程',
      note: '生命周期可见；主操作进入处置而非「知道了」。',
    },
    bad: {
      title: '系统通知', context: 'Toast',
      status: '告警已弹出', statusTone: 'warning',
      items: [{ title: '水位异常', meta: '点击关闭' }],
      primary: '知道了', note: '无对象详情、无确认态、无下一步。',
    },
  },
  'wk-water-quality': {
    pattern: 'metric',
    good: {
      title: '水源水质', context: '城东水源地 · 片区权限内',
      status: '氨氮超标 · 采样 08:40 · 实验室回传', statusTone: 'danger',
      metrics: [
        { label: '氨氮', value: '1.42', unit: 'mg/L', meta: '阈值 1.0 · 超标', tone: 'danger' },
        { label: '浑浊度', value: '0.8', unit: 'NTU', meta: '正常', tone: 'success' },
        { label: 'pH', value: '7.2', unit: '', meta: '正常 · 2 小时前' },
        { label: '水源状态', value: '供水中', unit: '', meta: '可上报异常' },
      ],
      primary: '上报水质异常 / 转工单', secondary: '查看近 7 日趋势',
      note: '对象·指标·单位·时间·质量齐全；超标有动作。',
    },
    bad: {
      title: '水质', context: '总览',
      metrics: [{ label: '水质', value: '优', tone: 'success' }],
      primary: '刷新', note: '无水源、无指标、无单位时间，无法决策。',
    },
  },
  'wk-offline': {
    pattern: 'offline',
    good: {
      title: '离线暂存', context: '当前弱网 · 片区巡检',
      status: '已存本机 3 项 · 等待同步', statusTone: 'warning',
      items: [
        { title: '溢洪道巡检记录', meta: '仅本地 · 09:12 · 照片 2', status: '待同步', tone: 'warning' },
        { title: '渗漏异常草稿', meta: '仅本地 · 含定位', status: '待同步', tone: 'warning' },
        { title: '昨日已确认项', meta: '服务端已确认', status: '已确认', tone: 'success' },
      ],
      primary: '网络恢复后同步', secondary: '继续离线巡检',
      note: '仅本地 ≠ 已确认；队列可点开。',
    },
    bad: {
      title: '提交结果', context: '无网络',
      status: '提交成功', statusTone: 'success',
      items: [{ title: '所有操作', meta: '已成功' }],
      primary: '返回', note: '假成功：实际未到达服务端。',
    },
  },

  /* —— 工程人员：业务范围→数据视野→UI 规范，对比必须可区分 —— */
  'eng-workbench': {
    pattern: 'tasks',
    good: {
      title: '工程工作台', context: '事件驱动 · 非模块墙',
      status: '消息：东干渠抢修超时风险 · 点此处理', statusTone: 'danger',
      items: [
        { title: '【抢修事件】东干渠 2# 闸门', meta: '来源：告警转工单 · 截止 16:00 · 影响下游', status: '处置', tone: 'danger' },
        { title: '【调试预约】南门泵站变频器', meta: '消息提醒 14:30 · 需联调遥测', status: '出发', tone: 'warning' },
        { title: '【催缴任务】城东片区 12 户', meta: '离线清单已就绪 · 今日已收 18', status: '继续', tone: 'info' },
        { title: '二级入口 · 全部业务', meta: '安装台账 / 物资 / 历史档案', status: '进入', tone: 'neutral' },
      ],
      primary: '处理最高优先事件', secondary: '打开消息中心',
      note: '主区=事件与消息；全业务收纳在二级，而不是九宫格首页。',
    },
    bad: {
      title: '工程业务中心', context: '模块九宫格',
      items: [
        { title: '施工', meta: '模块' }, { title: '安装', meta: '模块' }, { title: '调试', meta: '模块' },
        { title: '收费', meta: '模块' }, { title: '用户', meta: '模块' }, { title: '物资', meta: '模块' },
        { title: '报表', meta: '模块' }, { title: '配置', meta: '模块' }, { title: '更多', meta: '模块' },
      ],
      primary: '点进某个模块', note: '事件被模块墙淹没，没有消息驱动入口。',
    },
  },
  'eng-construction': {
    pattern: 'timeline',
    good: {
      title: '施工节点', context: '工单 G-8841 · 东干渠 2#',
      status: '当前节点可拍照存档 · 备件已自动关联', statusTone: 'info',
      steps: [
        { label: '安全交底与围挡', meta: '08:20 · 张工 · 系统带入班组 · 照片 3 张', state: 'done' },
        { label: '拆检与备件更换', meta: '进行中 · 扫码出库 B-209 已回填', state: 'active' },
        { label: '通水试运行', meta: '待完成 · 许可号自动带入后可点', state: 'waiting' },
        { label: '完工验收材料', meta: '待齐套 · 缺件会阻断提交', state: 'waiting' },
      ],
      primary: '拍照存档并完成本节点', secondary: '查看自动带入字段',
      note: '路径短：一键拍照完成节点；档案全：人/时/证/备件都在。',
    },
    bad: {
      title: '施工记录', context: '自由填写',
      fields: [
        { label: '施工内容', value: '', placeholder: '请输入长描述' },
        { label: '完成情况', value: '', placeholder: '请输入' },
        { label: '备注', value: '', placeholder: '请输入' },
      ],
      primary: '提交', note: '全手填、无节点、无照片、无自动带入，短路径也无档案。',
    },
  },
  'eng-install': {
    pattern: 'capture',
    good: {
      title: '安装登记', context: '扫码核验通过',
      status: '请确认下方为当前安装用户后再继续', statusTone: 'success',
      items: [
        { title: '当前用户（回显卡）', meta: '户主 王某 · 户号 370201-08821 · 城东三村 12 号', status: '已核验', tone: 'success' },
        { title: '关联表计', meta: '表号 M-55219 · 由扫码带入 · 可重扫', status: '已绑定', tone: 'info' },
      ],
      fields: [
        { label: '安装定位', value: 'GPS 已回填 · 可微调图钉' },
        { label: '铅封号', value: '', placeholder: '扫码铅封（必填）' },
        { label: '现场说明', value: '', placeholder: '仅异常时填写' },
      ],
      primary: '确认用户无误，拍照提交', secondary: '不是此户，重新扫码',
      note: '先信赖回显卡，再最少字段；禁止从空白大表开始。',
    },
    bad: {
      title: '安装登记', context: '空白表单',
      fields: [
        { label: '县', value: '' }, { label: '镇', value: '' }, { label: '村', value: '' },
        { label: '户主', value: '' }, { label: '身份证', value: '' }, { label: '电话', value: '' },
        { label: '表号', value: '' }, { label: '经度', value: '' }, { label: '纬度', value: '' },
      ],
      primary: '提交', note: '无「当前用户」确认卡，装错户也不自知。',
    },
  },
  'eng-debug': {
    pattern: 'metric',
    good: {
      title: '调试联调', context: '南门泵站 · 变频器 #2',
      status: '联调中 · 李工 · 09:42 起 · 遥测 1 分钟前', statusTone: 'info',
      metrics: [
        { label: '设定频率', value: '42.0', unit: 'Hz', meta: '本次目标', tone: 'info' },
        { label: '反馈频率', value: '41.8', unit: 'Hz', meta: '偏差 -0.2', tone: 'success' },
        { label: '出口压力', value: '0.28', unit: 'MPa', meta: '阈值 0.35' },
        { label: '数据质量', value: '正常', unit: '', meta: '来源：遥测' },
      ],
      primary: '记录本步（含设定/反馈）', secondary: '结束联调',
      note: '可信对照：设定与反馈同屏，不是填一个数。',
    },
    bad: {
      title: '设备调试', context: '参数',
      metrics: [{ label: '频率', value: '42', tone: 'success' }],
      primary: '保存成功', note: '裸数字 + 假成功，无法复核谁调了什么。',
    },
  },
  'eng-billing': {
    pattern: 'tasks',
    good: {
      title: '水费收缴', context: '欠费事件列表 · 城东片区',
      status: '今日消息：3 户可上门 · 离线清单已下载', statusTone: 'info',
      items: [
        { title: '王某 · …8821', meta: '欠费 126.40 元 · 2 期 · 上次 03-12', status: '收款', tone: 'warning' },
        { title: '李某 · …7710', meta: '欠费 48.00 元 · 1 期 · 已提醒', status: '收款', tone: 'info' },
        { title: '赵企 · …6602', meta: '欠费 2,860.00 元 · 需开票', status: '登记', tone: 'danger' },
      ],
      primary: '扫码/搜户收款', secondary: '同步账单',
      note: '事件=欠费户；主操作=收款，不是进报表。',
    },
    bad: {
      title: '收费系统', context: '后台菜单',
      items: [
        { title: '综合查询', meta: '12 个筛选' },
        { title: '报表中心', meta: '月季年报' },
        { title: '费率配置', meta: '系统管理' },
      ],
      primary: '进入查询', note: '现场收缴被管理功能主导。',
    },
  },
  'eng-user-mgmt': {
    pattern: 'hierarchy',
    good: {
      title: '用户档案', context: '服务续办上下文',
      status: '摘要卡：王某 · …8821 · 欠费 126.40 元', statusTone: 'warning',
      items: [
        { title: '基础信息', meta: '地址已展示 · 证件默认脱敏', status: '展开', tone: 'neutral' },
        { title: '用表安装', meta: 'M-55219 · 2024-11 · 铅封完整' },
        { title: '服务记录', meta: '报修 1 · 最近 2025-12-03', status: '展开', tone: 'info' },
      ],
      primary: '催缴 / 报修续办', secondary: '返回',
      note: '先摘要与续办，再分层展开；非编辑全部。',
    },
    bad: {
      title: '用户管理', context: '全量字段',
      items: [
        { title: '身份证 银行 内部备注 合同 全量抄表…', meta: '默认全部展开可编辑' },
      ],
      primary: '保存全部', note: '无业务续办主路径，且易越权展示。',
    },
  },
  'eng-acceptance': {
    pattern: 'timeline',
    good: {
      title: '验收闭环', context: '批次 YA-0318 · 材料驱动',
      status: '材料 5/6 · 缺「用户确认」不可提交', statusTone: 'warning',
      steps: [
        { label: '安装记录', meta: '表号/铅封/定位 · 自动校验通过', state: 'done' },
        { label: '现场照片', meta: '每户 ≥2 张 · 已齐', state: 'done' },
        { label: '用户确认', meta: '缺 1 户签字 · 点此补传', state: 'active' },
        { label: '提交验收', meta: '齐套后解锁', state: 'waiting' },
      ],
      primary: '补传缺件', secondary: '保存草稿',
      note: '清单不齐=不能成功；缺件可定位。',
    },
    bad: {
      title: '验收', context: '一键',
      steps: [{ label: '提交成功', meta: '未校验材料', state: 'done' }],
      primary: '完成', note: '假成功，档案残缺无法复核。',
    },
  },
}
