import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
    return {
        build: {
            outDir: '../API/wwwroot'
        },
        server: {
            port: 3000
        },
        plugins: [react(),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                  name: 'GoalsProgress',
                  short_name: 'GoalsProgress',
                  start_url: '/goals',
                  display: 'standalone',
                  theme_color: '#161748',
                  background_color: '#161748',
                  icons: [
                    {
                      src: 'icons/icon-128x128.png',
                      sizes: '128x128',
                      type: 'image/png',
                    },
                    {
                      src: 'icons/icon-256x256.png',
                      sizes: '256x256',
                      type: 'image/png',
                    }
                  ]
                }
              })
        ]
    }
})