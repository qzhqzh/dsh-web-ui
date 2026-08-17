import { readFileSync, readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const clientDir = new URL('../src/client/', import.meta.url)
const artSource = readFileSync(new URL('../src/client/art.ts', import.meta.url), 'utf8')
const cssSource = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')

describe('Neon Sleeper V4 artwork contracts', () => {
  it('uses the sharpened multi-part V4 wide artwork', () => {
    const parts = readdirSync(clientDir)
      .filter((name) => /^art-wide-v4-part\d+\.ts$/.test(name))
      .sort()

    expect(parts.length).toBeGreaterThanOrEqual(2)
    expect(artSource).toContain("WIDE_V4_PART_0")
    expect(artSource).not.toContain("WIDE_PART_0")
  })

  it('keeps the photographic layer free from blur and fractional scaling', () => {
    expect(cssSource).not.toMatch(/backdrop-filter:\s*blur/i)
    expect(cssSource).not.toMatch(/filter:[^;]*blur\(/i)
    expect(cssSource).not.toMatch(/transform:\s*scale\(/i)
  })

  it('keeps the composer seat transparent instead of painting a full-width strip', () => {
    expect(cssSource).toContain("[class*='composerSeat']")
    expect(cssSource).toContain('background: transparent !important')
    expect(cssSource).toContain('box-shadow: none !important')
  })
})
