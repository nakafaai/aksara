import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";
import { release } from "#contracts/test/request";

describe("release manifest hash", () => {
  it.effect("binds exact and whole-family publication authorization", () =>
    Effect.gen(function* () {
      const { manifest } = release;
      const exactHash = yield* hashContentReleaseManifest(manifest);
      const familyHash = yield* hashContentReleaseManifest({
        ...manifest,
        scope: {
          content: [],
          families: ["material"],
          snapshots: manifest.scope.snapshots,
        },
      });

      expect(familyHash).not.toBe(exactHash);
    })
  );

  it.effect("binds active application locales", () =>
    Effect.gen(function* () {
      const manifest = yield* Schema.decodeEffect(ContentReleaseManifestSchema)(
        {
          ...release.manifest,
          activeAppLocales: ["en", "id"],
        }
      );
      const changedHash = yield* hashContentReleaseManifest(manifest);
      const releaseHash = yield* hashContentReleaseManifest(release.manifest);

      expect(changedHash).not.toBe(releaseHash);
    })
  );
});
