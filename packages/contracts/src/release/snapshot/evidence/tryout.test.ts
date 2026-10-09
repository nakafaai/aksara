import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import { verifyTryoutSnapshotRows } from "#contracts/release/snapshot/evidence/tryout";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

const unrelatedHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Returns the exact try-out manifest owned by the shared structured fixture. */
function manifestFor(manifests: readonly ContentSnapshotManifest[]) {
  return Effect.fromOption(
    Arr.findFirst(manifests, (candidate) => candidate.family === "tryout")
  );
}

describe("try-out snapshot row verification", () => {
  it.effect(
    "authenticates the try-out manifest against its replayed rows",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const tryout = yield* manifestFor(snapshotData.manifests);
        if (tryout.family !== "tryout") {
          return yield* Effect.die("Expected the try-out test manifest.");
        }
        const rowCount = yield* verifyTryoutSnapshotRows(
          tryout,
          Stream.fromIterable(snapshotData.rows)
        );

        expect(rowCount).toBe(18);
      }),
    30_000
  );

  it.effect(
    "pins the replayed catalog digest that a mismatched try-out manifest reports",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const tryout = yield* manifestFor(snapshotData.manifests);
        if (tryout.family !== "tryout") {
          return yield* Effect.die("Expected the try-out test manifest.");
        }
        const error = yield* verifyTryoutSnapshotRows(
          {
            ...tryout,
            manifest: { ...tryout.manifest, catalogDigest: unrelatedHash },
          },
          Stream.fromIterable(snapshotData.rows)
        ).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "SnapshotEvidenceError",
          family: "tryout",
          field: "catalogDigest",
        });
        expect("actual" in error ? error.actual : undefined).toBe(
          "sha256:fdff06d2385b467397d6b7e7ed8651504debeacd6b652cd5e4a55da9ecc773b0"
        );
      }),
    30_000
  );
});
