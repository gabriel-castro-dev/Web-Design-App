import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import type { Item } from '../../../data/types'
import { subtypeLabel } from '../../../data/sections'
import { useInViewVideo } from '../../../lib/hooks'
import { Icon, type Cell } from './shared'

function PlateVideo({ item }: { item: Item }) {
  const ref = useInViewVideo<HTMLVideoElement>()
  return (
    <video
      ref={ref}
      src={item.media.video}
      poster={item.media.thumb}
      preload="none"
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  )
}

export function Kind({ item }: { item: Item }) {
  return (
    <span className="wp-kind">
      {item.kind === 'component' ? <Icon.code /> : <Icon.image />}
      {item.kind === 'component' ? 'Component' : 'Image'}
    </span>
  )
}

export function Motion() {
  return (
    <span className="wp-motion">
      <span className="wp-pulse" aria-hidden="true" />
      Animated
    </span>
  )
}

export function Tile({ item, cell, base }: { item: Item; cell: Cell; base: string }) {
  const titleId = `wp-t-${item.id.replace('/', '--')}`
  return (
    <li
      style={{ '--span': cell.span, '--rows': cell.rows } as CSSProperties}
      data-wide={cell.wide || undefined}
    >
      <Link
        to={`${base}/effect/${item.id}`}
        className="wp-tile"
        data-size={cell.size}
        data-orient={cell.orient}
        aria-labelledby={titleId}
      >
        <div className="wp-plate">
          {item.media.video ? (
            <PlateVideo item={item} />
          ) : item.media.thumb ? (
            <img src={item.media.thumb} alt={`Preview of ${item.title}`} loading="lazy" decoding="async" />
          ) : null}
        </div>
        <div className="wp-cap">
          <h3 className="wp-tile-title" id={titleId}>
            {item.title}
          </h3>
          {item.summary && <p className="wp-tile-sum">{item.summary}</p>}
          <p className="wp-meta">
            <Kind item={item} />
            {item.animated && <Motion />}
            {item.subtype && <span>{subtypeLabel(item.subtype)}</span>}
          </p>
        </div>
      </Link>
    </li>
  )
}
