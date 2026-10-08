import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import { verifyProgramSnapshotRows } from "#contracts/release/snapshot/evidence/program";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

const unrelatedHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Returns the exact program manifest owned by the shared structured fixture. */
function manifestFor(manifests: readonly ContentSnapshotManifest[]) {
  return Effect.fromNullishOr(
    manifests.find((candidate) => candidate.family === "program")
  );
}

describe("program snapshot row verification", () => {
  it.effect(
    "authenticates the program manifest against its replayed rows",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const program = yield* manifestFor(snapshotData.manifests);
        if (program.family !== "program") {
          return yield* Effect.die("Expected the program test manifest.");
        }
        const rowCount = yield* verifyProgramSnapshotRows(
          program,
          Stream.fromIterable(snapshotData.rows)
        );

        expect(rowCount).toBe(588);
      }),
    30_000
  );

  it.effect(
    "pins the replayed row digest that a mismatched program manifest reports",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const program = yield* manifestFor(snapshotData.manifests);
        if (program.family !== "program") {
          return yield* Effect.die("Expected the program test manifest.");
        }
        const error = yield* verifyProgramSnapshotRows(
          {
            ...program,
            manifest: { ...program.manifest, rowDigest: unrelatedHash },
          },
          Stream.fromIterable(snapshotData.rows)
        ).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "SnapshotEvidenceError",
          family: "program",
          field: "rowDigest",
        });
        expect("actual" in error ? error.actual : undefined).toBe(
          "sha256:3ede07c7c49092e5f91ee4507902b2d7d6eb41f49330f8c083d09626fefdc5cc"
        );
      }),
    30_000
  );
});
