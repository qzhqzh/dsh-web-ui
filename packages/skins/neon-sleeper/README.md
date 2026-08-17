# Neon Sleeper

English | [中文](README.zh.md)

Neon Sleeper is a photography-first skin for the DSH Web UI. It turns the workspace into a quiet futuristic night-train cabin: a sleeping woman and gray long-haired cat rest beside a panoramic window while a mature future city and high-speed maglev traffic continue outside.

## Design direction

The V4 rebuild intentionally removes the accumulated V3 visual stack. The photograph remains the primary surface, while the interface stays readable through translucent color tokens rather than broad frosted effects.

- Clear photographic background with no global blur.
- No shell-level backdrop filter or large milky veil.
- Sparse stars and distant traffic streaks only in the quiet upper-left area.
- High-contrast light and dark text palettes.
- Transparent composer layout wrappers so only the real input surface is visible.
- Responsive wide and portrait artwork embedded in the package with no runtime image request.

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

V4 treats clarity as a functional requirement. The skin CSS must not apply global blur or shell-level backdrop filters, and it must not create a second composer background behind the actual input. Decorative layers are non-interactive and remain behind application content.

## License

BSD-3-Clause.
