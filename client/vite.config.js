import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // 
        strictPort: true, // Vite will fail if the port is already in use
        host: true, // Server will be accessible on your local network
    },
    // Other possible configurations
});
