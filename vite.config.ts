import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures assets (js/css) are looked for relative to the current folder,
  // preventing 404 errors on GitHub Pages.
  base: './', 
})