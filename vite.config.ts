import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { highlight } from './plugins/highlight.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [highlight(), react(), tailwindcss()],
})
