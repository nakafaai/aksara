import { basename, resolve } from "node:path";

const workspaceName = basename(process.cwd());
const sourceRoot = resolve(process.cwd(), "src");

// Resolve the current package's private runtime alias to source during tests so
// stale dist output can never satisfy a source assertion.
export default {
  resolve: {
    alias: [
      {
        find: new RegExp(`^#${workspaceName}/(.+)\\.js$`),
        replacement: `${sourceRoot}/$1.ts`,
      },
    ],
  },
};
