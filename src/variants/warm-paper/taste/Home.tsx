import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { items, searchItems, sections } from '../../../data/catalog'
import { subtypeLabel } from '../../../data/sections'
import type { Item, Section } from '../../../data/types'
import { Card } from './Card'
import { ActiveSection, jumpToSection, sectionAnchor, shapesFor, tintOf } from './shared'

// The most used tags double as search suggestions in the empty state.
const SUGGESTIONS = Object.entries(
  items.flatMap((i) => i.tags).reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([tag]) => tag)

function SectionBlock({ section, pool, base }: { section: Section; pool: Item[]; base: string }) {
  const [picked, setPicked] = useState('all')
  const counts = useMemo(
    () => Object.fromEntries(section.subtypes.map((st) => [st, pool.filter((i) => i.subtype === st).length])),
    [section.subtypes, pool],
  )
  const subtype = picked !== 'all' && counts[picked] ? picked : 'all'
  const shown = subtype === 'all' ? pool : pool.filter((i) => i.subtype === subtype)
  const shapes = shapesFor(shown.length)
  const headingId = `${sectionAnchor(section.id)}-title`

  return (
    <section
      id={sectionAnchor(section.id)}
      data-wp-section={section.id}
      className="wp-section"
      style={tintOf(section.id)}
      aria-labelledby={headingId}
    >
      <div className="wp-section-head">
        <h2 id={headingId} tabIndex={-1}>
          {section.label}
        </h2>
        <p className="wp-section-count">
          {pool.length === section.items.length
            ? `${pool.length} ${pool.length === 1 ? 'reference' : 'references'}`
            : `${pool.length} of ${section.items.length}`}
        </p>
      </div>

      {section.subtypes.length > 0 && (
        <div className="wp-chips" role="group" aria-label={`Filter ${section.label} by type`}>
          <button type="button" className="wp-chip" aria-pressed={subtype === 'all'} onClick={() => setPicked('all')}>
            All <span className="wp-chip-count">{pool.length}</span>
          </button>
          {section.subtypes.filter((st) => counts[st] > 0).map((st) => (
            <button
              key={st}
              type="button"
              className="wp-chip"
              aria-pressed={subtype === st}
              onClick={() => setPicked(st)}
            >
              {subtypeLabel(st)} <span className="wp-chip-count">{counts[st]}</span>
            </button>
          ))}
        </div>
      )}

      <div className="wp-grid">
        {shown.map((item, i) => (
          <Card key={item.id} item={item} base={base} shape={shapes[i]} />
        ))}
      </div>
    </section>
  )
}

export function Home({ base }: { base: string }) {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const location = useLocation()
  const navigate = useNavigate()
  const { setActive } = useContext(ActiveSection)
  const resultsRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => searchItems(query), [query])
  const blocks = useMemo(() => {
    const hits = new Set(results.map((i) => i.id))
    return sections
      .map((section) => ({ section, pool: section.items.filter((i) => hits.has(i.id)) }))
      .filter((b) => b.pool.length > 0)
  }, [results])

  const setQuery = (value: string) =>
    navigate({ pathname: base, search: value ? `?q=${encodeURIComponent(value)}` : '' }, { replace: true })

  // Arriving from a detail page: land on the requested section, otherwise at the top.
  useLayoutEffect(() => {
    const id = location.hash.slice(1)
    if (id.startsWith('sec-')) jumpToSection(id.slice(4), false)
    else window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // While typing deep in the page, bring the result summary back into view.
  useEffect(() => {
    const el = resultsRef.current
    if (query && el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' })
  }, [query])

  // Scroll-spy for the header rail.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.getAttribute('data-wp-section') || null)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    document.querySelectorAll('[data-wp-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [blocks, setActive])

  useEffect(() => () => setActive(null), [setActive])

  return (
    <main id="wp-main" className="wp-home">
      <div className="wp-wrap">
        {query ? (
          // Searching: the hero steps aside so matches start above the fold.
          <div ref={resultsRef} className="wp-results" data-wp-section="">
            <h1 aria-live="polite">
              {results.length > 0 ? (
                <>
                  {results.length} {results.length === 1 ? 'reference' : 'references'} for <q>{query}</q>
                </>
              ) : (
                <>
                  Nothing filed under <q>{query}</q>.
                </>
              )}
            </h1>
            {results.length > 0 ? (
              <p className="wp-results-sub">
                Found in {blocks.length} {blocks.length === 1 ? 'section' : 'sections'}.
                <button type="button" className="wp-text-btn" onClick={() => setQuery('')}>
                  Clear search
                </button>
              </p>
            ) : (
              <>
                <p className="wp-results-sub">Try a broader word, or start from one of the most used tags.</p>
                <div className="wp-empty-actions">
                  {SUGGESTIONS.map((tag) => (
                    <button key={tag} type="button" className="wp-chip" onClick={() => setQuery(tag)}>
                      {tag}
                    </button>
                  ))}
                  <button type="button" className="wp-text-btn" onClick={() => setQuery('')}>
                    Show everything
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="wp-hero" data-wp-section="">
            <div className="wp-hero-copy">
              <h1 className="wp-rise" style={{ '--d': 0 } as CSSProperties}>
                Interfaces worth <em>keeping.</em>
              </h1>
              <p className="wp-hero-sub wp-rise" style={{ '--d': 1 } as CSSProperties}>
                {items.length} references across {sections.length} sections. Each comes with a written brief, and
                components include the code to rebuild them.
              </p>
            </div>

            <nav className="wp-contents wp-rise" style={{ '--d': 2 } as CSSProperties} aria-label="Contents">
              <p className="wp-contents-title" aria-hidden="true">
                Contents
              </p>
              <ol>
                {sections.map((s) => (
                  <li key={s.id} style={tintOf(s.id)}>
                    <Link
                      to={{ pathname: base, hash: sectionAnchor(s.id) }}
                      onClick={(e) => {
                        e.preventDefault()
                        jumpToSection(s.id)
                      }}
                    >
                      <span className="wp-contents-label">{s.label}</span>
                      <span className="wp-contents-leader" aria-hidden="true" />
                      <span className="wp-contents-count">
                        {s.items.length}
                        <span className="wp-sr"> references</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}

        {blocks.map(({ section, pool }) => (
          <SectionBlock key={section.id} section={section} pool={pool} base={base} />
        ))}
      </div>
    </main>
  )
}
