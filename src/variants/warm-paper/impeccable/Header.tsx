import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { sections } from '../../../data/catalog'
import { Icon, toneOf } from './shared'

export function Header({ base, active }: { base: string; active?: string }) {
  const [params, setParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const query = params.get('q') ?? ''
  const onHome = pathname.replace(/\/$/, '') === base
  const input = useRef<HTMLInputElement>(null)
  const nav = useRef<HTMLElement>(null)

  const setQuery = (value: string) => {
    if (onHome) setParams(value ? { q: value } : {}, { replace: true })
    else navigate(value ? `${base}?q=${encodeURIComponent(value)}` : base)
  }

  // "/" focuses search, like most reading tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      if (target.closest('input, textarea, [contenteditable="true"]')) return
      e.preventDefault()
      input.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Keep the active section visible in the horizontally scrolling nav.
  useEffect(() => {
    const list = nav.current
    const link = list?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!list || !link || list.scrollWidth <= list.clientWidth) return
    const left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2
    list.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  return (
    <header className="wp-head">
      <div className="wp-page wp-head-inner">
        <Link to={base} className="wp-mark" aria-label="Web Design App, home">
          Web Design <em>App</em>
        </Link>

        <nav className="wp-nav" aria-label="Sections" ref={nav}>
          <ul>
            {sections.map((s) => (
              <li key={s.id} data-tone={toneOf(s.id)}>
                <Link to={`${base}#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="wp-search" role="search">
          <Icon.search />
          <label htmlFor="wp-q" className="wp-sr">
            Search references
          </label>
          <input
            ref={input}
            id="wp-q"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search references"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && query) {
                e.preventDefault()
                setQuery('')
              }
            }}
          />
          {query ? (
            <button type="button" className="wp-clear" aria-label="Clear search" onClick={() => {
              setQuery('')
              input.current?.focus()
            }}>
              <Icon.close />
            </button>
          ) : (
            <kbd aria-hidden="true">/</kbd>
          )}
        </div>
      </div>
    </header>
  )
}
