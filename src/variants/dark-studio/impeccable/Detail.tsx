import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useParams } from 'react-router'
import { getItem } from '../../../data/catalog'
import { sectionLabel, subtypeLabel } from '../../../data/sections'
import type { Item } from '../../../data/types'
import { useInViewVideo, useSourceFiles } from '../../../lib/hooks'
import { copyText, downloadFile, downloadZip } from '../../../lib/item-actions'
import { catalogCode, sectionAnchor, stripTitle, useReadmeState } from './lib'
import { Icon, Masthead, Tally, kindLabel } from './parts'

export function Detail({ base }: { base: string }) {
  const { section = '', slug = '' } = useParams()
  const item = getItem(`${section}/${slug}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [section, slug])

  if (!item) return <Missing base={base} path={`${section}/${slug}`} />
  return <Record key={item.id} item={item} base={base} />
}

function Missing({ base, path }: { base: string; path: string }) {
  return (
    <>
      <Masthead base={base} />
      <main className="ds-missing">
        <p className="ds-code">No reel at {path}</p>
        <h1 className="ds-display">
          Not in the <em>archive</em>
        </h1>
        <p className="ds-missing__text">This reference was moved, renamed or never filed. Everything that is filed lives on the index.</p>
        <Link to={base} className="ds-btn ds-btn--solid">
          <Icon.back />
          Back to the index
        </Link>
      </main>
    </>
  )
}

type Flash = { tone: 'ok' | 'error'; text: string } | null

function Record({ item, base }: { item: Item; base: string }) {
  const readme = useReadmeState(item)
  const hasCode = item.files.length > 0
  const [tab, setTab] = useState<'readme' | 'code'>('readme')
  const [copied, setCopied] = useState(false)
  const [zipping, setZipping] = useState(false)
  const [flash, setFlash] = useState<Flash>(null)
  const back = { pathname: base, hash: sectionAnchor(item.section) }
  const readmeText = readme.status === 'ready' ? readme.text.trim() : ''

  useEffect(() => {
    if (!flash && !copied) return
    const t = setTimeout(() => (setFlash(null), setCopied(false)), 2400)
    return () => clearTimeout(t)
  }, [flash, copied])

  const onCopy = async () => {
    try {
      await copyText(readmeText)
      setCopied(true)
      setFlash({ tone: 'ok', text: 'Description copied to clipboard' })
    } catch {
      setFlash({ tone: 'error', text: 'Copy failed. Your browser blocked clipboard access.' })
    }
  }

  const onZip = async () => {
    setZipping(true)
    try {
      await downloadZip(item)
      setFlash({ tone: 'ok', text: `${item.slug}.zip is downloading` })
    } catch {
      setFlash({ tone: 'error', text: 'Could not build the zip. Try again.' })
    } finally {
      setZipping(false)
    }
  }

  return (
    <>
      <Masthead base={base}>
        <Link to={back} className="ds-back">
          <Icon.back />
          <span>
            <span className="ds-back__verb">Back to </span>
            {sectionLabel(item.section)}
          </span>
        </Link>
        <span className="ds-code ds-masthead__code">{catalogCode(item)}</span>
      </Masthead>

      <main className="ds-detail">
        <Stage item={item} />

        <div className="ds-detail__intro">
          <div className="ds-detail__lead">
            <p className="ds-detail__eyebrow">
              <Link to={back}>{sectionLabel(item.section)}</Link>
              {item.subtype && (
                <>
                  <span aria-hidden="true"> / </span>
                  {subtypeLabel(item.subtype)}
                </>
              )}
            </p>
            <h1 className="ds-detail__title">{item.title}</h1>
            <p className="ds-detail__summary">{item.summary}</p>

            <div className="ds-actions">
              <button
                type="button"
                className="ds-btn ds-btn--solid"
                onClick={onCopy}
                disabled={!readmeText}
                aria-describedby={!readmeText ? 'ds-copy-why' : undefined}
              >
                {copied ? <Icon.check /> : <Icon.copy />}
                {copied ? 'Copied' : 'Copy description'}
              </button>
              <button type="button" className="ds-btn" onClick={onZip} disabled={zipping} aria-busy={zipping}>
                <Icon.download />
                {zipping ? 'Packing…' : 'Download .zip'}
              </button>
              <a className="ds-btn ds-btn--quiet" href={item.source.url} target="_blank" rel="noreferrer">
                Source
                <Icon.external />
                <span className="ds-sr"> on {item.source.name} (opens in a new tab)</span>
              </a>
            </div>
            <p className="ds-flash" role="status" aria-live="polite" data-tone={flash?.tone}>
              {flash?.text ?? ''}
            </p>
            {!readmeText && (
              <p id="ds-copy-why" className="ds-sr">
                {readme.status === 'loading' ? 'Description is loading.' : 'This reference has no written description yet.'}
              </p>
            )}
          </div>

          <dl className="ds-record">
            <div>
              <dt>Catalog</dt>
              <dd className="ds-code">{catalogCode(item)}</dd>
            </div>
            <div>
              <dt>Section</dt>
              <dd>
                <Link to={back}>{sectionLabel(item.section)}</Link>
                {item.subtype && <span className="ds-record__sub"> · {subtypeLabel(item.subtype)}</span>}
              </dd>
            </div>
            <div>
              <dt>Kind</dt>
              <dd>
                {kindLabel(item)}
                {item.animated && (
                  <>
                    {' '}
                    <Tally />
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                <a href={item.source.url} target="_blank" rel="noreferrer">
                  {item.source.name}
                  <Icon.external className="ds-record__ext" />
                  <span className="ds-sr"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{item.stack.length ? item.stack.join(', ') : <span className="ds-muted">No code, visual reference</span>}</dd>
            </div>
            {item.tags.length > 0 && (
              <div className="ds-record__tags">
                <dt>Tags</dt>
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
        </div>

        <Tabs item={item} tab={hasCode ? tab : 'readme'} setTab={setTab} hasCode={hasCode}>
          {tab === 'code' && hasCode ? <CodePanel item={item} /> : <ReadmePanel item={item} state={readme} />}
        </Tabs>
      </main>
    </>
  )
}

/* ---------- Stage: the screening-room frame for the hero media ---------- */

function Stage({ item }: { item: Item }) {
  const ref = useInViewVideo<HTMLVideoElement>()
  const [playing, setPlaying] = useState(false)
  const video = item.media.video
  const still = item.media.image ?? item.media.thumb

  return (
    <figure className="ds-stage">
      <div className="ds-stage__screen">
        {video ? (
          <video
            ref={ref}
            className="ds-stage__media"
            src={video}
            poster={still}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${item.title}, looping preview`}
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : still ? (
          <img className="ds-stage__media" src={still} alt={`${item.title}: ${item.summary}`} />
        ) : (
          <p className="ds-stage__none">No preview filed for this reference.</p>
        )}
      </div>
      <figcaption className="ds-stage__caption">
        <span className="ds-code">
          {catalogCode(item)} · {video ? 'Looping preview' : 'Still'}
        </span>
        {video ? (
          <button
            type="button"
            className="ds-textbtn"
            onClick={() => {
              const v = ref.current
              if (!v) return
              if (v.paused) v.play().catch(() => {})
              else v.pause()
            }}
          >
            {playing ? <Icon.pause /> : <Icon.play />}
            {playing ? 'Pause' : 'Play'}
          </button>
        ) : (
          still && (
            <a className="ds-textbtn" href={still} target="_blank" rel="noreferrer">
              Full size
              <Icon.external />
            </a>
          )
        )}
      </figcaption>
    </figure>
  )
}

/* ---------- Tabs ---------- */

function Tabs({
  item,
  tab,
  setTab,
  hasCode,
  children,
}: {
  item: Item
  tab: 'readme' | 'code'
  setTab: (t: 'readme' | 'code') => void
  hasCode: boolean
  children: ReactNode
}) {
  const id = useId()
  const readmeTab = useRef<HTMLButtonElement>(null)
  const codeTab = useRef<HTMLButtonElement>(null)

  if (!hasCode)
    return (
      <section className="ds-panel-wrap" aria-labelledby={`${id}-h`}>
        <div className="ds-tabs">
          <h2 id={`${id}-h`} className="ds-tab" aria-current="true">
            Description
          </h2>
        </div>
        <div className="ds-panel">{children}</div>
      </section>
    )

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const next = e.key === 'Home' ? 'readme' : e.key === 'End' ? 'code' : tab === 'readme' ? 'code' : 'readme'
    setTab(next)
    ;(next === 'readme' ? readmeTab : codeTab).current?.focus()
  }

  return (
    <section className="ds-panel-wrap" aria-label="Reference details">
      <div className="ds-tabs" role="tablist" aria-label="Reference details" onKeyDown={onKey}>
        <button
          ref={readmeTab}
          role="tab"
          id={`${id}-readme`}
          aria-selected={tab === 'readme'}
          aria-controls={`${id}-panel`}
          tabIndex={tab === 'readme' ? 0 : -1}
          className="ds-tab"
          onClick={() => setTab('readme')}
        >
          Description
        </button>
        <button
          ref={codeTab}
          role="tab"
          id={`${id}-code`}
          aria-selected={tab === 'code'}
          aria-controls={`${id}-panel`}
          tabIndex={tab === 'code' ? 0 : -1}
          className="ds-tab"
          onClick={() => setTab('code')}
        >
          Code <span className="ds-tab__n">{item.files.length}</span>
        </button>
      </div>
      <div className="ds-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${tab}`} tabIndex={0}>
        {children}
      </div>
    </section>
  )
}

function ReadmePanel({ item, state }: { item: Item; state: ReturnType<typeof useReadmeState> }) {
  if (state.status === 'loading')
    return (
      <div className="ds-skeleton" aria-busy="true" aria-label="Loading description">
        <span style={{ width: '38%' }} />
        <span />
        <span style={{ width: '92%' }} />
        <span style={{ width: '64%' }} />
      </div>
    )

  const text = state.status === 'ready' ? stripTitle(state.text).trim() : ''
  if (!text)
    return (
      <div className="ds-unwritten">
        <p className="ds-unwritten__title">
          {state.status === 'error' ? 'The description could not be loaded.' : 'The long description is still being written.'}
        </p>
        <p>
          Until it lands, the summary above is the short version: <em>{item.summary}</em>
        </p>
        <a href={item.source.url} target="_blank" rel="noreferrer" className="ds-inline">
          Study the original on {item.source.name}
        </a>
      </div>
    )

  const toc = headingsOf(text)

  return (
    <div className="ds-reading" data-toc={toc.length > 1 || undefined}>
      <article className="ds-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => <h2 id={headingId(textOf(children))}>{children}</h2>,
            a: ({ href, children }) => {
              const external = !!href && /^https?:/.test(href)
              return (
                <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {children}
                </a>
              )
            },
            code: ({ children, className }) => {
              const raw = typeof children === 'string' ? children.trim() : ''
              if (!className && HEX.test(raw))
                return (
                  <code className="ds-hex">
                    <span className="ds-hex__chip" style={{ background: raw }} aria-hidden="true" />
                    {children}
                  </code>
                )
              return <code className={className}>{children}</code>
            },
            table: ({ children }) => (
              <div className="ds-table-wrap" tabIndex={0} role="region" aria-label="Table">
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </article>
      {toc.length > 1 && (
        <nav className="ds-toc" aria-label="Description contents">
          <p className="ds-toc__label">Contents</p>
          <ol>
            {toc.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(h.id)?.scrollIntoView({
                      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    })
                  }}
                >
                  {h.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  )
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i

const plainHeading = (s: string) =>
  s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim()
const headingId = (s: string) =>
  'ds-h-' +
  plainHeading(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (node && typeof node === 'object' && 'props' in node)
    return textOf((node.props as { children?: ReactNode }).children)
  return ''
}

/** `##` headings outside code fences, for the contents rail. */
function headingsOf(md: string) {
  let fenced = false
  const out: { id: string; label: string }[] = []
  for (const line of md.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced
    const m = !fenced && /^##\s+(.+?)\s*#*$/.exec(line)
    if (m) out.push({ id: headingId(m[1]), label: plainHeading(m[1]) })
  }
  return out
}

function CodePanel({ item }: { item: Item }) {
  const loaded = useSourceFiles(item)
  const byName = new Map(loaded.map(({ file, code }) => [file.name, code]))

  return (
    <div className="ds-files">
      {item.files.map((file) => {
        const code = byName.get(file.name)
        const lines = code ? code.split('\n').length : null
        return (
          <figure key={file.name} className="ds-file">
            <figcaption className="ds-file__head">
              <span className="ds-file__name">{file.name}</span>
              {lines !== null && <span className="ds-file__lines">{lines} lines</span>}
              <button
                type="button"
                className="ds-textbtn"
                onClick={() => downloadFile(file)}
                aria-label={`Download ${file.name}`}
              >
                <Icon.download />
                Download
              </button>
            </figcaption>
            {code === undefined ? (
              <div className="ds-skeleton ds-skeleton--code" aria-busy="true" aria-label={`Loading ${file.name}`}>
                <span style={{ width: '30%' }} />
                <span style={{ width: '55%' }} />
                <span style={{ width: '46%' }} />
              </div>
            ) : (
              <pre className="ds-code-block" tabIndex={0} aria-label={`${file.name} source`}>
                <code>{code}</code>
              </pre>
            )}
          </figure>
        )
      })}
    </div>
  )
}
