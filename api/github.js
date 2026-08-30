/**
 * Live GitHub figures for the home page.
 *
 * Runs as a Vercel Serverless Function, not at build time, so the numbers
 * on the page are current rather than current-as-of-the-last-deploy.
 *
 * Unauthenticated GitHub is 60 requests an hour per IP, which a popular
 * page would burn through in minutes. The s-maxage below means the edge
 * answers almost every visitor from cache and only one request an hour
 * reaches GitHub. Set GITHUB_TOKEN in Vercel to lift the ceiling to 5000
 * if that ever stops being enough; the route works without it.
 */
const FALLBACK_USER = 'iamhyp';

export default async function handler(request, response) {
	const user = process.env.GITHUB_USERNAME || FALLBACK_USER;

	const headers = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'hypdev.cloud',
	};

	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	}

	try {
		const [profileResponse, reposResponse] = await Promise.all([
			fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, { headers }),
			fetch(
				`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed&type=owner`,
				{ headers },
			),
		]);

		if (!profileResponse.ok || !reposResponse.ok) {
			response.status(502).json({ error: 'upstream_unavailable' });
			return;
		}

		const profile = await profileResponse.json();
		const repos = await reposResponse.json();

		if (!Array.isArray(repos)) {
			response.status(502).json({ error: 'unexpected_shape' });
			return;
		}

		const stars = repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
		const lastPush = repos.length ? repos[0].pushed_at : null;

		// One hour fresh at the edge, then served stale for a day while it
		// revalidates, so a GitHub outage never shows the visitor an error.
		response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
		response.status(200).json({
			repos: typeof profile.public_repos === 'number' ? profile.public_repos : repos.length,
			stars,
			lastPush,
		});
	} catch {
		response.status(502).json({ error: 'unavailable' });
	}
}
