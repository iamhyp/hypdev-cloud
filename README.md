# hypdev.cloud

Source for hypdev.cloud, the professional portfolio site of Lawal Alabe, Platform Security Engineer.

## Stack

- [Astro](https://astro.build), static output, strict TypeScript
- JetBrains Mono throughout, weights 400 to 700, loaded from Google Fonts
- No client-side framework. Behaviour is four small vanilla scripts served from `public/scripts`, which keeps the Content-Security-Policy free of `unsafe-inline`
- Deployed on Vercel

## Local development

Requires Node 22.12 or later, as pinned in `.nvmrc` and enforced by `engines` in `package.json`.

```
npm install
npm run dev       # start the local dev server at localhost:4321
npm run build     # build the production site to ./dist
npm run preview   # preview the production build locally
```

## Configuration

Every site-wide value, names, links, certification and publication URLs, the CV path, lives in `src/config/site.ts` as a single typed source of truth. No URL is hardcoded into a component. The technical skills list lives in `src/config/skills.ts` and is read by both the CV page and the `stack` shell command, so the two cannot disagree.

## Security posture

- **Local asset serving.** Vendor logos and icons are stored in `public/icons` and served from this repository, never loaded from a third-party CDN. This keeps every asset origin under the site's own control and is what a strict Content-Security-Policy, applied at the hosting layer, is scoped against.
- **Secrets hygiene.** This is a static site with no secrets in its current form. `.env` exists, is gitignored, and is checked at the start of every change; `.env.example` documents the shape a future secret would take without ever holding a real value. Standing project rules block committing anything that resembles a secret.
- **Dependency and secret scanning.** `npm audit` and a gitleaks scan over the repository are part of this project's ongoing hygiene checks, run before dependency changes and reviewed periodically as the project grows.

## Deployment

The site deploys on [Vercel](https://vercel.com). Pushes to `main` deploy to production at hypdev.cloud; every other branch gets its own preview deployment, so changes can be reviewed live before merging.

## License

MIT, see [LICENSE](LICENSE).
