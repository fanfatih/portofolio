import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://luthfanfatih.my.id',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    sitemap({ filter: (page) => !page.includes('/keystatic') }),
  ],
});
