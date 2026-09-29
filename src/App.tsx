import { Route, Routes } from 'react-router'
import { sections } from './data/catalog'

// Placeholder shell until the bake-off picks a visual direction.
function Index() {
  return (
    <main className="p-8 font-mono text-sm">
      <h1 className="mb-4">Web Design App</h1>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            {s.label}: {s.items.length}
            {s.subtypes.length > 0 && ` (${s.subtypes.join(', ')})`}
          </li>
        ))}
      </ul>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  )
}

export default App
