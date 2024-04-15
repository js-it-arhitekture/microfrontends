import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: "remote_app",
    filename: "remoteEntry.js",
    exposes: {
      './Users': './src/AppWrapper'
    },
    shared: ['react', 'react-dom', '@chakra-ui/react', '@tanstack/react-query']
  })
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  rollupOptions: {
    external: ['react', 'react-dom', 'axios', '@tanstack/react-query'],
  },
})
