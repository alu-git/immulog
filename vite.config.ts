import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // explicit repo name is safer than './' for GitHub Pages routing
  base: '/immulog/', 
})