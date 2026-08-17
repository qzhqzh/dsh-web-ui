import { readFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'
import { describe, expect, it } from 'vitest'
import {
  NEON_SLEEPER_ART_WIDE,
  NEON_SLEEPER_ART_WIDE_HEIGHT,
  NEON_SLEEPER_ART_WIDE_WIDTH,
} from '../src/client/art.ts'

const cssSource = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')
const artSource = readFileSync(new URL('../src/client/art.ts', import.meta.url), 'utf8')

describe('Neon Sleeper V5 visual contracts', () => {
  it('ships the HD wide WebP instead of the V4 upscaled low-resolution source', () => {
    expect(artSource).toContain('WIDE_V5_LIGHT_PART_0')
    expect(artSource).not.toContain('WIDE_V4_PART_0')

    const encoded = NEON_SLEEPER_ART_WIDE.split(',', 2)[1]
    const webp = Buffer.from(encoded, 'base64')

    expect(webp.length).toBeGreaterThan(600_000)
    expect(webp.subarray(0, 4).toString('ascii')).toBe('RIFF')
    expect(webp.subarray(8, 12).toString('ascii')).toBe('WEBP')
    expect(webp.subarray(12, 16).toString('ascii')).toBe('VP8 ')

    const width = webp.readUInt16LE(26) & 0x3fff
    const height = webp.readUInt16LE(28) & 0x3fff
    expect(width).toBe(NEON_SLEEPER_ART_WIDE_WIDTH)
    expect(height).toBe(NEON_SLEEPER_ART_WIDE_HEIGHT)
    expect(width).toBeGreaterThanOrEqual(3000)
    expect(height).toBeGreaterThanOrEqual(1900)
  })

  it('keeps the photograph and shell free from blur and full-screen veil layers', () => {
    expect(cssSource).not.toMatch(/filter:[^;]*blur\(/i)
    expect(cssSource).not.toMatch(/backdrop-filter:\s*blur/i)
    expect(cssSource).toContain('opacity: 1;')
    expect(cssSource).not.toContain('body[data-dsh-neon-sleeper]::after')
  })

  it('keeps the composer seat transparent and sidebar blur-free', () => {
    expect(cssSource).toContain("[class*='composerSeat']")
    expect(cssSource).toContain('background: transparent !important')
    expect(cssSource).toContain("[role='navigation']")
    expect(cssSource).toContain('backdrop-filter: none !important')
  })
})
