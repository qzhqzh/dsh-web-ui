import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')

describe('neon-sleeper V5 CSS contract', () => {
  it('keeps the photography layer sharp and fully visible', () => {
    expect(css).toContain('background-image: var(--neon-sleeper-art)')
    expect(css).toContain('opacity: 1;')
    expect(css).not.toMatch(/filter:[^;]*blur\(/i)
    expect(css).not.toMatch(/backdrop-filter:\s*blur/i)
    expect(css).not.toContain('transform: scale(')
    expect(css).not.toContain('body[data-dsh-neon-sleeper]::after')
  })

  it('keeps the composer seat transparent', () => {
    expect(css).toContain("[class*='composerSeat']")
    expect(css).toContain('background: transparent !important')
    expect(css).toContain('content: none !important')
  })

  it('uses a blur-free translucent sidebar for both themes', () => {
    expect(css).toContain("[role='navigation']")
    expect(css).toContain('rgba(244, 250, 253, 0.91)')
    expect(css).toContain('rgba(5, 21, 44, 0.88)')
    expect(css).toContain('backdrop-filter: none !important')
  })

  it('defines readable semantic text colors for both themes', () => {
    expect(css).toContain('--dsw-alias-label-primary: #10283c')
    expect(css).toContain('--dsw-alias-label-primary: #f1f9fd')
    expect(css).toContain('--dsw-alias-state-error-primary: #b84c59')
    expect(css).toContain('--dsw-alias-state-error-primary: #ff929b')
  })
})
