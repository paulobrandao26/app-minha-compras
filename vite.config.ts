import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Minhas Compras',
        short_name: 'Compras',
        description: 'Organize suas compras nos cartões, separadas do resto.',
        theme_color: '#04050a',
        background_color: '#04050a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icone-do-meu-app.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icone-do-meu-app.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})