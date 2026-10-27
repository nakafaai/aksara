import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option, Stream } from "effect";

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
  return Effect.fromOption(
    Arr.findFirst(manifests, (candidate) => candidate.family === family)
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

        expect(counts).toEqual([24, 588, 1542]);
      }),
    30_000
  );

  it.effect("rejects mismatched program and assessment signed evidence", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const program = yield* manifestFor(snapshotData.manifests, "program");
      const assessment = yield* manifestFor(
        snapshotData.manifests,
        "assessment"
      );
      if (program.family !== "program" || assessment.family !== "assessment") {
        return yield* Effect.die("Expected narrowed test manifests.");
      }
      const programError = yield* reject(
        {
          ...program,
          manifest: { ...program.manifest, rowDigest: unrelatedHash },
        },
        snapshotData.rows
      );
      const assessmentError = yield* reject(
        {
          ...assessment,
          manifest: {
            ...assessment.manifest,
            counts: {
              ...assessment.manifest.counts,
              item: assessment.manifest.counts.item + 1,
            },
          },
        },
        snapshotData.rows
      );

      expect(programError).toMatchObject({
        _tag: "SnapshotEvidenceError",
        family: "program",
        field: "rowDigest",
      });
      expect(assessmentError).toMatchObject({
        _tag: "SnapshotEvidenceError",
        family: "assessment",
        field: "itemCount",
      });
    })
  );

  it.effect("binds every Quran row to the selected snapshot identity", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const quran = yield* manifestFor(snapshotData.manifests, "quran");
      const firstQuranIndex = Arr.findFirstIndex(
        snapshotData.rows,
        (row) => row.family === "quran"
      );
      if (Option.isNone(firstQuranIndex)) {
        return yield* Effect.die("Expected Quran test values.");
      }
      const firstQuran = snapshotData.rows[firstQuranIndex.value];
      if (quran.family !== "quran" || firstQuran?.family !== "quran") {
        return yield* Effect.die("Expected Quran test values.");
      }
      const rows = Arr.copy(snapshotData.rows);
      rows[firstQuranIndex.value] = {
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
          Arr.map(snapshotData.rows, (row) =>
            row.family === "quran"
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

  it.effect(
    "pins the replayed digest each mismatched family reports",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const program = yield* manifestFor(snapshotData.manifests, "program");
        const quran = yield* manifestFor(snapshotData.manifests, "quran");
        const assessment = yield* manifestFor(
          snapshotData.manifests,
          "assessment"
        );
        if (
          program.family !== "program" ||
          quran.family !== "quran" ||
          assessment.family !== "assessment"
        ) {
          return yield* Effect.die("Expected narrowed test manifests.");
        }
        const errors = yield* Effect.all([
          reject(
            {
              ...program,
              manifest: { ...program.manifest, rowDigest: unrelatedHash },
            },
            snapshotData.rows
          ),
          reject(
            {
              ...quran,
              manifest: { ...quran.manifest, projectionDigest: unrelatedHash },
            },
            snapshotData.rows
          ),
          reject(
            {
              ...assessment,
              manifest: { ...assessment.manifest, rowDigest: unrelatedHash },
            },
            snapshotData.rows
          ),
        ]);

        expect(
          Arr.map(errors, (error) =>
            "actual" in error ? error.actual : undefined
          )
        ).toEqual([
          "sha256:3ede07c7c49092e5f91ee4507902b2d7d6eb41f49330f8c083d09626fefdc5cc",
          "sha256:35166bf48e99b55e6fb8394655e8bb413590ed60213befffd8e76deeffdd53fd",
          "sha256:556a7889b3703a5c6d1aa6c428944a9d8debb8d477b3f6b255edad463e41dcbe",
        ]);
      }),
    30_000
  );
});
