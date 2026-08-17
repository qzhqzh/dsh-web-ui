import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')

describe('neon-sleeper V4 CSS contract', () => {
  it('keeps the photography layer sharp', () => {
    expect(css).toContain('background-image: var(--neon-sleeper-art)')
    expect(css).not.toContain('backdrop-filter')
    expect(css).not.toContain('blur(')
    expect(css).not.toContain('transform: scale(')
  })

  it('keeps the composer seat transparent', () => {
    expect(css).toContain("[class*='composerSeat']")
    expect(css).toContain('background: transparent !important')
    expect(css).not.toContain("[class*='composer'] {\n  background:")
  })

  it('uses sparse sky details instead of a broad veil', () => {
    expect(css).toContain('radial-gradient(circle at 11% 10%')
    expect(css).toContain('linear-gradient(104deg')
  })

  it('defines readable semantic text colors for both themes', () => {
    expect(css).toContain('--dsw-alias-label-primary: #0d2539')
    expect(css).toContain('--dsw-alias-label-primary: #eff8fd')
    expect(css).toContain('--dsw-alias-state-error-primary: #b54855')
    expect(css).toContain('--dsw-alias-state-error-primary: #ff8f98')
  })
})
