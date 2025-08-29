import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // ¡IMPORTANTE! Reemplaza 'teleprompter-pro' con el nombre exacto de tu repositorio en GitHub.
    base: '/teleprompter-pro/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest,
        workbox: {
          // Asegura que todos los assets generados por Vite se cacheen.
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          // Estrategia para cachear assets externos (como la CDN de Tailwind)
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/cdn\.tailwindcss\.com/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'tailwind-cache',
                expiration: {
                  maxEntries: 1,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
  };
});
