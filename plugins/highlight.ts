import { readFile } from 'node:fs/promises'
import { codeToHtml } from 'shiki'
import type { Plugin } from 'vite'

const PREFIX = '\0highlight:'
// keeps ids like `x.css` from matching Vite's CSS request filter
const SUFFIX = '.highlight.js'
const LANGS: Record<string, string> = { tsx: 'tsx', ts: 'ts', css: 'css', js: 'js', jsx: 'jsx' }

/**
 * `import html from './file.tsx?highlight'` returns the file as Shiki-highlighted HTML,
 * rendered at build time so no highlighter ships to the browser.
 * Resolved to a \0 id so the CSS/React plugins never try to transform the source file itself.
 */
export function highlight(): Plugin {
  return {
    name: 'highlight',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith('?highlight')) return
      const resolved = await this.resolve(source.slice(0, -'?highlight'.length), importer, { skipSelf: true })
      return resolved && PREFIX + resolved.id + SUFFIX
    },
    async load(id) {
      if (!id.startsWith(PREFIX)) return
      const path = id.slice(PREFIX.length, -SUFFIX.length)
      this.addWatchFile(path)
      const html = await codeToHtml(await readFile(path, 'utf8'), {
        lang: LANGS[path.split('.').pop() ?? ''] ?? 'text',
        theme: 'vitesse-dark',
        transformers: [
          {
            pre(node) {
              // the app styles the block background; keep only the theme's text color
              node.properties.style = String(node.properties.style ?? '').replace(/background-color:[^;]+;?/, '')
              node.properties.tabindex = 0
            },
          },
        ],
      })
      return `export default ${JSON.stringify(html)}`
    },
  }
}
