import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Home } from './app/Home'
import './app/styles.css'

// Detail pulls in markdown rendering and zip support; keep them out of the Home bundle.
const Detail = lazy(() => import('./app/Detail').then((m) => ({ default: m.Detail })))

// Dark Studio (chosen in the bake-off): a quiet, media-first archive on warm near-black.
function App() {
  return (
    <div className="ds-taste" id="top">
      <Suspense fallback={null}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="effect/:section/:slug" element={<Detail />} />
          <Route path="*" element={<Detail />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
