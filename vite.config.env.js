import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Corrected alias
        },
    },
    build: {
        minify: 'esbuild',
        outDir: 'build',
    },
});