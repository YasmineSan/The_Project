import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5173,
        strictPort: true, // Vite will fail if the port is already in use
        host: true, // Server will be accessible on your local network
    },
    // Other possible configurations
});