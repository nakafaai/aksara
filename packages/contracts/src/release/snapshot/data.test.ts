import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
  canonicalizeContentSnapshotRow,
  contentSnapshotId,
} from "#contracts/release/snapshot/data";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

describe("structured snapshot data", () => {
  it.effect("returns every current domain manifest identity", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const identities = snapshotData.manifests.map(contentSnapshotId);

      expect(identities).toHaveLength(3);
      expect(new Set(identities).size).toBe(3);
    })
  );

  it.effect("strictly decodes each family envelope", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const decode = Schema.decodeUnknownExit(ContentSnapshotManifestSchema, {
        onExcessProperty: "error",
      });

      expect(
        snapshotData.manifests.every((value) => Exit.isSuccess(decode(value)))
      ).toBe(true);
      expect(
        snapshotData.manifests.every((value) =>
          Exit.isFailure(decode({ ...value, extra: true }))
        )
      ).toBe(true);
    })
  );

  it.effect("serializes every current row without ambiguous nesting", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const decode = Schema.decodeUnknownExit(ContentSnapshotRowSchema, {
        onExcessProperty: "error",
      });

      expect(
        snapshotData.rows.every((row) =>
          Exit.isSuccess(
            decode(JSON.parse(canonicalizeContentSnapshotRow(row)))
          )
        )
      ).toBe(true);
      expect(
        snapshotData.rows
          .filter((row) => row.family === "tryout")
          .map((row) => row.rowKind)
      ).toContain("placement");
    })
  );
});
