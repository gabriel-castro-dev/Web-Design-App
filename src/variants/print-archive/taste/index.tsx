import { Route, Routes } from 'react-router'
import type { VariantProps } from '../../registry'
import { Detail } from './Detail'
import { Home } from './Home'
import './styles.css'

// Print Archive / taste-skill: a print-shop proof sheet for the reference library.
// Swiss grid, Archivo condensed display + IBM Plex Mono, raw newsprint, one signal orange.
export default function Variant({ base }: VariantProps) {
  return (
    <div className="pa">
      <Routes>
        <Route index element={<Home base={base} />} />
        <Route path="effect/:section/:slug" element={<Detail base={base} />} />
        <Route path="*" element={<Detail base={base} />} />
      </Routes>
    </div>
  )
}
