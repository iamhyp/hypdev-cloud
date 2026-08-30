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
| Background | `#0c0e13` |
| Background secondary | `#101319` |
| Card | `#151822` |
| Card hover | `#1b1f2b` |
| Accent cyan | `#00bcd4` |
| Text | `#d2d8e4` |
| Muted | `#98a3b8` |
| Faint | `#7f8aa3` |

Dark is designed, not mirrored from light. It was rebuilt on 2026-08-29
after the two palettes ended up numerically symmetric (17.85:1 against
17.95:1 for text, and so on) and the dark one still read worse. Three
reasons, none of which are fixed by raising contrast:

1. Halation. Light text on near-black bleeds outward optically; dark
   text on white does not. `--text` is deliberately *lower* contrast in
   dark, 13.5:1, because 17.9:1 reads as glowing rather than crisp.
2. Optical weight. The same glyph looks thinner on dark, so
   `--body-weight` is 500 in dark and 400 in light, and
   `-webkit-font-smoothing` is `auto` in dark (grayscale smoothing thins
   strokes further) against `antialiased` in light.
3. Elevation. Light gets depth from shadow, which does not work on dark.
   Dark gets it from surfaces, so `--card` is a genuinely lighter plane
   rather than the 1.04:1 nudge it was.

Do not "fix" a dim-looking dark theme by brightening text. Check which
of the three it actually is. Every tier still clears 5:1 in both themes.

Font: JetBrains Mono throughout, weights 400/500/600/700. There is no
second family. Inter was dropped on 2026-08-29 when the home page was
matched to daryl.sh, which takes its coherence from committing to a
single monospace. Anything set at 600 or 700 needs those faces actually
requested in the stylesheet link; synthesised bold is the difference
between a designed page and a generated one.

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
