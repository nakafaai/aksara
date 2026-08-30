# Aksara CLI

The official command-line interface for Aksara content authoring, validation,
preview, and signed publication.

## Requirements

- Node.js 24
- A cloned Aksara repository for every operational command
- The matching Nakafa repository for preview and catalog validation
- `pnpm install` in each repository before commands that start local workspaces

## Install with npm

```sh
npm install --global @nakafa/aksara-cli
```

You can also run a single command without a global installation:

```sh
npx @nakafa/aksara-cli --help
```

Run authoring and publication commands from the Aksara checkout:

```sh
cd /path/to/aksara
aksara --document packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx
aksara check
aksara status
```

The installed package is a small launcher. It finds the nearest Aksara
checkout and runs that checkout's own CLI source, contracts, and corpus. It
does not bundle a second copy of operational code, so command behavior and Git
provenance always come from the same revision.

Production commands require the same authenticated environment as the protected
Aksara release workflow. The npm package does not contain credentials and does
not bypass repository, revision, renderer, or publication checks.

## License

This package uses the Nakafa Source Available License 1.0. See `LICENSE` in the
package for the complete terms.
