import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import { verifySnapshotRows } from "#contracts/release/snapshot/evidence";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

const unrelatedHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Returns the exact test manifest owned by one structured family. */
function manifestFor(
  manifests: readonly ContentSnapshotManifest[],
  family: ContentSnapshotManifest["family"]
) {
  return Effect.fromNullishOr(
    manifests.find((candidate) => candidate.family === family)
  );
}

/** Runs one family verifier against the complete replayable row source. */
function verify(
  manifest: ContentSnapshotManifest,
  rows: readonly ContentSnapshotRow[]
) {
  return verifySnapshotRows(manifest, Stream.fromIterable(rows));
}

/** Returns one typed family verification failure. */
function reject(
  manifest: ContentSnapshotManifest,
  rows: readonly ContentSnapshotRow[]
) {
  return verify(manifest, rows).pipe(Effect.flip);
}

describe("structured snapshot domain verification", () => {
  it.effect(
    "authenticates all three domain manifests against replayed rows",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const counts = yield* Effect.forEach(
          snapshotData.manifests,
          (manifest) => verify(manifest, snapshotData.rows)
        );

        expect(counts).toEqual([588, 1542, 18]);
      }),
    30_000
  );

  it.effect("rejects mismatched program and try-out signed evidence", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const program = yield* manifestFor(snapshotData.manifests, "program");
      const tryout = yield* manifestFor(snapshotData.manifests, "tryout");
      if (program.family !== "program" || tryout.family !== "tryout") {
        return yield* Effect.die("Expected narrowed test manifests.");
      }
      const programError = yield* reject(
        {
          ...program,
          manifest: { ...program.manifest, rowDigest: unrelatedHash },
        },
        snapshotData.rows
      );
      const tryoutError = yield* reject(
        {
          ...tryout,
          manifest: {
            ...tryout.manifest,
            routeCount: tryout.manifest.routeCount + 1,
          },
        },
        snapshotData.rows
      );

      expect(programError).toMatchObject({
        _tag: "SnapshotEvidenceError",
        family: "program",
        field: "rowDigest",
      });
      expect(tryoutError).toMatchObject({
        _tag: "SnapshotEvidenceError",
        family: "tryout",
        field: "routeCount",
      });
    })
  );

  it.effect("binds every Quran row to the selected snapshot identity", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const quran = yield* manifestFor(snapshotData.manifests, "quran");
      const firstQuranIndex = snapshotData.rows.findIndex(
        (row) => row.family === "quran"
      );
      const firstQuran = snapshotData.rows[firstQuranIndex];
      if (
        quran.family !== "quran" ||
        firstQuran?.family !== "quran" ||
        "rowKind" in firstQuran
      ) {
        return yield* Effect.die("Expected Quran test values.");
      }
      const rows = snapshotData.rows.slice();
      rows[firstQuranIndex] = {
        ...firstQuran,
        record: { ...firstQuran.record, snapshotId: unrelatedHash },
      };
      const error = yield* reject(quran, rows);

      expect(error).toMatchObject({
        _tag: "SnapshotEvidenceError",
        family: "quran",
        field: "snapshotId",
      });
    })
  );

  it.effect(
    "rejects a mismatched content-addressed snapshot identity",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const quran = yield* manifestFor(snapshotData.manifests, "quran");
        if (quran.family !== "quran") {
          return yield* Effect.die("Expected the Quran test manifest.");
        }
        const error = yield* reject(
          {
            ...quran,
            manifest: { ...quran.manifest, snapshotId: unrelatedHash },
          },
          snapshotData.rows.map((row) =>
            row.family === "quran" && !("rowKind" in row)
              ? {
                  ...row,
                  record: { ...row.record, snapshotId: unrelatedHash },
                }
              : row
          )
        );

        expect(error).toMatchObject({
          _tag: "SnapshotEvidenceError",
          family: "quran",
          field: "snapshotId",
        });
      }),
    30_000
  );
});
