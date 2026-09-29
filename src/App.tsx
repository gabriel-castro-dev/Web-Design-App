import { Route, Routes } from 'react-router'
import { Detail } from './app/Detail'
import { Home } from './app/Home'
import './app/styles.css'

// Dark Studio (chosen in the bake-off): a quiet, media-first archive on warm near-black.
function App() {
  return (
    <div className="ds-taste" id="top">
      <Routes>
        <Route index element={<Home />} />
        <Route path="effect/:section/:slug" element={<Detail />} />
        <Route path="*" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
