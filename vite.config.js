import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Plugin to copy _redirects after build
      name: 'copy-redirects',
      closeBundle() {
        const src = resolve(__dirname, 'public/_redirects')
        const dest = resolve(__dirname, 'dist/_redirects')
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
          console.log('✅ _redirects file copied to dist/')
        } else {
          console.warn('⚠️  _redirects file not found in public/')
        }
      }
    }
  ],
  base: '/', // important for correct routing on Render
})
