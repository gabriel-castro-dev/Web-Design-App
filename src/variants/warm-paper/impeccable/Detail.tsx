import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useParams } from 'react-router'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getItem } from '../../../data/catalog'
import { sectionLabel, subtypeLabel } from '../../../data/sections'
import type { Item } from '../../../data/types'
import { useSourceFiles } from '../../../lib/hooks'
import { copyText, downloadFile, downloadZip } from '../../../lib/item-actions'
import { Kind, Motion } from './Tile'
import { Icon, numberOf, plural, prefersReducedMotion, slugify, textOf, toneOf } from './shared'

type Status = 'loading' | 'ready' | 'error'

/** Like useReadme, but tells "still loading" apart from "empty" and "failed". */
function useReadmeState(item: Item | undefined) {
  const [state, setState] = useState<{ id?: string; text: string; status: Status }>({ text: '', status: 'loading' })
  useEffect(() => {
    if (!item) return
    let alive = true
    item.readme().then(
      (text) => alive && setState({ id: item.id, text: text.trim() ? text : '', status: 'ready' }),
      () => alive && setState({ id: item.id, text: '', status: 'error' }),
    )
    return () => {
      alive = false
    }
  }, [item])
  return state.id === item?.id ? state : { text: '', status: 'loading' as Status }
}

const mdComponents: Components = {
  // The page already carries the title; the README's own h1 would repeat it.
  h1: () => null,
  h2: ({ children }) => <h2 id={`wp-md-${slugify(textOf(children))}`}>{children}</h2>,
  // Hex values in the notes get a swatch, so palettes can be read at a glance.
  code: ({ children, className }) => {
    const text = textOf(children)
    if (!className && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text))
      return (
        <code>
          <span className="wp-swatch" style={{ background: text }} aria-hidden="true" />
          {text}
        </code>
      )
    return <code className={className}>{children}</code>
  },
  table: ({ children }) => (
    <div className="wp-table">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children }) => {
    const external = !!href && /^https?:/.test(href)
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    )
  },
}

function headingsOf(md: string) {
  let fenced = false
  const out: { id: string; text: string }[] = []
  for (const line of md.split('\n')) {
    if (line.trimStart().startsWith('```')) fenced = !fenced
    const m = !fenced && /^##\s+(.+?)\s*#*$/.exec(line)
    if (m) {
      const text = m[1].replace(/[`*_]/g, '')
      out.push({ id: `wp-md-${slugify(text)}`, text })
    }
  }
  return out
}

function CopyButton({ item, readme }: { item: Item; readme: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    const text = readme || `# ${item.title}\n\n${item.summary}\n\nSource: ${item.source.url}\n`
    try {
      await copyText(text)
      setState('done')
    } catch {
      setState('error')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }

  return (
    <button type="button" className="wp-btn wp-btn-primary" data-state={state} onClick={onCopy}>
      {state === 'done' ? <Icon.check /> : <Icon.copy />}
      <span aria-live="polite">
        {state === 'done' ? 'Description copied' : state === 'error' ? 'Copy blocked, try again' : 'Copy description'}
      </span>
    </button>
  )
}

function ZipButton({ item }: { item: Item }) {
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  const onZip = async () => {
    setBusy(true)
    setFailed(false)
    try {
      await downloadZip(item)
    } catch {
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }
  return (
    <button type="button" className="wp-btn" onClick={onZip} disabled={busy} aria-busy={busy}>
      <Icon.download />
      <span aria-live="polite">{busy ? 'Packing .zip' : failed ? 'Zip failed, retry' : 'Download .zip'}</span>
    </button>
  )
}

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

function Body({ item, readme }: { item: Item; readme: { text: string; status: Status } }) {
  const headings = useMemo(() => headingsOf(readme.text), [readme.text])
  const hasCode = item.files.length > 0
  const [tab, setTab] = useState<'desc' | 'code'>('desc')
  const current = hasCode ? tab : 'desc'
  const files = useSourceFiles(hasCode ? item : undefined)
  const tabs = hasCode ? (['desc', 'code'] as const) : (['desc'] as const)
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKey = (e: KeyboardEvent) => {
    if (!hasCode || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const next = current === 'desc' ? 'code' : 'desc'
    const target = e.key === 'Home' ? 'desc' : e.key === 'End' ? 'code' : next
    setTab(target)
    refs.current[target]?.focus()
  }

  const fileId = (name: string) => `wp-file-${slugify(name)}`
  const outline =
    current === 'desc'
      ? headings.length > 1 && { title: 'In these notes', rows: headings.map((h) => ({ id: h.id, text: h.text })) }
      : files.length > 1 && { title: 'In this folder', rows: files.map(({ file }) => ({ id: fileId(file.name), text: file.name })) }

  return (
    <div className="wp-d-body">
      <div className="wp-d-main">
        <div className="wp-tabs" role="tablist" aria-label="Reference material" onKeyDown={onKey}>
          {tabs.map((t) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[t] = el
              }}
              type="button"
              role="tab"
              id={`wp-tab-${t}`}
              aria-controls={`wp-panel-${t}`}
              aria-selected={current === t}
              tabIndex={current === t ? 0 : -1}
              onClick={() => setTab(t)}
            >
              {t === 'desc' ? 'Description' : 'Code'}
              {t === 'code' && <span>{item.files.length}</span>}
            </button>
          ))}
        </div>

        <div
          className="wp-panel"
          role="tabpanel"
          id={`wp-panel-${current}`}
          aria-labelledby={`wp-tab-${current}`}
          tabIndex={0}
        >
          {current === 'desc' ? (
            readme.status === 'loading' ? (
              <div className="wp-skel" aria-label="Loading description">
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
            ) : readme.text ? (
              <div className="wp-prose">
                <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {readme.text}
                </Markdown>
              </div>
            ) : (
              <div className="wp-note-card">
                <h3>{readme.status === 'error' ? 'The notes did not load' : 'Notes still being written'}</h3>
                <p>
                  {readme.status === 'error'
                    ? 'Reload the page to try again. The summary and preview above are still accurate.'
                    : 'The long description for this reference has not been drafted yet. Copy description will hand over the title, summary and source for now.'}
                </p>
              </div>
            )
          ) : files.length < item.files.length ? (
            <div className="wp-skel" aria-label="Loading source files">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          ) : (
            <div className="wp-files">
              {files.map(({ file, code }) => (
                <figure key={file.name} className="wp-file" id={fileId(file.name)}>
                  <figcaption className="wp-file-head">
                    <span className="wp-file-name">
                      <strong>{file.name}</strong>
                      <span>{plural(code.split('\n').length, 'line')}</span>
                    </span>
                    <button
                      type="button"
                      className="wp-btn wp-btn-ghost"
                      onClick={() => downloadFile(file)}
                      aria-label={`Download ${file.name}`}
                    >
                      <Icon.download />
                      Download
                    </button>
                  </figcaption>
                  <pre tabIndex={0} aria-label={`Source of ${file.name}`}>
                    <code>{code}</code>
                  </pre>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
      <aside className="wp-aside" aria-label="About this reference">
        {outline && (
          <nav className="wp-onpage" aria-labelledby="wp-onpage-title">
            <h2 id="wp-onpage-title">{outline.title}</h2>
            <ol>
              {outline.rows.map((row, i) => (
                <li key={row.id}>
                  <a
                    href={`#${row.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      jump(row.id)
                    }}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {row.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </aside>
    </div>
  )
}

function Missing({ base, id }: { base: string; id: string }) {
  return (
    <div className="wp-page wp-missing">
      <h1>Not in the library</h1>
      <p>
        Nothing is filed under <code>{id}</code>. It may have been renamed or moved to another section.
      </p>
      <Link to={base} className="wp-btn wp-btn-primary">
        <Icon.back />
        Back to all references
      </Link>
    </div>
  )
}

export function Detail({ base, onActive }: { base: string; onActive: (id?: string) => void }) {
  const { section = '', slug = '' } = useParams()
  const id = `${section}/${slug}`
  const item = getItem(id)
  const readme = useReadmeState(item)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  useEffect(() => {
    onActive(item?.section)
    return () => onActive(undefined)
  }, [item, onActive])

  useEffect(() => {
    document.title = item ? `${item.title} · Web Design App` : 'Not found · Web Design App'
  }, [item])

  if (!item) return <Missing base={base} id={id} />

  const label = sectionLabel(item.section)
  const tone = toneOf(item.section)

  return (
    <article className="wp-detail" data-tone={tone} aria-labelledby="wp-d-title">
      <div className="wp-page">
        <Link to={`${base}#${item.section}`} className="wp-back">
          <Icon.back />
          Back to {label}
        </Link>

        <header className="wp-d-head">
          <div>
            <p className="wp-d-kicker">
              <span className="wp-tag-tone">No. {numberOf(item.section)}</span>
              <span>{label}</span>
              {item.subtype && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{subtypeLabel(item.subtype)}</span>
                </>
              )}
            </p>
            <h1 id="wp-d-title">{item.title}</h1>
            {item.summary && <p className="wp-standfirst">{item.summary}</p>}
            <div className="wp-actions">
              <CopyButton item={item} readme={readme.text} />
              <ZipButton item={item} />
              <a className="wp-btn" href={item.source.url} target="_blank" rel="noreferrer">
                Source
                <Icon.out />
                <span className="wp-sr">(opens {item.source.name} in a new tab)</span>
              </a>
            </div>
          </div>

          <dl className="wp-colophon">
            <div>
              <dt>Kind</dt>
              <dd className="wp-meta" style={{ margin: 0, color: 'var(--ink)' }}>
                <Kind item={item} />
                {item.animated && <Motion />}
              </dd>
            </div>
            <div>
              <dt>Filed under</dt>
              <dd>
                {label}
                {item.subtype && `, ${subtypeLabel(item.subtype)}`}
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                <a className="wp-link" href={item.source.url} target="_blank" rel="noreferrer">
                  {item.source.name}
                </a>
              </dd>
            </div>
            {item.stack.length > 0 && (
              <div>
                <dt>Stack</dt>
                <dd>{item.stack.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}</dd>
              </div>
            )}
            {item.tags.length > 0 && (
              <div>
                <dt>Tags</dt>
                <dd>
                  <ul className="wp-taglist">
                    {item.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </header>

        <figure className="wp-d-media">
          <div className="wp-mount">
            {item.media.video ? (
              <video
                src={item.media.video}
                poster={item.media.image ?? item.media.thumb}
                autoPlay={!prefersReducedMotion()}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={`Screen recording of ${item.title}`}
              />
            ) : item.media.image || item.media.thumb ? (
              <img src={item.media.image ?? item.media.thumb} alt={`${item.title}: ${item.summary}`} />
            ) : null}
          </div>
          <figcaption>
            <span>{item.media.video ? 'Recorded from the live component' : 'Static shot'}</span>
            <span>via {item.source.name}</span>
          </figcaption>
        </figure>

        <Body key={item.id} item={item} readme={readme} />
      </div>
    </article>
  )
}
