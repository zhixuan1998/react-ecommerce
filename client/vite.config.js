import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @use "./src/assets/styles/scss/_mixins.scss" as mix;
                @use "./src/assets/styles/scss/_functions.scss" as func;
            `,
        loadPaths: ['/node_modules', './src/assets/styles/scss']
      }
    }
  },
})
