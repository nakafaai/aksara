import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { hashContentReleaseManifest } from "#contracts/release/hash";
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
});
