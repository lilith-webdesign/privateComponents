# 移动端体验规范

本体系合并原「移动端规范」「移动端规范 V2」与调研结论，按统一结构阅读：

<div class="mex-chain">

**全局交互语法**（所有角色共用：布局、List/Card、按钮、数据、轻采集、触达）  
→ **分角色业务规范**（权限 · 数据视野 · 设计哲学 · 操作路径）  
→ **正反对比**（左侧规范推荐使用 `@varlet/ui`，右侧常见反例）

</div>

## 从这里开始

<div class="mex-overview-grid">
  <a class="mex-overview-card" href="./global.html">
    <strong>全局交互规范</strong>
    <span>布局骨架、列表卡、按钮区、核心数据、轻采集、触达反馈、离线同步，附正反对比工作台。</span>
  </a>
  <a class="mex-overview-card" href="./roles/water-keeper.html">
    <strong>管水员</strong>
    <span>下半屏操作 · 地图任务 · 自动填报 · 离线暂存</span>
  </a>
  <a class="mex-overview-card" href="./roles/engineer.html">
    <strong>工程人员</strong>
    <span>工单推进 · 时间/责任人/来源可追溯</span>
  </a>
  <a class="mex-overview-card" href="./roles/dispatcher.html">
    <strong>调度员</strong>
    <span>控制五步协议 · 成功绑定实时数据变化</span>
  </a>
  <a class="mex-overview-card" href="./roles/admin.html">
    <strong>行政人员</strong>
    <span>依据先行 · 审批/督查短路径</span>
  </a>
  <a class="mex-overview-card" href="./roles/public.html">
    <strong>公众用户</strong>
    <span>极简服务 · 报修进度 · 预警触达</span>
  </a>
</div>

## 五角色一览

| 角色 | 核心权限（摘要） | 数据视野（摘要） | 设计抓手 |
|------|------------------|------------------|----------|
| 管水员 | 巡检执行、状态录入、异常上报 | 片区台账、巡检历史、监测与告警 | 下半屏 + 地图 + 离线 |
| 工程人员 | 工单、物资、施工、验收 | 维修历史、库存、进度、质量档案 | 责任链与时间线 |
| 调度员 | 全域监测、指令、应急调控 | 全域实时、调度史、流域与气象 | 高摩擦控制协议 |
| 行政人员 | 审批、督查、公文、报表 | 审批与整改、效能、法规 | 依据先行 |
| 公众用户 | 查询、报修、缴费、预警 | 个人用水与服务进度 | 短路径低概念 |

## 旧文档说明

| 原入口 | 现归属 |
|--------|--------|
| 移动端规范（V1） | 条文熔入 [全局交互规范](./global) |
| 移动端规范 V2 | 对比工作台与场景能力复用；业务场景进入分角色页 |
| 调研报告 | 信息架构与角色业务母本（`docs/superpowers/specs/`） |

<style>
.mex-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  margin: 20px 0 8px;
}
.mex-overview-card {
  display: block;
  padding: 16px;
  border: 1px solid rgb(15 107 92 / 12%);
  border-radius: 16px;
  background: linear-gradient(180deg, #fff, #f5faf8);
  color: inherit;
  text-decoration: none;
}
.mex-overview-card strong {
  display: block;
  margin-bottom: 6px;
  font-size: 15px;
}
.mex-overview-card span {
  color: #56666b;
  font-size: 12px;
  line-height: 1.5;
}
.mex-chain {
  margin: 18px 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: #f3f7f5;
  color: #3d4f55;
  font-size: 13px;
  line-height: 1.7;
}
</style>
