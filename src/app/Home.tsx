import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router'
import { getItem, items, searchItems, sections } from '../data/catalog'
import { subtypeLabel } from '../data/sections'
import type { Item, Section } from '../data/types'
import { Card, Footer, Header, InViewVideo } from './parts'
import { prefersReducedMotion } from './util'

const FEATURED = ['team/photo-stack', 'scroll-effects/stacking-cards', 'pricing/growth-plans']

function heroPicks(): Item[] {
  const picks = FEATURED.map((id) => getItem(id)).filter((i): i is Item => !!i?.media.video)
  for (const item of items) {
    if (picks.length >= 3) break
    if (item.media.video && !picks.includes(item)) picks.push(item)
  }
  return picks
}

function scrollToId(id: string, smooth = true) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' })
}

function Hero() {
  const picks = useMemo(() => heroPicks(), [])
  const animated = items.filter((i) => i.animated).length
  return (
    <section id="ds-intro" className="ds-hero" aria-labelledby="ds-hero-title">
      <div>
        <h1 id="ds-hero-title" className="ds-hero__title ds-rise">
          Interfaces worth <em>keeping.</em>
        </h1>
        <p className="ds-hero__lede ds-rise" style={{ '--i': 1 } as CSSProperties}>
          Components and screens collected for study. Open any piece to copy its description or code into an agent
          brief.
        </p>
        <dl className="ds-stats ds-rise" style={{ '--i': 2 } as CSSProperties}>
          <div>
            <dt className="ds-mono">References</dt>
            <dd>{items.length}</dd>
          </div>
          <div>
            <dt className="ds-mono">In motion</dt>
            <dd>{animated}</dd>
          </div>
          <div>
            <dt className="ds-mono">Sections</dt>
            <dd>{sections.length}</dd>
          </div>
        </dl>
      </div>
      {picks.length > 0 && (
        <div className="ds-rise" style={{ '--i': 2 } as CSSProperties}>
          <div className="ds-mosaic">
            {picks.map((item) => (
              <Link key={item.id} to={`/effect/${item.id}`} className="ds-mosaic__tile" aria-label={item.title}>
                {item.media.thumb && <img src={item.media.thumb} alt={`Preview of ${item.title}`} />}
                {item.media.video && <InViewVideo src={item.media.video} />}
              </Link>
            ))}
          </div>
          <p className="ds-mosaic__caption ds-mono">
            {picks.map((item) => (
              <Link key={item.id} to={`/effect/${item.id}`}>
                {item.title}
              </Link>
            ))}
          </p>
        </div>
      )}
    </section>
  )
}

function SectionBlock({ section, pool }: { section: Section; pool: Item[] }) {
  const [picked, setSubtype] = useState<string | null>(null)
  const count = (id: string) => pool.filter((i) => i.subtype === id).length
  // a search can empty the chosen subtype: fall back to All instead of an empty grid
  const subtype = picked && count(picked) > 0 ? picked : null
  const shown = subtype ? pool.filter((i) => i.subtype === subtype) : pool
  const subtypes = section.subtypes.filter((id) => count(id) > 0)
  const single = shown.length === 1
  const wide = shown.length > 1 && shown.length <= 4

  return (
    <section id={section.id} className="ds-section" aria-labelledby={`ds-h-${section.id}`}>
      <div className="ds-section__head">
        <h2 id={`ds-h-${section.id}`} className="ds-section__title">
          {section.label}
          <sup aria-label={`${pool.length} references`}>{pool.length}</sup>
        </h2>
        {subtypes.length > 1 && (
          <div className="ds-chips" role="group" aria-label={`Filter ${section.label} by type`}>
            <button type="button" className="ds-chip" aria-pressed={subtype === null} onClick={() => setSubtype(null)}>
              All <span>{pool.length}</span>
            </button>
            {subtypes.map((id) => (
              <button
                key={id}
                type="button"
                className="ds-chip"
                aria-pressed={subtype === id}
                onClick={() => setSubtype(subtype === id ? null : id)}
              >
                {subtypeLabel(id)} <span>{count(id)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <ul className={`ds-grid${wide ? ' ds-grid--wide' : ''}`} style={single ? { gridTemplateColumns: '1fr' } : undefined}>
        {shown.map((item, i) => (
          <Card key={item.id} item={item} index={i} feature={single} />
        ))}
      </ul>
    </section>
  )
}

export function Home() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)
  const { hash } = useLocation()

  const results = useMemo(() => searchItems(query), [query])
  const visible = useMemo(() => {
    const ids = new Set(results.map((i) => i.id))
    return sections
      .map((s) => ({ section: s, pool: s.items.filter((i) => ids.has(i.id)) }))
      .filter((s) => s.pool.length > 0)
  }, [results])
  const searching = query.trim().length > 0

  // Arriving from a detail page with #section: jump there once the grid exists
  useEffect(() => {
    if (hash) requestAnimationFrame(() => scrollToId(decodeURIComponent(hash.slice(1)), false))
  }, [hash])

  // "/" focuses search, Escape clears it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.key === '/' && !/INPUT|TEXTAREA/.test(target.tagName)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll spy for the header anchors
  useEffect(() => {
    const ids = ['ds-intro', ...visible.map((v) => v.section.id)]
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id === 'ds-intro' ? undefined : entry.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [visible])

  const jump = useCallback((id: string) => {
    if (!document.getElementById(id)) setQuery('')
    requestAnimationFrame(() => scrollToId(id))
    history.replaceState(history.state, '', `#${id}`)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

  const onQuery = (value: string) => {
    setQuery(value)
    if (value && window.scrollY > 200) window.scrollTo({ top: 0 })
  }

  return (
    <>
      <a href="#ds-main" className="ds-skip">
        Skip to references
      </a>
      <Header activeSection={searching ? undefined : active} onAnchor={jump}>
        <form role="search" className="ds-search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="ds-q" className="ds-sr">
            Search references
          </label>
          <input
            ref={inputRef}
            id="ds-q"
            type="search"
            placeholder="Search references"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setQuery('')
            }}
          />
          {query ? (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              Esc
            </button>
          ) : (
            <kbd aria-hidden="true">/</kbd>
          )}
        </form>
      </Header>

      <main id="ds-main" className="ds-wrap" tabIndex={-1}>
        {searching ? (
          <div id="ds-intro" className="ds-results">
            <h1>
              {results.length} {results.length === 1 ? 'reference' : 'references'} for <em>“{query.trim()}”</em>
            </h1>
            <p className="ds-mono" aria-live="polite">
              {results.length > 0
                ? `Across ${visible.length} ${visible.length === 1 ? 'section' : 'sections'}`
                : 'No matches'}
            </p>
          </div>
        ) : (
          <Hero />
        )}

        {visible.map(({ section, pool }) => (
          <SectionBlock key={section.id} section={section} pool={pool} />
        ))}

        {searching && results.length === 0 && (
          <div className="ds-empty">
            <h2>Nothing in the archive matches that.</h2>
            <p>
              Search looks at titles, summaries, tags, stack, section and type. Try a broader word such as “pricing”,
              “dark” or “scroll”.
            </p>
            <button type="button" className="ds-pill" onClick={() => setQuery('')}>
              Clear search
            </button>
          </div>
        )}
      </main>
      <Footer onTop={toTop} />
    </>
  )
}
