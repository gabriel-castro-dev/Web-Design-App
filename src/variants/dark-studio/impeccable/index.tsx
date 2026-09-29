import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import type { VariantProps } from '../../registry'
import { Detail } from './Detail'
import { Home } from './Home'
import './styles.css'

// Bodoni Moda (display, optical sizes) · Hanken Grotesk (UI, reading) · Fragment Mono (edge codes, source)
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Fragment+Mono:ital@0;1&family=Hanken+Grotesk:ital,wght@0,300..700;1,300..700&display=swap'

function useFonts() {
  useEffect(() => {
    if (document.getElementById('ds-fonts')) return
    const pre = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' })
    const css = Object.assign(document.createElement('link'), { id: 'ds-fonts', rel: 'stylesheet', href: FONTS_HREF })
    document.head.append(pre, css)
  }, [])
}

export default function Variant({ base }: VariantProps) {
  useFonts()

  // The page canvas belongs to the variant while it is mounted (overscroll, scrollbars, selection).
  useEffect(() => {
    document.documentElement.classList.add('ds-canvas')
    return () => document.documentElement.classList.remove('ds-canvas')
  }, [])

  return (
    <div className="ds-root">
      <Routes>
        <Route index element={<Home base={base} />} />
        <Route path="effect/:section/:slug" element={<Detail base={base} />} />
        <Route path="*" element={<Detail base={base} />} />
      </Routes>
    </div>
  )
}
