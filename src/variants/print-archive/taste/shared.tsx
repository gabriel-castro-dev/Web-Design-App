import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { items, sections } from '../../../data/catalog'
import type { Item } from '../../../data/types'

export const pad = (n: number, width = 3) => String(n).padStart(width, '0')

// Record numbers follow the printed order of the archive (sheet order, then title),
// so "No. 014" means the same thing on every page and never shifts with a filter.
const recordIndex = new Map<string, number>()
sections.forEach((s) => s.items.forEach((i) => recordIndex.set(i.id, recordIndex.size + 1)))

export const recordNo = (id: string) => pad(recordIndex.get(id) ?? 0)
export const sheetNo = (sectionId: string) => pad(sections.findIndex((s) => s.id === sectionId) + 1, 2)
export const sheetAnchor = (sectionId: string) => `sheet-${sectionId}`

export const TOTAL = items.length
export const COMPONENTS = items.filter((i) => i.kind === 'component').length
export const STILLS = TOTAL - COMPONENTS
export const ANIMATED = items.filter((i) => i.animated).length

export const kindLabel = (item: Item) => (item.kind === 'component' ? 'Component' : 'Image')

/** Print crop marks: eight hairlines that sit just outside the corners of the parent frame. */
export function CropMarks() {
  return (
    <>
      <span className="pa-crop pa-crop--tl" aria-hidden="true" />
      <span className="pa-crop pa-crop--tr" aria-hidden="true" />
      <span className="pa-crop pa-crop--bl" aria-hidden="true" />
      <span className="pa-crop pa-crop--br" aria-hidden="true" />
    </>
  )
}

/** Registration target. Rotates for animated records, sits still for static ones. */
export function RegMark({ live }: { live: boolean }) {
  return <span className={live ? 'pa-reg pa-reg--live' : 'pa-reg'} aria-hidden="true" />
}

export function Header({ base, children, strip }: { base: string; children?: ReactNode; strip?: ReactNode }) {
  return (
    <header className="pa-head">
      <div className="pa-head__row">
        <Link to={base} className="pa-brand" aria-label="Reference Archive, home">
          <span className="pa-brand__block" aria-hidden="true">
            WDA
          </span>
          <span className="pa-brand__name">Reference Archive</span>
        </Link>
        {children}
      </div>
      {strip}
    </header>
  )
}

export function Colophon() {
  return (
    <footer className="pa-colophon">
      <div className="pa-wrap pa-colophon__grid">
        <p className="pa-colophon__mark" aria-hidden="true">
          WDA
        </p>
        <dl className="pa-colophon__spec">
          <div>
            <dt>Records</dt>
            <dd>{pad(TOTAL)}</dd>
          </div>
          <div>
            <dt>Sheets</dt>
            <dd>{pad(sections.length, 2)}</dd>
          </div>
          <div>
            <dt>Set in</dt>
            <dd>Archivo, IBM Plex Mono</dd>
          </div>
          <div>
            <dt>Use</dt>
            <dd>Hand a record to an agent with its README and code.</dd>
          </div>
        </dl>
      </div>
    </footer>
  )
}
