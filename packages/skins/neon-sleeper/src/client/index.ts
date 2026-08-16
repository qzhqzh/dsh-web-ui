/**
 * Neon Sleeper skin — a quiet futuristic maglev sleeper cabin overlaid by
 * restrained HUD-blue glass surfaces and a small amount of warm cabin light.
 * The plugin is presentation-only. apply() owns every DOM and inline-style
 * write it makes and retracts those writes through the Cordis effect disposer.
 */
import type { Context } from '@deepseek-ai/cordis'
import {
  NEON_SLEEPER_ART_PORTRAIT,
  NEON_SLEEPER_ART_WIDE,
  NEON_SLEEPER_ICON,
} from './art.ts'
import './neon-sleeper-palette.module.css'
import './neon-sleeper-shell.module.css'
import './neon-sleeper-integrations.module.css'

const SCRIM_LIGHT = [
  'linear-gradient(90deg, rgba(231, 240, 247, 0.16) 0%, rgba(231, 240, 247, 0.06) 50%, rgba(7, 20, 46, 0.10) 100%)',
  'linear-gradient(180deg, rgba(7, 20, 46, 0.05) 0%, rgba(7, 20, 46, 0.18) 100%)',
].join(', ')

const SCRIM_DARK = [
  'linear-gradient(90deg, rgba(3, 9, 22, 0.56) 0%, rgba(3, 9, 22, 0.28) 54%, rgba(3, 9, 22, 0.16) 100%)',
  'linear-gradient(180deg, rgba(3, 9, 22, 0.18) 0%, rgba(3, 9, 22, 0.48) 100%)',
].join(', ')

const BACKDROP_PROPERTIES = [
  'background-color',
  'background-image',
  'background-position',
  'background-size',
  'background-attachment',
  'background-repeat',
] as const

/** Narrow windows keep the complete portrait composition instead of cropping it. */
function usesPortraitArt(): boolean {
  return window.innerWidth / Math.max(window.innerHeight, 1) < 0.84
}

/**
 * Apply the Neon Sleeper surface: scoped body attribute, responsive embedded
 * artwork, live light/dark scrim and favicon. All state is restored on dispose.
 */
export function apply(ctx: Context): void {
  const body = document.body
  const previous = new Map<string, string>()
  for (const property of BACKDROP_PROPERTIES) {
    previous.set(property, body.style.getPropertyValue(property))
  }

  body.dataset.dshNeonSleeper = ''

  const setBackdrop = (): void => {
    const dark = body.dataset.dsDarkTheme !== undefined
    const art = usesPortraitArt() ? NEON_SLEEPER_ART_PORTRAIT : NEON_SLEEPER_ART_WIDE
    const userVeil = 'linear-gradient(rgba(3, 9, 22, var(--dsw-skin-scrim, 0)) 0%, rgba(3, 9, 22, var(--dsw-skin-scrim, 0)) 100%)'
    body.style.setProperty('background-color', dark ? '#030916' : '#d9e5ec')
    body.style.setProperty('background-image', `${userVeil}, ${dark ? SCRIM_DARK : SCRIM_LIGHT}, url(${art})`)
    body.style.setProperty('background-position', 'center')
    body.style.setProperty('background-size', 'cover')
    body.style.setProperty('background-attachment', 'fixed')
    body.style.setProperty('background-repeat', 'no-repeat')
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
    observer.disconnect()
    window.removeEventListener('resize', setBackdrop)
    for (const [property, value] of previous) {
      body.style.setProperty(property, value)
    }
    favicon.remove()
  }, 'ui-skin-neon-sleeper: quiet maglev cabin backdrop')
}
