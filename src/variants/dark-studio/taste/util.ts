import { useEffect, useRef } from 'react'
import type { Item } from '../../../data/types'

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export const kindLabel = (item: Item) => (item.kind === 'component' ? 'Component' : 'Image')

/** Fades an element up once it enters the viewport. Collapses to static under reduced motion. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.dataset.in = 'true'
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.in = 'true'
        io.disconnect()
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
