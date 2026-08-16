# @linxin666/dsh-client-ui-skin-neon-sleeper

[English](README.md) | 中文

Neon Sleeper「夜航舱」是为 dsh Web GUI 设计的安静未来夜行列车皮肤。它以电影感磁悬浮卧铺舱为环境背景，再将界面重映射为冷蓝 HUD、低饱和蓝紫城市光、少量暖琥珀舱内灯光与半透明玻璃表面。

这套皮肤只负责呈现层，不注入服务、不发送 Cordis 事件，也不会触及模型请求。

## 视觉方向

- 全景车窗外是高密度未来夜城，室内保持安静、舒适的卧铺舱氛围。
- 主环境光使用冷蓝与蓝紫色，只保留克制的暖琥珀色局部灯光。
- 主要界面表面使用半透明玻璃质感，在保证可读性的同时让背景保留存在感。
- 根据视口宽高比自动切换宽屏与竖屏构图，避免人物和核心场景在窄屏中被错误裁切。
- 亮色与暗色模式共用同一场景，但使用不同的可读性遮罩。
- 支持皮肤中心通过 `--dsw-skin-scrim` 控制背景遮挡强度。

## 运行时契约

`apply(ctx)` 会在 `document.body` 上设置 `data-dsh-neon-sleeper`，安装响应式内嵌背景与 favicon，并监听基础主题的明暗属性以及视口尺寸变化。卸载时 disposer 会完整撤销皮肤自己的写入，并恢复启用皮肤前已经存在的 body 背景属性。

背景图和 favicon 都以 data URL 形式内嵌在 `src/client/art.ts` 中，运行时不会额外请求外部皮肤资源。

## 安装

在本仓库 checkout 中执行：

```sh
dsh plugin --profile web add /path/to/dsh-web-ui/packages/skins/neon-sleeper
```

随后可以使用仓库辅助脚本切换：

```sh
node scripts/dsh-skin use neon-sleeper
```

恢复官方默认外观：

```sh
node scripts/dsh-skin use official
```

## 构建与测试

```sh
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper build
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper test
```

apply 契约测试覆盖 body 属性生命周期、背景恢复、明暗遮罩实时切换，以及宽屏与竖屏背景的响应式切换。

## 皮肤中心与画廊

修改视觉表面后，需要重新构建皮肤并刷新仓库生成物：

```sh
node scripts/skin-center-bundles
pnpm --filter @linxin666/dsh-client-ui-skin-center build
node scripts/gallery-build
node scripts/capture-previews
```

提交时应同时包含重新生成的 `lib/`、亮暗预览图、皮肤中心注册表和 gallery 产物。

## 背景素材

本皮肤使用的未来卧铺舱场景图是为该主题提供的视觉素材，并直接内嵌在皮肤包中。它只承担环境氛围，实际操作界面始终保持在功能前景层。
