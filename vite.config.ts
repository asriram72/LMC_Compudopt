import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://asriram72.github.io/LMC_Compudopt/
  base: '/LMC_Compudopt/',
  plugins: [react(), tailwindcss()],
})
