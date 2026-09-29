import { useCallback, useEffect, useState } from 'react'
import { DIRECTIONS, IMPLS } from '../variants/registry'

type View = 'split' | 'left' | 'right'
const VIEWS: View[] = ['split', 'left', 'right']

// State lives in the hash (#<direction>/<view>) so a reload keeps your place.
function readHash() {
  const [dir, view] = location.hash.slice(1).split('/')
  return {
    dir: DIRECTIONS.some((d) => d.id === dir) ? dir : DIRECTIONS[0].id,
    view: (VIEWS.includes(view as View) ? view : 'split') as View,
  }
}

export function Bakeoff() {
  const [{ dir, view }, setState] = useState(readHash)

  useEffect(() => {
    history.replaceState(null, '', `#${dir}/${view}`)
  }, [dir, view])

  const onKey = useCallback((e: KeyboardEvent) => {
    // instanceof fails for elements from an iframe's window, so check by tag
    if ((e.target as Element | null)?.closest?.('input, textarea, [contenteditable]')) return
    const n = Number(e.key)
    if (n >= 1 && n <= DIRECTIONS.length) setState((s) => ({ ...s, dir: DIRECTIONS[n - 1].id }))
    if (e.key === 'f' || e.key === 'F')
      setState((s) => ({ ...s, view: VIEWS[(VIEWS.indexOf(s.view) + 1) % VIEWS.length] }))
  }, [])

  useEffect(() => {
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [onKey])

  // Keys pressed while focus is inside a (same-origin) iframe never reach this window.
  const hookFrame = (frame: HTMLIFrameElement) => frame.contentWindow?.addEventListener('keydown', onKey)

  return (
    <div className="flex h-dvh flex-col bg-[#1c1712] font-mono text-[#e9dfd0]">
      <header className="flex flex-wrap items-center gap-2 border-b border-[#3a2f25] px-4 py-3 text-xs tracking-[0.12em] uppercase">
        <span className="mr-3 leading-tight text-[#8a7b69]">
          Bake-off
          <br />
          Collection:
        </span>
        {DIRECTIONS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setState((s) => ({ ...s, dir: d.id }))}
            className={`border px-4 py-2 transition-colors ${
              d.id === dir
                ? 'border-[#e0662a] bg-[#e0662a] text-[#1c1712]'
                : 'border-[#4a3d31] hover:border-[#8a7b69]'
            }`}
          >
            <span className="mr-2 opacity-50">{i + 1}</span>
            {d.label}
          </button>
        ))}
        <span className="ml-auto text-[#8a7b69]">
          Left = Impeccable · Right = Taste-Skill · Keys 1–{DIRECTIONS.length} · F = {view}
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {IMPLS.map((impl, i) => {
          const hidden = (view === 'left' && i === 1) || (view === 'right' && i === 0)
          return (
            <section
              key={impl.id}
              className={`flex min-w-0 flex-1 flex-col ${hidden ? 'hidden' : ''} ${i === 1 ? 'border-l-2 border-[#e0662a]' : ''}`}
            >
              <div className="flex justify-between border-b border-[#3a2f25] px-4 py-2 text-[11px] tracking-[0.14em] uppercase">
                <span className={i === 0 ? 'text-[#e0662a]' : 'text-[#7fb8a8]'}>{impl.label}</span>
                <span>{DIRECTIONS.find((d) => d.id === dir)?.label}</span>
              </div>
              <iframe
                key={`${dir}-${impl.id}`}
                onLoad={(e) => hookFrame(e.currentTarget)}
                src={`/variants/${dir}/${impl.id}/`}
                title={`${dir} / ${impl.label}`}
                className="min-h-0 flex-1 bg-white"
              />
            </section>
          )
        })}
      </div>
    </div>
  )
}
