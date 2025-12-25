# GIS 业务集成 (Mars3D)

本章节展示如何将 **Mars3D** 与业务系统进行高保真集成。由于 GIS 系统的复杂性，我们提供了一套标准化的 UI 覆盖层，用于展示坐标拾取、图层管理及监测点信息。

<div class="gis-mock-container relative w-full h-500px rounded-xl overflow-hidden border border-gray-200">
  <!-- 模拟地图背景 -->
  <div class="absolute inset-0 bg-[#f0f2f5] flex items-center justify-center overflow-hidden">
    <div class="absolute w-full h-full opacity-30" style="background-image: radial-gradient(#096dd9 1px, transparent 1px); background-size: 20px 20px;"></div>
    <div class="text-gray-400 flex flex-col items-center">
      <div class="i-ep-location-filled text-4xl mb-2"></div>
      <p>正在初始化 Mars3D 地图引擎...</p>
    </div>
    <!-- 模拟点位 -->
    <div class="absolute top-1/3 left-1/4 animate-bounce">
       <div class="i-ep-location text-blue-600 text-3xl"></div>
       <div class="bg-white/90 px-2 py-1 rounded shadow text-xs mt-1 border border-blue-200">南门水库 A1</div>
    </div>
  </div>

  <!-- GIS 顶部工具栏 -->
  <div class="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
    <div class="flex gap-2 pointer-events-auto">
      <div class="bg-white/90 p-2 rounded shadow-sm border border-gray-200 flex gap-4 text-sm px-4">
        <div class="flex items-center gap-1 cursor-pointer hover:text-blue-600"><div class="i-ep-grid"></div>图层</div>
        <div class="flex items-center gap-1 cursor-pointer hover:text-blue-600"><div class="i-ep-set-up"></div>量算</div>
        <div class="flex items-center gap-1 cursor-pointer hover:text-blue-600"><div class="i-ep-search"></div>搜索</div>
      </div>
    </div>
    <div class="bg-white/90 p-2 rounded shadow-sm border border-gray-200 text-xs px-3 pointer-events-auto">
      坐标: 116.397, 39.908 (WGS84)
    </div>
  </div>

  <!-- 右侧监测信息面板 -->
  <div class="absolute top-20 right-4 w-64 bg-white/95 rounded-lg shadow-lg border border-gray-100 p-4 pointer-events-auto">
    <div class="flex justify-between items-center mb-3">
       <span class="font-bold text-gray-800">监测点详情</span>
       <div class="i-ep-close text-gray-400 cursor-pointer"></div>
    </div>
    <div class="space-y-3">
      <div class="p-2 bg-blue-50 rounded">
        <div class="text-xs text-blue-600">当前水位</div>
        <div class="text-xl font-bold text-blue-800">124.5 m</div>
      </div>
      <div class="p-2 bg-green-50 rounded">
        <div class="text-xs text-green-600">昨日降雨量</div>
        <div class="text-xl font-bold text-green-800">12.8 mm</div>
      </div>
      <div class="text-xs text-gray-500 border-t pt-2">
        最后更新: 2025-12-24 20:45
      </div>
    </div>
  </div>
</div>

## Mars3D 推荐集成结构

GIS 页面通常需要覆盖大量的 UI 组件，我们推荐使用 UnoCSS 的绝对定位类 (如 `absolute top-4 left-4`) 来快速布局。

```typescript
// 典型的 Mars3D 初始化逻辑
export const initMap = (containerId) => {
    const map = new mars3d.Map(containerId, {
        basemaps: [{ name: "天地图", type: "tdt", layer: "img_d" }],
        center: { lat: 31.8, lng: 117.2, alt: 45000, heading: 0, pitch: -45 },
    });
};
```

<style>
.gis-mock-container {
  height: 500px;
  background-color: #f7f9fc;
}
</style>
