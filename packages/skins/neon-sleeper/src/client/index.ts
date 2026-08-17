/**
 * Neon Sleeper V5 - direct-original photography-first future cabin.
 * Light and dark themes use separate user-supplied artwork with no fake HD upscaling.
 */
import type { Context } from '@deepseek-ai/cordis'
import {
  NEON_SLEEPER_ART_DARK,
  NEON_SLEEPER_ART_LIGHT,
  NEON_SLEEPER_ICON,
} from './art.ts'
import './neon-sleeper.module.css'
import './neon-sleeper-direct-originals.module.css'

const OWNED_PROPERTIES = [
  'background-color',
  '--neon-sleeper-art',
] as const

export function apply(ctx: Context): void {
  const body = document.body
  const previous = new Map<string, string>()
  for (const property of OWNED_PROPERTIES) {
    previous.set(property, body.style.getPropertyValue(property))
  }

  body.dataset.dshNeonSleeper = ''

  const updateTheme = (): void => {
    const dark = body.dataset.dsDarkTheme !== undefined
    body.style.setProperty(
      '--neon-sleeper-art',
      `url(${dark ? NEON_SLEEPER_ART_DARK : NEON_SLEEPER_ART_LIGHT})`,
    )
    body.style.setProperty('background-color', dark ? '#061426' : '#dce9f1')
  }

  updateTheme()

  const observer = new MutationObserver(updateTheme)
  observer.observe(body, {
    attributes: true,
    attributeFilter: ['data-ds-dark-theme'],
  })

  const favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.type = 'image/png'
  favicon.href = NEON_SLEEPER_ICON
  favicon.dataset.neonSleeperIcon = ''
  document.head.append(favicon)

  ctx.effect(() => () => {
    delete body.dataset.dshNeonSleeper
    observer.disconnect()
    for (const [property, value] of previous) {
      body.style.setProperty(property, value)
    }
    favicon.remove()
  }, 'ui-skin-neon-sleeper: v5 direct-original photography surface')
}
