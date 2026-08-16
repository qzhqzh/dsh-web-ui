# @linxin666/dsh-client-ui-skin-neon-sleeper

Neon Sleeper is a quiet futuristic night-train skin for the dsh web GUI. It uses a cinematic maglev sleeper-cabin scene as the ambient backdrop, then remaps the interface to cool HUD blues, muted violet city light, warm cabin highlights, and translucent glass surfaces.

The skin is presentation-only. It does not inject services, emit Cordis events, or touch model requests.

## Visual direction

- Cinematic near-future sleeper cabin with a dense night city outside the panoramic window.
- Cool blue and blue-violet ambient light with a restrained warm amber cabin accent.
- Translucent interface surfaces so the background remains visible without sacrificing readability.
- Separate wide and portrait artwork crops selected from the viewport aspect ratio.
- Light and dark variants use different readability scrims while preserving the same scene.
- The skin-center background occlusion control is supported through `--dsw-skin-scrim`.

## Runtime contract

`apply(ctx)` sets `data-dsh-neon-sleeper` on `document.body`, installs the responsive inline backdrop and favicon, and observes the shell dark-theme attribute plus viewport changes. The disposer retracts every write owned by the skin and restores any pre-existing body background properties.

The artwork and favicon are embedded as data URLs in `src/client/art.ts`; the runtime does not fetch external skin assets.

## Installing

From a checkout of this repository:

```sh
dsh plugin --profile web add /path/to/dsh-web-ui/packages/skins/neon-sleeper
```

The repository helper can then switch to the skin:

```sh
node scripts/dsh-skin use neon-sleeper
```

To return to the stock interface:

```sh
node scripts/dsh-skin use official
```

## Building and testing

```sh
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper build
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper test
```

The apply contract tests cover body-attribute lifecycle, background restoration, live dark/light scrim changes, and the wide/portrait responsive art switch.

## Skin center and gallery

When changing the visual surface, rebuild the package and regenerate the repository-owned artifacts:

```sh
node scripts/skin-center-bundles
pnpm --filter @linxin666/dsh-client-ui-skin-center build
node scripts/gallery-build
node scripts/capture-previews
```

Commit the rebuilt `lib/`, the light/dark previews, the skin-center generated registry, and gallery artifacts together with the source change.

## Artwork

The ambient cabin artwork for this skin was supplied for this theme and is embedded directly in the package. It is intentionally used as background atmosphere: the interface remains the functional foreground.
