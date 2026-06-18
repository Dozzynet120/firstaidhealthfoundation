import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Fix Firebase v12+ module resolution for Vite
      'firebase/app': 'firebase/app',
      'firebase/firestore': 'firebase/firestore',
      'firebase/auth': 'firebase/auth',
    }
  },
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/auth',
      'emailjs-com',
      'react-icons/fa',
      'framer-motion',
      'react-helmet-async'
    ],
    exclude: []
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})