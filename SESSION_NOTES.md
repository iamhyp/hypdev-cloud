# Session notes

## Current position

Stage: 1
Status: in progress
Blocked: none

## In progress

- CV PDF has not been supplied yet; `public/documents` is empty and `cv` in `src/config/site.ts` points at a path with no file behind it.
- `public/favicon.svg` has not been saved yet; a candidate (cyan full stop on dark ground) was previewed for approval but is not yet committed.
- `.nvmrc` and Node version pinning have not been created yet.
- `social.github` in `src/config/site.ts` is marked TODO; the GitHub profile does not exist yet.

## Next step

05-stage-2.md — GitHub and the Vercel pipeline: pushes this repository to GitHub, deploys it to a vercel.app URL with automatic deployment on every push, and points hypdev.cloud at it with SSL.

## Log

| Date | Stage | Work completed | Next |
| --- | --- | --- | --- |
| 2026-08-29 | 1 | Scaffolded the Astro project and folder structure; created the typed `src/config/site.ts` configuration module with `.env` / `.env.example`; sourced 11 of 14 vendor icons into `public/icons` (aws, azure, and powershell are unavailable from Simple Icons and need a decision); added `public/robots.txt` and configured the Astro sitemap integration; drafted a favicon candidate pending approval; added `CLAUDE.md`, `SESSION_NOTES.md`, `CONTENT.md`, `LICENSE`, and `README.md`; initialised git with logical commits. | Supply the CV PDF, approve and save the favicon, resolve the three missing vendor icons, pin the Node version via `.nvmrc`, then proceed to 05-stage-2.md. |
