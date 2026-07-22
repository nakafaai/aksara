import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { RENDERER_DOMAINS } from "@nakafa/aksara-contracts/renderer/domain";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect } from "effect";

export const REPOSITORY_ROOT = resolve(import.meta.dirname, "..", "..", "..");
export const MATERIAL_ENTRIES = await Effect.runPromise(
  decodeMaterialRegistry()
);
const englishEntry = MATERIAL_ENTRIES.find(
  ({ route }) => route.locale === "en"
);
if (!englishEntry) {
  throw new Error(
    "The real English material registry row is required by tests."
  );
}
export const ENGLISH_ENTRY = englishEntry;
export const REAL_SOURCE = readFileSync(
  resolve(REPOSITORY_ROOT, ENGLISH_ENTRY.sourcePath),
  "utf8"
);
export const RENDERER_MANIFEST = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: RENDERER_DOMAINS.map((name) => {
      if (name !== "mathematics") {
        return { authoringComponents: [], name, supportedComponents: [] };
      }
      const component = { name: "FunctionMachine", version: 1 };
      return {
        authoringComponents: [component],
        name,
        supportedComponents: [component],
      };
    }),
  })
);

/** Isolated real-corpus checkout pair used by filesystem integration tests. */
export interface TestRepositories {
  readonly aksaraRoot: string;
  readonly documentPath: string;
  readonly nakafaRoot: string;
  readonly root: string;
}

/** Copies only final registered source files into isolated repository shells. */
export function makeTestRepositories(): TestRepositories {
  const root = mkdtempSync(resolve(tmpdir(), "aksara-cli-"));
  const aksaraRoot = resolve(root, "aksara");
  const nakafaRoot = resolve(root, "nakafa.com");
  writeFileSync(resolve(root, ".guard"), "aksara-cli-test", "utf8");
  mkdirSync(aksaraRoot, { recursive: true });
  mkdirSync(resolve(nakafaRoot, "apps", "www"), { recursive: true });
  writeFileSync(resolve(aksaraRoot, "package.json"), '{"name":"aksara"}\n');
  writeFileSync(resolve(nakafaRoot, "package.json"), '{"name":"nakafa"}\n');
  writeFileSync(
    resolve(nakafaRoot, "apps", "www", "package.json"),
    '{"name":"www"}\n'
  );
  for (const entry of MATERIAL_ENTRIES) {
    const target = resolve(aksaraRoot, entry.sourcePath);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(resolve(REPOSITORY_ROOT, entry.sourcePath), target);
  }
  return {
    aksaraRoot,
    documentPath: resolve(aksaraRoot, ENGLISH_ENTRY.sourcePath),
    nakafaRoot,
    root,
  };
}

/** Removes only a helper-owned temporary root carrying its exact guard file. */
export function removeTestRepositories(repositories: TestRepositories) {
  const guard = resolve(repositories.root, ".guard");
  if (readFileSync(guard, "utf8") !== "aksara-cli-test") {
    throw new Error("Refusing to remove an unrecognized test repository root.");
  }
  rmSync(repositories.root, { force: true, recursive: true });
}
