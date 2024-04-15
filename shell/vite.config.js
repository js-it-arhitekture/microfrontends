import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        usersApp: 'http://localhost:5001/assets/remoteEntry.js',
        ticketsApp: 'http://localhost:5002/assets/remoteEntry.js',
        purchasesApp: 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@chakra-ui/react', '@tanstack/react-query']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
  , rollupOptions: {
    external: ['react', 'react-dom', 'axios', '@tanstack/react-query'],
  },
})
