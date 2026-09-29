import { useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router'
import { sections } from '../data/catalog'
import { subtypeLabel } from '../data/sections'
import type { Item } from '../data/types'
import { useInViewVideo } from '../lib/hooks'
import { kindLabel, useReveal } from './util'

export function Glyph({ children }: { children: ReactNode }) {
  return (
    <span className="ds-glyph" aria-hidden="true">
      {children}
    </span>
  )
}

export function MotionTag() {
  return (
    <span className="ds-motion ds-mono">
      <span className="ds-motion__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      Motion
    </span>
  )
}

/** Video that fades in over its poster only once frames are actually playing. */
export function InViewVideo({ src, className }: { src: string; className?: string }) {
  const ref = useInViewVideo<HTMLVideoElement>()
  const [playing, setPlaying] = useState(false)
  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      data-playing={playing}
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
    />
  )
}

export function Card({
  item,
  index = 0,
  feature = false,
  headingLevel = 3,
}: {
  item: Item
  index?: number
  feature?: boolean
  headingLevel?: 2 | 3
}) {
  const ref = useReveal<HTMLLIElement>()
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <li
      ref={ref}
      className={`ds-card ds-reveal${feature ? ' ds-feature' : ''}`}
      style={{ '--i': index % 3 } as CSSProperties}
    >
      <Link to={`/effect/${item.id}`} className="ds-card__link">
        <div className="ds-shell">
          <div className="ds-core ds-card__media">
            {item.media.thumb && (
              <img src={item.media.thumb} alt={`Preview of ${item.title}`} loading="lazy" decoding="async" />
            )}
            {item.media.video && <InViewVideo src={item.media.video} />}
          </div>
        </div>
        <div className="ds-card__body">
          <Heading className="ds-card__title">
            <span>{item.title}</span>
            <Glyph>↗</Glyph>
          </Heading>
          <p className="ds-card__summary">{item.summary}</p>
          <div className="ds-card__meta ds-mono">
            <span>{kindLabel(item)}</span>
            {item.subtype && <span>{subtypeLabel(item.subtype)}</span>}
            {item.animated && <MotionTag />}
          </div>
        </div>
      </Link>
    </li>
  )
}

export function Header({
  activeSection,
  onAnchor,
  children,
}: {
  activeSection?: string
  /** When set, anchors scroll in place (Home). Otherwise they route back to Home. */
  onAnchor?: (id: string) => void
  children?: ReactNode
}) {
  return (
    <header className="ds-header">
      <div className="ds-wrap">
        <div className="ds-header__bar">
          <Link to="/" className="ds-mark" aria-label="Web Design Library, home">
            Web Design <em>Library</em>
          </Link>
          <nav className="ds-anchors" aria-label="Sections">
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  {onAnchor ? (
                    <a
                      href={`#${s.id}`}
                      className="ds-anchor"
                      aria-current={activeSection === s.id ? 'true' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        onAnchor(s.id)
                      }}
                    >
                      {s.label}
                    </a>
                  ) : (
                    <Link to={{ pathname: '/', hash: s.id }} className="ds-anchor" aria-current={activeSection === s.id ? 'true' : undefined}>
                      {s.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="ds-header__end">{children}</div>
        </div>
      </div>
    </header>
  )
}

export function Footer({ onTop }: { onTop: () => void }) {
  return (
    <footer className="ds-wrap">
      <div className="ds-footer ds-mono">
        <span>Web Design Library. A private reference archive.</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            onTop()
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
