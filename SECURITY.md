# Security

## Scope

hypdev.cloud is a static portfolio site. It holds no credentials by
design: there are no user accounts, no server-side secrets, and no
database. The only place a secret could ever be declared is `.env`,
which is git-ignored; `.env.example` documents the shape without
real values, and currently contains none.

## Dependencies

Dependencies are kept minimal and audited routinely with `npm audit`.
Commit history and the working tree are also scanned locally for
accidentally committed secrets with `npm run scan` (gitleaks).

## Headers

Security headers — Content-Security-Policy, Strict-Transport-Security,
X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and
Permissions-Policy — are enforced at the edge via `vercel.json` on
every route.

## Reporting an issue

If you find a security issue with this site or its configuration,
please email hyperdevroot@gmail.com with a description of the issue
and steps to reproduce it. This is a personal portfolio project with
no bug bounty, but reports are read and acted on.
