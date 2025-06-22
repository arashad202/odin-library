import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/odin-library/',
  plugins: [
    tailwindcss(),
  ],
})