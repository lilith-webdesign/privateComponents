// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import type { Theme } from 'vitepress'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册 Element Plus
        app.use(ElementPlus)
    }
} satisfies Theme
