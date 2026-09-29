import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router'
import { items, searchItems, sections } from '../../../data/catalog'
import { subtypeLabel } from '../../../data/sections'
import type { Item, Section } from '../../../data/types'
import { Tile } from './Tile'
import { Icon, bento, numberOf, plural, prefersReducedMotion, toneOf } from './shared'

const SUGGESTIONS = ['dashboard', 'pricing', 'dark', 'marquee', 'scroll', 'login']

const componentCount = items.filter((i) => i.kind === 'component').length

function Opening({ base }: { base: string }) {
  return (
    <section className="wp-page wp-open" aria-labelledby="wp-open-title">
      <div>
        <p className="wp-kicker">A personal library of interface references</p>
        <h1 id="wp-open-title">
          Interfaces kept for their <em>taste</em>, ready to hand over.
        </h1>
        <p className="wp-note">
          <strong>{items.length} references</strong> across {sections.length} sections, each with a written description.
          The {componentCount} components also carry their reconstructed code. Open one, copy its notes, and give an agent
          something specific to aim at.
        </p>
      </div>
      <nav className="wp-toc" aria-labelledby="wp-toc-title">
        <h2 id="wp-toc-title">Contents</h2>
        <ol>
          {sections.map((s) => (
            <li key={s.id} data-tone={toneOf(s.id)}>
              <Link to={`${base}#${s.id}`}>
                <span className="wp-no">
                  <span>{numberOf(s.id)}</span>
                </span>
                <span className="wp-toc-label">{s.label}</span>
                <span className="wp-leader" aria-hidden="true" />
                <span className="wp-count">{s.items.length}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  )
}

function SectionBlock({ section, matched, base }: { section: Section; matched: Item[]; base: string }) {
  const [subtype, setSubtype] = useState('all')
  const subtypes = section.subtypes.filter((st) => matched.some((i) => i.subtype === st))
  const current = subtypes.includes(subtype) ? subtype : 'all'
  const pool = current === 'all' ? matched : matched.filter((i) => i.subtype === current)
  // The large feature slot goes to the first reference with a motion preview, if any.
  const lead = Math.max(0, pool.findIndex((i) => i.media.video))
  const shown = lead ? [pool[lead], ...pool.filter((_, i) => i !== lead)] : pool
  const cells = bento(shown.length)
  const headingId = `wp-h-${section.id}`
  const filtered = matched.length !== section.items.length

  return (
    <section id={section.id} className="wp-page wp-section" data-tone={toneOf(section.id)} aria-labelledby={headingId}>
      <header className="wp-sec-head">
        <span className="wp-tab" aria-hidden="true">
          {numberOf(section.id)}
        </span>
        <div>
          <h2 id={headingId}>
            {section.label}
            <small>{filtered ? `${matched.length} of ${section.items.length}` : section.items.length}</small>
          </h2>
        </div>
        {subtypes.length > 0 && (
          <ul className="wp-chips" aria-label={`Filter ${section.label} by type`}>
            <li>
              <button
                type="button"
                className="wp-chip"
                aria-pressed={current === 'all'}
                onClick={() => setSubtype('all')}
              >
                All <span>{matched.length}</span>
              </button>
            </li>
            {subtypes.map((st) => (
              <li key={st}>
                <button
                  type="button"
                  className="wp-chip"
                  aria-pressed={current === st}
                  onClick={() => setSubtype(current === st ? 'all' : st)}
                >
                  {subtypeLabel(st)} <span>{matched.filter((i) => i.subtype === st).length}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </header>
      <ul className="wp-bento" aria-live={subtypes.length ? 'polite' : undefined}>
        {shown.map((item, i) => (
          <Tile key={item.id} item={item} cell={cells[i]} base={base} />
        ))}
      </ul>
    </section>
  )
}

export function Home({ base, onActive }: { base: string; onActive: (id?: string) => void }) {
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const query = (params.get('q') ?? '').trim()

  const results = useMemo(() => searchItems(query, items), [query])
  const blocks = useMemo(() => {
    const ids = new Set(results.map((i) => i.id))
    return sections
      .map((section) => ({ section, matched: section.items.filter((i) => ids.has(i.id)) }))
      .filter((b) => b.matched.length > 0)
  }, [results])

  // Jump to #section (also when the same link is clicked twice), otherwise start at the top.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (!id) {
      window.scrollTo({ top: 0 })
      return
    }
    const frame = requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }),
    )
    return () => cancelAnimationFrame(frame)
  }, [location.key, location.hash])

  // Highlight the section being read in the header nav.
  useEffect(() => {
    const els = blocks.map((b) => document.getElementById(b.section.id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) {
      onActive(undefined)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) onActive(hit.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      onActive(undefined)
    }
  }, [blocks, onActive])

  const setQuery = (value: string) => setParams(value ? { q: value } : {}, { replace: true })

  return (
    <>
      {query ? (
        <div className="wp-page wp-results" role="status">
          <h1>
            {results.length ? plural(results.length, 'reference') : 'Nothing'} for <q>{query}</q>
          </h1>
          <button type="button" className="wp-btn" onClick={() => setQuery('')}>
            <Icon.close />
            Clear search
          </button>
        </div>
      ) : (
        <Opening base={base} />
      )}

      {query && !results.length && (
        <div className="wp-page">
          <div className="wp-empty">
            <p>
              No title, summary or tag contains every word you typed. Fewer words usually help, or start from one of
              these:
            </p>
            <ul className="wp-suggest" aria-label="Suggested searches">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button type="button" className="wp-chip" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {blocks.map(({ section, matched }) => (
        <SectionBlock key={section.id} section={section} matched={matched} base={base} />
      ))}
    </>
  )
}
