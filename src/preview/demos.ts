import type { ComponentType } from 'react'

type DemoModule = Record<string, unknown> & { default?: ComponentType }

// Each component reference ships a demo.tsx. Loaded on demand, one chunk per demo.
const demos = import.meta.glob<DemoModule>('/design-references/*/*/demo.tsx')

const pathOf = (id: string) => `/design-references/${id}/demo.tsx`

export const hasDemo = (id: string) => pathOf(id) in demos

/** Resolves the demo component: the default export, else the first exported component. */
export async function loadDemo(id: string): Promise<ComponentType | undefined> {
  const load = demos[pathOf(id)]
  if (!load) return undefined
  const mod = await load()
  return mod.default ?? (Object.values(mod).find((v) => typeof v === 'function') as ComponentType | undefined)
}
