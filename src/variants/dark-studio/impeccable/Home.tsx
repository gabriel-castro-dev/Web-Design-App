import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { items, searchItems, sections } from '../../../data/catalog'
import { subtypeLabel } from '../../../data/sections'
import { catalogCode, featuredItem, prefersReducedMotion, sectionAnchor } from './lib'
import { Card, Frame, Icon, Masthead, Tally, kindLabel } from './parts'

const pad = (n: number) => String(n).padStart(2, '0')
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

function scrollToId(id: string, smooth = true) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' })
}

export function Home({ base }: { base: string }) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const searchRef = useRef<HTMLInputElement>(null)
  const searchId = useId()
  const location = useLocation()
  const featured = useMemo(featuredItem, [])

  const q = query.trim()
  const blocks = useMemo(() => {
    const hits = new Set(searchItems(q, items).map((i) => i.id))
    return sections.map((section) => {
      const searched = section.items.filter((i) => hits.has(i.id))
      const sub = filters[section.id] ?? ''
      const shown = sub ? searched.filter((i) => i.subtype === sub) : searched
      return { section, searched, shown, sub }
    })
  }, [q, filters])
  const total = blocks.reduce((n, b) => n + b.searched.length, 0)
  const liveIds = blocks.filter((b) => b.searched.length).map((b) => b.section.id)

  // Arriving from a detail page's back link: land on the section.
  useEffect(() => {
    const id = location.hash.slice(1)
    if (id) requestAnimationFrame(() => scrollToId(id, false))
  }, [location.hash])

  // "/" focuses search, like most archives and code hosts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key !== '/' || e.metaKey || e.ctrlKey || t.closest('input, textarea, [contenteditable]')) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  // Scroll-spy: the nav marks the reel currently on screen.
  const liveKey = liveIds.join('|')
  useEffect(() => {
    const els = liveKey
      .split('|')
      .map((id) => document.getElementById(sectionAnchor(id)))
      .filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id.replace(/^ds-/, ''))
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [liveKey])

  const setFilter = (section: string, sub: string) => setFilters((f) => ({ ...f, [section]: sub }))

  return (
    <>
      <a className="ds-skip" href="#ds-archive">
        Skip to references
      </a>
      <Masthead base={base}>
        <nav className="ds-index" aria-label="Sections">
          <ul>
            {blocks.map(({ section, searched }) => {
              const empty = searched.length === 0
              return (
                <li key={section.id}>
                  <a
                    href={empty ? undefined : `#${sectionAnchor(section.id)}`}
                    aria-disabled={empty || undefined}
                    aria-current={active === section.id && !empty ? 'location' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      if (empty) return
                      scrollToId(sectionAnchor(section.id))
                      history.replaceState(history.state, '', `#${sectionAnchor(section.id)}`)
                    }}
                  >
                    {section.label}
                    <span className="ds-index__count">{searched.length}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="ds-search" role="search">
          <label htmlFor={searchId} className="ds-sr">
            Search references
          </label>
          <Icon.search className="ds-search__icon" />
          <input
            ref={searchRef}
            id={searchId}
            type="search"
            placeholder="Search title, tag, stack"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setQuery('')
            }}
          />
          {query ? (
            <button type="button" className="ds-search__clear" onClick={() => (setQuery(''), searchRef.current?.focus())} aria-label="Clear search">
              <Icon.close />
            </button>
          ) : (
            <kbd className="ds-search__kbd" aria-hidden="true">
              /
            </kbd>
          )}
        </div>
      </Masthead>

      <main id="ds-archive" tabIndex={-1}>
        {!q && featured && (
          <section className="ds-opening" aria-labelledby="ds-title">
            <div className="ds-opening__text">
              <h1 id="ds-title" className="ds-display">
                Reference <em>archive</em>
              </h1>
              <p className="ds-opening__lede">
                {items.length} interfaces, components and motion studies across {sections.length} sections. Open one to copy its
                description or take the code, then hand it to an agent.
              </p>
            </div>
            <Link to={`${base}/effect/${featured.id}`} className="ds-screening">
              <Frame item={featured} eager alwaysPlay />
              <span className="ds-screening__caption">
                <span className="ds-screening__label">
                  <Tally label="Now screening" />
                </span>
                <span className="ds-screening__title">{featured.title}</span>
                <span className="ds-code">
                  {catalogCode(featured)} · {kindLabel(featured)}
                </span>
              </span>
            </Link>
          </section>
        )}

        <p className="ds-status" role="status" aria-live="polite">
          {q ? (total ? `${plural(total, 'reference')} match “${q}”` : '') : ''}
        </p>

        {q && total > 0 && (
          <div className="ds-results-head">
            <h1 className="ds-results-head__title">
              {total} {total === 1 ? 'match' : 'matches'} for <em>“{q}”</em>
            </h1>
            <button type="button" className="ds-textbtn" onClick={() => setQuery('')}>
              Clear search
            </button>
          </div>
        )}

        {q && total === 0 && (
          <div className="ds-empty">
            <p className="ds-empty__title">
              Nothing in the archive matches <em>“{q}”</em>.
            </p>
            <p className="ds-empty__hint">
              Search looks at titles, summaries, tags and stack. Try a broader word like <button type="button" className="ds-inline" onClick={() => setQuery('dark')}>dark</button>,{' '}
              <button type="button" className="ds-inline" onClick={() => setQuery('dashboard')}>
                dashboard
              </button>{' '}
              or{' '}
              <button type="button" className="ds-inline" onClick={() => setQuery('scroll')}>
                scroll
              </button>
              .
            </p>
            <button type="button" className="ds-btn ds-btn--ghost" onClick={() => (setQuery(''), searchRef.current?.focus())}>
              Clear search
            </button>
          </div>
        )}

        {blocks.map(({ section, searched, shown, sub }, n) => {
          if (!searched.length) return null
          const headId = `${sectionAnchor(section.id)}-title`
          const subCounts = new Map<string, number>()
          searched.forEach((i) => i.subtype && subCounts.set(i.subtype, (subCounts.get(i.subtype) ?? 0) + 1))
          return (
            <section key={section.id} id={sectionAnchor(section.id)} className="ds-reel" aria-labelledby={headId}>
              <header className="ds-reel__head">
                <span className="ds-reel__num" aria-hidden="true">
                  {pad(n + 1)}
                </span>
                <h2 id={headId} className="ds-reel__title">
                  {section.label}
                </h2>
                <p className="ds-reel__count">
                  {q ? `${searched.length} of ${plural(section.items.length, 'reference')}` : plural(section.items.length, 'reference')}
                </p>
                {section.subtypes.length > 0 && (
                  <div className="ds-chips" role="group" aria-label={`Filter ${section.label} by type`}>
                    <button type="button" className="ds-chip" aria-pressed={!sub} onClick={() => setFilter(section.id, '')}>
                      All <span className="ds-chip__n">{searched.length}</span>
                    </button>
                    {section.subtypes.map((s) => {
                      const count = subCounts.get(s) ?? 0
                      // While searching, only offer types that still have matches.
                      if (q && !count && sub !== s) return null
                      return (
                        <button
                          key={s}
                          type="button"
                          className="ds-chip"
                          aria-pressed={sub === s}
                          disabled={!count && sub !== s}
                          onClick={() => setFilter(section.id, sub === s ? '' : s)}
                        >
                          {subtypeLabel(s)} <span className="ds-chip__n">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </header>

              {shown.length ? (
                <div className="ds-grid" key={sub}>
                  {shown.map((item, i) => (
                    <Card
                      key={item.id}
                      item={item}
                      href={`${base}/effect/${item.id}`}
                      index={i}
                      span={shown.length >= 3 && i === 0 ? 'lead' : shown.length <= 2 ? 'wide' : undefined}
                    />
                  ))}
                </div>
              ) : (
                <p className="ds-reel__none">
                  No {subtypeLabel(sub)} references match this search.{' '}
                  <button type="button" className="ds-inline" onClick={() => setFilter(section.id, '')}>
                    Show all {section.label}
                  </button>
                </p>
              )}
            </section>
          )
        })}
      </main>

      <footer className="ds-foot">
        <span className="ds-code">
          {items.length} references · {sections.length} sections
        </span>
        <a
          href="#top"
          className="ds-textbtn"
          onClick={(e) => {
            e.preventDefault()
            scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
          }}
        >
          Back to top
        </a>
      </footer>
    </>
  )
}
