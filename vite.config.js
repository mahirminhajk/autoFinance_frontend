import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://autofinanceapi.kabsdigital.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Router
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'vendor-router';
          }
          // Forms (react-hook-form, zod, formik, resolvers)
          if (
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/zod') ||
            id.includes('node_modules/formik') ||
            id.includes('node_modules/@hookform')
          ) {
            return 'vendor-forms';
          }
          // UI (material-tailwind, react-select, react-modal, react-toastify, react-icons)
          if (
            id.includes('node_modules/@material-tailwind') ||
            id.includes('node_modules/react-select') ||
            id.includes('node_modules/react-modal') ||
            id.includes('node_modules/react-toastify') ||
            id.includes('node_modules/react-icons')
          ) {
            return 'vendor-ui';
          }
          // PDF / print
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/react-to-print')) {
            return 'vendor-pdf';
          }
          // Remaining node_modules → general vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
})


