import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wildVault from './vite-plugin-wild-vault.js'

export default defineConfig({
  plugins: [wildVault(), react()],
  base: '/SGE/',
  build: {
    rollupOptions: {
      output: {
        // React in its own chunk so it stays cached across deploys; the app
        // chunk changes with every release, React does not.
        manualChunks(id) {
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor-react'
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
