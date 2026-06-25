// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import './custom.css'
import type { Theme } from 'vitepress'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册 Element Plus
        app.use(ElementPlus)

        // 仅在客户端环境动态导入并安装 vue-fullscreen 插件，防止 SSR 服务端渲染因 CommonJS 报错
        if (typeof window !== 'undefined') {
            import('../../../node_modules/vue-fullscreen/dist/index.es.js').then((module) => {
                app.use(module.default)
            })
        }
    }
} satisfies Theme
