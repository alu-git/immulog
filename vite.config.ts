import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base path to ensure flexibility on GitHub Pages (handles /repo-name/ or custom domains)
  base: './', 
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
})