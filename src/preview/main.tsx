import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './preview.css'
import { Preview } from './Preview'

// preview.html?item=<section>/<slug>[&theme=dark]
const params = new URLSearchParams(location.search)
document.documentElement.classList.toggle('dark', params.get('theme') === 'dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview id={params.get('item') ?? ''} />
  </StrictMode>,
)
