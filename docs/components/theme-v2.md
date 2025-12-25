# 水利信息化 UI 主题与 SaaS 面板

---

## 主题视觉预览

<div class="water-config-preview">
  <div class="preview-item"><span class="label">主色:</span><div class="color-box" style="background:#096dd9;"></div><span>#096dd9</span></div>
  <div class="preview-item"><span class="label">成功:</span><div class="color-box" style="background:#52c41a;"></div><span>#52c41a</span></div>
  <div class="preview-item"><span class="label">告警:</span><div class="color-box" style="background:#faad14;"></div><span>#faad14</span></div>
</div>

<div class="theme-demo" style="margin-bottom: 20px;">
  <el-button class="animate-spin" type="primary">主要按钮</el-button>
  <el-button type="success">成功状态</el-button>
  <el-button type="warning">警示状态</el-button>
  <el-button type="danger">危险状态</el-button>
</div>

<el-input placeholder='测试占位' />

---

## 业务场景组件：GIS 监测

除了基础 UI，我们还抽象了专门针对 **GIS/仪表盘** 场景的业务组件，适配 Mars3D 地图覆盖层：

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <!-- 水位卡片 -->
  <div class="p-4 bg-white border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start">
      <div class="bg-blue-50 p-2 rounded-md font-bold text-blue-600">💧</div>
      <span class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">正常</span>
    </div>
    <div class="mt-4">
      <div class="text-gray-500 text-sm">当前水位 (m)</div>
      <div class="text-2xl font-bold text-blue-900 mt-1">128.45</div>
    </div>
    <div class="mt-2 text-xs text-gray-400 flex items-center gap-1">
      <div class="i-ep-refresh"></div> 10秒前更新
    </div>
  </div>

  <!-- 降雨卡片 -->
  <div class="p-4 bg-white border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start">
      <div class="bg-cyan-50 p-2 rounded-md font-bold text-cyan-600">☁️</div>
      <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">常规</span>
    </div>
    <div class="mt-4">
      <div class="text-gray-500 text-sm">今日降雨 (mm)</div>
      <div class="text-2xl font-bold text-cyan-900 mt-1">15.2</div>
    </div>
    <div class="mt-2 text-xs text-gray-400 flex items-center gap-1">
      <div class="i-ep-refresh"></div> 5分钟前更新
    </div>
  </div>

  <!-- 预警卡片 -->
  <div class="p-4 bg-orange-50 border border-orange-100 rounded-lg shadow-sm">
    <div class="flex justify-between items-start">
      <div class="bg-orange-100 p-2 rounded-md font-bold text-orange-600">⚠️</div>
    </div>
    <div class="mt-4">
      <div class="text-orange-900 text-sm font-bold">水位超限预警</div>
      <div class="text-xs text-orange-700/80 mt-1 line-clamp-2">南门水库流量异常，请各单位做好防汛准备。</div>
    </div>
    <el-button size="small" type="warning" plain class="w-full mt-3">立即处理</el-button>
  </div>
</div>

---

## SaaS 管理面板集成演示

<div class="saas-panel-container">
  <aside class="saas-sidebar">
    <div class="logo-area"><div class="logo-icon">💧</div><span class="logo-text">智慧水利 SaaS</span></div>
    <div class="nav-menu">
      <div class="nav-item active">📊 运行看板</div>
      <div class="nav-item">⛲ 水利工程</div>
      <div class="nav-item">⚠️ 预警中心</div>
      <div class="nav-item">⚙️ 系统配置</div>
    </div>
  </aside>
  <main class="saas-content">
    <header class="saas-header">
      <div class="breadcrumb">管理控制台 / 运行看板</div>
      <div class="user-info">
        <el-avatar :size="28" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="username">管理员</span>
      </div>
    </header>
    <div class="content-body">
      <div class="data-cards">
        <el-card shadow="hover" class="stat-card">
          <template #header>累计降雨 (mm)</template>
          <div class="stat-value">128.5</div>
          <div class="stat-change up">↑ 12% 较同期</div>
        </el-card>
        <el-card shadow="hover" class="stat-card">
          <template #header>设施运行率</template>
          <div class="stat-value">98.2<small>%</small></div>
          <div class="stat-change">运行状况良好</div>
        </el-card>
      </div>
      <el-card class="table-card" header="实时水位监测">
        <el-table :data="tableData" size="small" style="width:100%">
          <el-table-column prop="name" label="站点" />
          <el-table-column prop="level" label="水位(m)" />
          <el-table-column label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status==='正常'?'success':'warning'" size="small">{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </main>
</div>

<script setup>
import { ref } from 'vue'
const tableData = ref([
  { name: '汉口站', level: '24.5', status: '正常' },
  { name: '九江站', level: '19.8', status: '正常' },
  { name: '城陵矶', level: '31.2', status: '预警' }
])
</script>

---

## 样式配置

```css
:root {
    --el-color-primary: #096dd9;
    --el-border-radius-base: 4px;
}
```

---

## UnoCSS 高级集成

为了进一步提升开发效率，我们集成了 **UnoCSS**。它允许您通过原子化类名快速搭建复杂的 UI 布局，并且可以与 Element Plus 深度联动。

### 1. 快速样式搭建

不再需要编写冗长的 CSS，在 HTML 中直接使用原子类：

<div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded flex items-center gap-3 mt-4">
  <div class="i-ep-info-filled text-blue-500 text-xl"></div>
  <div class="text-blue-800 font-medium">这是一个使用 UnoCSS 原子类在 Markdown 中直接定义的卡片</div>
</div>

### 2. 通过 UnoCSS 注入全局 Element 主题 (推荐方案)

在大型业务系统中，我们推荐使用项目根目录下的 `uno.config.ts` 进行统一样式管控。这种方式可以将样式逻辑与构建配置解耦：

```typescript
// uno.config.ts
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
    theme: {
        colors: { primary: "#096dd9" },
    },
    preflights: [
        {
            getCSS: ({ theme }) => `
      :root {
        --el-color-primary: ${theme.colors.primary};
        --el-border-radius-base: 4px;
        /* ... 其他 Element 变量映射 */
      }
    `,
        },
    ],
});
```

Vite 会自动加载该文件，无需在 `config.mts` 中重复配置。这种方案真正实现了 **"Single Source of Truth"**。

### 3. 自定义快捷方式 (Shortcuts)

我们在配置中预定义了一些快捷类，例如 `el-primary-btn`。通过这种方式，您可以创建一套跨组件库的统一语义类：

<div class="my-4 flex gap-4">
  <button class="el-primary-btn">Uno 快捷按钮</button>
  <div class="flex-center w-32 h-10 bg-gray-100 rounded text-sm text-gray-500 border border-dashed">
    居中占位容器
  </div>
</div>

```typescript
// .vitepress/config.mts 中的配置参考
UnoCSS({
    shortcuts: {
        "flex-center": "flex items-center justify-center",
        "el-primary-btn": "bg-[#096dd9] text-white border-none rounded-4px px-4 py-2 hover:bg-blue-600 transition-colors",
    },
});
```

<style>
/* 局部样式已包含在上方，此处为补充 */
.water-config-preview { display: flex; gap: 20px; margin: 15px 0; padding: 10px; background: var(--vp-c-bg-soft); border-radius: 6px; font-size: 13px; }
.preview-item { display: flex; align-items: center; gap: 8px; }
.color-box { width: 18px; height: 18px; border-radius: 3px; }
.saas-panel-container { display: flex; min-height: 450px; border: 1px solid var(--vp-c-divider); border-radius: 10px; overflow: hidden; background: #f0f7ff; margin: 20px 0; }
.saas-sidebar { width: 180px; background: #001529; color: #fff; display: flex; flex-direction: column; }
.logo-area { padding: 12px; display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); }
.logo-text { font-weight: bold; font-size: 13px; }
.nav-menu { padding: 5px 0; flex: 1; }
.nav-item { padding: 8px 16px; cursor: pointer; font-size: 12px; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
.nav-item:hover { background: #1890ff; }
.nav-item.active { background: #096dd9; }
.saas-content { flex: 1; display: flex; flex-direction: column; }
.saas-header { height: 40px; background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); color: #666; font-size: 12px; }
.content-body { padding: 12px; overflow-y: auto; }
.data-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.stat-card .stat-value { font-size: 20px; font-weight: bold; padding: 5px 0; }
.stat-change { font-size: 11px; color: #8c8c8c; }
.stat-change.up { color: #52c41a; }
.table-card { border-radius: 6px; }
</style>
