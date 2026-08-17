// @vitest-environment jsdom
/**
 * The skin owns its body scope, responsive art/HUD custom properties and
 * favicon, then restores every write when its Cordis fiber is disposed.
 */
import { afterEach, describe, expect, it } from 'vitest'
import { Context, type Fiber } from '@deepseek-ai/cordis'
import { apply } from '../src/client/index.ts'

let fiber: Fiber | undefined

async function mount(): Promise<Fiber> {
  const next = new Context().plugin({ apply })
  await next.await()
  return next
}

async function tick(): Promise<void> {
  await new Promise((resolve) => { setTimeout(resolve, 0) })
}

afterEach(async () => {
  await fiber?.dispose()
  fiber = undefined
  document.head.querySelectorAll('link[data-neon-sleeper-icon]').forEach((node) => { node.remove() })
  delete document.body.dataset.dshNeonSleeper
  delete document.body.dataset.dshNeonSleeperPortrait
  delete document.body.dataset.dsDarkTheme
  document.body.style.cssText = ''
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 })
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 768 })
})

describe('neon-sleeper skin apply', () => {
  it('mounts the art, real HUD assets and favicon', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    fiber = await mount()

    expect(document.body.dataset.dshNeonSleeper).toBe('')
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).toContain('data:image/webp;base64')
    expect(document.body.style.getPropertyValue('--neon-sleeper-hud-wide')).toContain('data:image/webp;base64')
    expect(document.body.style.getPropertyValue('--neon-sleeper-hud-rail-left')).toContain('data:image/webp;base64')
    expect(document.body.style.getPropertyValue('--neon-sleeper-hud-rail-right')).toContain('data:image/webp;base64')
    expect(document.body.style.getPropertyValue('background-image')).toBe('none')
    expect(document.head.querySelector('link[data-neon-sleeper-icon]')).not.toBeNull()
  })

  it('updates theme state and enters portrait mode without remounting', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    fiber = await mount()
    const wide = document.body.style.getPropertyValue('--neon-sleeper-art')
    const wideHud = document.body.style.getPropertyValue('--neon-sleeper-hud-wide')
    const leftRail = document.body.style.getPropertyValue('--neon-sleeper-hud-rail-left')
    const rightRail = document.body.style.getPropertyValue('--neon-sleeper-hud-rail-right')

    document.body.dataset.dsDarkTheme = ''
    await tick()
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(7, 21, 42)')
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).toBe(wide)
    expect(document.body.style.getPropertyValue('--neon-sleeper-hud-wide')).toBe(wideHud)
    expect(document.body.style.getPropertyValue('--neon-sleeper-hud-rail-left')).toBe(leftRail)
    expect(document.body.style.getPropertyValue('--neon-sleeper-hud-rail-right')).toBe(rightRail)

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 600 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 })
    window.dispatchEvent(new Event('resize'))
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).not.toBe(wide)
    expect(document.body.dataset.dshNeonSleeperPortrait).toBe('')
  })

  it('retracts the skin and restores prior inline styles verbatim', async () => {
    document.body.style.setProperty('background-image', 'url("https://example.test/prior.png")')
    document.body.style.setProperty('background-attachment', 'scroll')
    document.body.style.setProperty('background-color', 'rgb(1, 2, 3)')
    document.body.style.setProperty('--neon-sleeper-art', 'prior-art')
    fiber = await mount()

    await fiber.dispose()
    fiber = undefined

    expect(document.body.dataset.dshNeonSleeper).toBeUndefined()
    expect(document.body.dataset.dshNeonSleeperPortrait).toBeUndefined()
    expect(document.body.style.getPropertyValue('background-image')).toContain('prior.png')
    expect(document.body.style.getPropertyValue('background-attachment')).toBe('scroll')
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(1, 2, 3)')
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).toBe('prior-art')
    expect(document.head.querySelector('link[data-neon-sleeper-icon]')).toBeNull()
  })
})
