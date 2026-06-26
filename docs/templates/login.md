---
aside: false
---

# 登录页模板

登录页模板致力于提供高品质、满足不同业务场景的登录入口设计。*详细的字体规范会存在在字体规范章节中。*

> [!IMPORTANT]
> **🚀 UI Skill 快速生成与设计推广**
> 为了方便其余开发人员能够快速生成符合当前模板风格的登录页、配色体系及配套 Icon 设计，前端同学与 UI 同学均可引入 UI Skill。借助该 Skill，可极大加速水利信息化大屏等 B 端系统的主题定制和排版派生。
> 🔗 **UI Skill 资源库地址**：[Awesome Design Skills (https://github.com/bergside/awesome-design-skills/tree/main)](https://github.com/bergside/awesome-design-skills/tree/main)

目前根据设计哲学与交互特性，登录页模板提供以下五个维度的业务级呈现。

---

## 💡 第一部分：常规登录页模板 (基于主题自适应选色 & 动态业务切换)

常规登录页模板专为 B 端水利行业信息化业务打造，具有高规范性、极简零 UI 库污染的特征。

### 📐 1. 登录内容左右整体布局规范

界面必须严格遵循经典的**左右整体排版规范**，实现视觉重点分明：

```mermaid
graph LR
  subgraph 左侧：品牌与业务宣介区
    A["系统项目名称<br>(动态业务子系统名)"] --> B["大标题 Slogan<br>(阿里妈妈数黑体)"]
    B --> C["业务内容描述<br>(思源黑体，阐述职责)"]
    C --> D["对应系统配套 Icon<br>(支持动态切换 SVG/PNG)"]
  end
  subgraph 右侧：安全登录表单区
    E["表单 Card 容器<br>(原生 HTML/CSS 定制)"] --> F["账号密码输入框<br>(Inter 字体，Focus发光)"]
    F --> G["隐私安全协议勾选"]
    G --> H["主题色自适应登录按钮"]
  end
  左侧：品牌与业务宣介区 === 右侧：安全登录表单区
```

* **左半侧 (占比约 55%)**：依次由上至下展示**项目名称（动态）**、**大标题 Slogan**、**业务内容描述**，并在底部展示**与该业务系统完全配套对应的 icon 图案（支持随着实际业务去做动态调整与切换）**。
* **右半侧 (占比约 45%)**：包含实际登录的 **表单 Card** 容器。输入框、协议勾选框及登入按钮完全原生手写，具备极高的交互性能。

---

### 🎨 2. 全局选色与混白磅重计算技术

右侧表单及左侧高亮文本必须支持**全局选色**。其底层采用纯 JavaScript 编写的 Hex 颜色混合插值算法与**混白/混黑修改磅重能力**，实时推导 Hover/Active 及 Light 状态颜色。

#### 🧪 颜色插值混合公式

当主色为 $C_{primary}$，目标混合色（白色为 $C_{white} = \text{\#ffffff}$，黑色为 $C_{black} = \text{\#000000}$）的混合磅重为 $w$ (取值范围 $5\% - 40\%$) 时，混合后的 RGB 分量计算公式如下：

\[R_{mixed} = \text{round}\Big( R_{primary} \times (1 - w) + R_{target} \times w \Big)\]
\[G_{mixed} = \text{round}\Big( G_{primary} \times (1 - w) + G_{target} \times w \Big)\]
\[B_{mixed} = \text{round}\Big( B_{primary} \times (1 - w) + B_{target} \times w \Big)\]

在客户端将计算所得的 Hex 颜色代码实时动态绑定到组件容器的 CSS 局部变量上：
* **Hover 状态色 (混白变体)**：主色混入 $w$ 权重的白色（如 $15\%$），使按钮悬浮时具有发光提亮感。
* **Active 状态色 (混黑变体)**：主色混入 $w$ 权重的黑色（如 $15\%$），使按钮点击时产生深沉按压感。
* **Light 状态色 (背景发光)**：主色固定混入 $90\%$ 的白色，作为输入框聚焦时的柔和外环发光阴影色（`box-shadow`）。

---

### 🔄 3. 业务系统 icon 动态切换机制

为适应不同的水利信息化子系统，**业务系统配套 icon 必须支持随着实际业务去做动态调整与切换**：
1. **默认状态**：系统加载时默认展示原版的系统配套 icon 图示（`loginIcon.png`）。
2. **动态调整**：开发人员或用户切换不同子系统时（如：防汛调度子系统、水资源管理子系统、管网水质监测子系统），项目名称、Slogan、内容描述同步变更，且配套 icon 自动动态更替为对应的**专属响应式科技发光 SVG 矢量图标**（图标自适应继承当前全局主题色与混色亮度），实现无缝业务切换。

---

### 🔤 4. 醒目字体层级设计规范

为确保页面排版的科技张力与 B 端政企风格的沉稳，登录页应用以下三大核心字体。*详细的字体规范会存在在字体规范章节中。*

| 字体家族名称 | 字重 (Font Weight) | 对应页面元素与应用场景 | Fallback 字体链结构 | 设计指导作用与视觉效果 |
| :--- | :--- | :--- | :--- | :--- |
| **阿里妈妈数黑体**<br>`AlimamaShuHeiTi` | **900** (Black) | 左侧项目 Slogan 标题、<br>当前子系统项目名 | `Impact`, `Arial Black`, `sans-serif` | 极具工业科技张力和粗黑硬朗排版，奠定行业专业基准。 |
| **思源黑体**<br>`Source Han Sans CN` | **400** (Normal) | 左侧业务内容描述、<br>表单辅助提示文字 | `'Source Han Sans'`, `PingFang SC`, `Microsoft YaHei`, `sans-serif` | 规范沉稳的政企经典黑体，排版端正，确保大段文本的清晰易读。 |
| **Inter 字体**<br>`Inter` | **500/600** (Medium/SemiBold) | 右侧表单控件、输入框内文字、<br>登入按钮及复选框 | `system-ui`, `-apple-system`, `sans-serif` | 组件库标准英文/数字字体，紧凑饱满，确保表单对齐与极佳易读性。 |

---

### 📊 5. 现在的登录模板布局示意
目前的常规登录模板如下图：

![目前的模板](/loginTemplate.png)

### 📊 6. 系统配套业务图标
整体可替换的系统配套 icon 系列如下：

![系统配套图标](/loginIcon.png)

### 🧪 7. 交互设计与选色演示
您可以在右上角的 **“设计规范控制台”** 中：
1. 切换 **“业务子系统”**，观察左侧的项目名称、文案与配套图标（SVG）的动态切换。
2. 自定义选色并**拖动“混白权重（明暗磅重）”滑块**，观察表单在 hover 态、active 态时混白/混黑深浅的实时演变与色值输出。

<ClientOnly>
  <LoginNormalDemo />
</ClientOnly>

---

## 🌌 第二部分：3D 空间计算登录页 (基于 Three.js)

该登录页模板融合了微软 **Fluent Design 2**（半透亚克力毛玻璃材质）、谷歌 **Material Design 3**（圆角几何与微动效）的设计哲学，并引入了三维数字水球与对称等分星轨模型，旨在提供极其震撼的第一眼视觉体验。

### 交互设计规范演示

<ClientOnly>
  <LoginDemo />
</ClientOnly>

### 主题与规范集成说明

本登录页模板 100% 采用 **Element Plus** 的原生表单与交互组件构建，其色彩与圆角直接受控于项目的 `uno.config.ts` 主题系统。

#### 1. 空间与几何设计准则

* **原子核-电子星轨模型 (WebGL & Shader)**：
  背景左侧集成了 3D 光线步进 (Raymarching) 液体水球，外围对称等分环绕 5 个写有核心文案的圆形面板小球。通过在 Shader 中使用消隐流星拖尾，使小球在局部空间内实现 100% 同步贴轨公转。
* **亚克力云母材质 (Acrylic & Mica)**：
  表单卡片容器采用了 `backdrop-filter: blur(24px)` 结合柔和白底，呈现出高透光的“液体玻璃”材质效果。
* **几何圆角和谐公式**：
  外框圆角设为 `24px`，卡片内边距 Padding 设为 `20px`。根据几何圆角比例公式：
  \[R_{inner} = R_{outer} - Padding = 24 - 20 = 4px\]
  完美契合组件库定义的基础圆角参数（`--el-border-radius-base: 4px`）。

#### 2. 动效与微交互设计

* **卡片 3D 翻转 (3D Flip Animation)**：
  支持“账号登录”与“扫码登录”两种场景模式，切换时卡片整体执行平滑的 3D 空间翻转动画。
* **表单防错抖动反馈 (Shake Feedback)**：
  当用户未勾选服务协议点击登录时，卡片会触发高频 X 轴位移抖动警告，弹出全局 Message 消息，符合 MD3 的“微交互效能倍增”规范。

---

## 🔌 第三部分：微观拓扑流登录页 (基于 WebGL & 管网)

本模板将水网的“宏观地理特征”缩小为“微观的数据传输特征”，象征着**“地下管网的数字孪生”**和**“水利数据的实时流转”**。实现了一个模拟化的从水源地通过水管到泵站、水厂、监测设备，最终到达终端用水户的无限滚动拓扑流背景。

### 交互设计规范演示

<ClientOnly>
  <LoginTopologyDemo />
</ClientOnly>

### 技术与孪生设计准则

#### 1. 无限滚动数据网格 (Infinite Data Grid)
- 采用**拼块传送带（3 Segment Loop）**技术：在 3D 空间中建立 3 个相同的网格和折线管道路段。随着时间它们统一向相机（Z 轴正方向）平滑移动，当某段移动到相机身后时，自动回弹重置到最深处。以极高的渲染效能实现**真·无限向后滚动网格**，且完全不消耗重复的 CPU 算力。
- 当管道重置到最深处时，随机为上面的水泵和用水终端赋予新的名字和压力/流量监测数值，产生源源不断的数据孪生感。

#### 2. 曼哈顿科幻数据流 (Neon Light Pulse)
- 管道折线在局部顶点上手动等比映射 UV。Shader 接收 `uTime * uSpeed` uniform 变量在片元着色器内实时渲染出高亮且边缘羽化的流光光斑（数据脉冲）。
- 节点（如水源地、增压泵站、净化水厂等）配备带发光底盘的高清 Sprite 汉字看板，正面永远正对镜头，提供 100% 锐利的易读性，并在三维格网表面做平缓的浮动呼吸微交互。

---

## 💡 第四部分：Agentic 智能水利常规登录页 (基于 Agentic 规范)

该登录页模板遵循 **Agentic**（代理会话优先）的设计体系，专为 **B 端水利行业信息化** 场景打造。整体背景高度精简，除了大标题 Slogan “开启智慧水利之路” 与动态手绘 SVG 流程图之外无任何冗余文本与修饰。视觉采用沉稳深邃的科技蓝黑基调，全表单零 UI 库依赖，纯手写实现流畅的高响应交互状态。

### 交互设计规范演示

<ClientOnly>
  <LoginAgenticDemo />
</ClientOnly>

### 核心设计与交互准则

#### 1. 会话优先与 AI 委派模式 (Conversational AI-first)
- 登录不再局限于死板 of 输入框。本模板将 **AI 智能授权模式** 设为默认入口：用户可通过自然语言输入指令，AI 会自动识别并触发加密网关的多阶段验证，将“繁琐的系统登录和接入”抽象为一次向 AI 智能体的“任务委派”。

#### 2. 原生滑块与手绘水利视觉 (Doodle & Raw Elements)
- **手绘风水流 SVG 流程图**：在 Slogan 下方植入了纯手绘感的水利信息化数据流图，代表着水流从水源地、提升泵站、净化水厂到终端用户的物理及数字化流转，线条与脉冲动态前行。
- **手绘水闸拖拽验证码**：打败传统滑动拼图，手绘了一个“水闸开启”的滑动锁机制。拖动水滴滑块注水填补凹槽，完全利用原生 JavaScript 事件监听开发，保障在移动端和桌面端的滑动流畅性与交互质感。

---

## 💡 第五部分：Material 智能水利常规登录页 (基于 Material M3 规范)

该登录页模板遵循 **Material Design 3 (M3)** 规范，专为 **B 端水利智能调度** 业务定制。背景采用了代表水库等深线层级大色块的物理视差层叠，搭载了硬朗的 Roboto 无衬线大字 slogan，卡片支持物理高度 Elevation 悬浮以及右下角浮动控制 (FAB) 助手。

### 交互设计规范演示

<ClientOnly>
  <LoginMaterialDemo />
</ClientOnly>

### 核心设计与交互准则

#### 1. 物理层叠与视差背景 (Layered Surfaces)
- 摒弃单调底图，使用多片圆润等深线卡片在三维平面重叠，并监听鼠标滑行方向。在 ticks 渲染中引入微幅视差偏移，形成水流交叠、重力感应的河道大屏背景。

#### 2. 原生水波纹 (Ink Ripple) 与 Outlined 缺口浮动框
- **原生 Ink Ripple 涟漪**：按钮与操作部件集成了纯原生编写的 Ripple 动效，根据点击处的坐标向外平滑扩散，提供高反馈的点击触觉。
- **缺口 Outlined 浮动输入框**：输入框在获取焦点时，标签自动上浮缩小并精致地覆盖在顶部边框断口线中，边框高亮为智慧水利蓝，契合谷歌规范。

<script setup>
import LoginNormalDemo from '../components/LoginNormalDemo.vue'
import LoginDemo from '../components/LoginDemo.vue'
import LoginTopologyDemo from '../components/LoginTopologyDemo.vue'
import LoginAgenticDemo from '../components/LoginAgenticDemo.vue'
import LoginMaterialDemo from '../components/LoginMaterialDemo.vue'
</script>

<style>
.vp-doc {
  max-width: 100% !important;
}
</style>
