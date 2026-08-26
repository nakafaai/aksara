import { readFileSync } from "node:fs";
import { findPackageJSON } from "node:module";
import { assert, describe, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";
import { createCompilerConfigHash } from "#compiler/config";
import { createTestRendererManifest } from "#compiler/test/content";

const PackageManifestSchema = Schema.Struct({ version: Schema.String });

/** Installed package metadata must remain readable by compiler contract tests. */
class PackageManifestReadError extends Schema.TaggedError<PackageManifestReadError>()(
  "PackageManifestReadError",
  {
    cause: Schema.String,
    packageName: Schema.String,
  }
) {}

/** Reads an installed package version through the Effect error channel. */
const installedVersion = Effect.fn("CompilerConfigTest.installedVersion")(
  function* (packageName: string) {
    const manifestPath = yield* Effect.try({
      catch: (cause) =>
        new PackageManifestReadError({
          cause: String(cause),
          packageName,
        }),
      try: () => findPackageJSON(packageName, import.meta.url),
    });
    if (manifestPath === undefined) {
      return yield* new PackageManifestReadError({
        cause: "Package manifest was not found.",
        packageName,
      });
    }
    const source = yield* Effect.try({
      catch: (cause) =>
        new PackageManifestReadError({
          cause: String(cause),
          packageName,
        }),
      try: () => readFileSync(manifestPath, "utf8"),
    });
    const input = yield* Effect.try({
      catch: (cause) =>
        new PackageManifestReadError({
          cause: String(cause),
          packageName,
        }),
      try: () => JSON.parse(source),
    });
    const manifest = yield* Schema.decodeUnknownEffect(PackageManifestSchema)(
      input
    );
    return manifest.version;
  }
);

/** Builds one exact renderer contract for compiler identity tests. */
function createRendererFixture(inlineVersion: 1 | 2, expanded: boolean) {
  return createTestRendererManifest({
    authoringComponents: [{ name: "InlineMath", version: inlineVersion }],
    domains: {
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    },
    supportedComponents: expanded
      ? [
          { name: "InlineMath", version: 1 },
          { name: "InlineMath", version: 2 },
        ]
      : [{ name: "InlineMath", version: 1 }],
  });
}

describe("compiler config", () => {
  it.effect("pins every output-affecting installed tool", () =>
    Effect.gen(function* () {
      const versions = yield* Effect.all(
        {
          "@mdx-js/mdx": installedVersion("@mdx-js/mdx"),
          "eslint-scope": installedVersion("eslint-scope"),
          "estree-util-visit": installedVersion("estree-util-visit"),
          "mdast-util-to-string": installedVersion("mdast-util-to-string"),
          "remark-gfm": installedVersion("remark-gfm"),
          "remark-math": installedVersion("remark-math"),
          "unist-util-visit": installedVersion("unist-util-visit"),
        },
        { concurrency: "unbounded" }
      );
      assert.deepStrictEqual(versions, {
        "@mdx-js/mdx": "3.1.1",
        "eslint-scope": "9.1.2",
        "estree-util-visit": "2.0.0",
        "mdast-util-to-string": "4.0.0",
        "remark-gfm": "4.0.1",
        "remark-math": "6.0.0",
        "unist-util-visit": "5.1.0",
      });
    })
  );

  it.effect("changes only for selected versions or route domain", () =>
    Effect.gen(function* () {
      const before = yield* createRendererFixture(1, false);
      const expanded = yield* createRendererFixture(1, true);
      const migrated = yield* createRendererFixture(2, true);
      const [beforeHash, expandedHash, migratedHash, chemistryHash] =
        yield* Effect.all([
          createCompilerConfigHash(before, "mathematics"),
          createCompilerConfigHash(expanded, "mathematics"),
          createCompilerConfigHash(migrated, "mathematics"),
          createCompilerConfigHash(before, "chemistry"),
        ]);
      assert.strictEqual(expandedHash, beforeHash);
      assert.notStrictEqual(migratedHash, beforeHash);
      assert.notStrictEqual(chemistryHash, beforeHash);
    })
  );
});
