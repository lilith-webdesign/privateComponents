# 数据图表 (ECharts)

本章节展示如何将 **ECharts** 深度集成到水利信息化业务中。我们为常用的流量监测、降雨散点等场景提供了预设的主题配置。

<div class="p-6 bg-gray-50 rounded-xl mb-8">
  <div class="flex items-center gap-4 mb-6">
    <div class="w-1 h-6 bg-blue-600 rounded"></div>
    <h3 class="text-lg font-bold">实时水情流量监测</h3>
  </div>

  <div id="chart-line" style="width: 100%; height: 350px;"></div>
</div>

## 配置建议

> [!TIP]
> 为了实现全局视觉一致性，建议在项目中定义一个通用的 `useCharts` hook，自动注入“水利蓝”调色盘。

```typescript
// 推荐的配色方案
const WATER_COLORS = ["#096dd9", "#009688", "#faad14", "#f5222d"];
```

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  const chartDom = document.getElementById('chart-line')
  if (!chartDom) return
  const myChart = echarts.init(chartDom)

  const option = {
    color: ['#096dd9', '#009688'],
    tooltip: { trigger: 'axis' },
    legend: { data: ['库水位', '入库流量'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '库水位',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(9, 109, 217, 0.3)' },
            { offset: 1, color: 'rgba(9, 109, 217, 0)' }
          ])
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '入库流量',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };

  myChart.setOption(option)

  window.addEventListener('resize', () => myChart.resize())
})
</script>

<style>
#chart-line {
  background: white;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.02);
}
</style>
