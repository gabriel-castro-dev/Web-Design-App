import { useRef, useState, type CSSProperties, type ReactNode, type SVGProps } from 'react'
import { Link } from 'react-router'
import { subtypeLabel } from '../../../data/sections'
import type { Item } from '../../../data/types'
import { useInViewVideo } from '../../../lib/hooks'
import { canHover, catalogCode, prefersReducedMotion } from './lib'

/* ---------- Icons: one hand-drawn set, 1.5 stroke, 16px grid ---------- */

type IconProps = SVGProps<SVGSVGElement>
const Svg = ({ children, ...props }: IconProps & { children: ReactNode }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
)

export const Icon = {
  search: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.25 10.25 3 3" />
    </Svg>
  ),
  back: (p: IconProps) => (
    <Svg {...p}>
      <path d="M13 8H3.5M7.5 4 3.5 8l4 4" />
    </Svg>
  ),
  external: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5.5 3.5h7v7M12.25 3.75 3.5 12.5" />
    </Svg>
  ),
  copy: (p: IconProps) => (
    <Svg {...p}>
      <rect x="5.25" y="5.25" width="7.5" height="7.5" rx="1.25" />
      <path d="M10.25 3.25h-6a1 1 0 0 0-1 1v6" />
    </Svg>
  ),
  check: (p: IconProps) => (
    <Svg {...p}>
      <path d="m3.5 8.5 3 3 6-7" />
    </Svg>
  ),
  download: (p: IconProps) => (
    <Svg {...p}>
      <path d="M8 2.75v7.5M4.75 7 8 10.25 11.25 7M3 13.25h10" />
    </Svg>
  ),
  pause: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5.5 3.5v9M10.5 3.5v9" />
    </Svg>
  ),
  play: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 3.25v9.5L12.5 8z" />
    </Svg>
  ),
  close: (p: IconProps) => (
    <Svg {...p}>
      <path d="m4 4 8 8M12 4l-8 8" />
    </Svg>
  ),
}

/* ---------- Tally: the one red light, reserved for "this reference moves" ---------- */

export function Tally({ label = 'Motion' }: { label?: string }) {
  return (
    <span className="ds-tally">
      <span className="ds-tally__lamp" aria-hidden="true" />
      {label}
    </span>
  )
}

export const kindLabel = (item: Item) => (item.kind === 'component' ? 'Component' : 'Image')

/* ---------- Media frame with hover (desktop) or in-view (touch) playback ---------- */

const hoverCapable = canHover()

export function Frame({ item, eager = false, alwaysPlay = false }: { item: Item; eager?: boolean; alwaysPlay?: boolean }) {
  const inView = useInViewVideo<HTMLVideoElement>()
  const onHover = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const hoverMode = hoverCapable && !alwaysPlay
  const video = item.media.video

  const play = () => {
    if (!hoverMode || prefersReducedMotion()) return
    onHover.current?.play().catch(() => {})
  }
  const stop = () => {
    if (!hoverMode) return
    onHover.current?.pause()
  }

  return (
    <div
      className="ds-frame"
      data-loaded={loaded || undefined}
      data-playing={playing || undefined}
      onPointerEnter={play}
      onPointerLeave={stop}
    >
      <span className="ds-frame__empty" aria-hidden="true">
        {catalogCode(item)}
      </span>
      {item.media.thumb && (
        <img
          className="ds-frame__img"
          src={item.media.thumb}
          alt={`${item.title} preview`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setLoaded(true)
          }}
        />
      )}
      {video && (
        <video
          className="ds-frame__video"
          ref={hoverMode ? onHover : inView}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}
    </div>
  )
}

/* ---------- Card: a print on the light table, captioned like an archive index card ---------- */

export function Card({
  item,
  href,
  span,
  index = 0,
}: {
  item: Item
  href: string
  span?: 'lead' | 'wide'
  index?: number
}) {
  return (
    <article className="ds-card" data-span={span} style={{ '--i': Math.min(index, 7) } as CSSProperties}>
      <Link to={href} className="ds-card__link">
        <Frame item={item} eager={span === 'lead'} />
        <div className="ds-card__caption">
          <p className="ds-card__meta">
            <span className="ds-code">{catalogCode(item)}</span>
            {item.subtype && <span>{subtypeLabel(item.subtype)}</span>}
            <span className="ds-card__kind">{kindLabel(item)}</span>
            {item.animated && <Tally />}
          </p>
          <h3 className="ds-card__title">{item.title}</h3>
          <p className="ds-card__summary">{item.summary}</p>
        </div>
      </Link>
    </article>
  )
}

/* ---------- Masthead ---------- */

export function Masthead({ base, children }: { base: string; children?: ReactNode }) {
  return (
    <header className="ds-masthead">
      <div className="ds-masthead__inner">
        <Link to={base} className="ds-wordmark" aria-label="Web Design App, home">
          <span className="ds-wordmark__serif">Web Design</span>
          <span className="ds-wordmark__mono">App</span>
        </Link>
        {children}
      </div>
    </header>
  )
}
