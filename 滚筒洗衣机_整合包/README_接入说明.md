# 滚筒洗衣机交互接入说明

## 文件

- `index.html`：滚筒洗衣机交互页面，可直接打开预览。
- `assets/drum_frames/*.png`：已清理左上角页码数字的 10 张滚筒动画帧。
- `assets/washer_frames_manifest.json`：滚筒帧顺序和素材目录说明。
- `originals/*.png`：原始未清理版本备份，方便后续重新处理或对比。

## 交互流程

1. 页面显示滚筒洗衣机。
2. 用户可选择点击模式或摇手机模式。
3. 点击滚筒中心区域，或在移动端授权后摇晃手机。
4. 进度条累计到 100%。
5. 页面切换到 `bubble` 状态，并触发完成回调。

## 完成回调

完成后会触发 `receipt` 事件：

```js
window.addEventListener("receipt", (event) => {
  console.log(event.detail);
});
```

回调数据示例：

```js
{
  state: "receipt",
  stage: "washing_machine",
  completed: 1,
  total: 1,
  mode: "tap",
  progress: 100
}
```

同时支持：

```js
window.onWashingComplete = (detail) => {
  console.log(detail);
};
```

## 移动端说明

- 点击模式可在桌面和移动端直接使用。
- 摇手机模式依赖浏览器 `DeviceMotionEvent`。
- iOS/Safari 等浏览器通常需要 HTTPS 和用户主动点击授权。
- 如果传感器不可用，页面会提示切回点击模式继续。
