import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relativa: o site funciona em qualquer pasta (GitHub Pages, artifact, servidor estático)
export default defineConfig({
  base: './',
  plugins: [react()],
})
