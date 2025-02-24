// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],

  vite: {
      plugins: [tailwindcss()],
      ssr: {
          noExternal: ['@sendgrid/mail'],
      },
	},

  adapter: netlify(),
});