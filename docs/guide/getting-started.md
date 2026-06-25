# 快速开始

本指南将帮助您在项目中快速集成组件库，并应用我们专为水利业务量身定制的颜色主题与圆角/间距规范体系。

---

## 1. 安装 UnoCSS 与 Element Plus

由于我们的组件库样式完全基于 **Element Plus** 的原生组件构建，且全局样式改色、交互高亮态与圆角定义都托管于 **UnoCSS**，您需要在您的项目中先行安装并配置它们：

1. **Element Plus**: 请参考 [Element Plus 官方安装指南](https://element-plus.org/zh-CN/guide/installation.html) 进行安装。
2. **UnoCSS**: 请参考 [UnoCSS 官方集成配置指南](https://unocss.dev/guide/integrations) 结合您项目的构建工具（Vite / Nuxt / Webpack 等）进行快速安装与配置。

---

## 2. 配置您的 `uno.config.ts`

安装完 UnoCSS 之后，在您项目根目录的 `uno.config.ts` 文件中，**复制并合并**以下配置内容。

本配置段落定义了我们统一的水利深蓝主色调，并利用 `preflights` 直接在全局对 Element Plus 原生组件（Button, Input, Table, Collapse, Dialog, Drawer, Alert, Message 等）完成了无感知的样式重置。当该文件发生任何变动时，此文档页面将**自动同步更新**：

<<< @/../uno.config.ts{ts}

---

## 3. 在入口文件中引入样式

最后，确保您项目的入口文件（如 `main.ts` 或 `main.js`）按顺序引入了 Element Plus 与 UnoCSS 的样式文件，让全局配置生效：

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入 Element Plus 的原生 CSS 文件
import 'element-plus/dist/index.css'

// 2. 引入 UnoCSS 的虚拟样式模块
import 'virtual:uno.css'

const app = createApp(App)
app.mount('#app')
```

---

## 4. 纯内网离线部署字体配置 (可选)

如果您的水利业务系统是部署在**纯内网（私有云、物理隔离局域网）**环境下，无法访问外部 Google Fonts CDN，为了让中英文字体仍然能够以极高质感和圆润度呈现，请执行以下字体本地化离线部署步骤：

### 步骤一：拷贝字体包文件
请从我们组件库的 `docs/.vitepress/theme/fonts/` 目录下，将以下 6 个静态字体文件：
* `inter-400.woff2` / `inter-500.woff2` / `inter-600.woff2` / `inter-700.woff2` (静态英文字体)
* `noto-sans-sc-400.woff2` / `noto-sans-sc-500.woff2` (静态思源黑体中文字体)

复制并粘贴到您自己项目根目录的 **`public/fonts/`** 文件夹下。

### 步骤二：在全局样式表中配置 `@font-face`
在您项目的全局样式表（例如 `style.css` 或 `main.css`，需确保在 `main.ts` 中被引入）的**最顶部**，加入以下本地载入规则。

这些规则将使用绝对路径引用放置在 `public` 文件夹下的字体包，并在全局针对 Element 组件补全抗锯齿平滑配置，消除低 DPI 显示器上的毛糙感：

```css
/* 1. 静态 Noto Sans SC (思源黑体) 中文字体本地载入 */
@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/noto-sans-sc-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/noto-sans-sc-500.woff2') format('woff2');
}

/* 2. 静态 Inter 英数字体本地载入 */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/inter-500.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-600.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-700.woff2') format('woff2');
}

/* 3. 补全全局防锯齿平滑，使文字外观更加饱满圆润 */
html, body, button, input, select, textarea {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

通过此配置，项目在编译构建时，Vite 会自动将这些字体包当做公共静态资源输出。即使在完全没有外网连接的内网环境，您的系统也能秒开展示高品质的主题字体。
