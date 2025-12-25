# Button 按钮

按钮用于触发一个操作或行为。

## 基础用法

最基础的按钮用法。

<div class="demo-container">
  <button class="custom-btn">默认按钮</button>
  <button class="custom-btn primary">主要按钮</button>
  <button class="custom-btn success">成功按钮</button>
</div>

## 样式定义

项目中我们可以定义自己的样式：

```css
.custom-btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background: #fff;
    cursor: pointer;
    transition: 0.3s;
}

.custom-btn.primary {
    background: #409eff;
    color: #fff;
    border-color: #409eff;
}

.custom-btn.success {
    background: #67c23a;
    color: #fff;
    border-color: #67c23a;
}
```

<style>
.demo-container {
  display: flex;
  gap: 12px;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 16px 0;
}
.custom-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background: #fff;
  cursor: pointer;
  transition: 0.3s;
  color:#000
}
.custom-btn:hover {
  filter: brightness(0.9);
}
.custom-btn.primary {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}
.custom-btn.success {
  background: #67c23a;
  color: #fff;
  border-color: #67c23a;
}
</style>
