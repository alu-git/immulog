import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base path to ensure flexibility on GitHub Pages (handles /repo-name/ or custom domains)
  base: './', 
})