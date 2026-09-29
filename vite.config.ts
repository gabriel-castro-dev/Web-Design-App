import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { agentCatalog } from './plugins/agent-catalog.ts'
import { highlight } from './plugins/highlight.ts'

// Absolute links in catalog.json / llms.txt. Vercel sets the production domain at build time.
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://web-design-app.vercel.app'

// https://vite.dev/config/
export default defineConfig({
  plugins: [highlight(), react(), tailwindcss(), agentCatalog({ site })],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        preview: fileURLToPath(new URL('./preview.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
