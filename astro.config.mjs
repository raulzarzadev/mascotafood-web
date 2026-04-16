// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://mascotafood.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
