import { createContext, type CSSProperties } from 'react'
import { sections } from '../../../data/catalog'

// Muted pastels, used only to identify a section (marker, active chip, stack pills).
// `bg` is the pale wash, `ink` the matching readable tone (>= 4.5:1 on its wash).
const TINTS = [
  { bg: '#DDE3D2', ink: '#46573A' }, // sage
  { bg: '#EEDAD1', ink: '#8A4633' }, // clay
  { bg: '#D6E0E3', ink: '#3B5A66' }, // slate
  { bg: '#EDE2C2', ink: '#735A14' }, // straw
  { bg: '#E2DAE3', ink: '#5E4A63' }, // heather
]

export function tintOf(sectionId: string) {
  const index = Math.max(0, sections.findIndex((s) => s.id === sectionId))
  const tint = TINTS[index % TINTS.length]
  return { '--tint': tint.bg, '--tint-ink': tint.ink } as CSSProperties
}

export const sectionAnchor = (sectionId: string) => `sec-${sectionId}`

export const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scrolls to a section block on Home and moves focus to its heading. */
export function jumpToSection(sectionId: string, smooth = true) {
  const target = document.getElementById(sectionAnchor(sectionId))
  if (!target) return
  target.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' })
  target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
}

/** Which section the reader is in, shared between the sticky header and the pages. */
export const ActiveSection = createContext<{ active: string | null; setActive: (id: string | null) => void }>({
  active: null,
  setActive: () => {},
})

export type Shape = 'lead' | 'lead-flip' | 'std' | 'wide' | 'full'

/**
 * Bento shapes for a 4-column grid, so every section fills its rows exactly.
 * Long sections alternate 2x2 lead stories (left, then right) with plain rows,
 * like a magazine spread; leftovers close the last row with wide or full cards.
 */
export function shapesFor(count: number): Shape[] {
  if (count === 1) return ['full']
  if (count === 2) return ['wide', 'wide']
  if (count === 3) return ['lead', 'wide', 'wide']
  if (count === 4) return ['lead', 'std', 'std', 'wide']
  const shapes: Shape[] = []
  let left = count
  let leads = 0
  while (left > 0) {
    if (left >= 5) {
      shapes.push(leads++ % 2 ? 'lead-flip' : 'lead', 'std', 'std', 'std', 'std')
      left -= 5
      // A run of plain rows between lead stories, as long as another lead can follow.
      const run = left >= 13 ? 8 : left >= 9 ? 4 : 0
      shapes.push(...Array<Shape>(run).fill('std'))
      left -= run
    } else {
      const tail: Record<number, Shape[]> = {
        1: ['full'],
        2: ['wide', 'wide'],
        3: ['std', 'std', 'wide'],
        4: ['std', 'std', 'std', 'std'],
      }
      shapes.push(...tail[left])
      left = 0
    }
  }
  return shapes
}
