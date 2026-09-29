import { sections } from '../../../data/catalog'

// Archive numbering is permanent: it follows section order, never the current filter.
export const archive = sections.flatMap((s) => s.items)
const numbers = new Map(archive.map((item, i) => [item.id, i + 1]))

export const pad = (n: number, width = 3) => String(n).padStart(width, '0')
export const sheetNo = (id: string) => pad(numbers.get(id) ?? 0)
export const sectionNo = (id: string) => pad(sections.findIndex((s) => s.id === id) + 1, 2)
export const sectionAnchor = (id: string) => `sec-${id}`
export const TOTAL = pad(archive.length)
