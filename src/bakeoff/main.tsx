import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Bakeoff } from './Bakeoff'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bakeoff />
  </StrictMode>,
)
