import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  NEON_SLEEPER_ART_DARK,
  NEON_SLEEPER_ART_HEIGHT,
  NEON_SLEEPER_ART_LIGHT,
  NEON_SLEEPER_ART_WIDTH,
} from '../src/client/art.ts'

const baseCss = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')
const directCss = readFileSync(new URL('../src/client/neon-sleeper-direct-originals.module.css', import.meta.url), 'utf8')

function webpSize(dataUrl: string): [number, number] {
  const webp = Buffer.from(dataUrl.split(',', 2)[1], 'base64')
  expect(webp.length).toBeGreaterThan(200_000)
  expect(webp.subarray(0, 4).toString('ascii')).toBe('RIFF')
  expect(webp.subarray(8, 12).toString('ascii')).toBe('WEBP')
  expect(webp.subarray(12, 16).toString('ascii')).toBe('VP8 ')
  return [webp.readUInt16LE(26) & 0x3fff, webp.readUInt16LE(28) & 0x3fff]
}

describe('Neon Sleeper V5 direct-original visual contracts', () => {
  it('ships separate real light and dark originals without fake upscaling', () => {
    expect(NEON_SLEEPER_ART_LIGHT).not.toBe(NEON_SLEEPER_ART_DARK)
    expect(webpSize(NEON_SLEEPER_ART_LIGHT)).toEqual([1672, 941])
    expect(webpSize(NEON_SLEEPER_ART_DARK)).toEqual([1672, 941])
    expect(NEON_SLEEPER_ART_WIDTH).toBe(1672)
    expect(NEON_SLEEPER_ART_HEIGHT).toBe(941)
  })

  it('keeps the user-supplied backgrounds free of blur, scaling and theme recoloring', () => {
    expect(baseCss).not.toMatch(/filter:[^;]*blur\(/i)
    expect(baseCss).not.toContain('transform: scale(')
    expect(directCss).toContain('filter: none !important')
    expect(directCss).toContain('opacity: 1 !important')
    expect(directCss).toContain('transform: none !important')
  })
})
