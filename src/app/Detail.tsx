import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useParams } from 'react-router'
import { getItem, items } from '../data/catalog'
import { sectionLabel, subtypeLabel } from '../data/sections'
import type { Item } from '../data/types'
import { useReadme, useSourceFiles } from '../lib/hooks'
import { copyText, downloadFile, downloadZip } from '../lib/item-actions'
import { Card, Footer, Glyph, Header, MotionTag } from './parts'
import { kindLabel, prefersReducedMotion } from './util'

/**
 * useReadme returns '' both while loading and when the file is empty: track which one it is.
 * Callers are keyed by item id, so the loaded flag never needs resetting.
 */
function useReadmeState(item: Item) {
  const text = useReadme(item)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    let alive = true
    item
      .readme()
      .catch(() => '')
      .then(() => alive && setLoaded(true))
    return () => {
      alive = false
    }
  }, [item])
  return { text, loading: !loaded && !text }
}

function Stage({ item }: { item: Item }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const v = videoRef.current
    if (!v || prefersReducedMotion()) return
    v.play().catch(() => setPaused(true))
  }, [item])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <figure className="ds-stage ds-rise">
      <div className="ds-shell">
        <div className="ds-core">
          {item.media.video ? (
            <>
              <video
                ref={videoRef}
                src={item.media.video}
                poster={item.media.image}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`Preview recording of ${item.title}`}
                onPlay={() => setPaused(false)}
                onPause={() => setPaused(true)}
              />
              <button type="button" className="ds-stage__toggle" onClick={toggle}>
                {paused ? 'Play preview' : 'Pause preview'}
              </button>
            </>
          ) : item.media.image ? (
            <a href={item.media.image} target="_blank" rel="noreferrer" className="ds-stage__image-link">
              <img src={item.media.image} alt={`Full preview of ${item.title}`} />
              <span className="ds-sr">(opens full size in a new tab)</span>
            </a>
          ) : (
            <p className="ds-mono" style={{ color: 'var(--ds-text-3)', padding: 48 }}>
              No preview available.
            </p>
          )}
        </div>
      </div>
    </figure>
  )
}

function Actions({ item, readme }: { item: Item; readme: string }) {
  const [copy, setCopy] = useState<'idle' | 'done' | 'error'>('idle')
  const [zip, setZip] = useState<'idle' | 'busy' | 'error'>('idle')
  const timer = useRef<number>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const onCopy = async () => {
    try {
      await copyText(readme || `# ${item.title}\n\n${item.summary}`)
      setCopy('done')
    } catch {
      setCopy('error')
    }
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopy('idle'), 2400)
  }

  const onZip = async () => {
    setZip('busy')
    try {
      await downloadZip(item)
      setZip('idle')
    } catch {
      setZip('error')
    }
  }

  const status =
    copy === 'done'
      ? readme
        ? 'Description copied to clipboard.'
        : 'README is not written yet. Copied the title and summary.'
      : copy === 'error'
        ? 'Clipboard is unavailable in this browser.'
        : zip === 'busy'
          ? 'Packing README, files and previews.'
          : zip === 'error'
            ? 'The .zip could not be built. Try again.'
            : ''

  return (
    <div className="ds-actions">
      <button type="button" className="ds-pill ds-pill--solid" onClick={onCopy}>
        {copy === 'done' ? 'Copied' : 'Copy description'}
        <Glyph>{copy === 'done' ? '✓' : '⧉'}</Glyph>
      </button>
      <div className="ds-actions__row">
        <button type="button" className="ds-pill" onClick={onZip} disabled={zip === 'busy'} aria-busy={zip === 'busy'}>
          {zip === 'busy' ? 'Packing' : 'Download .zip'}
        </button>
        <a href={item.source.url} target="_blank" rel="noreferrer" className="ds-pill">
          Source <span aria-hidden="true">↗</span>
          <span className="ds-sr">on {item.source.name} (opens in a new tab)</span>
        </a>
      </div>
      <p className="ds-status ds-mono" role="status" data-tone={copy === 'error' || zip === 'error' ? 'error' : undefined}>
        {status}
      </p>
    </div>
  )
}

function Readme({ item }: { item: Item }) {
  const { text, loading } = useReadmeState(item)
  if (loading)
    return (
      <div className="ds-skeleton" aria-label="Loading description">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
    )
  if (!text.trim())
    return (
      <div className="ds-note">
        <h3>The write-up is still in progress.</h3>
        <p>
          This reference has no README yet. The summary above and the preview are what exists for now. Copy description
          will hand over the title and summary until the full text lands.
        </p>
      </div>
    )
  return (
    <div className="ds-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="ds-table">
              <table>{children}</table>
            </div>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}

function Code({ item }: { item: Item }) {
  const files = useSourceFiles(item)
  if (!files.length)
    return (
      <div className="ds-skeleton" aria-label="Loading source files">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
    )
  return (
    <div className="ds-files">
      {files.map(({ file, code }) => (
        <section key={file.name} className="ds-file" aria-label={file.name}>
          <div className="ds-file__head">
            <div className="ds-file__name">
              <strong>{file.name}</strong>
              <span className="ds-mono">{code.split('\n').length} lines</span>
            </div>
            <button
              type="button"
              className="ds-pill ds-pill--sm"
              onClick={() => downloadFile(file)}
              aria-label={`Download ${file.name}`}
            >
              Download <span aria-hidden="true">↓</span>
            </button>
          </div>
          <pre tabIndex={0}>
            <code>{code}</code>
          </pre>
        </section>
      ))}
    </div>
  )
}

type TabId = 'description' | 'code'

function Tabs({ item }: { item: Item }) {
  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'description', label: 'Description' },
    ...(item.files.length ? [{ id: 'code' as const, label: 'Code', count: item.files.length }] : []),
  ]
  const [tab, setTab] = useState<TabId>('description')
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const i = tabs.findIndex((t) => t.id === tab)
    const next =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? tabs.length - 1
          : (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    setTab(tabs[next].id)
    refs.current[tabs[next].id]?.focus()
  }

  return (
    <>
      <div className="ds-tabs" role="tablist" aria-label="Reference content" onKeyDown={onKey}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el
            }}
            type="button"
            role="tab"
            id={`ds-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`ds-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className="ds-tab"
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.count !== undefined && <span>{t.count}</span>}
          </button>
        ))}
      </div>
      <div
        key={tab}
        className="ds-panel"
        role="tabpanel"
        id={`ds-panel-${tab}`}
        aria-labelledby={`ds-tab-${tab}`}
        tabIndex={0}
      >
        {tab === 'code' ? <Code item={item} /> : <Readme item={item} />}
      </div>
    </>
  )
}

function Facts({ item }: { item: Item }) {
  return (
    <dl className="ds-facts">
      <div>
        <dt className="ds-mono">Section</dt>
        <dd>
          {sectionLabel(item.section)}
          {item.subtype && <span style={{ color: 'var(--ds-text-2)' }}> / {subtypeLabel(item.subtype)}</span>}
        </dd>
      </div>
      <div>
        <dt className="ds-mono">Kind</dt>
        <dd style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', alignItems: 'center' }}>
          {kindLabel(item)}
          {item.animated && <MotionTag />}
        </dd>
      </div>
      <div>
        <dt className="ds-mono">Source</dt>
        <dd>
          <a href={item.source.url} target="_blank" rel="noreferrer">
            {item.source.name}
          </a>
        </dd>
      </div>
      {item.stack.length > 0 && (
        <div>
          <dt className="ds-mono">Stack</dt>
          <dd>
            <ul className="ds-tags">
              {item.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </dd>
        </div>
      )}
      {item.tags.length > 0 && (
        <div>
          <dt className="ds-mono">Tags</dt>
          <dd>
            <ul className="ds-tags">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  )
}

function ItemView({ item }: { item: Item }) {
  const { text } = useReadmeState(item)
  const more = getSiblings(item).slice(0, 3)

  return (
    <>
      <nav className="ds-crumbs ds-mono" aria-label="Breadcrumb">
        <Link to={{ pathname: '/', hash: item.section }}>
          <Glyph>←</Glyph>
          {sectionLabel(item.section)}
        </Link>
        {item.subtype && <span>/ {subtypeLabel(item.subtype)}</span>}
      </nav>

      <Stage item={item} />

      <div className="ds-detail__grid">
        <header className="ds-detail__head ds-rise" style={{ ['--i' as string]: 1 }}>
          <h1 className="ds-detail__title">{item.title}</h1>
          <p className="ds-detail__lede">{item.summary}</p>
        </header>
        <aside className="ds-aside ds-rise" style={{ ['--i' as string]: 2 }} aria-label="Reference details and actions">
          <Actions item={item} readme={text} />
          <Facts item={item} />
        </aside>
        <div className="ds-detail__body">
          <Tabs item={item} />
        </div>
      </div>

      {more.length > 0 && (
        <section className="ds-more" aria-labelledby="ds-more-title">
          <h2 id="ds-more-title">
            More from {sectionLabel(item.section)}
            <Link to={{ pathname: '/', hash: item.section }} className="ds-pill ds-pill--sm">
              All {sectionLabel(item.section)} <span aria-hidden="true">→</span>
            </Link>
          </h2>
          <ul className="ds-grid">
            {more.map((m, i) => (
              <Card key={m.id} item={m} index={i} />
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

/** Next items in the same section, wrapping around, so the row is never the same three. */
function getSiblings(item: Item) {
  const pool = items.filter((i) => i.section === item.section)
  const at = pool.findIndex((i) => i.id === item.id)
  return [...pool.slice(at + 1), ...pool.slice(0, at)]
}

export function Detail() {
  const { section = '', slug = '' } = useParams()
  const item = getItem(`${section}/${slug}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [section, slug])

  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

  return (
    <>
      <a href="#ds-main" className="ds-skip">
        Skip to content
      </a>
      <Header activeSection={item?.section}>
        <Link to={item ? { pathname: '/', hash: item.section } : '/'} className="ds-header__back">
          <Glyph>←</Glyph>
          Library
        </Link>
      </Header>
      <main id="ds-main" className="ds-wrap ds-detail" tabIndex={-1}>
        {item ? (
          <ItemView key={item.id} item={item} />
        ) : (
          <div className="ds-notfound">
            <p className="ds-mono">{section && slug ? `${section}/${slug}` : 'Unknown address'}</p>
            <h1>This reference is not in the archive.</h1>
            <p>It may have been renamed or moved to another section.</p>
            <Link to="/" className="ds-pill ds-pill--solid">
              Back to the library <Glyph>←</Glyph>
            </Link>
          </div>
        )}
      </main>
      <Footer onTop={toTop} />
    </>
  )
}
