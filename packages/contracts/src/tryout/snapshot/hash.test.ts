import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { JsonTextSchema } from "#contracts/text/json";
import { canonicalizeTryoutSnapshot } from "#contracts/tryout/snapshot/canonical";
import {
  makeTryoutSnapshot,
  tryoutSnapshotRowEvidence,
} from "#contracts/tryout/snapshot/hash";
import {
  TRYOUT_SNAPSHOT_FORMAT,
  TryoutSnapshotFactsSchema,
} from "#contracts/tryout/snapshot/spec";

const SHA256_HASH_PATTERN = /^sha256:[a-f\d]{64}$/u;
const input = Schema.decodeSync(TryoutSnapshotFactsSchema)({
  activeAppLocales: ["en", "id", "de"],
  catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  counts: { country: 2, exam: 4, section: 34, set: 10, track: 4 },
  placementCount: 840,
  placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  routeCount: 48,
});

describe("try-out snapshot golden identities", () => {
  it("pins the content-addressed snapshot identity and row evidence", () => {
    expect(makeTryoutSnapshot(input).snapshotId).toBe(
      "sha256:b8066804ee09fc79af009a462775813ea3a2683e414e9095a0290f1693a8dfc5"
    );
    expect(tryoutSnapshotRowEvidence(input)).toEqual({
      rowCount: 894,
      rowDigest:
        "sha256:72c5ba88dd2f3f5b198e2e28d9e5fd79f829e2569956a03dad584190f0f222e2",
    });
  });
});

describe("try-out snapshot hashing", () => {
  it("binds locale and inventory facts", () => {
    const first = makeTryoutSnapshot(input);
    const second = makeTryoutSnapshot(input);

    expect(
      Schema.decodeSync(JsonTextSchema)(canonicalizeTryoutSnapshot(input))
    ).toEqual({
      ...input,
      format: TRYOUT_SNAPSHOT_FORMAT,
    });
    expect(first).toEqual(second);
    expect(first.snapshotId).toMatch(SHA256_HASH_PATTERN);
  });

  it("binds the aggregate row count and both row digests", () => {
    const evidence = tryoutSnapshotRowEvidence(input);

    expect(evidence.rowCount).toBe(894);
    expect(evidence.rowDigest).not.toBe(input.catalogDigest);
    expect(evidence.rowDigest).not.toBe(input.placementDigest);
  });
});
