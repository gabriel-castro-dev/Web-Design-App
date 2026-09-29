import { useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import { items, sections } from '../../../data/catalog'
import type { VariantProps } from '../../registry'
import { Detail, Missing } from './Detail'
import { Header } from './Header'
import { Home } from './Home'
import { ActiveSection } from './shared'
import './styles.css'

// Warm Paper, taste-skill implementation: a calm editorial magazine for the reference library.
export default function Variant({ base }: VariantProps) {
  const [active, setActive] = useState<string | null>(null)
  const context = useMemo(() => ({ active, setActive }), [active])

  return (
    <ActiveSection.Provider value={context}>
      <div className="wp-root">
        <a href="#wp-main" className="wp-skip">
          Skip to content
        </a>
        <Header base={base} />
        <Routes>
          <Route index element={<Home base={base} />} />
          <Route path="effect/:section/:slug" element={<Detail base={base} />} />
          <Route path="*" element={<Missing base={base} />} />
        </Routes>
        <footer className="wp-footer">
          <div className="wp-wrap wp-footer-inner">
            <Link to={base} className="wp-brand">
              Web Design <em>App</em>
            </Link>
            <p>
              A personal library of {items.length} interface references in {sections.length} sections, kept for
              briefing agents.
            </p>
          </div>
        </footer>
      </div>
    </ActiveSection.Provider>
  )
}
