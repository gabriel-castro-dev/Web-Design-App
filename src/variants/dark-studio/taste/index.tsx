import { Route, Routes } from 'react-router'
import type { VariantProps } from '../../registry'
import { Detail } from './Detail'
import { Home } from './Home'
import './styles.css'

// Dark Studio, built with taste-skill: a quiet, media-first archive on warm near-black.
export default function Variant({ base }: VariantProps) {
  return (
    <div className="ds-taste" id="top">
      <Routes>
        <Route index element={<Home base={base} />} />
        <Route path="effect/:section/:slug" element={<Detail base={base} />} />
        <Route path="*" element={<Detail base={base} />} />
      </Routes>
    </div>
  )
}
