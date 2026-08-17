/**
 * Neon Sleeper skin — a quiet futuristic maglev sleeper cabin with separately
 * graded light/dark presentation, real HUD artwork and restrained warm cabin
 * light. The plugin is presentation-only and retracts every write it owns.
 */
import type { Context } from '@deepseek-ai/cordis'
import {
  NEON_SLEEPER_ART_PORTRAIT,
  NEON_SLEEPER_ART_WIDE,
  NEON_SLEEPER_ICON,
} from './art.ts'
import {
  NEON_SLEEPER_HUD_RAIL_LEFT_V3,
  NEON_SLEEPER_HUD_RAIL_RIGHT_V3,
  NEON_SLEEPER_HUD_WIDE_V3,
} from './hud-v3.ts'
import './neon-sleeper.module.css'
import './neon-sleeper-v3.module.css'
import './neon-sleeper-v3-2.module.css'

const OWNED_PROPERTIES = [
  'background-color',
  'background-image',
  'background-position',
  'background-size',
  'background-attachment',
  'background-repeat',
  '--neon-sleeper-art',
  '--neon-sleeper-hud-wide',
  '--neon-sleeper-hud-rail-left',
  '--neon-sleeper-hud-rail-right',
] as const

/** Narrow windows keep the complete portrait composition instead of cropping it. */
function usesPortraitArt(): boolean {
  return window.innerWidth / Math.max(window.innerHeight, 1) < 0.84
}

/**
 * Apply the V3 surface: the art is rendered by a fixed body layer so CSS can
 * grade light/dark modes independently, while the generated HUD studies are
 * used directly by root pseudo-elements above the ordinary panes.
 */
export function apply(ctx: Context): void {
  const body = document.body
  const previous = new Map<string, string>()
  for (const property of OWNED_PROPERTIES) {
    previous.set(property, body.style.getPropertyValue(property))
  }

  body.dataset.dshNeonSleeper = ''
  body.style.setProperty('--neon-sleeper-hud-wide', `url(${NEON_SLEEPER_HUD_WIDE_V3})`)
  body.style.setProperty('--neon-sleeper-hud-rail-left', `url(${NEON_SLEEPER_HUD_RAIL_LEFT_V3})`)
  body.style.setProperty('--neon-sleeper-hud-rail-right', `url(${NEON_SLEEPER_HUD_RAIL_RIGHT_V3})`)
  body.style.setProperty('background-image', 'none')
  body.style.setProperty('background-position', 'center')
  body.style.setProperty('background-size', 'cover')
  body.style.setProperty('background-attachment', 'fixed')
  body.style.setProperty('background-repeat', 'no-repeat')

  const setBackdrop = (): void => {
    const dark = body.dataset.dsDarkTheme !== undefined
    const portrait = usesPortraitArt()

    if (portrait) body.dataset.dshNeonSleeperPortrait = ''
    else delete body.dataset.dshNeonSleeperPortrait

    body.style.setProperty('--neon-sleeper-art', `url(${portrait ? NEON_SLEEPER_ART_PORTRAIT : NEON_SLEEPER_ART_WIDE})`)
    body.style.setProperty('background-color', dark ? '#07152a' : '#d7e3eb')
  }

  setBackdrop()

  const observer = new MutationObserver(setBackdrop)
  observer.observe(body, {
    attributes: true,
    attributeFilter: ['data-ds-dark-theme'],
  })
  window.addEventListener('resize', setBackdrop, { passive: true })

  const favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.type = 'image/png'
  favicon.href = NEON_SLEEPER_ICON
  favicon.dataset.neonSleeperIcon = ''
  document.head.append(favicon)

  ctx.effect(() => () => {
    delete body.dataset.dshNeonSleeper
    delete body.dataset.dshNeonSleeperPortrait
    observer.disconnect()
    window.removeEventListener('resize', setBackdrop)
    for (const [property, value] of previous) {
      body.style.setProperty(property, value)
    }
    favicon.remove()
  }, 'ui-skin-neon-sleeper: layered night-cabin V3 surface')
}
