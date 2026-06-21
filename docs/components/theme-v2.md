# 在线主题定制

在线主题定制器允许您通过可视化配置，定制并实时预览基于 **UnoCSS 与 Element Plus** 重置的 UI 样式系统在各种颜色与圆角主题下的视觉效果。

您可以在左侧面板中点选系统主色、三色状态色（成功、警告、错误）并拖动圆角滑块；右侧展示区将隔离且实时联动呈现所有典型组件（通用、导航、数据录入、数据展示、反馈通知等）的主题表现。

调节完毕后，可以在下方区域一键复制与此配置实时同步的 `uno.config.ts` 完整代码，直接粘贴应用到您的工程中。

---

<ClientOnly>
  <ThemeV2Demo />
</ClientOnly>

<script setup>
import ThemeV2Demo from './ThemeV2Demo.vue'
</script>
