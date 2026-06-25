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
            primary: '#002FA7', // 通用类目主题色 (#002FA7)
        }
    },
    preflights: [
        {
            getCSS: ({ theme }: { theme: any }) => `
        :root {
          /* 主要核心色定制 */
          --el-color-primary: ${theme.colors.primary};
          --el-color-primary-light-3: #144BCC; /* 悬浮 Hover 色 */
          --el-color-primary-light-5: #3b66df;
          --el-color-primary-light-7: #7fa0ff;
          --el-color-primary-light-8: #bfd0ff;
          --el-color-primary-light-9: #e6ecff;
          --el-color-primary-dark-2: #001E80;  /* 按下 Active 色 */

          /* 成功状态色定制 (#17AB00) */
          --el-color-success: #17AB00;
          --el-color-success-light-3: #4ECF32;
          --el-color-success-dark-2: #0E6B00;
          --el-color-success-light-9: #E3FADC;

          /* 警告状态色定制 (#E67717) */
          --el-color-warning: #E67717;
          --el-color-warning-light-3: #FFA94D;
          --el-color-warning-dark-2: #B0550B;
          --el-color-warning-light-9: #FFF2E8;

          /* 危险状态色定制 (#E33232) */
          --el-color-danger: #E33232;
          --el-color-danger-light-3: #F56464;
          --el-color-danger-dark-2: #B22222;
          --el-color-danger-light-9: #FFE5E3;

          /* 标准圆角定制 */
          --el-border-radius-small: 2px;
          --el-border-radius-base: 4px;
          --el-border-radius-round: 20px;
        }

        /* 统一 Element Plus 组件的字体家族，防止被 VitePress 全局基础字体覆盖 */
        [class^="el-"],
        [class*=" el-"] {
          font-family: Inter, 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif !important;
        }

        /* 针对不同尺寸 Element Plus 原生组件圆角等变量重声明的全局统一覆盖 */
        .el-button {
          --el-button-border-radius: var(--el-border-radius-base);
        }
        .el-button--small {
          /* 强制小按钮使用基础圆角变量，防止被 Element 默认的 calc 重定义改写为 3px */
          --el-button-border-radius: var(--el-border-radius-base);
        }
        .el-button--large {
          --el-button-border-radius: var(--el-border-radius-base);
        }

        /* 统一表单元素不同尺寸下的圆角变量，防止被 Element 默认的更小或更大尺寸计算覆盖 */
        .el-input,
        .el-input--small,
        .el-input--large,
        .el-select,
        .el-select-v2,
        .el-textarea {
          --el-input-border-radius: var(--el-border-radius-base) !important;
        }

        /* 统一 Table 展示样式 */
        .el-table {
          --el-table-border-color: #e4e6eb !important;
          --el-table-header-bg-color: #f5f5f5 !important;
          --el-table-row-hover-bg-color: rgba(0, 47, 167, 0.04) !important;
        }
        .el-table th.el-table__cell {
          background-color: var(--el-table-header-bg-color) !important;
          color: #060B14 !important;
          font-weight: bold !important;
        }

        /* 统一 Collapse 折叠面板样式 */
        .el-collapse {
          border-top: 1px solid #e4e6eb !important;
          border-bottom: 1px solid #e4e6eb !important;
        }
        .el-collapse-item__header {
          font-weight: bold !important;
          color: #060B14 !important;
        }

        /* 统一 Dialog 对话框与 MessageBox 弹框样式 */
        .el-dialog {
          --el-dialog-border-radius: var(--el-border-radius-base) !important;
          --el-dialog-padding-primary: 24px !important;
        }
        .el-dialog__header {
          margin-right: 0 !important;
          padding-bottom: 12px !important;
          border-bottom: 1px solid #e4e6eb !important;
        }
        .el-dialog__title {
          font-weight: bold !important;
          color: #060B14 !important;
        }
        .el-dialog__body {
          padding: 24px 0 !important;
          color: #4f5259 !important;
        }
        .el-dialog__footer {
          padding-top: 12px !important;
          border-top: 1px solid #e4e6eb !important;
        }

        .el-message-box {
          --el-messagebox-border-radius: var(--el-border-radius-base) !important;
          padding: 20px 24px !important;
        }
        .el-message-box__header {
          padding-bottom: 12px !important;
          border-bottom: 1px solid #e4e6eb !important;
          padding-right: 0 !important;
        }
        .el-message-box__title {
          font-weight: bold !important;
          color: #060B14 !important;
        }
        .el-message-box__content {
          padding: 24px 0 !important;
          color: #4f5259 !important;
        }
        .el-message-box__btns {
          padding-top: 12px !important;
          border-top: 1px solid #e4e6eb !important;
        }

        /* 统一 Drawer 抽屉样式 */
        .el-drawer {
          --el-drawer-padding-primary: 24px !important;
        }
        .el-drawer__header {
          margin-bottom: 0 !important;
          padding-bottom: 16px !important;
          border-bottom: 1px solid #e4e6eb !important;
          color: #060B14 !important;
          font-weight: bold !important;
        }
        .el-drawer__body {
          padding: 24px !important;
        }
        .el-drawer__footer {
          padding: 16px 24px !important;
          border-top: 1px solid #e4e6eb !important;
        }

        /* 统一 Alert 警告提示样式 */
        .el-alert {
          --el-alert-border-radius-i: var(--el-border-radius-base) !important;
          border: 1px solid transparent !important;
        }
        .el-alert--success.is-light {
          background-color: #E3FADC !important;
          border-color: #4ECF32 !important;
          color: #0E6B00 !important;
        }
        .el-alert--info.is-light {
          background-color: #e6ecff !important;
          border-color: #7fa0ff !important;
          color: #002FA7 !important;
        }
        .el-alert--warning.is-light {
          background-color: #FFF2E8 !important;
          border-color: #FFA94D !important;
          color: #B0550B !important;
        }
        .el-alert--error.is-light {
          background-color: #FFE5E3 !important;
          border-color: #F56464 !important;
          color: #B22222 !important;
        }

        /* 统一 Message 消息及 Notification 通知样式 */
        .el-message {
          --el-message-border-radius: var(--el-border-radius-base) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
        .el-notification {
          --el-notification-border-radius: var(--el-border-radius-base) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
      `
        }
    ],
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    }
})
