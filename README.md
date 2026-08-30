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

## Engineering notes

A few decisions worth knowing if you are reading the source.

**Content-Security-Policy with no `unsafe-inline`.** The policy is set at
the edge in `vercel.json`. The one inline script, which applies the saved
theme before first paint, is pinned by SHA-256 hash rather than allowed
by a blanket directive. Two consequences shaped the build. Astro's
default `build.inlineStylesheets: 'auto'` inlines any stylesheet under
roughly 4KB, and the policy then drops every inlined block, so pages
render unstyled in production while looking correct in dev; the setting
is `'never'` for that reason. And all behaviour lives in four small
vanilla scripts under `public/scripts` rather than inline handlers.

**Two themes, not one theme inverted.** Dark was designed separately
after both palettes came out numerically symmetric and the dark one
still read worse. Light-on-dark halates, so body text is deliberately
*lower* contrast in dark (13.5:1 against 17.9:1). The same glyph looks
thinner on dark, so weight and font smoothing are per-theme tokens.
Light takes depth from shadow, which does not exist on dark, so dark
takes it from surface elevation instead.

**The shell on the home page derives its command set from the DOM.**
Each command's output is server-rendered, and `terminal.js` clones it on
demand. The script holds no copy of the site's content, so `help`, tab
completion and the clickable command list cannot drift out of sync with
what the page actually says. With JavaScript off it degrades to a static
terminal showing real output above a disabled prompt.

**Live GitHub figures come from a serverless route** (`api/github.js`),
edge-cached with `stale-while-revalidate`, so an upstream outage serves
stale data rather than an error. The strip is hidden until real numbers
arrive: no JavaScript, a failed fetch or a rate limit all produce no
strip rather than a spinner or zeroes.

**Verified rather than eyeballed.** Layout and accessibility are checked
in headless Chromium across every page at four widths in both themes,
served under the production CSP locally, since neither the dev server
nor a plain static server applies the policy that breaks things.

## Deployment

The site deploys on [Vercel](https://vercel.com). Pushes to `main` deploy to production at hypdev.cloud; every other branch gets its own preview deployment, so changes can be reviewed live before merging.

## License

MIT, see [LICENSE](LICENSE).
