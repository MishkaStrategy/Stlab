import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Stlab/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        works: 'works/index.html',
      },
    },
  },
})
