import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { createManifestReader } from "#scripts/imports/fixture";
import { createWorkspaceIdentityResolver } from "#scripts/imports/workspace";

const JsonText = Schema.fromJsonString(Schema.Unknown);

describe("workspace identities", () => {
  it.effect(
    "caches valid workspace identities and skips non-source roots",
    () =>
      Effect.gen(function* () {
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

        expect(yield* resolveIdentity("README.md")).toBeUndefined();
        expect(
          yield* resolveIdentity("packages/typescript-config/base.json")
        ).toBeUndefined();
        expect(
          yield* resolveIdentity("packages/compiler/src/first.ts")
        ).toBeDefined();
        expect(
          yield* resolveIdentity("packages/compiler/src/second.ts")
        ).toBeDefined();
        expect(readManifest).toHaveBeenCalledTimes(1);
      })
  );

  it.effect("rejects malformed or unowned workspace manifests", () =>
    Effect.gen(function* () {
      const missingName = createWorkspaceIdentityResolver(() =>
        Effect.succeed("{}")
      );
      const unknown = createWorkspaceIdentityResolver(() =>
        Effect.succeed(Schema.encodeSync(JsonText)({ name: "@nakafa/unknown" }))
      );

      const noName = yield* missingName("packages/compiler/src/source.ts").pipe(
        Effect.flip
      );
      expect(noName._tag).toBe("WorkspaceIdentityError");
      expect(noName.message).toContain("has no package name");

      const noPolicy = yield* unknown("packages/unknown/src/source.ts").pipe(
        Effect.flip
      );
      expect(noPolicy._tag).toBe("WorkspaceIdentityError");
      expect(noPolicy.message).toContain("has no import-boundary policy");

      const notJson = createWorkspaceIdentityResolver(() =>
        Effect.succeed("{")
      );
      const invalid = yield* notJson("packages/compiler/src/source.ts").pipe(
        Effect.flip
      );
      expect(invalid._tag).toBe("WorkspaceIdentityError");
      expect(invalid.message).toContain("is not valid JSON");
    })
  );
});
