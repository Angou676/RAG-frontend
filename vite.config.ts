import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import 'event-source-polyfill/src/eventsource.min.js'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
});