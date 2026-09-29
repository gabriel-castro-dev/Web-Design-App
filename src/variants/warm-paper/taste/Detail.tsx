import { useContext, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getItem } from '../../../data/catalog'
import { sectionLabel, subtypeLabel } from '../../../data/sections'
import type { Item } from '../../../data/types'
import { useReadme, useSourceFiles } from '../../../lib/hooks'
import { copyText, downloadFile, downloadZip } from '../../../lib/item-actions'
import { MotionMark } from './Card'
import { ActiveSection, prefersReducedMotion, sectionAnchor, tintOf } from './shared'

type Status = 'idle' | 'busy' | 'done' | 'error'

/** Runs an async action and exposes a short-lived status for button feedback. */
function useAction(run: () => Promise<unknown>) {
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<number>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const trigger = async () => {
    clearTimeout(timer.current)
    setStatus('busy')
    try {
      await run()
      setStatus('done')
    } catch {
      setStatus('error')
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 2200)
  }
  return [status, trigger] as const
}

// Hex values in README tables get a small swatch, so palettes read at a glance.
const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const markdown: Components = {
  code({ children, className }) {
    const text = String(children ?? '')
    if (!className && HEX.test(text.trim()))
      return (
        <code>
          <span className="wp-swatch" style={{ background: text.trim() }} aria-hidden="true" />
          {text}
        </code>
      )
    return <code className={className}>{children}</code>
  },
  a({ href, children }) {
    const external = href?.startsWith('http')
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  table({ children }) {
    return (
      <div className="wp-table" role="region" aria-label="Table" tabIndex={0}>
        <table>{children}</table>
      </div>
    )
  },
}

function Skeleton({ lines = 6 }: { lines?: number }) {
  return (
    <div className="wp-skeleton" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} style={{ width: `${[92, 100, 84, 97, 70, 88, 60][i % 7]}%` }} />
      ))}
    </div>
  )
}

function Plate({ item }: { item: Item }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }
  let media: ReactNode = <p className="wp-plate-empty">No preview has been captured for this reference yet.</p>
  if (item.media.video)
    media = (
      <video
        ref={videoRef}
        src={item.media.video}
        poster={item.media.image}
        muted
        loop
        playsInline
        autoPlay={!paused}
        preload="metadata"
        aria-label={`Screen recording of ${item.title}`}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
    )
  else if (item.media.image) media = <img src={item.media.image} alt={`Full preview of ${item.title}`} />

  return (
    <figure className="wp-plate">
      <div className="wp-plate-frame">{media}</div>
      <figcaption>
        <span>
          {item.media.video ? 'Screen recording' : 'Reference image'}, from {item.source.name}
        </span>
        {item.media.video ? (
          <button type="button" className="wp-text-btn" onClick={toggle}>
            {paused ? 'Play' : 'Pause'} recording
          </button>
        ) : (
          item.media.image && (
            <a className="wp-text-btn" href={item.media.image} target="_blank" rel="noreferrer">
              Open full size <span aria-hidden="true">↗</span>
            </a>
          )
        )}
      </figcaption>
    </figure>
  )
}

function CodeFiles({ item }: { item: Item }) {
  const files = useSourceFiles(item)
  const [copied, setCopied] = useState<string | null>(null)
  if (!files.length) return <Skeleton lines={10} />
  return (
    <div className="wp-files">
      {files.map(({ file, code }) => (
        <section key={file.name} className="wp-file" aria-label={file.name}>
          <div className="wp-file-head">
            <span className="wp-file-name">{file.name}</span>
            <span className="wp-file-lines">{code.split('\n').length} lines</span>
            <button
              type="button"
              className="wp-btn wp-btn--ghost wp-btn--sm"
              onClick={() =>
                copyText(code).then(
                  () => setCopied(file.name),
                  () => setCopied(null),
                )
              }
              aria-label={`Copy ${file.name}`}
            >
              {copied === file.name ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              className="wp-btn wp-btn--ghost wp-btn--sm"
              onClick={() => downloadFile(file)}
              aria-label={`Download ${file.name}`}
            >
              Download
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

function DetailBody({ item, base }: { item: Item; base: string }) {
  const readme = useReadme(item)
  const [readmeLoaded, setReadmeLoaded] = useState(false)
  const [tab, setTab] = useState<'description' | 'code'>('description')
  const hasCode = item.files.length > 0
  const tabs: ('description' | 'code')[] = hasCode ? ['description', 'code'] : ['description']
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // useReadme returns '' both while loading and when empty; track completion separately.
  useEffect(() => {
    let alive = true
    item.readme().then(
      () => alive && setReadmeLoaded(true),
      () => alive && setReadmeLoaded(true),
    )
    return () => {
      alive = false
    }
  }, [item])

  const hasReadme = readme.trim().length > 0
  const [copyStatus, copy] = useAction(() => copyText(readme))
  const [zipStatus, zip] = useAction(() => downloadZip(item))

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = tabs[(tabs.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
    setTab(next)
    tabRefs.current[next]?.focus()
  }

  const backTo = { pathname: base, hash: sectionAnchor(item.section) }

  return (
    <main id="wp-main" className="wp-detail" style={tintOf(item.section)}>
      <div className="wp-wrap">
        <nav className="wp-crumbs" aria-label="Breadcrumb">
          <Link to={backTo} className="wp-back">
            <span aria-hidden="true">←</span> {sectionLabel(item.section)}
          </Link>
          {item.subtype && (
            <>
              <span aria-hidden="true" className="wp-crumbs-sep">/</span>
              <span>{subtypeLabel(item.subtype)}</span>
            </>
          )}
        </nav>

        <header className="wp-detail-head">
          <div>
            <h1>{item.title}</h1>
            <p className="wp-standfirst">{item.summary}</p>
          </div>
          <div className="wp-actions">
            <button
              type="button"
              className="wp-btn wp-btn--primary"
              data-status={copyStatus}
              onClick={copy}
              disabled={!hasReadme || copyStatus === 'busy'}
              title={hasReadme ? undefined : 'The description is still being written'}
            >
              {copyStatus === 'done' ? 'Description copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy description'}
            </button>
            <button
              type="button"
              className="wp-btn wp-btn--ghost"
              data-status={zipStatus}
              onClick={zip}
              disabled={zipStatus === 'busy'}
            >
              {zipStatus === 'busy' ? 'Preparing .zip' : zipStatus === 'error' ? 'Download failed' : 'Download .zip'}
            </button>
            <a className="wp-btn wp-btn--link" href={item.source.url} target="_blank" rel="noreferrer">
              Source <span aria-hidden="true">↗</span>
              <span className="wp-sr"> on {item.source.name} (opens in a new tab)</span>
            </a>
            <span className="wp-sr" aria-live="polite">
              {copyStatus === 'done' ? 'Description copied to clipboard' : ''}
              {zipStatus === 'done' ? 'Zip download started' : ''}
            </span>
          </div>
        </header>

        <Plate item={item} />

        <div className="wp-article">
          <aside className="wp-colophon" aria-label="Reference details">
            <p className="wp-colophon-title">Details</p>
            <dl>
              <div>
                <dt>Section</dt>
                <dd>
                  <Link to={backTo}>{sectionLabel(item.section)}</Link>
                  {item.subtype && `, ${subtypeLabel(item.subtype)}`}
                </dd>
              </div>
              <div>
                <dt>Kind</dt>
                <dd className="wp-colophon-kind">
                  {item.kind === 'component' ? 'Component with code' : 'Static image'}
                  {item.animated && <MotionMark />}
                </dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>
                  <a href={item.source.url} target="_blank" rel="noreferrer">
                    {item.source.name} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
              {item.stack.length > 0 && (
                <div>
                  <dt>Stack</dt>
                  <dd className="wp-pills">
                    {item.stack.map((s) => (
                      <span key={s} className="wp-pill wp-pill--tint">{s}</span>
                    ))}
                  </dd>
                </div>
              )}
              {item.tags.length > 0 && (
                <div>
                  <dt>Tags</dt>
                  <dd className="wp-pills">
                    {item.tags.map((t) => (
                      <span key={t} className="wp-pill">{t}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          <div className="wp-article-main">
            <div className="wp-tabs" role="tablist" aria-label="Reference content" onKeyDown={onTabKey}>
              {tabs.map((t) => (
                <button
                  key={t}
                  ref={(el) => {
                    tabRefs.current[t] = el
                  }}
                  id={`wp-tab-${t}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  aria-controls={`wp-panel-${t}`}
                  tabIndex={tab === t ? 0 : -1}
                  className="wp-tab"
                  onClick={() => setTab(t)}
                >
                  {t === 'description' ? 'Description' : 'Code'}
                  {t === 'code' && <span className="wp-tab-count">{item.files.length}</span>}
                </button>
              ))}
            </div>

            <div
              id={`wp-panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`wp-tab-${tab}`}
              className="wp-panel"
              key={tab}
            >
              {tab === 'code' ? (
                <CodeFiles item={item} />
              ) : !readmeLoaded && !hasReadme ? (
                <Skeleton />
              ) : hasReadme ? (
                <div className="wp-prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdown}>
                    {readme}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="wp-note">
                  <p className="wp-note-title">The written brief is not here yet.</p>
                  <p>
                    This reference is filed with its preview and details, but its description is still being written.
                    Check back soon, or open the source for now.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export function Detail({ base }: { base: string }) {
  const { section = '', slug = '' } = useParams()
  const item = getItem(`${section}/${slug}`)
  const { setActive } = useContext(ActiveSection)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActive(item?.section ?? null)
    return () => setActive(null)
  }, [item, setActive])

  if (!item) return <Missing base={base} id={`${section}/${slug}`} />
  return <DetailBody key={item.id} item={item} base={base} />
}

export function Missing({ base, id }: { base: string; id?: string }) {
  return (
    <main id="wp-main" className="wp-missing">
      <div className="wp-wrap">
        <h1>This page is not in the library.</h1>
        <p>
          {id ? (
            <>
              Nothing is filed under <code>{id}</code>. It may have been renamed or moved to another section.
            </>
          ) : (
            'The address does not match any page.'
          )}
        </p>
        <Link to={base} className="wp-btn wp-btn--primary">
          Browse all references
        </Link>
      </div>
    </main>
  )
}
