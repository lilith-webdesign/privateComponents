# 反馈类组件

反馈类组件用于在水利业务处理、状态提交、阈值告警以及参数调整等典型人机交互场景中，向用户提供动作反馈、预警拦截、全局通知以及加载提醒。我们根据设计规范，对警告提示 (Alert)、对话框 (Dialog)、抽屉 (Drawer)、气泡确认框 (Popconfirm) 以及轻量悬浮提示 (Message / MessageBox / Notification) 进行了视觉样式与圆角一致性重置。

---

## 交互设计规范演示

<ClientOnly>
  <FeedbackDemo />
</ClientOnly>

---

## 主题定制说明

所有反馈类组件均 100% 采用 **Element Plus** 原生组件与官方指令方法渲染。与先前类目类似，对话框圆角、抽屉头部底部分割线、以及消息通告的背景填充与悬浮投影均已在 `uno.config.ts` 的 `preflights` 样式中统一重写了官方对应的 CSS 属性与变量。**开发过程中无需任何自定义样式类，也不必在各个业务页面单独编写 inline style**。

### 1. 变量关系映射

主要影响反馈类组件外观的全局样式覆盖位于 `uno.config.ts` 中：

* **Dialog 对话框 & MessageBox 弹框**：
  * 重写了 `.el-dialog` 与 `.el-message-box` 的 `--el-dialog-border-radius` / `--el-messagebox-border-radius`，使其强制统一为 base-radius（`4px`）。
  * 针对 Dialog 标题栏与页脚，全局配置了细分割线 `#e4e6eb`，并将标题字体变更为加粗表现，使其结构层次清晰、稳定。
* **Drawer 抽屉**：
  * 移除了官方默认无分割线的做法，在 `.el-drawer__header` 与 `.el-drawer__footer` 上添加了与 Dialog 一致的 `#e4e6eb` 分割线，使抽屉拉出后视觉重心更加集中。
* **Alert 警告提示四色体系**：
  * 在 `uno.config.ts` 的 preflights 中，对 Alert 组件在 `is-light` 主题下的四种状态色（success, info, warning, error）的背景色、文字颜色和边框色进行了针对性的重新渲染：
    * **提示 (Info)**：采用浅蓝色背景 `#e6ecff`，边框线 `#7fa0ff`，水利深蓝文字 `#002FA7`。
    * **成功 (Success)**：浅绿背景 `#E3FADC`，边框线 `#4ECF32`，文字 `#0E6B00`。
    * **警告 (Warning)**：浅橘背景 `#FFF2E8`，边框线 `#FFA94D`，文字 `#B0550B`。
    * **危险/错误 (Error)**：浅红背景 `#FFE5E3`，边框线 `#F56464`，文字 `#B22222`。
* **Message & Notification 阴影投影**：
  * 覆盖了 `.el-message` 与 `.el-notification` 的投影属性为轻量的 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)`，圆角对齐 `4px`。

### 2. 推荐使用方式

直接在业务代码中像平常一样编写标准的 Element Plus 模板或直接调用指令即可：

```html
<!-- 基础 Dialog 对话框（样式自动对齐水利蓝风格，无需引入自定义 class） -->
<el-dialog v-model="dialogVisible" title="水利防汛监控预警配置" width="500">
  <span>大坝水位参数配置调整...</span>
  <template #footer>
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="save">确认</el-button>
  </template>
</el-dialog>

<!-- 指令式 MessageBox 弹出（圆角与分割线自动在全局完美重置） -->
<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'

const handleReset = () => {
  ElMessageBox.confirm('此操作将永久重置测站历史数据，是否继续？', '警告', {
    confirmButtonText: '确定重置',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('历史数据已重置。')
  })
}
</script>
```

<script setup>
import FeedbackDemo from './FeedbackDemo.vue'
</script>
