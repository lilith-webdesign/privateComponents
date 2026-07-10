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
}
