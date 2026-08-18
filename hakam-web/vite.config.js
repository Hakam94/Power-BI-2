import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this as a project site at /hakam-data-studio/, so
  // asset paths need that prefix there. Vercel (and any custom domain)
  // serves from the root, so base stays "/" unless GH_PAGES is set by
  // that workflow specifically.
  base: process.env.GH_PAGES ? '/hakam-data-studio/' : '/',
  plugins: [react(), tailwindcss()],
})
