import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { subtypeLabel } from '../../../data/sections'
import type { Item } from '../../../data/types'
import { useInViewVideo } from '../../../lib/hooks'
import { sheetNo, TOTAL } from './numbering'


export function RegMark({ className = '' }: { className?: string }) {
  return (
    <svg className={`pa-reg ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 0v24M0 12h24" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="2.25" fill="currentColor" />
    </svg>
  )
}

/** Sticky title block shared by both pages. */
export function Bar({ base, aside, children }: { base: string; aside?: ReactNode; children?: ReactNode }) {
  return (
    <header className="pa-bar">
      <div className="pa-wrap">
        <div className="pa-bar__row">
          <Link to={base} className="pa-brand" aria-label="Web Design App, archive index">
            <RegMark />
            <span className="pa-brand__name">Web Design App</span>
            <span className="pa-brand__sub pa-label">Ref. archive / {TOTAL} sheets</span>
          </Link>
          {aside}
        </div>
      </div>
      {children}
    </header>
  )
}

export function SkipLink() {
  return (
    <a className="pa-skip" href="#pa-main">
      Skip to content
    </a>
  )
}

export function DensityStrip({ label }: { label: string }) {
  const tints = [1, 0.75, 0.5, 0.25, 0.1]
  return (
    <div className="pa-strip" aria-hidden="true">
      <span className="pa-strip__patches">
        {tints.map((t) => (
          <i key={t} style={{ background: `oklch(0.21 0.012 60 / ${t})` }} />
        ))}
        <i style={{ background: 'var(--accent)' }} />
      </span>
      <span className="pa-label">{label}</span>
      <span className="pa-strip__rule" />
      <RegMark />
    </div>
  )
}

export function KindTag({ kind }: { kind: Item['kind'] }) {
  return (
    <span className="pa-kind pa-label" data-kind={kind}>
      {kind === 'component' ? 'Component' : 'Image'}
    </span>
  )
}

export function MotionTag({ animated }: { animated: boolean }) {
  if (!animated) return <span className="pa-still pa-label">Static</span>
  return (
    <span className="pa-motion pa-label">
      <span className="pa-motion__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      Motion
    </span>
  )
}

export function SheetCard({ item, base }: { item: Item; base: string }) {
  const videoRef = useInViewVideo<HTMLVideoElement>()
  const [playing, setPlaying] = useState(false)
  const kicker = item.subtype
    ? subtypeLabel(item.subtype)
    : item.files.length
      ? `${item.files.length} ${item.files.length === 1 ? 'file' : 'files'}`
      : 'Still'

  return (
    <li className="pa-sheet">
      <Link to={`${base}/effect/${item.id}`} className="pa-sheet__link">
        <div className="pa-sheet__slug pa-label">
          <span>No. {sheetNo(item.id)}</span>
          <span>{kicker}</span>
        </div>
        <div className="pa-crop">
          <div className="pa-media">
            {item.media.thumb ? (
              <img src={item.media.thumb} alt={`${item.title} preview`} loading="lazy" decoding="async" width={640} height={480} />
            ) : (
              <span className="pa-media__none pa-label">No preview filed</span>
            )}
            {item.media.video && (
              <video
                ref={videoRef}
                src={item.media.video}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                data-playing={playing || undefined}
                onPlaying={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            )}
          </div>
        </div>
        <h3 className="pa-sheet__title">{item.title}</h3>
        <p className="pa-sheet__summary">{item.summary}</p>
        <div className="pa-sheet__foot">
          <KindTag kind={item.kind} />
          <MotionTag animated={item.animated} />
          <span className="pa-sheet__open pa-label" aria-hidden="true">
            Open &rarr;
          </span>
        </div>
      </Link>
    </li>
  )
}
