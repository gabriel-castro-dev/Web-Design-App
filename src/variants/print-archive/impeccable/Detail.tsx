import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getItem } from '../../../data/catalog'
import { sectionLabel, subtypeLabel } from '../../../data/sections'
import type { Item, SourceFile } from '../../../data/types'
import { useInViewVideo, useSourceFiles } from '../../../lib/hooks'
import { copyText, downloadFile, downloadZip } from '../../../lib/item-actions'
import { Bar, KindTag, MotionTag, RegMark, SkipLink } from './parts'
import { archive, sectionAnchor, sectionNo, sheetNo, TOTAL } from './numbering'

export function Detail({ base }: { base: string }) {
  const { section = '', slug = '' } = useParams()
  const item = getItem(`${section}/${slug}`)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [section, slug])

  return (
    <>
      <SkipLink />
      <Bar
        base={base}
        aside={
          <Link to={base} className="pa-btn pa-label" style={{ minHeight: 36 }}>
            <span aria-hidden="true">&larr;</span> Index
          </Link>
        }
      />
      {item ? <Sheet key={item.id} item={item} base={base} /> : <Missing base={base} id={`${section}/${slug}`} />}
    </>
  )
}

export function Missing({ base, id }: { base: string; id?: string }) {
  return (
    <main id="pa-main" className="pa-wrap pa-missing">
      <p className="pa-label">Sheet request / not on file</p>
      <h1>
        No such <span>sheet</span>
      </h1>
      <p>
        Nothing is filed under {id ? <code>{id}</code> : 'this address'}. It may have been renamed or re-filed into another
        section.
      </p>
      <Link to={base} className="pa-btn is-primary" style={{ minWidth: 260 }}>
        Back to the index <span aria-hidden="true">&rarr;</span>
      </Link>
    </main>
  )
}

type Status = 'idle' | 'busy' | 'done' | 'error'

function Sheet({ item, base }: { item: Item; base: string }) {
  const readme = useReadmeText(item)
  const files = useSourceFiles(item)
  const videoRef = useInViewVideo<HTMLVideoElement>()
  const [dims, setDims] = useState<string>()
  const { hash } = useLocation()
  const [tab, setTab] = useState<'desc' | 'code'>(hash === '#code' && item.files.length ? 'code' : 'desc')
  const [copy, runCopy] = useAction()
  const [zip, runZip] = useAction()

  const index = archive.findIndex((i) => i.id === item.id)
  const prev = archive[index - 1]
  const next = archive[index + 1]
  const hasReadme = readme.loaded && readme.text.trim().length > 0
  const sectionHref = `${base}#${sectionAnchor(item.section)}`

  const tabs = [
    { id: 'desc' as const, label: 'Description', no: 'A' },
    ...(item.files.length ? [{ id: 'code' as const, label: 'Code', no: 'B' }] : []),
  ]
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const i = tabs.findIndex((t) => t.id === tab)
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    setTab(tabs[n].id)
    tabRefs.current[n]?.focus()
  }

  return (
    <main id="pa-main" className="pa-wrap">
      <nav className="pa-crumbs pa-label" aria-label="Breadcrumb">
        <Link to={sectionHref}>
          <span aria-hidden="true">&larr; </span>
          {sectionNo(item.section)} {sectionLabel(item.section)}
        </Link>
        {item.subtype && (
          <>
            <span className="pa-crumbs__sep" aria-hidden="true">
              /
            </span>
            <span>{subtypeLabel(item.subtype)}</span>
          </>
        )}
        <span className="pa-crumbs__right">
          Sheet {sheetNo(item.id)} of {TOTAL}
        </span>
      </nav>

      <article className="pa-doc">
        <header className="pa-doc__head">
          <p className="pa-doc__sheet pa-label">
            <b>No. {sheetNo(item.id)}</b>
            <span>{item.kind === 'component' ? 'Component, reconstructed' : 'Static reference'}</span>
          </p>
          <h1 className="pa-doc__title">{item.title}</h1>
          <p className="pa-doc__summary">{item.summary}</p>
        </header>

        <figure className="pa-figure">
          <div className="pa-figure__frame">
            <RegMark className="is-t" />
            <RegMark className="is-b" />
            <RegMark className="is-l" />
            <RegMark className="is-r" />
            <div className="pa-crop">
              {item.media.video ? (
                <video
                  ref={videoRef}
                  className="pa-figure__media"
                  src={item.media.video}
                  poster={item.media.image}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label={`${item.title}, preview recording`}
                  onLoadedMetadata={(e) => setDims(`${e.currentTarget.videoWidth} x ${e.currentTarget.videoHeight}`)}
                />
              ) : item.media.image ? (
                <img
                  className="pa-figure__media"
                  src={item.media.image}
                  alt={`${item.title}: ${item.summary}`}
                  onLoad={(e) => setDims(`${e.currentTarget.naturalWidth} x ${e.currentTarget.naturalHeight}`)}
                />
              ) : (
                <div className="pa-figure__none pa-label">No preview filed</div>
              )}
            </div>
          </div>
          <figcaption className="pa-label">
            <span>Fig. 01</span>
            <span>{item.media.video ? 'Screen recording, loop' : 'Still'}</span>
            {dims && <span>{dims} px</span>}
            {(item.media.video || item.media.image) && (
              <a href={item.media.video ?? item.media.image} target="_blank" rel="noreferrer">
                Full size <span aria-hidden="true">&#8599;</span>
              </a>
            )}
          </figcaption>
        </figure>

        <aside className="pa-aside" aria-label="Sheet specification">
          <div className="pa-actions">
            <button
              type="button"
              className="pa-btn is-primary"
              data-state={copy}
              disabled={!hasReadme}
              onClick={() => runCopy(() => copyText(readme.text))}
            >
              <span>
                {!readme.loaded
                  ? 'Loading description'
                  : !hasReadme
                    ? 'No description yet'
                    : copy === 'done'
                      ? 'Copied to clipboard'
                      : copy === 'error'
                        ? 'Copy failed, retry'
                        : 'Copy description'}
              </span>
              <span className="pa-btn__glyph" aria-hidden="true">
                {copy === 'done' ? '✓' : '¶'}
              </span>
            </button>
            <button type="button" className="pa-btn" data-state={zip} disabled={zip === 'busy'} onClick={() => runZip(() => downloadZip(item))}>
              <span>
                {zip === 'busy'
                  ? 'Packing archive'
                  : zip === 'done'
                    ? 'Zip downloaded'
                    : zip === 'error'
                      ? 'Download failed, retry'
                      : 'Download .zip'}
              </span>
              <span className="pa-btn__glyph" aria-hidden="true">
                {zip === 'done' ? '✓' : '↓'}
              </span>
            </button>
            <a className="pa-btn" href={item.source.url} target="_blank" rel="noreferrer">
              <span>Source / {item.source.name}</span>
              <span className="pa-btn__glyph" aria-hidden="true">
                &#8599;
              </span>
            </a>
            <p className="pa-sr" role="status">
              {copy === 'done' ? 'Description copied to clipboard.' : ''}
              {zip === 'done' ? 'Zip download started.' : ''}
            </p>
          </div>

          <dl className="pa-spec">
            <Row label="Sheet">
              No. {sheetNo(item.id)} / {TOTAL}
            </Row>
            <Row label="Section">
              <Link to={sectionHref}>{sectionLabel(item.section)}</Link>
            </Row>
            {item.subtype && <Row label="Subtype">{subtypeLabel(item.subtype)}</Row>}
            <Row label="Kind">
              <KindTag kind={item.kind} />
            </Row>
            <Row label="Motion">
              <MotionTag animated={item.animated} />
            </Row>
            <Row label="Source">
              <a href={item.source.url} target="_blank" rel="noreferrer">
                {item.source.name}
              </a>
            </Row>
            {item.stack.length > 0 && <Row label="Stack">{item.stack.join(' + ')}</Row>}
            {item.files.length > 0 && (
              <Row label="Files">{item.files.map((f) => f.name).join(', ')}</Row>
            )}
            {item.tags.length > 0 && (
              <Row label="Tags">
                <ul className="pa-tags">
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Row>
            )}
          </dl>
        </aside>

        <section className="pa-tabs" aria-label="Sheet contents">
          <div className="pa-tablist" role="tablist" aria-label="Sheet contents">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`pa-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`pa-panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className="pa-tab"
                onClick={() => setTab(t.id)}
                onKeyDown={onTabKey}
              >
                <span className="pa-label">{t.no}</span>
                {t.label}
                {t.id === 'code' && <span className="pa-label">{String(item.files.length).padStart(2, '0')}</span>}
              </button>
            ))}
          </div>

          <div className="pa-panel" role="tabpanel" id="pa-panel-desc" aria-labelledby="pa-tab-desc" tabIndex={0} hidden={tab !== 'desc'}>
            <Readme item={item} loaded={readme.loaded} text={readme.text} />
          </div>
          {item.files.length > 0 && (
            <div className="pa-panel" role="tabpanel" id="pa-panel-code" aria-labelledby="pa-tab-code" tabIndex={0} hidden={tab !== 'code'}>
              <Code files={files} expected={item.files.length} />
            </div>
          )}
        </section>

        <nav className="pa-pager" aria-label="Adjacent sheets">
          {prev && (
            <Link to={`${base}/effect/${prev.id}`} className="is-prev">
              <span className="pa-label">&larr; No. {sheetNo(prev.id)}</span>
              <b>{prev.title}</b>
            </Link>
          )}
          {next && (
            <Link to={`${base}/effect/${next.id}`} className="is-next">
              <span className="pa-label">No. {sheetNo(next.id)} &rarr;</span>
              <b>{next.title}</b>
            </Link>
          )}
        </nav>
        <footer className="pa-foot is-tight">
          <RegMark />
          <span className="pa-label">End of sheet No. {sheetNo(item.id)}</span>
          <span className="pa-strip__rule" aria-hidden="true" />
          <span className="pa-label">
            Filed under {sectionLabel(item.section)}
            {item.subtype ? ` / ${subtypeLabel(item.subtype)}` : ''}
          </span>
        </footer>
      </article>
    </main>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="pa-label">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function Readme({ item, loaded, text }: { item: Item; loaded: boolean; text: string }) {
  // The README repeats the title as its first heading; the sheet header already shows it.
  const body = text.replace(/^\s*#\s+[^\n]*\n+/, '')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="pa-readme">
      <div className="pa-readme__margin pa-label" aria-hidden={!loaded}>
        <span>Doc. README.md</span>
        {loaded && words > 0 && <span>{words} words</span>}
        {loaded && words > 0 && <span>~{Math.max(1, Math.round(words / 220))} min read</span>}
      </div>
      {!loaded ? (
        <div className="pa-prose pa-skel" aria-label="Loading description">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      ) : body.trim() ? (
        <div className="pa-prose">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
              table: ({ node: _node, ...props }) => (
                <div className="pa-table">
                  <table {...props} />
                </div>
              ),
            }}
          >
            {body}
          </Markdown>
        </div>
      ) : (
        <div className="pa-pending">
          <span className="pa-label">Status / pending</span>
          <strong>Description not written yet</strong>
          <p>
            This sheet is filed but its README is still being drafted. The summary above and the {item.kind === 'component' ? 'code' : 'preview'} are
            available now.
          </p>
        </div>
      )}
    </div>
  )
}

function Code({ files, expected }: { files: { file: SourceFile; code: string }[]; expected: number }) {
  if (!files.length) {
    return (
      <div className="pa-skel" aria-label={`Loading ${expected} source files`}>
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
    )
  }
  return (
    <div className="pa-files">
      {files.map(({ file, code }, i) => (
        <FileBlock key={file.name} file={file} code={code} no={i + 1} />
      ))}
    </div>
  )
}

function FileBlock({ file, code, no }: { file: SourceFile; code: string; no: number }) {
  const [copied, runCopy] = useAction()
  const lines = code.replace(/\n$/, '').split('\n')
  return (
    <section aria-label={file.name}>
      <div className="pa-file__head">
        <span className="pa-file__no pa-label">File {String(no).padStart(2, '0')}</span>
        <h3 className="pa-file__name">{file.name}</h3>
        <span className="pa-file__meta pa-label">{lines.length} lines</span>
        <div className="pa-file__actions">
          <button type="button" className="pa-btn" data-state={copied} onClick={() => runCopy(() => copyText(code))}>
            {copied === 'done' ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="pa-btn" onClick={() => downloadFile(file)} aria-label={`Download ${file.name}`}>
            Download <span aria-hidden="true">&darr;</span>
          </button>
        </div>
      </div>
      <pre className="pa-code" tabIndex={0} aria-label={`Source of ${file.name}`}>
        <code>
          {lines.map((line, i) => (
            <span className="ln" key={i}>
              {line || ' '}
            </span>
          ))}
        </code>
      </pre>
    </section>
  )
}

/** README text plus whether it finished loading (useReadme can't tell empty from loading). */
function useReadmeText(item: Item) {
  const [state, setState] = useState<{ id: string; text: string }>()
  useEffect(() => {
    let alive = true
    item.readme().then(
      (text) => alive && setState({ id: item.id, text }),
      () => alive && setState({ id: item.id, text: '' }),
    )
    return () => {
      alive = false
    }
  }, [item])
  const loaded = state?.id === item.id
  return { loaded, text: loaded ? state.text : '' }
}

/** Runs an async action and reports busy / done / error, resetting after a moment. */
function useAction() {
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const run = async (fn: () => Promise<unknown>) => {
    window.clearTimeout(timer.current)
    setStatus('busy')
    try {
      await fn()
      setStatus('done')
    } catch {
      setStatus('error')
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 2200)
  }
  return [status, run] as const
}
