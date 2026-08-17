# 夜航舱

[English](README.md) | 中文

夜航舱是一套以摄影为主体的 DSH Web UI 皮肤。工作区被放进一节安静的未来夜行列车卧铺舱：熟睡的女孩与灰色长毛猫依偎在全景窗边，窗外成熟的未来都市和高速磁悬浮交通仍在持续运行。

## 设计方向

V4 重构刻意移除了 V3 多轮迭代累积的视觉叠层。摄影画面重新成为第一主体，界面可读性通过半透明色彩 token 保证，而不是依赖大面积磨砂效果。

- 清晰摄影背景，不使用全局模糊。
- 不在应用外壳使用 backdrop filter，也不覆盖大面积乳白蒙版。
- 只在安静的左上区域加入少量星点和远距交通光轨。
- 亮色和暗色分别使用高对比文字体系。
- composer 布局外层保持透明，只显示真正的输入组件表面。
- 宽屏和竖屏背景均内嵌在皮肤包中，运行时不请求外部图片。

## 安装

```bash
dsh-skin install neon-sleeper
dsh-skin use neon-sleeper
```

当前 `scripts/dsh-skin` 会根据 `skin.json` 自动发现皮肤，因此不再需要手工维护皮肤注册表。

## 开发

```bash
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper build
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper test
```

皮肤遵循标准 DSH 结构：宿主入口、浏览器客户端入口、Cordis bundle patch、生成后的预览图以及 Skin Center 元数据。

## 视觉契约

V4 将清晰度视为功能要求。皮肤 CSS 不应使用全局 blur 或 shell 级 backdrop filter，也不应在真实输入框后面再生成第二层 composer 背景。所有装饰层都不可交互，并位于应用内容之后。

## 许可证

BSD-3-Clause。
