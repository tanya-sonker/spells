import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VERCEL ? '/' : '/spells/'

export default defineConfig({
  base,
  plugins: [react()],
})
