import { readFileSync } from "node:fs";
import { findPackageJSON } from "node:module";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { createCompilerConfigHash } from "#compiler/config";
import { EXECUTABLE_POLICY_REVISION } from "#compiler/policy";

/** Reads an installed package version for compiler-identity assertions. */
function installedVersion(packageName: string) {
  const manifestPath = findPackageJSON(packageName, import.meta.url);
  if (!manifestPath) {
    throw new Error(`Cannot resolve installed package ${packageName}`);
  }
  return Schema.decodeUnknownSync(Schema.Struct({ version: Schema.String }))(
    JSON.parse(readFileSync(manifestPath, "utf8"))
  ).version;
}

/** Builds one exact renderer contract for compiler identity tests. */
function manifestInput(inlineVersion: 1 | 2, expanded: boolean) {
  return {
    base: {
      authoringComponents: [{ name: "InlineMath", version: inlineVersion }],
      supportedComponents: expanded
        ? [
            { name: "InlineMath", version: 1 },
            { name: "InlineMath", version: 2 },
          ]
        : [{ name: "InlineMath", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
  };
}

describe("compiler config", () => {
  it("binds the current executable policy revision", () => {
    expect(EXECUTABLE_POLICY_REVISION).toBe("trusted-mdx-policy-v5");
  });

  it("pins every output-affecting installed tool", () => {
    expect(
      Object.fromEntries(
        [
          "@mdx-js/mdx",
          "eslint-scope",
          "estree-util-visit",
          "mdast-util-to-string",
          "remark-gfm",
          "remark-math",
          "unist-util-visit",
        ].map((name) => [name, installedVersion(name)])
      )
    ).toEqual({
      "@mdx-js/mdx": "3.1.1",
      "eslint-scope": "9.1.2",
      "estree-util-visit": "2.0.0",
      "mdast-util-to-string": "4.0.0",
      "remark-gfm": "4.0.1",
      "remark-math": "6.0.0",
      "unist-util-visit": "5.1.0",
    });
  });

  it("changes only for selected versions or route domain", async () => {
    const before = await Effect.runPromise(
      createRendererManifest(manifestInput(1, false))
    );
    const expanded = await Effect.runPromise(
      createRendererManifest(manifestInput(1, true))
    );
    const migrated = await Effect.runPromise(
      createRendererManifest(manifestInput(2, true))
    );
    const beforeHash = createCompilerConfigHash(before, "mathematics");
    expect(createCompilerConfigHash(expanded, "mathematics")).toBe(beforeHash);
    expect(createCompilerConfigHash(migrated, "mathematics")).not.toBe(
      beforeHash
    );
    expect(createCompilerConfigHash(before, "chemistry")).not.toBe(beforeHash);
  });
});
