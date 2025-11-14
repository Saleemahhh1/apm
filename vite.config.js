import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // VERY IMPORTANT domin correct paths a production
  build: {
    outDir: 'dist', // ensure build output folder
    sourcemap: true // optional: idan kana so ka gani runtime errors a browser console
  }
})
