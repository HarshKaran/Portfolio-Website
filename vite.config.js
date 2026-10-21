import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // three.js lives in its own lazy-loaded chunk (~800 kB), so the default 500 kB warning is expected
  build: { chunkSizeWarningLimit: 900 },
})
