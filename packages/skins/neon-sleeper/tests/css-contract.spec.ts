import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const baseCss = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')
const v3Css = readFileSync(new URL('../src/client/neon-sleeper-v3.module.css', import.meta.url), 'utf8')

describe('neon-sleeper CSS contracts', () => {
  it('does not make shell navigation a fixed-position containing block', () => {
    const shellRule = v3Css.match(/body\[data-dsh-neon-sleeper\] \[role='navigation'\][\s\S]*?\n}/)?.[0] ?? ''
    expect(shellRule).toContain('backdrop-filter: none')
    expect(shellRule).not.toContain('blur(')
  })

  it('keeps the composer seat transparent without broad composer class styling', () => {
    expect(baseCss).toContain("body[data-dsh-neon-sleeper] [class*='composerSeat']")
    expect(baseCss).toContain('background: transparent !important')
    expect(v3Css).not.toContain("body[data-dsh-neon-sleeper] [class*='composer'],")
  })

  it('renders decorative HUD layers behind interactive root content', () => {
    expect((v3Css.match(/z-index: -1;/g) ?? []).length).toBeGreaterThanOrEqual(2)
  })
})
