import { SECTION_ORDER, sectionLabel } from './sections'
import type { Item, ItemMeta, Section, SourceFile } from './types'

// Every item is a folder: design-references/<section>/<slug>/ with meta.json, README.md,
// previews and (for components) source files. Vite resolves these at build time, so
// adding a folder is all it takes to publish a new reference.
const metas = import.meta.glob<ItemMeta>('/design-references/*/*/meta.json', {
  eager: true,
  import: 'default',
})
const readmes = import.meta.glob<string>('/design-references/*/*/README.md', {
  query: '?raw',
  import: 'default',
})
const thumbs = import.meta.glob<string>('/design-references/*/*/preview.thumb.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
const images = import.meta.glob<string>('/design-references/*/*/preview.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
const videos = import.meta.glob<string>('/design-references/*/*/preview.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
})
const sources = import.meta.glob<string>('/design-references/*/*/*.{tsx,ts,css}', {
  query: '?raw',
  import: 'default',
})

const highlighted = import.meta.glob<string>('/design-references/*/*/*.{tsx,ts,css}', {
  query: '?highlight',
  import: 'default',
})

const ROOT = '/design-references/'

function filesOf(dir: string): SourceFile[] {
  return Object.entries(sources)
    .filter(([path]) => path.startsWith(dir))
    .map(([path, load]) => ({ name: path.slice(dir.length), load, loadHtml: highlighted[path] }))
    // component first, demo last
    .sort((a, b) => Number(a.name === 'demo.tsx') - Number(b.name === 'demo.tsx') || a.name.localeCompare(b.name))
}

export const items: Item[] = Object.entries(metas)
  .map(([path, meta]) => {
    const dir = path.slice(0, -'meta.json'.length)
    const id = dir.slice(ROOT.length, -1)
    return {
      ...meta,
      // meta.section wins so an item can be re-filed without moving its folder
      section: meta.section ?? id.split('/')[0],
      id,
      slug: id.split('/')[1],
      media: {
        thumb: thumbs[`${dir}preview.thumb.webp`],
        image: images[`${dir}preview.webp`],
        video: videos[`${dir}preview.mp4`],
      },
      readme: readmes[`${dir}README.md`] ?? (async () => ''),
      files: filesOf(dir),
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title))

const order = Object.keys(SECTION_ORDER)
const rank = (id: string) => (order.includes(id) ? order.indexOf(id) : order.length)

export const sections: Section[] = [...new Set(items.map((i) => i.section))]
  .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
  .map((id) => {
    const sectionItems = items.filter((i) => i.section === id)
    const subtypes = [...new Set(sectionItems.flatMap((i) => (i.subtype ? [i.subtype] : [])))].sort()
    return { id, label: sectionLabel(id), items: sectionItems, subtypes }
  })

export const getItem = (id: string) => items.find((i) => i.id === id)

/** Case-insensitive match over title, summary, tags, stack, section and subtype. */
export function searchItems(query: string, pool: Item[] = items) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return pool
  return pool.filter((i) => {
    const haystack = [i.title, i.summary, i.section, i.subtype ?? '', ...i.tags, ...i.stack]
      .join(' ')
      .toLowerCase()
    return terms.every((t) => haystack.includes(t))
  })
}
