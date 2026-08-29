# hypdev.cloud

hypdev.cloud is a professional portfolio site for a Platform Security Engineer.

## Standing rules

- No emojis anywhere: not in code, content, commit messages, or documentation.
- Professional tone in all generated output.
- Never add content beyond what CONTENT.md specifies.
- All site-wide values come from `src/config/site.ts` and are never hardcoded into components.
- Vendor logos are served locally from `public/icons` and never from a CDN.
- Never commit anything resembling a secret; flag it instead.
- Source assets and unprocessed originals never go in the repository. Only optimised, web-ready files belong in `public`. Keep originals outside the project directory.
- At the start of every session, read `SESSION_NOTES.md` and state the current position before doing anything.
- At the end of every session, update `SESSION_NOTES.md` with completed work, in-progress items, and the next step.
- All commits use meaningful messages describing the change.

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#08090e` |
| Background secondary | `#0c0d14` |
| Card | `#101119` |
| Card hover | `#13141f` |
| Accent cyan | `#00bcd4` |
| Text | `#e8eaf0` |
| Muted | `#8892aa` |
| Faint | `#464f6a` |

Fonts: Inter for body text, JetBrains Mono for monospace.

## Design standard

Apply the `frontend-design` and `ui-ux-pro-max` skills to all layout, typography, spacing, and visual work. They do not apply to infrastructure, configuration, or scripting.

This site must read as deliberately designed by a person, not generated. Avoid:

- uniform spacing with no rhythm
- a generic centred hero
- evenly weighted cards
- default border radii everywhere
- decoration without purpose

Every visual decision should have a stated reason. When proposing a layout, explain why that arrangement was chosen over an alternative.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
