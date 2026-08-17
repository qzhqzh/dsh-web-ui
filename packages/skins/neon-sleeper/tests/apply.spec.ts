// @vitest-environment jsdom
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

describe('neon-sleeper V4 apply', () => {
  it('mounts the responsive photo and favicon', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    fiber = await mount()

    expect(document.body.dataset.dshNeonSleeper).toBe('')
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).toContain('data:image/webp;base64')
    expect(document.head.querySelector('link[data-neon-sleeper-icon]')).not.toBeNull()
  })

  it('switches theme and portrait artwork without remounting', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 })
    fiber = await mount()
    const wide = document.body.style.getPropertyValue('--neon-sleeper-art')

    document.body.dataset.dsDarkTheme = ''
    await tick()
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(6, 20, 38)')

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 600 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 })
    window.dispatchEvent(new Event('resize'))
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).not.toBe(wide)
  })

  it('restores all inline state on dispose', async () => {
    document.body.style.setProperty('background-color', 'rgb(1, 2, 3)')
    document.body.style.setProperty('--neon-sleeper-art', 'prior-art')
    fiber = await mount()

    await fiber.dispose()
    fiber = undefined

    expect(document.body.dataset.dshNeonSleeper).toBeUndefined()
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(1, 2, 3)')
    expect(document.body.style.getPropertyValue('--neon-sleeper-art')).toBe('prior-art')
    expect(document.head.querySelector('link[data-neon-sleeper-icon]')).toBeNull()
  })
})
