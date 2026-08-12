import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeTryoutSnapshot,
  canonicalizeTryoutSnapshotV2,
  makeTryoutSnapshot,
  makeTryoutSnapshotV2,
  tryoutSnapshotRowEvidence,
  tryoutSnapshotV2RowEvidence,
} from "#contracts/tryout/snapshot/hash";
import {
  type TryoutSnapshotInput,
  TryoutSnapshotV2InputSchema,
} from "#contracts/tryout/snapshot/spec";

const SHA256_HASH_PATTERN = /^sha256:[a-f\d]{64}$/u;
const input: TryoutSnapshotInput = {
  catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  counts: { country: 2, exam: 4, section: 34, set: 10, track: 4 },
  format: "tryout-v1",
  locales: ["en", "id"],
  placementCount: 840,
  placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  routeCount: 48,
};

const inputV2 = Schema.decodeUnknownSync(TryoutSnapshotV2InputSchema)({
  activeAppLocales: ["en", "id", "de"],
  catalogDigest: input.catalogDigest,
  counts: input.counts,
  editorialReviewDigest: `sha256:${"c".repeat(64)}`,
  format: "tryout-v2",
  placementCount: input.placementCount,
  placementDigest: input.placementDigest,
  routeCount: input.routeCount,
});

describe("try-out snapshot hashing", () => {
  it("binds canonical snapshot facts and global row evidence", () => {
    const first = makeTryoutSnapshot(input);
    const second = makeTryoutSnapshot(input);

    expect(JSON.parse(canonicalizeTryoutSnapshot(input))).toEqual(input);
    expect(first).toEqual(second);
    expect(first.snapshotId).toMatch(SHA256_HASH_PATTERN);
  });

  it("binds the aggregate row count and digest to both row streams", () => {
    const evidence = tryoutSnapshotRowEvidence(input);

    expect(evidence.rowCount).toBe(894);
    expect(evidence.rowDigest).not.toBe(input.catalogDigest);
    expect(evidence.rowDigest).not.toBe(input.placementDigest);
  });

  it("binds active locales and editorial review identity in v2", () => {
    const snapshot = makeTryoutSnapshotV2(inputV2);
    expect(JSON.parse(canonicalizeTryoutSnapshotV2(inputV2))).toEqual(inputV2);
    expect(snapshot.snapshotId).toMatch(SHA256_HASH_PATTERN);
    expect(snapshot.snapshotId).not.toBe(makeTryoutSnapshot(input).snapshotId);
    expect(tryoutSnapshotV2RowEvidence(inputV2).rowCount).toBe(894);
  });
});
