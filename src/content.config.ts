import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * The blog collection.
 *
 * The schema is deliberately strict. Zod runs at build time, so a post
 * with a missing description or a malformed date fails `astro build`
 * rather than shipping a page with an empty social card. A typo in a
 * front matter key is a build error here and a silent blank in a
 * preview card otherwise.
 */
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),

		/*
		 * Path to the post's own social card, relative to the site root.
		 * The layout turns it into an absolute URL, because a relative
		 * og:image renders as a grey box on LinkedIn and in Slack.
		 * Optional: a post without one falls back to the site card.
		 */
		ogImage: z.string().startsWith('/').optional(),

		/*
		 * Authored rather than computed. A word count estimate is not
		 * more honest than the writer's own judgement of how long their
		 * post takes to read, and this one is a claim the author is
		 * making. Optional so later posts can leave it out.
		 */
		readingTime: z.string().optional(),

		series: z.string().optional(),

		/*
		 * Drafts build locally so they can be previewed, and are filtered
		 * out of every production listing and route. Defaulting to false
		 * means forgetting the key publishes the post, which is the
		 * failure mode I want: a visible mistake, not an invisible one.
		 */
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
