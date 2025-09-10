import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';
import tsconfigApp from './tsconfig.app.json';

const SRC_PATH = path.resolve(__dirname, 'src');
const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');
    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfigApp.compilerOptions.paths),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "styles/variables" as *;
          @use "styles/mixins" as *;
        `
      }
    }
  }
})
