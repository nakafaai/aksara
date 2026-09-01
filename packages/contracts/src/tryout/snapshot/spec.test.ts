import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  TRYOUT_SNAPSHOT_FORMAT,
  TryoutSnapshotFactsSchema,
  TryoutSnapshotSchema,
} from "#contracts/tryout/snapshot/spec";

const facts = {
  activeAppLocales: ["en", "id", "de"],
  catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  placementCount: 1,
  placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  routeCount: 1,
} as const;

describe("try-out snapshot", () => {
  it("decodes the current active locale and inventory identity", () => {
    expect(
      Schema.decodeSync(TryoutSnapshotFactsSchema)(facts).activeAppLocales
    ).toEqual(["en", "id", "de"]);
    expect(
      Schema.decodeSync(TryoutSnapshotSchema)({
        ...facts,
        format: TRYOUT_SNAPSHOT_FORMAT,
        snapshotId: Sha256HashSchema.make(`sha256:${"d".repeat(64)}`),
      }).format
    ).toBe(TRYOUT_SNAPSHOT_FORMAT);
  });

  it("rejects duplicate, empty, and noncanonical locale sets", () => {
    for (const activeAppLocales of [[], ["en", "en"], ["id", "en"]]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(TryoutSnapshotFactsSchema)({
            ...facts,
            activeAppLocales,
          })
        )
      ).toBe(true);
    }
  });
});
