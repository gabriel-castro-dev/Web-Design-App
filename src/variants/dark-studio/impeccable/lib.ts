import { useEffect, useState } from 'react'
import { items, sections } from '../../../data/catalog'
import type { Item } from '../../../data/types'

// Archive vocabulary: every reference gets an edge code like a film reel label ("WA 014").
const ABBR: Record<string, string> = {
  'web-app': 'WA',
  pricing: 'PR',
  team: 'TM',
  'scroll-effects': 'SE',
  'logo-marquee': 'LM',
  auth: 'AU',
  blog: 'BL',
  footer: 'FT',
  lists: 'LI',
}

const abbr = (section: string) =>
  ABBR[section] ??
  section
    .split(/[-_]/)
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

const codes = new Map<string, string>()
for (const s of sections)
  s.items.forEach((item, i) => codes.set(item.id, `${abbr(s.id)} ${String(i + 1).padStart(3, '0')}`))

export const catalogCode = (item: Item) => codes.get(item.id) ?? abbr(item.section)

export const sectionAnchor = (id: string) => `ds-${id}`

/** One component reel "on screen" per day, so the opening frame changes without being random per visit. */
export function featuredItem() {
  const reels = items.filter((i) => i.media.video)
  if (!reels.length) return items[0]
  const day = Math.floor(Date.now() / 86_400_000)
  return reels[day % reels.length]
}

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export const canHover = () => typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches

export type ReadmeState = { status: 'loading' } | { status: 'ready'; text: string } | { status: 'error' }

/**
 * Like the shared useReadme, but tells "still loading" apart from "empty README"
 * (some image READMEs are still being written).
 */
export function useReadmeState(item: Item | undefined): ReadmeState {
  const [state, setState] = useState<{ id: string; value: ReadmeState } | null>(null)
  useEffect(() => {
    if (!item) return
    let alive = true
    item
      .readme()
      .then((text) => alive && setState({ id: item.id, value: { status: 'ready', text } }))
      .catch(() => alive && setState({ id: item.id, value: { status: 'error' } }))
    return () => {
      alive = false
    }
  }, [item])
  if (!item || state?.id !== item.id) return { status: 'loading' }
  return state.value
}

/** README body without its leading `# Title` line, which the page already shows. */
export const stripTitle = (md: string) => md.replace(/^\s*#\s+[^\n]*\n+/, '')
