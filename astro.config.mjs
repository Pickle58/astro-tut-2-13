// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});