# 快速开始

本指南将帮助您快速在项目中使用我们的组件库。

## 安装

首先，通过 npm 安装：

```bash
npm install company-ui-library
```

## 引入

在您的 `main.js` 中全局引入：

```javascript
import { createApp } from "vue";
import CompanyUI from "company-ui-library";
import "company-ui-library/dist/index.css";

const app = createApp(App);
app.use(CompanyUI);
app.mount("#app");
```

## 开始使用

现在，您可以在任何 Vue 文件中使用组件了：

```vue
<template>
    <CompButton type="primary">点击我</CompButton>
</template>
```
