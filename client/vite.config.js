import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    server: {
        port: 5173,
        strictPort: true,
        host: '0.0.0.0', // Allow access from any network
        proxy: {
            '/api': {
                target: 'https://craftify-ekc4.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'selfsigned.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'selfsigned.crt')),
        }
    },
    // Other possible configurations
});