import { defineConfig } from 'vite';
 // Si tu utilises Vue.js, sinon ajuste pour React ou autre

export default defineConfig({
    plugins: [],
    server: {
        port: 5173, // Définit le port à 3000
        strictPort: true, // Si le port est déjà utilisé, Vite échouera au lieu d'utiliser un autre port
        host: '0.0.0.0', // Si tu veux que le serveur soit accessible sur ton réseau local
    },
    // Autres configurations possibles
});