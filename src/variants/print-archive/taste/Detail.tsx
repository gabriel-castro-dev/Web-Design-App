import { Children, isValidElement, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getItem } from '../../../data/catalog'
import { sectionLabel, subtypeLabel } from '../../../data/sections'
import type { Item, SourceFile } from '../../../data/types'
import { useReadme, useSourceFiles } from '../../../lib/hooks'
import { copyText, downloadFile, downloadZip } from '../../../lib/item-actions'
import { Colophon, CropMarks, Header, RegMark, TOTAL, kindLabel, pad, recordNo, sheetAnchor, sheetNo } from './shared'

type Status = 'idle' | 'busy' | 'done' | 'error'

/** Flash a status for a moment, then fall back to idle. */
function useFlash() {
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const run = async (task: () => Promise<void>) => {
    window.clearTimeout(timer.current)
    setStatus('busy')
    try {
      await task()
      setStatus('done')
    } catch {
      setStatus('error')
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 2200)
  }
  return [status, run] as const
}

export function Detail({ base }: { base: string }) {
  const { section = '', slug = '' } = useParams()
  const item = getItem(`${section}/${slug}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [section, slug])

  return (
    <>
      <a className="pa-skip" href="#pa-main">
        Skip to record
      </a>
      <Header base={base}>
        <nav className="pa-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to={base}>Archive</Link>
            </li>
            {item && (
              <>
                <li>
                  <Link to={{ pathname: base, hash: sheetAnchor(item.section) }}>
                    Sheet {sheetNo(item.section)} {sectionLabel(item.section)}
                  </Link>
                </li>
                <li aria-current="page">No. {recordNo(item.id)}</li>
              </>
            )}
          </ol>
        </nav>
      </Header>
      <main id="pa-main" tabIndex={-1}>
        {item ? <Record key={item.id} item={item} base={base} /> : <NotFound base={base} id={`${section}/${slug}`} />}
      </main>
      <Colophon />
    </>
  )
}

function NotFound({ base, id }: { base: string; id: string }) {
  useEffect(() => {
    document.title = 'Record not found / Reference Archive'
  }, [])
  return (
    <section className="pa-empty" aria-labelledby="pa-404">
      <div className="pa-wrap">
        <div className="pa-empty__frame">
          <CropMarks />
          <p className="pa-empty__code" aria-hidden="true">
            404
          </p>
          <div>
            <h1 id="pa-404" className="pa-empty__title">
              Record not on file
            </h1>
            <p className="pa-empty__query">
              Nothing is filed under <code>{id}</code>. It may have been renamed or moved to another sheet.
            </p>
            <Link to={base} className="pa-btn pa-btn--ink">
              &lt;&lt;&lt; Back to archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Record({ item, base }: { item: Item; base: string }) {
  const readme = useReadme(item)
  const [readmeReady, setReadmeReady] = useState(false)
  const [tab, setTab] = useState<'readme' | 'code'>('readme')
  const [copyStatus, runCopy] = useFlash()
  const [zipStatus, runZip] = useFlash()
  const hasCode = item.files.length > 0

  // useReadme returns '' both while loading and when the file is empty; track arrival separately.
  useEffect(() => {
    let alive = true
    item.readme().then(() => window.setTimeout(() => alive && setReadmeReady(true), 0))
    return () => {
      alive = false
    }
  }, [item])

  useEffect(() => {
    const prev = document.title
    document.title = `${item.title} / Reference Archive`
    return () => {
      document.title = prev
    }
  }, [item])

  const body = useMemo(() => readme.replace(/^\s*#\s+[^\n]*\n/, '').trim(), [readme])
  const readmeEmpty = readmeReady && body.length === 0
  const brief = `${item.title}\n\n${item.summary}\n\nSource: ${item.source.url}\nTags: ${item.tags.join(', ')}`

  const copyLabel = {
    idle: readmeEmpty ? 'Copy summary' : 'Copy description',
    busy: 'Copying',
    done: 'Copied to clipboard',
    error: 'Copy failed, retry',
  }[copyStatus]
  const zipLabel = { idle: 'Download .zip', busy: 'Packing files', done: 'Zip saved', error: 'Zip failed, retry' }[
    zipStatus
  ]

  return (
    <article className="pa-record" aria-labelledby="pa-record-title">
      <div className="pa-wrap">
        <div className="pa-record__top">
          <Link to={{ pathname: base, hash: sheetAnchor(item.section) }} className="pa-back">
            <span aria-hidden="true">&lt;&lt;&lt;</span> Sheet {sheetNo(item.section)} {sectionLabel(item.section)}
          </Link>
          <p className="pa-record__no">
            Record <strong>No. {recordNo(item.id)}</strong> / {pad(TOTAL)}
          </p>
        </div>

        <header className="pa-record__head">
          <h1 id="pa-record-title" className="pa-record__title">
            {item.title}
          </h1>
          <p className="pa-record__summary">{item.summary}</p>
          <p className="pa-record__big" aria-hidden="true">
            {recordNo(item.id)}
          </p>
        </header>

        <div className="pa-record__grid">
          <figure className="pa-plate">
            <div className="pa-plate__frame">
              <CropMarks />
              <PlateMedia item={item} />
            </div>
            <figcaption className="pa-plate__cap">
              <span>Fig. {recordNo(item.id)}</span>
              <span>{item.media.video ? 'Video loop, muted' : 'Still image'}</span>
            </figcaption>
          </figure>

          <aside className="pa-specsheet" aria-label="Record specification">
            <dl className="pa-spec">
              <div>
                <dt>Sheet</dt>
                <dd>
                  {sheetNo(item.section)} {sectionLabel(item.section)}
                </dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{item.subtype ? subtypeLabel(item.subtype) : 'General'}</dd>
              </div>
              <div>
                <dt>Kind</dt>
                <dd>{kindLabel(item)}</dd>
              </div>
              <div>
                <dt>Motion</dt>
                <dd className="pa-spec__motion">
                  <RegMark live={item.animated} />
                  {item.animated ? 'Animated' : 'Static'}
                </dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{item.stack.length ? item.stack.join(', ') : 'None, image only'}</dd>
              </div>
              <div>
                <dt>Files</dt>
                <dd>{hasCode ? `${pad(item.files.length, 2)} source` : 'No code'}</dd>
              </div>
              <div className="pa-spec__wide">
                <dt>Origin</dt>
                <dd>
                  <a href={item.source.url} target="_blank" rel="noreferrer" className="pa-link">
                    {item.source.name}
                    <span className="pa-sr"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>

            {item.tags.length > 0 && (
              <div className="pa-tags">
                <p className="pa-tags__label">Tags</p>
                <ul>
                  {item.tags.map((t) => (
                    <li key={t} className="pa-tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pa-actions">
              <button
                type="button"
                className="pa-btn pa-btn--ink"
                data-status={copyStatus}
                disabled={!readmeReady}
                onClick={() => runCopy(() => copyText(readmeEmpty ? brief : readme))}
              >
                {copyLabel}
              </button>
              <button
                type="button"
                className="pa-btn"
                data-status={zipStatus}
                disabled={zipStatus === 'busy'}
                onClick={() => runZip(() => downloadZip(item))}
              >
                {zipLabel}
              </button>
              <a href={item.source.url} target="_blank" rel="noreferrer" className="pa-btn pa-btn--ghost">
                Source <span aria-hidden="true">&gt;&gt;&gt;</span>
                <span className="pa-sr"> on {item.source.name} (opens in a new tab)</span>
              </a>
              <span className="pa-sr" role="status">
                {copyStatus === 'done' ? 'Description copied to clipboard' : ''}
                {zipStatus === 'done' ? 'Zip download started' : ''}
              </span>
            </div>
          </aside>
        </div>

        <Tabs tab={hasCode ? tab : 'readme'} onTab={setTab} hasCode={hasCode} fileCount={item.files.length} />

        {tab === 'readme' || !hasCode ? (
          <div role="tabpanel" id="pa-panel-readme" aria-labelledby="pa-tab-readme" className="pa-panel" tabIndex={0}>
            {!readmeReady ? (
              <ProseSkeleton />
            ) : readmeEmpty ? (
              <div className="pa-pending">
                <RegMark live />
                <div>
                  <p className="pa-pending__title">Description pending</p>
                  <p>
                    This record's README has not been written yet. The summary above and the tags are on file; Copy
                    summary hands those over instead.
                  </p>
                </div>
              </div>
            ) : (
              <Readme markdown={body} />
            )}
          </div>
        ) : (
          <div role="tabpanel" id="pa-panel-code" aria-labelledby="pa-tab-code" className="pa-panel">
            <CodeFiles item={item} />
          </div>
        )}
      </div>
    </article>
  )
}

function PlateMedia({ item }: { item: Item }) {
  const reduce = useMemo(() => matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const poster = item.media.image ?? item.media.thumb
  if (item.media.video)
    return (
      <video
        className="pa-plate__media"
        src={item.media.video}
        poster={poster}
        muted
        loop
        playsInline
        controls
        autoPlay={!reduce}
        preload={reduce ? 'none' : 'auto'}
        aria-label={`Preview video of ${item.title}`}
      />
    )
  if (poster) return <img className="pa-plate__media" src={poster} alt={`Preview of ${item.title}`} />
  return <p className="pa-plate__none">No preview on file</p>
}

function Tabs({
  tab,
  onTab,
  hasCode,
  fileCount,
}: {
  tab: 'readme' | 'code'
  onTab: (t: 'readme' | 'code') => void
  hasCode: boolean
  fileCount: number
}) {
  const tabs = hasCode ? (['readme', 'code'] as const) : (['readme'] as const)
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!hasCode || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const next = tab === 'readme' ? 'code' : 'readme'
    const target = e.key === 'Home' ? 'readme' : e.key === 'End' ? 'code' : next
    onTab(target)
    document.getElementById(`pa-tab-${target}`)?.focus()
  }
  return (
    <div className="pa-tabs" role="tablist" aria-label="Record contents" onKeyDown={onKey}>
      {tabs.map((t, i) => (
        <button
          key={t}
          id={`pa-tab-${t}`}
          type="button"
          role="tab"
          aria-selected={tab === t}
          aria-controls={`pa-panel-${t}`}
          tabIndex={tab === t ? 0 : -1}
          className="pa-tabs__tab"
          onClick={() => onTab(t)}
        >
          <span className="pa-tabs__no">{pad(i + 1, 2)}</span>
          {t === 'readme' ? 'Description' : 'Code'}
          {t === 'code' && <span className="pa-tabs__count">{pad(fileCount, 2)} files</span>}
        </button>
      ))}
    </div>
  )
}

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : isValidElement(c) ? textOf((c.props as { children?: ReactNode }).children) : ''))
    .join('')

const slugify = (s: string) =>
  'pa-' +
  s
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const mdComponents: Components = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  a: ({ href, children }) => {
    const external = href?.startsWith('http')
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  table: ({ children }) => (
    <div className="pa-prose__table" tabIndex={0} role="region" aria-label="Table">
      <table>{children}</table>
    </div>
  ),
}

function Readme({ markdown }: { markdown: string }) {
  const outline = useMemo(() => {
    let fenced = false
    return markdown.split('\n').flatMap((line) => {
      if (line.startsWith('```')) fenced = !fenced
      const m = !fenced && /^##\s+(.+)$/.exec(line)
      if (!m) return []
      const label = m[1].replace(/[`*_]/g, '').trim()
      return [{ label, id: slugify(label) }]
    })
  }, [markdown])

  return (
    <div className="pa-readme">
      {outline.length > 1 && (
        <nav className="pa-outline" aria-label="Description contents">
          <p className="pa-outline__label">Contents</p>
          <ol>
            {outline.map((h, i) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>
                  <span>§ {pad(i + 1, 2)}</span>
                  {h.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="pa-prose">
        <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {markdown}
        </Markdown>
      </div>
    </div>
  )
}

function ProseSkeleton() {
  return (
    <div className="pa-skeleton" aria-label="Loading description" role="status">
      {[92, 100, 84, 96, 60, 0, 88, 100, 72].map((w, i) => (
        <span key={i} style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

function CodeFiles({ item }: { item: Item }) {
  const loaded = useSourceFiles(item)
  if (!loaded.length)
    return (
      <div className="pa-files">
        {item.files.map((f) => (
          <div key={f.name} className="pa-file">
            <div className="pa-file__bar">
              <span className="pa-file__name">{f.name}</span>
            </div>
            <ProseSkeleton />
          </div>
        ))}
      </div>
    )
  return (
    <div className="pa-files">
      {loaded.map(({ file, code }, i) => (
        <CodeFile key={file.name} file={file} code={code} index={i + 1} />
      ))}
    </div>
  )
}

function CodeFile({ file, code, index }: { file: SourceFile; code: string; index: number }) {
  const [copyStatus, runCopy] = useFlash()
  const [dlStatus, runDl] = useFlash()
  const lines = code.replace(/\n$/, '').split('\n')
  const kb = (new Blob([code]).size / 1024).toFixed(1)
  return (
    <section className="pa-file" aria-label={file.name}>
      <div className="pa-file__bar">
        <span className="pa-file__idx">{pad(index, 2)}</span>
        <span className="pa-file__name">{file.name}</span>
        <span className="pa-file__stat">
          {lines.length} lines, {kb} KB
        </span>
        <div className="pa-file__actions">
          <button type="button" className="pa-mini" onClick={() => runCopy(() => copyText(code))}>
            {copyStatus === 'done' ? 'Copied' : copyStatus === 'error' ? 'Failed' : 'Copy'}
            <span className="pa-sr"> {file.name}</span>
          </button>
          <button type="button" className="pa-mini pa-mini--ink" onClick={() => runDl(() => downloadFile(file))}>
            {dlStatus === 'done' ? 'Saved' : dlStatus === 'error' ? 'Failed' : 'Download'}
            <span className="pa-sr"> {file.name}</span>
          </button>
        </div>
      </div>
      <pre className="pa-code" tabIndex={0} aria-label={`Source of ${file.name}`}>
        <code>
          {lines.map((l, n) => (
            <span key={n} className="pa-code__line">
              {l || ' '}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </section>
  )
}
