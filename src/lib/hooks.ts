import { useEffect, useRef, useState } from 'react'
import type { Item, SourceFile } from '../data/types'

/** Loads an item's README. `loading` tells a pending fetch apart from an empty README. */
export function useReadme(item: Item | undefined) {
  // results are tagged with their item id, so a stale README never shows for a new item
  const [state, setState] = useState<{ id?: string; text: string }>({ text: '' })
  useEffect(() => {
    let alive = true
    item
      ?.readme()
      .catch(() => '')
      .then((text) => alive && setState({ id: item.id, text }))
    return () => {
      alive = false
    }
  }, [item])
  const current = !!item && state.id === item.id
  return { text: current ? state.text : '', loading: !current }
}

/** Loads every source file of an item: raw text plus build-time highlighted HTML. */
export function useSourceFiles(item: Item | undefined) {
  const [state, setState] = useState<{ id?: string; files: { file: SourceFile; code: string; html: string }[] }>({
    files: [],
  })
  useEffect(() => {
    let alive = true
    if (item)
      Promise.all(
        item.files.map(async (file) => ({ file, code: await file.load(), html: await file.loadHtml() })),
      ).then((files) => alive && setState({ id: item.id, files }))
    return () => {
      alive = false
    }
  }, [item])
  return item && state.id === item.id ? state.files : []
}

/**
 * Attach to a <video preload="none" muted loop playsInline>: plays while on screen,
 * pauses off screen, and stays paused under prefers-reduced-motion.
 */
export function useInViewVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const video = ref.current
    if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return ref
}
