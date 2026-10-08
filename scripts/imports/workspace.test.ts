import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import { createWorkspaceIdentityResolver } from "#scripts/imports/workspace";

const JsonText = Schema.fromJsonString(Schema.Unknown);

/** Creates one manifest reader for workspace identity tests. */
function createManifestReader(manifests: Readonly<Record<string, unknown>>) {
  return (path: string) => Schema.encodeSync(JsonText)(manifests[path]);
}

describe("workspace identities", () => {
  it("caches valid workspace identities and skips non-source roots", () => {
    const readManifest = vi.fn(
      createManifestReader({
        "packages/compiler/package.json": {
          dependencies: { "@nakafa/aksara-contracts": "workspace:*" },
          imports: { "#compiler/*": "./src/*.ts" },
          name: "@nakafa/aksara-compiler",
        },
      })
    );
    const resolveIdentity = createWorkspaceIdentityResolver(readManifest);

    expect(resolveIdentity("README.md")).toBeUndefined();
    expect(
      resolveIdentity("packages/typescript-config/base.json")
    ).toBeUndefined();
    expect(resolveIdentity("packages/compiler/src/first.ts")).toBeDefined();
    expect(resolveIdentity("packages/compiler/src/second.ts")).toBeDefined();
    expect(readManifest).toHaveBeenCalledTimes(1);
  });

  it("rejects malformed or unowned workspace manifests", () => {
    const missingName = createWorkspaceIdentityResolver(() => "{}");
    const unknown = createWorkspaceIdentityResolver(() =>
      Schema.encodeSync(JsonText)({ name: "@nakafa/unknown" })
    );

    expect(() => missingName("packages/compiler/src/source.ts")).toThrow(
      "has no package name"
    );
    expect(() => unknown("packages/unknown/src/source.ts")).toThrow(
      "has no import-boundary policy"
    );
  });
});
