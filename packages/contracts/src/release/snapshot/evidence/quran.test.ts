import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import { verifyQuranSnapshotRows } from "#contracts/release/snapshot/evidence/quran";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

const unrelatedHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Returns the exact Quran manifest owned by the shared structured fixture. */
function manifestFor(manifests: readonly ContentSnapshotManifest[]) {
  return Effect.fromOption(
    Arr.findFirst(manifests, (candidate) => candidate.family === "quran")
  );
}

describe("Quran snapshot row verification", () => {
  it.effect(
    "authenticates the Quran manifest against its replayed rows",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const quran = yield* manifestFor(snapshotData.manifests);
        if (quran.family !== "quran") {
          return yield* Effect.die("Expected the Quran test manifest.");
        }
        const projectionCount = yield* verifyQuranSnapshotRows(
          quran,
          Stream.fromIterable(snapshotData.rows)
        );

        expect(projectionCount).toBe(1656);
      }),
    30_000
  );

  it.effect(
    "pins the replayed projection digest that a mismatched Quran manifest reports",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const quran = yield* manifestFor(snapshotData.manifests);
        if (quran.family !== "quran") {
          return yield* Effect.die("Expected the Quran test manifest.");
        }
        const error = yield* verifyQuranSnapshotRows(
          {
            ...quran,
            manifest: { ...quran.manifest, projectionDigest: unrelatedHash },
          },
          Stream.fromIterable(snapshotData.rows)
        ).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "SnapshotEvidenceError",
          family: "quran",
          field: "projectionDigest",
        });
        expect("actual" in error ? error.actual : undefined).toBe(
          "sha256:3a021aa207cc4db5570defa60b37eb16bd57ab843bcbfb80f549846b948236db"
        );
      }),
    30_000
  );
});
