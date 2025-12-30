// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://ma77h3hac83r.github.io/2026TechStack/',
  vite: {
    plugins: [tailwindcss()],
  },
});