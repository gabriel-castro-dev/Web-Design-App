import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { items, searchItems, sections } from '../../../data/catalog'
import { subtypeLabel } from '../../../data/sections'
import type { Item, Section } from '../../../data/types'
import { useInViewVideo } from '../../../lib/hooks'
import {
  ANIMATED,
  COMPONENTS,
  Colophon,
  CropMarks,
  Header,
  RegMark,
  STILLS,
  TOTAL,
  kindLabel,
  pad,
  recordNo,
  sheetAnchor,
  sheetNo,
} from './shared'

// Most frequent tags, offered as starting points when a query finds nothing.
const TOP_TAGS = Object.entries(
  items.flatMap((i) => i.tags).reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([t]) => t)

export function Home({ base }: { base: string }) {
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query.trim())
  const [subtypes, setSubtypes] = useState<Record<string, string>>({})
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const inputRef = useRef<HTMLInputElement>(null)
  const { hash } = useLocation()

  const hits = useMemo(
    () => sections.map((section) => ({ section, hits: searchItems(deferred, section.items) })),
    [deferred],
  )
  const matchCount = hits.reduce((n, h) => n + h.hits.length, 0)
  const searching = deferred.length > 0

  // Arriving from a detail page with #sheet-x: jump to that sheet; otherwise start at the top.
  // Re-run once web fonts settle: the condensed display face changes the masthead height.
  useEffect(() => {
    let alive = true
    const jump = () => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' })
      else window.scrollTo(0, 0)
    }
    jump()
    if (hash) document.fonts.ready.then(() => alive && jump())
    return () => {
      alive = false
    }
  }, [hash])

  useEffect(() => {
    document.title = 'Reference Archive'
  }, [])

  // Starting a search swaps the masthead out; bring the results to the top of the viewport.
  useEffect(() => {
    if (searching) window.scrollTo({ top: 0 })
  }, [searching])

  // "/" focuses the query field from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (e.key !== '/' || el.closest('input, textarea, [contenteditable="true"]')) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Highlight the sheet currently under the reading line in the index strip.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(sheetAnchor(s.id))).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id.replace('sheet-', ''))
      },
      { rootMargin: '-30% 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [deferred])

  const strip = (
    <nav className="pa-strip" aria-label="Sheets">
      <ol className="pa-strip__list">
        {hits.map(({ section, hits: found }) => {
          const empty = found.length === 0
          const body = (
            <>
              <span className="pa-strip__no">{sheetNo(section.id)}</span>
              <span className="pa-strip__label">{section.label}</span>
              <span className="pa-strip__count">{pad(found.length)}</span>
            </>
          )
          return (
            <li key={section.id}>
              {empty ? (
                <span className="pa-strip__cell is-empty" aria-label={`${section.label}, no matches`}>
                  {body}
                </span>
              ) : (
                <a
                  href={`#${sheetAnchor(section.id)}`}
                  className={section.id === active ? 'pa-strip__cell is-active' : 'pa-strip__cell'}
                  aria-current={section.id === active ? 'true' : undefined}
                >
                  {body}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )

  return (
    <>
      <a className="pa-skip" href="#pa-main">
        Skip to records
      </a>
      <Header base={base} strip={strip}>
        <p className="pa-head__status" aria-live="polite">
          {searching ? (
            <>
              <strong>{pad(matchCount)}</strong> of {pad(TOTAL)} match
            </>
          ) : (
            <>
              <strong>{pad(TOTAL)}</strong> records on file
            </>
          )}
        </p>
        <div className="pa-search" role="search">
          <label htmlFor="pa-query" className="pa-search__label">
            Query
          </label>
          <input
            ref={inputRef}
            id="pa-query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="title, tag, stack"
            autoComplete="off"
            spellCheck={false}
            className="pa-search__input"
          />
          {query ? (
            <button type="button" className="pa-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
              Clear
            </button>
          ) : (
            <kbd className="pa-search__kbd" aria-hidden="true">
              /
            </kbd>
          )}
        </div>
      </Header>

      <main id="pa-main" tabIndex={-1}>
        {!searching && <Masthead />}

        {matchCount === 0 ? (
          <EmptyState query={deferred} onPick={setQuery} onClear={() => setQuery('')} />
        ) : (
          hits.map(({ section, hits: found }) =>
            found.length ? (
              <Sheet
                key={section.id}
                base={base}
                section={section}
                found={found}
                searching={searching}
                subtype={subtypes[section.id] ?? 'all'}
                onSubtype={(v) => setSubtypes((s) => ({ ...s, [section.id]: v }))}
              />
            ) : null,
          )
        )}
      </main>
      <Colophon />
    </>
  )
}

function Masthead() {
  return (
    <section className="pa-mast" aria-labelledby="pa-title">
      <div className="pa-wrap">
        <div className="pa-mast__frame">
          <CropMarks />
          <h1 id="pa-title" className="pa-mast__title">
            <span>Reference</span> <span>Archive</span>
          </h1>
          <div className="pa-mast__grid">
            <p className="pa-mast__lede">
              Interface references filed by sheet. Every record carries a description and a preview; components add
              source code.
            </p>
            <dl className="pa-mast__spec">
              <div>
                <dt>Records</dt>
                <dd>{pad(TOTAL)}</dd>
              </div>
              <div>
                <dt>Components</dt>
                <dd>{pad(COMPONENTS)}</dd>
              </div>
              <div>
                <dt>Images</dt>
                <dd>{pad(STILLS)}</dd>
              </div>
              <div>
                <dt>Animated</dt>
                <dd className="is-accent">{pad(ANIMATED)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sheet({
  base,
  section,
  found,
  searching,
  subtype,
  onSubtype,
}: {
  base: string
  section: Section
  found: Item[]
  searching: boolean
  subtype: string
  onSubtype: (v: string) => void
}) {
  const current = subtype !== 'all' && !found.some((i) => i.subtype === subtype) ? 'all' : subtype
  const shown = current === 'all' ? found : found.filter((i) => i.subtype === current)
  const titleId = `${sheetAnchor(section.id)}-title`

  return (
    <section id={sheetAnchor(section.id)} className="pa-sheet" aria-labelledby={titleId}>
      <div className="pa-wrap pa-sheet__grid">
        <div className="pa-sheet__side">
          <div className="pa-sheet__sticky">
            <p className="pa-sheet__no" aria-hidden="true">
              {sheetNo(section.id)}
            </p>
            <p className="pa-sheet__kicker">
              Sheet {sheetNo(section.id)} / {pad(sections.length, 2)}
            </p>
            <h2 id={titleId} className="pa-sheet__title">
              {section.label}
            </h2>
            <p className="pa-sheet__count">
              {searching ? `${pad(found.length)} of ${pad(section.items.length)} records` : `${pad(found.length)} records`}
            </p>

            {section.subtypes.length > 0 && (
              <div className="pa-filter" role="group" aria-label={`Filter ${section.label} by type`}>
                {['all', ...section.subtypes].map((st) => {
                  const n = st === 'all' ? found.length : found.filter((i) => i.subtype === st).length
                  if (n === 0) return null
                  return (
                    <button
                      key={st}
                      type="button"
                      className="pa-filter__chip"
                      aria-pressed={current === st}
                      onClick={() => onSubtype(st)}
                    >
                      <span>{st === 'all' ? 'All' : subtypeLabel(st)}</span>
                      <span className="pa-filter__n">{pad(n, 2)}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <ul className="pa-cards" aria-label={`${section.label} records`}>
          {shown.map((item) => (
            <Card key={item.id} item={item} base={base} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Card({ item, base }: { item: Item; base: string }) {
  return (
    <li className="pa-card">
      <Link to={`${base}/effect/${item.id}`} className="pa-card__link">
        <div className="pa-card__meta">
          <span className="pa-card__no">No. {recordNo(item.id)}</span>
          <span className="pa-card__kind" data-kind={item.kind}>
            {kindLabel(item)}
          </span>
        </div>
        <div className="pa-card__figure">
          <CropMarks />
          <div className="pa-card__media">
            {item.media.thumb ? (
              <img src={item.media.thumb} alt={`Preview of ${item.title}`} loading="lazy" decoding="async" />
            ) : (
              <span className="pa-card__nomedia">No preview on file</span>
            )}
            {item.media.video && <CardVideo src={item.media.video} />}
            <span className="pa-card__screen" aria-hidden="true" />
          </div>
        </div>
        <h3 className="pa-card__title">{item.title}</h3>
        <p className="pa-card__summary">{item.summary}</p>
        <div className="pa-card__foot">
          <span className="pa-card__motion">
            <RegMark live={item.animated} />
            {item.animated ? 'Animated' : 'Static'}
          </span>
          <span className="pa-card__open" aria-hidden="true">
            Open <span className="pa-arrows">&gt;&gt;&gt;</span>
          </span>
        </div>
      </Link>
    </li>
  )
}

function CardVideo({ src }: { src: string }) {
  const ref = useInViewVideo<HTMLVideoElement>()
  const [playing, setPlaying] = useState(false)
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={playing ? 'is-playing' : undefined}
      onPlaying={() => setPlaying(true)}
    />
  )
}

function EmptyState({ query, onPick, onClear }: { query: string; onPick: (q: string) => void; onClear: () => void }) {
  return (
    <section className="pa-empty" aria-labelledby="pa-empty-title">
      <div className="pa-wrap">
        <div className="pa-empty__frame">
          <CropMarks />
          <p className="pa-empty__code" aria-hidden="true">
            000
          </p>
          <div>
            <h2 id="pa-empty-title" className="pa-empty__title">
              No records match
            </h2>
            <p className="pa-empty__query">
              Query <q>{query}</q> found nothing in {pad(TOTAL)} records. Try a broader word, or start from a common tag.
            </p>
            <div className="pa-empty__tags">
              {TOP_TAGS.map((t) => (
                <button key={t} type="button" className="pa-tag pa-tag--button" onClick={() => onPick(t)}>
                  {t}
                </button>
              ))}
            </div>
            <button type="button" className="pa-btn pa-btn--ink" onClick={onClear}>
              Clear query
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
