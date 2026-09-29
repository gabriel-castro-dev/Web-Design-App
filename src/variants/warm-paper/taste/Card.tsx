import { useState } from 'react'
import { Link } from 'react-router'
import type { Item } from '../../../data/types'
import { subtypeLabel } from '../../../data/sections'
import { useInViewVideo } from '../../../lib/hooks'
import type { Shape } from './shared'

export function MotionMark() {
  return (
    <span className="wp-motion">
      <span className="wp-motion-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      Animated
    </span>
  )
}

function Media({ item, large }: { item: Item; large: boolean }) {
  const videoRef = useInViewVideo<HTMLVideoElement>()
  const [playing, setPlaying] = useState(false)
  const src = large ? (item.media.image ?? item.media.thumb) : (item.media.thumb ?? item.media.image)
  return (
    <div className="wp-media">
      {src ? (
        <img src={src} alt={`Preview of ${item.title}`} loading="lazy" decoding="async" />
      ) : (
        <span className="wp-media-empty">No preview yet</span>
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
  )
}

export function Card({ item, base, shape }: { item: Item; base: string; shape: Shape }) {
  const large = shape !== 'std' && shape !== 'wide'
  return (
    <article className={`wp-card wp-card--${shape === 'lead-flip' ? 'lead wp-card--flip' : shape}`}>
      <Media item={item} large={large} />
      <div className="wp-card-body">
        <h3 className="wp-card-title">
          <Link to={`${base}/effect/${item.id}`} className="wp-card-link">
            <span>{item.title}</span>
          </Link>
        </h3>
        <p className="wp-card-summary">{item.summary}</p>
        <p className="wp-card-meta">
          <span className="wp-kind" data-kind={item.kind}>
            {item.kind === 'component' ? 'Component' : 'Image'}
          </span>
          {item.subtype && <span>{subtypeLabel(item.subtype)}</span>}
          {item.animated && <MotionMark />}
        </p>
      </div>
    </article>
  )
}
