# 通用类目组件

我们根据最新的 UI 设计规范，定义了一套包含按钮、标签、徽标、返回顶部在内的通用类目基础组件样式系统，以保障整个水利业务平台交互体验的高度统一。

---

## 交互设计规范演示

<ClientOnly>
  <ButtonDemo />
</ClientOnly>

---

## 主题定制说明

通用类目组件完全基于 **Element Plus** 原生组件构建，其主题色、悬浮态、按下态以及圆角表现均已通过在 `uno.config.ts` 中全局覆盖 CSS 变量来统一配置，**开发过程中无需编写任何额外的 CSS 类或 inline style**。

### 1. 全局主题配置

如果需要调整设计系统的主题表现，请在 `uno.config.ts` 中对以下核心 CSS 变量进行覆盖声明：

```typescript
// uno.config.ts
export default defineConfig({
  preflights: [
    {
      getCSS: () => `
        :root {
          /* 核心主色与交互色值 */
          --el-color-primary: #002FA7;          /* 默认状态 */
          --el-color-primary-light-3: #144BCC;  /* 悬浮 Hover */
          --el-color-primary-dark-2: #001E80;   /* 按下 Active */

          /* 圆角变量重定义 */
          --el-border-radius-base: 4px;         /* 基础圆角 */
        }

        /* 全局统一按钮的圆角控制，防止其被 Element 默认的 size 运算所改写 */
        .el-button,
        .el-button--small,
        .el-button--large {
          --el-button-border-radius: var(--el-border-radius-base);
        }
      `
    }
  ]
})
```

### 2. 推荐使用方式

直接声明原生 Element Plus 组件即可：

```html
<!-- 主要填充按钮 -->
<el-button type="primary">主要按钮</el-button>

<!-- 描边次要按钮 -->
<el-button>次要按钮</el-button>

<!-- 文字链接按钮 -->
<el-button link type="primary">文字按钮</el-button>
```

<script setup>
import ButtonDemo from './ButtonDemo.vue'
</script>

