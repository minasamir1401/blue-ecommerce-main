import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set base to repository name for correct asset paths when deployed to GitHub Pages
  base: "/blue-ecommerce-main/",
  plugins: [react()],
})
