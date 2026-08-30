// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://hypdev.cloud',
	integrations: [sitemap()],
	build: {
		/*
		 * Never inline stylesheets.
		 *
		 * Astro's default is 'auto', which inlines any stylesheet under
		 * roughly 4KB into a <style> block. This site ships a strict
		 * style-src with no 'unsafe-inline', so every inlined block is
		 * dropped by the browser and the page renders unstyled. It cost
		 * six pages in production while looking perfect in development,
		 * because the dev server sends no CSP at all.
		 *
		 * The home page escaped only because its stylesheet was large
		 * enough to stay external. That is luck, not design. Emitting
		 * every stylesheet as a file served from 'self' removes the
		 * size dependency entirely.
		 */
		inlineStylesheets: 'never',
	},
});
