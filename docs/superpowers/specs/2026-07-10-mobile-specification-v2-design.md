# 移动端规范 V2 设计说明

## 1. 目标

在现有 VitePress 组件文档中新增独立的“移动端规范 V2”，将水利信息化移动端规范整理为两类内容：

1. 产品与业务流程规范：从巡检、监测处置、管理决策、弱网离线和高风险控制等场景约束产品体验。
2. 前端交互与 UI 体系：规范首页、布局、导航、列表、表单、详情、CRUD、状态反馈和跨容器适配。

每条规范必须提供可操作的正确/错误移动 UI 对比。正确示例主要使用 `@varlet/ui`，错误示例可使用原生 Vue/HTML，以便准确表现常见反模式。

## 2. 范围

### 包含

- 保留现有 `/guide/mobile-specification` 页面和“移动端规范”菜单。
- 新增 `/guide/mobile-specification-v2` 页面和“移动端规范 V2”菜单。
- 引入 `@varlet/ui` 作为移动优先的 Material Design 组件库。
- 引入 `@sneas/telephone` 作为 iPhone 16 Max / Pixel 9 Pro 设备外壳。
- 提供产品业务与前端体系两个内容区域，各包含 12 条规范。
- 每条规范均有说明、落地规则、推荐/避免和正反交互场景。
- 支持 Pixel/iPhone 外壳同步切换，正反示例始终使用相同设备。
- 适配桌面双栏与移动端上下布局。

### 不包含

- 不替换或重写现有移动端规范。
- 不建设真实后端、设备控制、地图服务或离线同步引擎。
- 演示数据不持久化，仅模拟前端交互状态。
- 不将 Varlet 作为整个组件站点的新默认 UI 库；其使用范围限定在 V2 演示组件中，避免影响现有 Element Plus 页面。

## 3. 技术选型

### `@varlet/ui`

- Vue 3 原生、移动优先，同时覆盖 Material Design 2/3。
- 用于正确示例中的按钮、Chip、输入、进度、Snackbar、Dialog、Tabs 等。
- 通过 V2 组件局部导入，不在 VitePress 主题中全局安装。

### `@sneas/telephone`

- 提供 `pixel-9-pro` 和 `iphone-16-max` Web Components。
- 使用默认插槽承载 Vue 内容，不使用 iframe，因此 Varlet 组件和 Vue 状态可以直接工作。
- 模块访问浏览器对象，不能在 VitePress SSR 阶段直接导入。统一由 Vue 包装组件在 `onMounted` 中动态导入。
- 加载前使用固定宽高比占位，避免布局偏移。

## 4. 信息架构

V2 页面由 Markdown 提供文档标题、背景、使用说明和可索引的章节入口；Vue 工作台提供动态内容、场景切换和正反交互演示。

页面结构：

1. 页面标题与适用范围。
2. 内容区域切换：产品与业务流程 / 前端交互与 UI。
3. 当前区域的 12 条规范导航。
4. 当前规范的定义、落地清单、推荐与避免。
5. Pixel/iPhone 切换。
6. 正确与错误两台设备对比。
7. 当前场景的观察要点与验收条件。

桌面端使用“说明区 + 双设备对比区”的宽屏布局；窄屏先显示说明，再纵向排列正确和错误设备。设备外壳宽度使用响应式约束，不通过视口宽度缩放字体。

## 5. 组件边界

### `MobileSpecV2.vue`

- V2 工作台根组件。
- 管理内容区域、当前规范、设备类型和场景重置。
- 不包含具体手机外壳实现。

### `MobileDeviceFrame.vue`

- 封装 `@sneas/telephone`。
- 在客户端注册 Pixel/iPhone Web Component。
- 负责占位、宽高比、屏幕滚动区域和加载失败降级。
- 通过默认插槽承载任意场景。

### `SpecComparison.vue`

- 统一正确/错误标签、设备布局和场景说明。
- 同步向两侧传递设备类型与重置序号。
- 保证比较维度只来自交互方案，而不是设备差异。

### `SpecScenario.vue`

- 根据区域与规范 ID 渲染对应场景。
- 正确侧使用 Varlet，错误侧使用原生控件或自定义反模式。
- 场景状态限定在组件内部，切换规范时重置。

### `mobile-spec-v2-data.ts`

- 保存两类规范的标题、摘要、落地规则、推荐、避免、场景 ID 和验收要点。
- 内容数据与场景渲染解耦，后续可增加内容而不修改页面骨架。

## 6. 产品与业务流程规范场景

| ID | 规范 | 正确示例 | 错误示例 |
|---|---|---|---|
| role-task | 角色与任务优先 | 巡检/值班/管理首页切换 | 所有角色共用模块宫格 |
| priority | 当前任务优先 | 待办、异常与下一步动作 | 完整功能树占据首屏 |
| trustworthy-data | 数据可信表达 | 数值、单位、来源、更新时间、质量 | 只显示孤立大数字 |
| state-first | 状态优先 | 异常、影响与责任人清晰 | 装饰图表遮蔽业务状态 |
| field-operation | 现场可操作 | 大触控区、底部主操作 | 顶部小图标与密集操作 |
| assisted-input | 采集代替录入 | 扫码、定位、拍照快速填报 | 长表单重复手工输入 |
| offline | 离线工作模式 | 本地草稿、待同步、冲突状态 | 断网后阻塞或误报成功 |
| alarm | 告警生命周期 | 确认、处置、恢复、关闭 | 一闪而过的 Toast 告警 |
| truthful-feedback | 真实过程反馈 | 发送、受理、回执分别展示 | 接口返回即显示设备成功 |
| high-risk | 高风险操作 | 摘要、复核、身份确认、回执 | 一键执行生产控制 |
| recovery | 恢复与冲突 | 保留输入、重试、差异选择 | 失败清空与最后写入覆盖 |
| audit | 可追溯与跨端续接 | 时间线、操作者、设备回执 | 只有模糊“已完成”记录 |

## 7. 前端交互与 UI 规范场景

| ID | 规范 | 正确示例 | 错误示例 |
|---|---|---|---|
| responsive | 移动端重新编排 | 单列摘要，宽屏升级双栏 | PC 页面整体缩小 |
| stable-shell | 稳定页面骨架 | 固定上下文与操作区 | 加载后布局跳动 |
| navigation | 导航连续性 | 返回保留筛选、位置和草稿 | 返回后页面完全重置 |
| hierarchy | 信息分层 | 列表摘要、详情展开 | 单屏堆满全部字段 |
| touch | 触控与手势 | 48px 热区和显式入口 | 小按钮或手势唯一入口 |
| form | 移动表单 | 单列、标签置顶、合适键盘 | 左右标签、密集并排输入 |
| ui-states | 完整状态覆盖 | 加载、空、失败、无权限、过期 | 空白页或统一菊花 |
| feedback | 分层反馈 | 行内、Banner、Snackbar、Dialog | 所有结果都用 Toast |
| actions | 操作主次 | 一个主操作与收纳次操作 | 多个同权高亮按钮 |
| crud-recovery | CRUD 可恢复 | 草稿、幂等、上传重试 | 重复提交与失败丢数据 |
| data-ui | 数据组件语义 | 单位、阈值、时间、状态 | 颜色或数字含义不明 |
| role-density | 角色密度适配 | 共用组件切换内容优先级 | 三类角色共用同一密度 |

## 8. 交互与状态

- 切换内容区域时默认选中该区域第一条规范。
- 切换规范时重置两侧场景，避免上一个场景状态泄漏。
- 切换设备时正反两侧同时切换。
- 正确场景至少提供一个可触发的状态变化；错误场景应允许用户直观看到问题，而不是只有静态说明。
- Snackbar、Dialog 等浮层必须限制在手机屏幕语境内，不遮挡 VitePress 页面导航。
- 所有交互提供文本标签，不依赖颜色或图标单独传意。

## 9. 错误与降级

- 设备外壳动态导入失败时，降级为带圆角和状态栏的本地 CSS 手机框，场景仍可操作。
- Varlet 组件加载失败不应导致文档页面整体白屏；V2 工作台显示局部错误提示。
- 演示中的网络、离线和上传失败均为本地状态模拟，不发送真实请求。
- 窄屏无法并排时改为上下排列，不允许横向页面滚动。

## 10. 验收与测试

### 构建

- `npm run docs:build` 成功，SSR 阶段无 `window`、`HTMLElement` 或自定义元素错误。
- V2 路由生成，旧移动端规范路由保持可访问。

### 功能

- 两个内容区域均有 12 条规范。
- 每条规范均能显示独立的正反示例。
- 正确示例可确认使用 Varlet 组件。
- Pixel/iPhone 切换同步作用于正反两侧。
- 切换场景后状态正确重置。

### 视觉与响应式

- 在 1440x900 桌面视口检查双设备完整、无遮挡、无横向溢出。
- 在 390x844 移动视口检查上下布局、文本换行和触控操作。
- 检查浅色与深色 VitePress 主题。
- 使用浏览器截图确认设备屏幕非空、外壳比例正确、Varlet 样式生效。
- 检查 `prefers-reduced-motion` 下无必要的持续动画。

## 11. 变更文件预期

- `package.json`、`package-lock.json`
- `docs/.vitepress/config.mts`
- `docs/guide/mobile-specification-v2.md`
- `docs/components/mobile-spec-v2/MobileSpecV2.vue`
- `docs/components/mobile-spec-v2/MobileDeviceFrame.vue`
- `docs/components/mobile-spec-v2/SpecComparison.vue`
- `docs/components/mobile-spec-v2/SpecScenario.vue`
- `docs/components/mobile-spec-v2/mobile-spec-v2-data.ts`
- 必要的 V2 局部样式文件或子场景组件

现有 `docs/guide/mobile-specification.md` 和 `docs/components/MobileSpecDemo.vue` 不修改。
