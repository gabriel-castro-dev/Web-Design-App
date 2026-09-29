import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { items, searchItems, sections } from '../../../data/catalog'
import { subtypeLabel } from '../../../data/sections'
import type { Section } from '../../../data/types'
import { Bar, DensityStrip, RegMark, SheetCard, SkipLink } from './parts'
import { archive, pad, sectionAnchor, sectionNo, TOTAL } from './numbering'

const SUGGESTIONS = ['dark', 'dashboard', 'tailwind', 'scroll', 'marquee', 'glass']
const componentCount = items.filter((i) => i.kind === 'component').length
const motionCount = items.filter((i) => i.animated).length

export function Home({ base }: { base: string }) {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const setQuery = (q: string) => setParams(q ? { q } : {}, { replace: true, preventScrollReset: true })

  const matched = useMemo(() => new Set(searchItems(query, items).map((i) => i.id)), [query])
  const [subtypes, setSubtypes] = useState<Record<string, string>>({})
  const inputRef = useRef<HTMLInputElement>(null)
  const { hash } = useLocation()

  // Back links land on `#sec-<id>`: scroll there once the page is laid out.
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!el) return
    // Re-align once web fonts settle: title wrapping above can shift the target.
    const go = () => el.scrollIntoView({ block: 'start', behavior: 'instant' })
    requestAnimationFrame(go)
    document.fonts?.ready.then(() => requestAnimationFrame(go))
  }, [hash])

  // "/" focuses the query field, like most archives with a search box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.key !== '/' || e.metaKey || e.ctrlKey || /input|textarea|select/i.test(target.tagName)) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const counts = sections.map((s) => s.items.filter((i) => matched.has(i.id)).length)
  const total = matched.size
  const active = useScrollSpy(counts.join())

  return (
    <>
      <SkipLink />
      <Bar
        base={base}
        aside={
          <div className="pa-search" role="search">
            <label htmlFor="pa-q" className="pa-search__label pa-label">
              Query
            </label>
            <input
              ref={inputRef}
              id="pa-q"
              type="search"
              value={query}
              autoComplete="off"
              spellCheck={false}
              placeholder="Title, tag, stack"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            />
            {query ? (
              <button type="button" className="pa-search__aux pa-label" onClick={() => (setQuery(''), inputRef.current?.focus())} aria-label="Clear search">
                Clear
              </button>
            ) : (
              <span className="pa-search__aux pa-label" aria-hidden="true">
                <kbd>/</kbd>
              </span>
            )}
          </div>
        }
      >
        <nav className="pa-index" aria-label="Sections">
          <div className="pa-wrap">
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  {counts[i] ? (
                    <a href={`#${sectionAnchor(s.id)}`} className="pa-label" aria-current={active === s.id || undefined}>
                      <span className="pa-index__no">{sectionNo(s.id)}</span>
                      {s.label}
                      <span className="pa-index__count">{counts[i]}</span>
                    </a>
                  ) : (
                    <span className="is-empty pa-label" aria-disabled="true">
                      <span className="pa-index__no">{sectionNo(s.id)}</span>
                      {s.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </Bar>

      <main id="pa-main" className="pa-wrap">
        <section className="pa-intro" aria-labelledby="pa-title">
          <div className="pa-ruler" aria-hidden="true" />
          <div className="pa-intro__grid">
            <div className="pa-intro__main">
              <h1 id="pa-title" className="pa-intro__title">
                Reference <em>archive</em>
              </h1>
              <p className="pa-intro__lede">
                Interface references filed by section. Pull a sheet, copy its description or code, and hand it to an agent.
              </p>
            </div>
            <div className="pa-intro__side">
              <dl className="pa-spec">
                <div>
                  <dt className="pa-label">Holdings</dt>
                  <dd>{TOTAL} sheets</dd>
                </div>
                <div>
                  <dt className="pa-label">Drawers</dt>
                  <dd>{pad(sections.length, 2)} sections</dd>
                </div>
                <div>
                  <dt className="pa-label">Makeup</dt>
                  <dd>
                    {pad(componentCount)} components / {pad(items.length - componentCount)} images
                  </dd>
                </div>
                <div>
                  <dt className="pa-label">In motion</dt>
                  <dd>{pad(motionCount)} sheets</dd>
                </div>
              </dl>
            </div>
          </div>
          {query ? (
            <p className="pa-status" role="status">
              <span>
                <mark>{pad(total)}</mark> of {TOTAL} sheets match &ldquo;{query}&rdquo;
              </span>
              <button type="button" className="pa-textbtn" onClick={() => setQuery('')}>
                Show all
              </button>
            </p>
          ) : (
            <DensityStrip label={`Proof set / Sheets 001 to ${pad(archive.length)}`} />
          )}
        </section>

        {total === 0 ? (
          <div className="pa-empty">
            <p className="pa-empty__big" aria-hidden="true">
              Nothing <span>filed</span>
            </p>
            <div className="pa-empty__body">
              <p>
                No sheet matches &ldquo;{query}&rdquo;. The query reads titles, summaries, tags, stack and section names.
              </p>
              <div className="pa-chips" aria-label="Try one of these">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="pa-chip pa-label" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          sections.map((section, i) =>
            counts[i] ? (
              <SectionBlock
                key={section.id}
                base={base}
                section={section}
                matched={matched}
                subtype={subtypes[section.id] ?? 'all'}
                onSubtype={(st) => setSubtypes((prev) => ({ ...prev, [section.id]: st }))}
              />
            ) : null,
          )
        )}

        <footer className="pa-foot">
          <RegMark />
          <span className="pa-label">Colophon</span>
          <span className="pa-label">Set in Sofia Sans Extra Condensed and Fragment Mono</span>
          <span className="pa-strip__rule" aria-hidden="true" />
          <span className="pa-label">
            {TOTAL} sheets / {pad(sections.length, 2)} sections
          </span>
        </footer>
      </main>
    </>
  )
}

function SectionBlock({
  base,
  section,
  matched,
  subtype,
  onSubtype,
}: {
  base: string
  section: Section
  matched: Set<string>
  subtype: string
  onSubtype: (id: string) => void
}) {
  const pool = section.items.filter((i) => matched.has(i.id))
  const shown = subtype === 'all' ? pool : pool.filter((i) => i.subtype === subtype)
  const chips = section.subtypes
    .map((id) => ({ id, count: pool.filter((i) => i.subtype === id).length }))
    .filter((c) => c.count > 0 || c.id === subtype)
  const components = pool.filter((i) => i.kind === 'component').length
  const headingId = `${sectionAnchor(section.id)}-title`

  return (
    <section id={sectionAnchor(section.id)} className="pa-section" aria-labelledby={headingId}>
      <header className="pa-section__head">
        <div className="pa-section__no" aria-hidden="true">
          <span className="pa-label">Section</span>
          <b>{sectionNo(section.id)}</b>
        </div>
        <h2 id={headingId} className="pa-section__title">
          {section.label}
        </h2>
        <p className="pa-section__meta pa-label">
          <span>
            <b>{pad(pool.length)}</b> sheets
          </span>
          {components > 0 && (
            <span>
              <b>{pad(components)}</b> comp.
            </span>
          )}
          {pool.length - components > 0 && (
            <span>
              <b>{pad(pool.length - components)}</b> img.
            </span>
          )}
        </p>
      </header>

      {section.subtypes.length > 0 && (
        <div className="pa-filters">
          <span className="pa-filters__label pa-label" id={`${headingId}-filter`}>
            Filter
          </span>
          <div className="pa-chips" role="group" aria-labelledby={`${headingId}-filter`}>
            <button type="button" className="pa-chip pa-label" aria-pressed={subtype === 'all'} onClick={() => onSubtype('all')}>
              All <sup>{pool.length}</sup>
            </button>
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                className="pa-chip pa-label"
                aria-pressed={subtype === c.id}
                onClick={() => onSubtype(subtype === c.id ? 'all' : c.id)}
              >
                {subtypeLabel(c.id)} <sup>{c.count}</sup>
              </button>
            ))}
          </div>
        </div>
      )}

      {shown.length ? (
        <ul className="pa-sheets">
          {shown.map((item) => (
            <SheetCard key={item.id} item={item} base={base} />
          ))}
        </ul>
      ) : (
        <p className="pa-inline-empty">
          No {subtypeLabel(subtype).toLowerCase()} sheets match this query.{' '}
          <button type="button" className="pa-textbtn" onClick={() => onSubtype('all')}>
            Show all {section.label}
          </button>
        </p>
      )}
    </section>
  )
}

/** Marks the section currently under the sticky bar. */
function useScrollSpy(layoutKey: string) {
  const [active, setActive] = useState<string>()
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(sectionAnchor(s.id))).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id.replace(/^sec-/, ''))
      },
      { rootMargin: '-140px 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [layoutKey])
  return active
}
