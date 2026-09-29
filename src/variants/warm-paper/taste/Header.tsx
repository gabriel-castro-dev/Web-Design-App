import { useContext, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { searchItems, sections } from '../../../data/catalog'
import { ActiveSection, jumpToSection, prefersReducedMotion, sectionAnchor, tintOf } from './shared'

export function Header({ base }: { base: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const onHome = location.pathname.replace(/\/$/, '') === base
  const { active } = useContext(ActiveSection)
  const inputRef = useRef<HTMLInputElement>(null)
  const railRef = useRef<HTMLUListElement>(null)

  // Sections with nothing matching the current search are dimmed in the rail.
  const matching = useMemo(
    () => (query ? new Set(searchItems(query).map((i) => i.section)) : null),
    [query],
  )

  const setQuery = (value: string) =>
    navigate(
      { pathname: base, search: value ? `?q=${encodeURIComponent(value)}` : '' },
      { replace: onHome },
    )

  // "/" focuses search, like most reading tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, [contenteditable="true"]')) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  // Keep the active section visible inside the horizontally scrolling rail.
  useEffect(() => {
    const rail = railRef.current
    if (!rail || rail.scrollWidth <= rail.clientWidth) return
    const link = rail.querySelector<HTMLElement>('[aria-current="location"]')
    const left = link ? link.offsetLeft - rail.clientWidth / 2 + link.offsetWidth / 2 : 0
    rail.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [active])

  return (
    <header className="wp-header">
      <div className="wp-wrap wp-header-inner">
        <Link to={base} className="wp-brand" aria-label="Web Design App, all references">
          Web Design <em>App</em>
        </Link>

        <nav className="wp-rail-nav" aria-label="Sections">
          <ul className="wp-rail" ref={railRef}>
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={{ pathname: base, search: onHome ? location.search : '', hash: sectionAnchor(s.id) }}
                  onClick={(e) => {
                    if (!onHome) return
                    e.preventDefault()
                    jumpToSection(s.id)
                  }}
                  className="wp-rail-link"
                  style={tintOf(s.id)}
                  aria-current={active === s.id ? 'location' : undefined}
                  data-dim={matching && !matching.has(s.id) ? '' : undefined}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div role="search" className="wp-search">
          <label htmlFor="wp-search-input" className="wp-sr">
            Search references
          </label>
          <input
            ref={inputRef}
            id="wp-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && query && setQuery('')}
            placeholder="Search references"
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button type="button" className="wp-search-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }}>
              Clear
            </button>
          ) : (
            <kbd className="wp-kbd" aria-hidden="true">/</kbd>
          )}
        </div>
      </div>
    </header>
  )
}
