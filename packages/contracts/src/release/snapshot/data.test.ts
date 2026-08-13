import { Effect, Either, Schema } from "effect";
import { beforeAll, describe, expect, it } from "vitest";

import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
  canonicalizeContentSnapshotRow,
  contentSnapshotId,
} from "#contracts/release/snapshot/data";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

let snapshotData: Effect.Effect.Success<
  ReturnType<typeof makeSnapshotTestData>
>;

beforeAll(async () => {
  snapshotData = await Effect.runPromise(makeSnapshotTestData());
}, 30_000);

describe("structured snapshot data", () => {
  it("returns every current domain manifest identity", () => {
    const identities = snapshotData.manifests.map(contentSnapshotId);

    expect(identities).toHaveLength(3);
    expect(new Set(identities).size).toBe(3);
  });

  it("strictly decodes each family envelope", () => {
    const decode = Schema.decodeUnknownEither(ContentSnapshotManifestSchema, {
      onExcessProperty: "error",
    });

    expect(
      snapshotData.manifests.every((value) => Either.isRight(decode(value)))
    ).toBe(true);
    expect(
      snapshotData.manifests.every((value) =>
        Either.isLeft(decode({ ...value, extra: true }))
      )
    ).toBe(true);
  });

  it("serializes every current row without ambiguous nesting", () => {
    const decode = Schema.decodeUnknownEither(ContentSnapshotRowSchema, {
      onExcessProperty: "error",
    });

    expect(
      snapshotData.rows.every((row) =>
        Either.isRight(decode(JSON.parse(canonicalizeContentSnapshotRow(row))))
      )
    ).toBe(true);
    expect(
      snapshotData.rows
        .filter((row) => row.family === "tryout")
        .map((row) => row.rowKind)
    ).toContain("placement");
  });
});
