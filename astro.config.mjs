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

	markdown: {
		/*
		 * Prism, not the default Shiki.
		 *
		 * Shiki colours code by writing a style attribute onto the <pre>
		 * and onto every token span. This site's style-src is 'self'
		 * with no 'unsafe-inline', so the browser drops all of them: the
		 * colours go, the background goes, and so does the overflow-x
		 * that keeps a long line from widening the page. A code block
		 * would arrive broken and throw a console violation per block.
		 *
		 * Prism emits class names instead, which a stylesheet served
		 * from 'self' can colour. The palette then comes from the site's
		 * own tokens rather than Shiki's hardcoded GitHub theme, so code
		 * matches the terminal on the home page and works in both
		 * themes.
		 */
		syntaxHighlight: 'prism',
	},
});
