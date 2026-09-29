import { useEffect, useRef, useState } from 'react'
import type { Item, SourceFile } from '../data/types'

/** Loads an item's README. `loading` tells a pending fetch apart from an empty README. */
export function useReadme(item: Item | undefined) {
  const [state, setState] = useState({ text: '', loading: true })
  useEffect(() => {
    let alive = true
    setState({ text: '', loading: true })
    item
      ?.readme()
      .catch(() => '')
      .then((text) => alive && setState({ text, loading: false }))
    return () => {
      alive = false
    }
  }, [item])
  return state
}

/** Loads every source file of an item: raw text plus build-time highlighted HTML. */
export function useSourceFiles(item: Item | undefined) {
  const [files, setFiles] = useState<{ file: SourceFile; code: string; html: string }[]>([])
  useEffect(() => {
    let alive = true
    setFiles([])
    if (item)
      Promise.all(
        item.files.map(async (file) => ({ file, code: await file.load(), html: await file.loadHtml() })),
      ).then((loaded) => alive && setFiles(loaded))
    return () => {
      alive = false
    }
  }, [item])
  return files
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
