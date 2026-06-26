import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/privateComponents/',
  srcExclude: ['**/public/**/*.md'],
  vite: {
    plugins: [
      UnoCSS()
    ],
    ssr: {
      noExternal: ['vue-fullscreen']
    }
  },
  title: "公司组件库",
  description: "基于 VitePress 的企业级组件文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '组件展示', link: '/components/button' },
      { text: '数据图表', link: '/components/charts' },
      { text: '登录模板', link: '/templates/login' },
      { text: '主题定制', link: '/components/theme-v2' },
      { text: '字体规范', link: '/guide/font-specification' },
      { text: 'GIS 演示', link: '/components/gis-demo' }
    ],

    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '字体规范', link: '/guide/font-specification' },
        ]
      },
      {
        text: '通用组件',
        items: [
          { text: '通用类目组件', link: '/components/button' },
          { text: '导航类目组件', link: '/components/navigation' },
          { text: '数据录入组件', link: '/components/data-entry' },
          { text: '数据展示组件', link: '/components/data-display' },
          { text: '反馈类组件', link: '/components/feedback' },
          { text: '主题定制 (Element UI)', link: '/components/theme-v2' },
        ]
      },
      {
        text: '业务组件 (水利/GIS)',
        items: [
          { text: '数据图表 (ECharts)', link: '/components/charts' },
          { text: 'GIS 地图 (Mars3D)', link: '/components/gis-demo' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024-${new Date().getFullYear()} 公司名称`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})
