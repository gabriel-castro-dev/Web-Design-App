import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { SECTION_ORDER, sectionLabel } from '../src/data/sections.ts'

const SOURCE_EXT = /\.(tsx|ts|css)$/

interface Meta {
  title: string
  section: string
  subtype: string | null
  kind: 'component' | 'image'
  source: { name: string; url: string }
  tags: string[]
  animated: boolean
  stack: string[]
  summary: string
}

interface Entry {
  id: string
  dir: string
  meta: Meta
  readme: string
  files: string[]
}

function readEntries(root: string): Entry[] {
  const entries: Entry[] = []
  for (const section of readdirSync(root, { withFileTypes: true })) {
    if (!section.isDirectory()) continue
    for (const item of readdirSync(join(root, section.name), { withFileTypes: true })) {
      const dir = join(root, section.name, item.name)
      if (!item.isDirectory() || !existsSync(join(dir, 'meta.json'))) continue
      const meta: Meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'))
      const readmePath = join(dir, 'README.md')
      entries.push({
        id: `${section.name}/${item.name}`,
        dir,
        meta: { ...meta, section: meta.section ?? section.name },
        readme: existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : '',
        files: readdirSync(dir).filter((f) => SOURCE_EXT.test(f)).sort(),
      })
    }
  }
  const order = Object.keys(SECTION_ORDER)
  const rank = (id: string) => (order.includes(id) ? order.indexOf(id) : order.length)
  return entries.sort(
    (a, b) => rank(a.meta.section) - rank(b.meta.section) || a.meta.title.localeCompare(b.meta.title),
  )
}

/**
 * Emits machine-readable views of design-references/ for AI agents:
 * - /refs/<section>/<item>/README.md and source files, served as plain text
 * - /catalog.json: every item with metadata and absolute links
 * - /llms.txt: an llmstxt.org index; /llms-full.txt: every README in one file
 */
export function agentCatalog({ site }: { site: string }): Plugin {
  let root = ''
  return {
    name: 'agent-catalog',
    apply: 'build',
    configResolved(config) {
      root = resolve(config.root, 'design-references')
    },
    generateBundle(_, bundle) {
      const entries = readEntries(root)

      // preview media is already emitted as hashed assets by the app; link to those
      const assetUrl = (absPath: string) => {
        const rel = absPath.replaceAll('\\', '/').split('/design-references/')[1]
        for (const out of Object.values(bundle)) {
          if (out.type === 'asset' && out.originalFileNames?.some((n) => n.endsWith(`design-references/${rel}`)))
            return `${site}/${out.fileName}`
        }
        return undefined
      }

      const items = entries.map(({ id, dir, meta, readme, files }) => {
        const refs = `${site}/refs/${id}`
        this.emitFile({ type: 'asset', fileName: `refs/${id}/README.md`, source: readme })
        this.emitFile({ type: 'asset', fileName: `refs/${id}/meta.json`, source: JSON.stringify(meta, null, 2) })
        for (const f of files)
          this.emitFile({ type: 'asset', fileName: `refs/${id}/${f}`, source: readFileSync(join(dir, f), 'utf8') })
        return {
          id,
          ...meta,
          page: `${site}/effect/${id}`,
          readme: `${refs}/README.md`,
          files: files.map((f) => `${refs}/${f}`),
          live: existsSync(join(dir, 'demo.tsx')) ? `${site}/preview.html?item=${id}` : undefined,
          preview: assetUrl(join(dir, 'preview.webp')),
          video: existsSync(join(dir, 'preview.mp4')) ? assetUrl(join(dir, 'preview.mp4')) : undefined,
        }
      })

      const sectionIds = [...new Set(items.map((i) => i.section))]
      const sections = sectionIds.map((id) => ({
        id,
        label: sectionLabel(id),
        count: items.filter((i) => i.section === id).length,
      }))

      this.emitFile({
        type: 'asset',
        fileName: 'catalog.json',
        source: JSON.stringify(
          {
            name: 'Web Design Library',
            description:
              'Curated web design references (components, sections, app screens) with agent-ready descriptions and code.',
            site,
            count: items.length,
            sections,
            items,
          },
          null,
          2,
        ),
      })

      const intro = [
        '# Web Design Library',
        '',
        "> A curated library of web design references that reflect the owner's taste: reconstructed React components (Tailwind, motion) and annotated app/site screens. Each item has a README written for AI agents: what it looks like, how it works, and how to reproduce it without generic AI styling.",
        '',
        `Use a README as the style and behavior brief when building something similar. Component items also link their source files (.tsx). Machine-readable index: ${site}/catalog.json. All READMEs in one file: ${site}/llms-full.txt.`,
      ]
      const index = sections.flatMap((s) => [
        '',
        `## ${s.label}`,
        '',
        ...items
          .filter((i) => i.section === s.id)
          .map((i) => {
            const facts = [i.kind, i.subtype, i.animated ? 'animated' : null, i.stack.join(', ') || null]
            return `- [${i.title}](${i.readme}): ${i.summary} (${facts.filter(Boolean).join('; ')})`
          }),
      ])
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: [...intro, ...index, ''].join('\n') })

      const full = entries.map(({ id, meta, readme }, n) =>
        [
          `<!-- ${n + 1}/${entries.length} · ${id} · ${site}/effect/${id} -->`,
          readme.trim() || `# ${meta.title}\n\n${meta.summary}`,
        ].join('\n'),
      )
      this.emitFile({
        type: 'asset',
        fileName: 'llms-full.txt',
        source: [...intro, '', '---', '', full.join('\n\n---\n\n'), ''].join('\n'),
      })
    },
  }
}
