# Repository governance

This file records the external repository controls that were verified on
2026-07-21. These settings are part of the release boundary but do not replace
artifact signatures, application authorization, or content entitlement checks.

## Current GitHub state

- Repository: public `nakafaai/aksara`.
- Default branch target: `main`; the authorized foundation bootstrap creates
  the initial branch ref.
- Ruleset `19330486` targets `refs/heads/main` and requires pull requests,
  squash merges, resolved review conversations, and blocks deletion and
  non-fast-forward updates. It has no bypass actor.
- Required approval count is currently zero because only one real repository
  owner is available. `CODEOWNERS` assigns all paths to `@nabilfatih`; separate
  corpus and compiler/publisher ownership cannot be claimed until a real second
  user or team is selected.
- The `CI / verify` context becomes a required status check only after the
  initial branch run exposes its exact GitHub check name.
- GitHub Actions default token permissions are read-only and workflows cannot
  approve pull requests.
- Actions are limited to GitHub-owned actions plus `pnpm/action-setup@*`, and
  every action must be pinned to a full commit SHA.
- Vulnerability alerts, Dependabot security updates, secret scanning, push
  protection, automated security fixes, and private vulnerability reporting are
  enabled.
- The `content-production` environment accepts protected branches and requires
  an approval from `@nabilfatih`. Self-review remains enabled because there is
  currently no second maintainer; this must be tightened when a real second
  reviewer is available. GitHub currently reports that repository admins may
  bypass this environment, so the gate is procedural rather than a two-person
  control while there is only one maintainer.

The GitHub controls follow the official documentation for
[repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets),
[Actions permissions](https://docs.github.com/en/rest/actions/permissions), and
[full-SHA action pinning](https://docs.github.com/en/actions/reference/security/secure-use).
The manual release gate follows GitHub's
[deployment environment](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)
controls.

## Bootstrap gate

The repository owner explicitly authorized the bootstrap commit and push on
2026-07-21. The bootstrap sequence is:

1. create the initial `main` ref without weakening the content-security model;
2. verify the exact CI workflow on that ref;
3. add the observed `CI / verify` context as a required status check;
4. exercise a normal `codex/*` branch and non-draft pull request;
5. re-read every setting through the GitHub API and record drift.

The owner selected the existing Nakafa license set for Aksara. Software uses
the Nakafa Source Available License 1.0, educational corpus uses the Nakafa
Content License 1.0, and Nakafa brand assets remain governed by the Nakafa
Trademark and Brand Policy. Public visibility grants only the rights stated
there.
