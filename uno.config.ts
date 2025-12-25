import {
    defineConfig,
    presetUno,
    presetAttributify,
    presetIcons
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
    theme: {
        colors: {
            primary: '#096dd9', // 水利蓝主题色
        }
    },
    preflights: [
        {
            getCSS: ({ theme }: { theme: any }) => `
        :root {
          --el-color-primary: ${theme.colors.primary};
          --el-color-primary-light-3: #4096ff;
          --el-color-primary-light-5: #69b1ff;
          --el-color-primary-light-7: #91caff;
          --el-color-primary-light-8: #bae0ff;
          --el-color-primary-light-9: #e6f4ff;
          --el-color-primary-dark-2: #0050b3;

          --el-border-radius-base: 4px;
          --el-button-padding-horizontal: 20px;
        }
      `
        }
    ],
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
        'el-primary-btn': 'bg-primary text-white border-none rounded-4px px-4 py-2 hover:bg-blue-600 transition-colors',
    }
})
