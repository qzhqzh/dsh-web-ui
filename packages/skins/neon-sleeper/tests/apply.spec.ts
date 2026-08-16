// @vitest-environment jsdom
/**
 * The skin owns its body scope, responsive backdrop and favicon, then restores
 * every write when its Cordis fiber is disposed.
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
  delete document.body.dataset.dsDarkTheme
  document.body.style.cssText = ''
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 })
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 768 })
})

describe('neon-sleeper skin apply', () => {
  it('mounts the scoped backdrop and favicon', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    fiber = await mount()

    expect(document.body.dataset.dshNeonSleeper).toBe('')
    expect(document.body.style.getPropertyValue('background-image')).toContain('data:image/webp;base64')
    expect(document.body.style.getPropertyValue('background-size')).toBe('cover')
    expect(document.body.style.getPropertyValue('background-attachment')).toBe('fixed')
    expect(document.head.querySelector('link[data-neon-sleeper-icon]')).not.toBeNull()
  })

  it('swaps both the theme veil and responsive artwork without remounting', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    fiber = await mount()
    const wideLight = document.body.style.getPropertyValue('background-image')

    document.body.dataset.dsDarkTheme = ''
    await tick()
    const wideDark = document.body.style.getPropertyValue('background-image')
    expect(wideDark).not.toBe(wideLight)
    expect(wideDark).toContain('rgba(3, 9, 22')

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 600 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 })
    window.dispatchEvent(new Event('resize'))
    const portraitDark = document.body.style.getPropertyValue('background-image')
    expect(portraitDark).not.toBe(wideDark)
  })

  it('retracts the skin and restores a prior backdrop verbatim', async () => {
    document.body.style.setProperty('background-image', 'url("https://example.test/prior.png")')
    document.body.style.setProperty('background-attachment', 'scroll')
    document.body.style.setProperty('background-color', 'rgb(1, 2, 3)')
    fiber = await mount()

    await fiber.dispose()
    fiber = undefined

    expect(document.body.dataset.dshNeonSleeper).toBeUndefined()
    expect(document.body.style.getPropertyValue('background-image')).toContain('prior.png')
    expect(document.body.style.getPropertyValue('background-attachment')).toBe('scroll')
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(1, 2, 3)')
    expect(document.head.querySelector('link[data-neon-sleeper-icon]')).toBeNull()
  })
})
