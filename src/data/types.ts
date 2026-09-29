export type ItemKind = 'component' | 'image'

export interface ItemMeta {
  title: string
  section: string
  subtype: string | null
  kind: ItemKind
  source: { name: string; url: string }
  tags: string[]
  animated: boolean
  stack: string[]
  summary: string
}

export interface SourceFile {
  name: string
  load: () => Promise<string>
}

export interface Item extends ItemMeta {
  /** `<section>/<folder>`, also the detail route path */
  id: string
  slug: string
  media: {
    thumb?: string
    image?: string
    video?: string
  }
  readme: () => Promise<string>
  files: SourceFile[]
}

export interface Section {
  id: string
  label: string
  items: Item[]
  /** subtype ids present in this section, in display order */
  subtypes: string[]
}
