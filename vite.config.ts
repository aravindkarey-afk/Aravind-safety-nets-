import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { contentPlugin } from './export-plugins/content-plugin/index.ts';
import { formatOverridesPlugin } from './export-plugins/format-overrides-plugin.ts';
import { mediaAssetsPlugin } from './export-plugins/media-assets-plugin.ts';

const root = fileURLToPath(new URL('.', import.meta.url));
const src = fileURLToPath(new URL('./src', import.meta.url));

// Keep the original Express endpoints available during Vite development.
function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();
        try {
          const { default: app } = await server.ssrLoadModule('/src/server/entry.ts');
          app(req, res, next);
        } catch (error) {
          if (error instanceof Error) server.ssrFixStacktrace(error);
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  envPrefix: ['VITE_', 'SITE_ID'],
  plugins: [react(), contentPlugin(), formatOverridesPlugin(root), mediaAssetsPlugin(), apiDevPlugin()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'],
    alias: { nothing: `${src}/fallbacks/missingModule.ts`, '@/api': `${src}/server/api`, '@': src },
  },
  server: { host: '0.0.0.0', allowedHosts: ['.e2b.app'] },
  preview: { host: '0.0.0.0', allowedHosts: ['.e2b.app'] },
  build: {
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
    copyPublicDir: !isSsrBuild,
    rollupOptions: isSsrBuild ? undefined : {
      output: { manualChunks: { 'react-vendor': ['react', 'react-dom', 'react-dom/client', 'react-router', 'react-router/dom'] } },
    },
  },
}));
