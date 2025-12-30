import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    assetsPrefix: './',
  },
  output: 'static',
  site: 'https://ma77h3hac83r.github.io/2026TechStack/',
  vite: {
    plugins: [tailwindcss()],
  },
});