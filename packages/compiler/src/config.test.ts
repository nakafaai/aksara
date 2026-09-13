import { readFileSync } from "node:fs";
import { findPackageJSON } from "node:module";
import { assert, describe, it } from "@effect/vitest";
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

  it.effect(
    "hashes the selected domain and current names without unrelated domain churn",
    () =>
      Effect.gen(function* () {
        const before = yield* createTestRendererManifest({
          components: ["InlineMath"],
          domains: { mathematics: ["FunctionMachine"] },
        });
        const unrelated = yield* createTestRendererManifest({
          components: ["InlineMath"],
          domains: {
            chemistry: ["AtomShellLab"],
            mathematics: ["FunctionMachine"],
          },
        });
        const changed = yield* createTestRendererManifest({
          components: ["BlockMath", "InlineMath"],
          domains: { mathematics: ["FunctionMachine"] },
        });
        const [beforeHash, unrelatedHash, changedHash, chemistryHash] =
          yield* Effect.all([
            createCompilerConfigHash(before, "mathematics"),
            createCompilerConfigHash(unrelated, "mathematics"),
            createCompilerConfigHash(changed, "mathematics"),
            createCompilerConfigHash(before, "chemistry"),
          ]);
        assert.strictEqual(unrelatedHash, beforeHash);
        assert.notStrictEqual(changedHash, beforeHash);
        assert.notStrictEqual(chemistryHash, beforeHash);
      })
  );
});
