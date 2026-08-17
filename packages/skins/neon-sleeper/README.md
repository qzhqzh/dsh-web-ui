# Neon Sleeper

English | [中文](README.zh.md)

Neon Sleeper is a photography-first skin for the DSH Web UI. It turns the workspace into a quiet futuristic night-train cabin: a sleeping woman and gray long-haired cat rest beside a panoramic window while a mature future city and high-speed maglev traffic continue outside.

## Design direction

V5 makes image fidelity a functional requirement. The wide desktop artwork now comes from the original cabin image rather than the old 864×540 intermediate WebP, and is packaged as a 3172×1984 high-quality WebP. The UI no longer relies on a full-screen frosted veil: readability is handled by local translucent controls and a clearer sidebar surface.

- 3172×1984 HD wide artwork sourced from the original cabin image.
- High-quality WebP compression rather than repeated low-resolution re-encoding.
- No global blur, shell-level backdrop blur or full-screen milky scrim.
- Light sidebar uses a luminous blue-white translucent surface with clearer grouping.
- Dark sidebar uses a restrained deep-blue translucent surface with strong text contrast.
- Transparent composer layout wrappers so only the real input surface is visible.
- Responsive portrait artwork remains embedded in the package with no runtime image request.

## Install

```bash
dsh-skin install neon-sleeper
dsh-skin use neon-sleeper
```

The current `scripts/dsh-skin` registry discovers the skin from `skin.json`, so the skin does not require a manual registry entry.

## Development

```bash
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper build
pnpm --filter @linxin666/dsh-client-ui-skin-neon-sleeper test
```

The package follows the standard DSH skin layout: host entry, browser client entry, Cordis bundle patch, generated preview images and Skin Center metadata.

## Visual contract

V5 treats sharpness, local contrast and shell usability as functional requirements. The wide artwork must remain at least 3000×1900, the skin CSS must not blur the photographic layer or application shell, and the composer seat must never paint a second full-width background behind the actual input.

## License

BSD-3-Clause.
