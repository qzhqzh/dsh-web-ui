import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const baseCss = readFileSync(new URL('../src/client/neon-sleeper.module.css', import.meta.url), 'utf8')
const v3Css = readFileSync(new URL('../src/client/neon-sleeper-v3.module.css', import.meta.url), 'utf8')
const v32Css = readFileSync(new URL('../src/client/neon-sleeper-v3-2.module.css', import.meta.url), 'utf8')

describe('neon-sleeper CSS contracts', () => {
  it('does not make shell navigation a fixed-position containing block', () => {
    expect(v3Css).toContain("body[data-dsh-neon-sleeper] [role='navigation'],")
    expect(v3Css).toContain('-webkit-backdrop-filter: none;')
    expect(v3Css).toContain('backdrop-filter: none;')
    expect(v3Css).not.toContain('blur(18px) saturate(1.12)')
  })

  it('keeps the composer seat transparent without broad composer class styling', () => {
    expect(baseCss).toContain("body[data-dsh-neon-sleeper] [class*='composerSeat']")
    expect(baseCss).toContain('background: transparent !important')
    expect(v3Css).not.toContain("body[data-dsh-neon-sleeper] [class*='composer'],")
  })

  it('renders decorative HUD layers behind interactive root content', () => {
    expect((v3Css.match(/z-index: -1;/g) ?? []).length).toBeGreaterThanOrEqual(2)
  })

  it('keeps the photo layer unscaled and uses a localized clarity veil', () => {
    expect(v32Css).toContain('transform: none')
    expect(v32Css).toContain('--dsw-alias-bg-base: rgba(224, 238, 247, 0.08)')
    expect(v32Css).toContain('circle at 21% 11%')
    expect(v32Css).toContain('rgba(218, 233, 242, 0.16)')
  })

  it('strengthens semantic text contrast without styling the composer text', () => {
    expect(v32Css).toContain('--dsw-alias-state-business-primary: #167ca8')
    expect(v32Css).toContain('--dsw-alias-state-error-primary: #b73f4d')
    expect(v32Css).toContain("body[data-dsh-neon-sleeper] [data-composer] *")
    expect(v32Css).toContain('text-shadow: none')
  })
})
