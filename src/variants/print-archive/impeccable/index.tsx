import { Route, Routes } from 'react-router'
import type { VariantProps } from '../../registry'
import { Detail, Missing } from './Detail'
import { Home } from './Home'
import { Bar } from './parts'
import './styles.css'

export default function Variant({ base }: VariantProps) {
  return (
    <div className="pa">
      <Routes>
        <Route index element={<Home base={base} />} />
        <Route path="effect/:section/:slug" element={<Detail base={base} />} />
        <Route
          path="*"
          element={
            <>
              <Bar base={base} />
              <Missing base={base} />
            </>
          }
        />
      </Routes>
    </div>
  )
}
