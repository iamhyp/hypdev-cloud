---
title: "I failed to redact my own account ID four times while trying not to. So I stopped trying."
description: "Redaction fails in peripheral vision, not in judgement. How a public AWS landing zone moved the rule out of my head and into a required CI check, how I proved it, and what it still cannot see."
pubDate: 2026-10-18
tags: ["aws", "ci", "redaction", "aws-landing-zone"]
ogImage: "/images/blog/redaction-by-tooling/og.png"
readingTime: "6 min read"
series: "AWS landing zone"
draft: false
---

In one Sunday session I leaked identifiers from my own AWS estate four times.
I was not careless. I was actively, deliberately trying not to. Every time, the
value I was looking at was redacted perfectly, and the one sitting next to it
went straight through.

That was the day I stopped treating redaction as a rule I follow and started
treating it as a control I test.

<figure class="post-media">
  <video autoplay muted playsinline controls preload="metadata" width="1200" height="674"
    poster="/images/blog/redaction-by-tooling/redaction-gate-poster.png"
    aria-label="Terminal: caller identity output is committed with the account redacted but a role unique ID left in. The required check blocks it by file and line, merge is disabled, and the fixed commit passes.">
    <source src="/images/blog/redaction-by-tooling/redaction-gate.webm" type="video/webm" />
    <source src="/images/blog/redaction-by-tooling/redaction-gate.mp4" type="video/mp4" />
  </video>
  <figcaption>The redaction gate, simulated.</figcaption>
</figure>

## Why an account ID is worth hiding at all

The repository for my AWS landing zone is public. It is a four account AWS
Organization, built so that every guardrail has a test that tries to
break it. Being public is the point: a hiring manager should be able to read
every decision.

An AWS account ID is not a secret in the way a password is. AWS says as much.
But an account ID published next to what that account is for, which region it
runs in and the names of its roles stops being trivia. It becomes a targeting
primitive. Cross-account trust can be probed from outside, without touching the
account and without appearing in its CloudTrail.

So the rule was simple. Account IDs, the organisation ID, OU IDs, root email
addresses, access key IDs and the Identity Center portal URL never appear in
the repository, a screenshot, a diagram or a post.

Simple rules are the ones you get wrong while feeling confident.

## The shape of every miss

Every failure had the same shape, and that is the useful part.

I ran `aws sts get-caller-identity`, carefully replaced the `Account` value
with a placeholder, and pasted the rest. The `UserId` line above it carried the
role's unique ID, the one that starts with `AROA`. I never looked at it. I was
looking at the account.

I pasted a `terraform plan` with the target account blanked out. Two lines
higher, in the refresh output I had scrolled past a hundred times, sat the
organisation ID and the root ID.

Over-redaction is the same failure pointed the other way. I blacked out a
screenshot so thoroughly that it no longer showed which account it was about.
A proof that proves nothing is worse than no proof, because it still looks like
evidence. I also redacted commit SHAs, which identify nothing and are useful to
a reader.

It even happened while I was writing the decision record about it. Twice in
ten minutes, a plan to answer a question with "yes" or "no" lost to the habit
of pasting the whole output.

Redaction fails in peripheral vision, not in judgement. A rule that depends on
noticing every value fails on the value nobody was looking at. More attention
does not fix that. Attention is the thing that is running out.

<figure class="post-media">
  <img src="/images/blog/redaction-by-tooling/leak-surface.png" width="1200" height="1350" loading="lazy"
    alt="Eight ways an account ID can leave a public repository. Four are guarded by tooling, three rely on a person, and git history has no control." />
  <figcaption>Every exit, and what is standing at it.</figcaption>
</figure>

## Moving the rule out of my head

The decision, recorded as ADR 0003, was blunt: redaction is enforced by
tooling at every point where a value can become public, and a human check is
never the only control.

For files, that is a required status check. A short script runs on every pull
request and on every push to `main`. It matches the **shape** of each
identifier, never its value. An excerpt from `scripts/check-redaction.sh`:

```bash
check "AWS account ID"         '\b[0-9]{12}\b'
check "AWS organisation ID"    '\bo-[a-z0-9]{10,32}\b'
check "Organizational unit ID" '\bou-[a-z0-9]{4,32}-[a-z0-9]{8,32}\b'
check "AWS key or unique ID"   '\b(AKIA|ASIA|AROA|AIDA)[A-Z0-9]{16}\b'
```

Three choices in it are deliberate, and each one closed an argument I had with
myself.

**Shapes, not values.** Matching my real account IDs would have no false
positives. It would also mean committing a list of my real account IDs to a
public script, which publishes exactly what it protects.

**It reports the file and line, never the value.** A check that prints the leak
into a public CI log has moved the leak, not stopped it.

**There is no exemption list and no inline suppression.** Every exemption is a
hole, and a hole is where the real value eventually sits. If a document needs to
talk about a twelve-digit number, it describes it instead of printing it.

The other exits got their own controls. GitHub blocks any push whose commits
carry my private email address. Terraform output in CI goes to a file, with only
the summary printed. Secret access keys are left to GitHub push protection,
which verifies candidates against AWS and is both more accurate and earlier than
any regular expression I could write.

Before trusting any pattern, I fed it a value it had to catch. A detector you
have only ever seen stay quiet is a detector you are assuming works.

## Proving it, the same way as every other control

Every control in this project gets attacked before I call it done. This one was
no different.

I opened a pull request containing a single synthetic value in the shape of an
account ID, generated at the command line so the write-up of the proof never
contains it. The check turned red in forty seconds and the log said
this, and nothing more:

```text
BLOCKED: AWS account ID
docs/leak-sample.md:1
Error: Process completed with exit code 1.
```

The merge button was disabled. An ordinary pull request with no blocked values
ran the same check, under the same ruleset, and passed in five seconds. That
second pull request is the control group: without it, a red check proves only
that something is red.

Then I tried to push a commit authored with my private email address. GitHub
refused it before any branch existed:

```text
GH007: Your push would publish a private email address
```

## The placeholder that fails its own check

This was the detail I did not expect.

The example account ID used throughout the AWS documentation is twelve digits
long. So a page in my repository that quoted it, perhaps the very page
explaining the redaction rules, would fail the check it describes.

A placeholder that can match its own rule is a bug. Mine are angle-bracket
tokens that name what was removed, `<account-id:mgmt>` or `<org-id>`, which no
pattern will ever match and no reader will ever mistake for a real value.

The same day taught me a smaller lesson. The script reads `git ls-files`, so a
brand new file passes locally until it is staged. Stage, then check. A gate
that silently skips the newest file is exactly the gate you trust most and
should trust least.

## What the check still cannot see

Tooling covers what it is pointed at. This one reads text files at one commit.
It does not read images, git history, branch names, pull request titles, or
anything outside the repository.

Today, building the organisation trail and the log archive for this same
estate, I slipped four more times. An account ID in a hint line under a form
field in a screenshot. An account ID inside an ARN in an error message, twice. And a
masking filter I was using on my terminal output covered twelve-digit account
IDs but not the organisation ID or the policy ID that came back in an access
denied message.

None of them reached the repository. That is the whole argument, measured
again: the door with a check on it held, and every slip went through a door
without one.

So I no longer ask "did I redact this?". I ask "which exit is this value about
to use, and what is standing at it?". When the answer is "me", that exit goes on
the list for tooling next.

---

*This post is part of a public build of an AWS landing zone whose guardrails
are proven rather than declared. The decision record, the redaction rules and
the proof are in the repository: [github.com/iamhyp/aws-landing-zone](https://github.com/iamhyp/aws-landing-zone).*

*Next in the series: the log archive, and the three layers that refused to let me delete my own audit logs.*
