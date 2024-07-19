import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5173,
        strictPort: true, // Vite will fail if the port is already in use
        host: true, // Server will be accessible on your local network
        proxy: {
            '/api': {
                target: 'https://craftify-ekc4.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    // Other possible configurations
});
