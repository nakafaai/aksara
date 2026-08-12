import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  hashContentReleaseManifest,
  hashContentReleaseManifestV2,
} from "#contracts/release/hash";
import {
  CONTENT_RELEASE_V2_FORMAT,
  ContentReleaseManifestV2Schema,
} from "#contracts/release/manifest/v2";
import { release } from "#contracts/test/request";

describe("release manifest hash", () => {
  it("binds exact and whole-family publication authorization", () => {
    const { manifest } = release;
    const exactHash = Effect.runSync(hashContentReleaseManifest(manifest));
    const familyHash = Effect.runSync(
      hashContentReleaseManifest({
        ...manifest,
        scope: {
          content: [],
          families: ["material"],
          snapshots: manifest.scope.snapshots,
        },
      })
    );

    expect(familyHash).not.toBe(exactHash);
  });

  it("uses distinct identity bytes for a current manifest", () => {
    const manifest = Schema.decodeUnknownSync(ContentReleaseManifestV2Schema)({
      activeAppLocales: ["en", "id"],
      ...release.manifest,
      editorialReviewDigest: `sha256:${"1".repeat(64)}`,
      format: CONTENT_RELEASE_V2_FORMAT,
    });
    expect(Effect.runSync(hashContentReleaseManifestV2(manifest))).not.toBe(
      Effect.runSync(hashContentReleaseManifest(release.manifest))
    );
  });
});
