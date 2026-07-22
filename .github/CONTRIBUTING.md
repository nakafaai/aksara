# Contributing to Aksara

Thank you for contributing to Nakafa's content infrastructure.

## Contribution License

Aksara is source-available, not open source. Read `LICENSE`,
`CONTENT_LICENSE.md`, and `TRADEMARKS.md` before contributing.

You may create a GitHub fork only to prepare and submit contributions back to
Nakafa. The fork must not be used as a standalone project, hosted service,
mirror, product, rebrand, or distribution channel.

By submitting a pull request, patch, issue attachment, content correction,
translation, design, dataset, documentation change, or any other contribution,
you certify that:

- You have the right to submit the contribution.
- The contribution is your original work, or you have permission to submit it.
- The contribution does not include secrets, private data, copied proprietary
  material, or material with license terms that conflict with Nakafa.
- You grant PT. Nakafa Tekno Kreatif a perpetual, worldwide, non-exclusive,
  royalty-free, sublicensable, and transferable license to use, reproduce,
  modify, distribute, publicly display, publicly perform, create derivative
  works from, and relicense the contribution as part of Nakafa.
- PT. Nakafa Tekno Kreatif may use the contribution in source-available,
  commercial, proprietary, hosted, educational, and internal versions of Nakafa
  without owing you payment.

Do not submit a contribution if you cannot grant these rights.

## Getting Started

### Prerequisites

- Node.js 24
- pnpm, using the version declared in `package.json`
- Git

### Development Setup

```bash
git clone https://github.com/YOUR-USERNAME/aksara.git
cd aksara
pnpm install
```

## Project Structure

- `packages/contracts` owns signed wire and renderer contracts.
- `packages/compiler` validates and compiles trusted MDX.
- `packages/corpus` owns reviewed Nakafa source and non-React registries.
- `packages/publisher` prepares and publishes signed releases through injected
  source and target interfaces.
- `packages/typescript-config` owns the shared TypeScript configuration.

Aksara currently contains only its reviewed real-content vertical slice. Do not
add substitute educational content or fixtures.

## Making Changes

### Development Commands

```bash
pnpm format
pnpm lint
pnpm names
pnpm jsdocs
pnpm lines
pnpm boundaries
pnpm typecheck
pnpm test
pnpm build
pnpm verify:package
```

### Code Standards

- Keep TypeScript strict and Effect-native.
- Use package aliases instead of relative TypeScript imports.
- Keep file and folder names to at most two semantic words.
- Keep handwritten TypeScript modules at or below 300 non-JSDoc lines.
- Document stable callable declarations with useful JSDoc.
- Maintain 100% per-file statement, branch, function, and line coverage for
  production modules under `packages/*/src`. Repository and package scripts are
  typechecked, linted, and exercised by their dedicated CI commands.
- Do not add invented content, placeholder packages, or compatibility layers.

### Submitting Changes

1. Branch from `main`.
2. Make one cohesive change with a clear commit message.
3. Run every command listed above.
4. Push the branch and create a ready-for-review pull request.

## Get Help

- GitHub Discussions: https://github.com/nakafaai/nakafa.com/discussions
- Security: https://github.com/nakafaai/aksara/security/advisories/new
