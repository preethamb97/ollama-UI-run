import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ollama-UI-run/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          });
        }
      },
    },
  },
})
