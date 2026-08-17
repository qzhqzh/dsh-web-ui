# 夜航舱

[English](README.md) | 中文

夜航舱是一套以摄影为主体的 DSH Web UI 皮肤。工作区被放进一节安静的未来夜行列车卧铺舱：熟睡的女孩与灰色长毛猫依偎在全景窗边，窗外成熟的未来都市和高速磁悬浮交通仍在持续运行。

## 设计方向

V5 将图片清晰度直接视为功能要求。桌面背景保持同一张夜航舱构图，但不再让浏览器拉伸旧的 864×540 图片，而是从原有内嵌源图执行 EDSR ×4 超分辨率重建，最终以内嵌 3456×2160 高质量 WebP 交付。界面也不再依赖整屏磨砂蒙版，文字可读性由局部半透明控件和更清晰的侧边栏承担。

- 真正的 3456×2160 宽屏 WebP，测试会直接解析内嵌 WebP 头验证真实尺寸。
- 使用 EDSR ×4 超分辨率重建并高质量 WebP 编码，不再反复依赖浏览器或 Lanczos 放大。
- 不使用全局 blur、shell 级 backdrop blur 或整屏乳白蒙版。
- 亮色侧边栏采用清透的蓝白半透明表面，分组和选中状态更清晰。
- 暗色侧边栏采用克制的深蓝半透明表面，并保持高对比文字。
- composer 布局外层保持透明，只显示真正的输入组件表面。
- 竖屏背景继续内嵌在皮肤包中，运行时不请求外部图片。

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

V5 将清晰度、局部对比和外壳可用性视为功能要求。测试会解析内嵌 WebP 并要求真实尺寸为 3456×2160；皮肤 CSS 不得模糊摄影层或应用外壳；composer seat 不得在真正输入框后重新绘制第二层横向背景。

## 许可证

BSD-3-Clause。
