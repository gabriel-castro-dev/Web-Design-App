import { isValidElement, type ReactNode, type SVGProps } from 'react'
import { sections } from '../../../data/catalog'

// Six pastel tones, handed out to sections in display order. Used only for markers.
const TONES = ['sage', 'clay', 'iris', 'butter', 'mist', 'rose'] as const

export const toneOf = (sectionId: string) => {
  const index = sections.findIndex((s) => s.id === sectionId)
  return TONES[(index < 0 ? 0 : index) % TONES.length]
}

export const numberOf = (sectionId: string) => {
  const index = sections.findIndex((s) => s.id === sectionId)
  return String(index + 1).padStart(2, '0')
}

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Flattens rendered markdown children back into plain text (for heading ids). */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ''
}

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/*
  Bento layout for a 12-column row system (desktop). The first item is a two-row feature,
  every ninth item after it goes wide, and the last row is stretched so no holes remain.
  Units: a single tile is 1 unit (3 cols), a wide tile 2 units (6 cols); a row holds 4.
*/
export interface Cell {
  span: number
  rows: 1 | 2
  orient: 'v' | 'h'
  size: 'lg' | 'md' | 'sm'
  wide: boolean
}

export function bento(count: number): Cell[] {
  const single: Cell = { span: 3, rows: 1, orient: 'v', size: 'sm', wide: false }
  const wide: Cell = { span: 6, rows: 1, orient: 'h', size: 'md', wide: true }
  const feature: Cell = { span: 6, rows: 2, orient: 'v', size: 'lg', wide: true }
  const half: Cell = { span: 6, rows: 1, orient: 'v', size: 'md', wide: true }

  if (count <= 0) return []
  if (count === 1) return [{ span: 12, rows: 1, orient: 'h', size: 'lg', wide: true }]
  if (count === 2) return [half, half]
  if (count === 3) return [feature, wide, wide]
  if (count === 4) return [feature, wide, single, single]

  // The two rows beside the feature hold 2 units each, later rows hold 4.
  const units: number[] = [0]
  const rows: number[][] = []
  let row = 0
  let fill = 0
  for (let i = 1; i < count; i++) {
    const cap = row < 2 ? 2 : 4
    const want = i % 9 === 5 && cap - fill >= 2 ? 2 : 1
    ;(rows[row] ??= []).push(i)
    units[i] = want
    fill += want
    if (fill >= cap) {
      row++
      fill = 0
    }
  }
  // Stretch an unfinished last row so the grid closes flush.
  const planned = [...units]
  if (fill > 0) rows[row].forEach((i) => (units[i] = (units[i] * 4) / fill))

  return units.map((u, i): Cell => {
    if (i === 0) return feature
    const span = Math.round(u * 3)
    if (span >= 12) return { ...wide, span, size: 'lg' }
    if (planned[i] === 2 || span >= 8) return { ...wide, span }
    if (span === 6) return half
    return { ...single, span }
  })
}

type IconProps = SVGProps<SVGSVGElement>
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const Icon = {
  search: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  back: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  ),
  out: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  ),
  copy: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M5 15V6a1 1 0 0 1 1-1h9" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  download: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 4v11M7 10.5 12 15.5 17 10.5M5 19.5h14" />
    </svg>
  ),
  code: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
    </svg>
  ),
  image: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="m4 16 4.5-4.5L13 16M13 14l2.5-2.5L20 16" />
    </svg>
  ),
}
