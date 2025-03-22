import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// Removed the certificate-related imports and logic

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173, // or just leave this out to use the default
        proxy: {
            '^/api': {
                target: 'http://localhost:5168',
                changeOrigin: true,
                secure: false
            }
        }
    }

});
