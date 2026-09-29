import { lazy, type ComponentType } from 'react'

// Bake-off: 3 visual directions x 2 implementations (impeccable, taste-skill).
// Each variant lives in src/variants/<direction>/<impl>/index.tsx and default-exports
// a component that renders its own Home (index route) and Detail (`effect/:section/:slug`).
export interface VariantProps {
  /** Absolute path of the variant root, e.g. `/variants/print-archive/impeccable`. Build links as `${base}/effect/${item.id}`. */
  base: string
}

export const DIRECTIONS = [
  { id: 'print-archive', label: 'Print Archive' },
  { id: 'dark-studio', label: 'Dark Studio' },
  { id: 'warm-paper', label: 'Warm Paper' },
] as const

export const IMPLS = [
  { id: 'impeccable', label: 'Impeccable' },
  { id: 'taste', label: 'Taste-Skill' },
] as const

const modules = import.meta.glob<{ default: ComponentType<VariantProps> }>('./*/*/index.tsx')

const cache = new Map<string, ComponentType<VariantProps>>()

export function getVariant(direction: string, impl: string) {
  const key = `./${direction}/${impl}/index.tsx`
  if (!modules[key]) return undefined
  if (!cache.has(key)) cache.set(key, lazy(modules[key]))
  return cache.get(key)
}
