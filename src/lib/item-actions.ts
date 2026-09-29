import JSZip from 'jszip'
import type { Item, SourceFile } from '../data/types'

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

export async function downloadFile(file: SourceFile) {
  saveBlob(new Blob([await file.load()], { type: 'text/plain' }), file.name)
}

/** Zips README, source files and previews into `<slug>.zip`. */
export async function downloadZip(item: Item) {
  const zip = new JSZip()
  const folder = zip.folder(item.slug)!
  folder.file('README.md', await item.readme())
  for (const file of item.files) folder.file(file.name, await file.load())
  const media: [string, string | undefined][] = [
    ['preview.webp', item.media.image],
    ['preview.mp4', item.media.video],
  ]
  for (const [name, url] of media) {
    if (!url) continue
    const data: ArrayBuffer = await (await fetch(url)).arrayBuffer()
    folder.file(name, data)
  }
  saveBlob(await zip.generateAsync({ type: 'blob' }), `${item.slug}.zip`)
}
