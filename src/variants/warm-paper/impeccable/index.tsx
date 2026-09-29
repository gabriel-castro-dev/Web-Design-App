import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import type { VariantProps } from '../../registry'
import { items, sections } from '../../../data/catalog'
import { Header } from './Header'
import { Home } from './Home'
import { Detail } from './Detail'
import './styles.css'

function Footer({ base }: { base: string }) {
  return (
    <footer className="wp-foot">
      <div className="wp-page wp-foot-inner">
        <p>
          <em>Web Design App</em>, {items.length} references in {sections.length} sections. Set in Castoro and Schibsted
          Grotesk.
        </p>
        <Link to={base} className="wp-link" onClick={() => window.scrollTo({ top: 0 })}>
          Back to contents
        </Link>
      </div>
    </footer>
  )
}

function Lost({ base }: { base: string }) {
  return (
    <div className="wp-page wp-missing">
      <h1>This page is not bound in</h1>
      <p>The address does not match any page of the library.</p>
      <Link to={base} className="wp-btn wp-btn-primary">
        Back to all references
      </Link>
    </div>
  )
}

export default function Variant({ base }: VariantProps) {
  const [active, setActive] = useState<string>()

  useEffect(() => {
    const previous = document.title
    document.title = 'Web Design App'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="wp">
      <a href="#wp-main" className="wp-skip">
        Skip to content
      </a>
      <Header base={base} active={active} />
      <main id="wp-main" tabIndex={-1}>
        <Routes>
          <Route index element={<Home base={base} onActive={setActive} />} />
          <Route path="effect/:section/:slug" element={<Detail base={base} onActive={setActive} />} />
          <Route path="*" element={<Lost base={base} />} />
        </Routes>
      </main>
      <Footer base={base} />
    </div>
  )
}
