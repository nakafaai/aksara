import { describe, expect, it } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  MutableList,
  Record as Rec,
  Stream,
} from "effect";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import {
  ContentSnapshotSetSchema,
  inheritContentSnapshot,
  inheritContentSnapshots,
} from "#contracts/release/snapshot/spec";
import {
  decodeContentSnapshotManifests,
  decodeContentSnapshotRows,
  verifyContentSnapshots,
  verifyStagedSnapshotRows,
} from "#contracts/release/snapshot/verify";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import { encodeJsonText } from "#contracts/text/json";

/** Returns one expected typed failure through the native Effect test runtime. */
function reject<A, E>(effect: Effect.Effect<A, E>) {
  return effect.pipe(Effect.flip);
}

/** Interleaves families without changing any signed per-family order. */
function interleaveRows(rows: readonly ContentSnapshotRow[]) {
  const groups = {
    assessment: Arr.filter(rows, (row) => row.family === "assessment"),
    program: Arr.filter(rows, (row) => row.family === "program"),
    quran: Arr.filter(rows, (row) => row.family === "quran"),
  };
  const result = MutableList.make<ContentSnapshotRow>();
  const length = Math.max(
    groups.assessment.length,
    groups.program.length,
    groups.quran.length
  );
  for (let index = 0; index < length; index += 1) {
    for (const family of ["assessment", "program", "quran"] as const) {
      const row = groups[family][index];
      if (row !== undefined) {
        MutableList.append(result, row);
      }
    }
  }
  return MutableList.toArray(result);
}

/** Authenticates one test input. */
function verify(input: {
  readonly manifests: readonly unknown[];
  readonly previousSnapshots?: Parameters<
    typeof verifyContentSnapshots
  >[0]["previousSnapshots"];
  readonly rows: readonly unknown[];
}) {
  return verifyContentSnapshots({
    manifests: Stream.fromIterable(input.manifests),
    previousSnapshots: input.previousSnapshots ?? null,
    rows: Stream.fromIterable(input.rows),
  });
}

describe("structured snapshot verification", () => {
  it.effect(
    "derives the fixed set from one replay of interleaved rows",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        let manifestReplays = 0;
        let rowReplays = 0;
        const result = yield* verifyContentSnapshots({
          manifests: Stream.suspend(() => {
            manifestReplays += 1;
            return Stream.fromIterable(snapshotData.manifests);
          }),
          previousSnapshots: null,
          rows: Stream.suspend(() => {
            rowReplays += 1;
            return Stream.fromIterable(interleaveRows(snapshotData.rows));
          }),
        });

        expect(result.stagedRows).toBe(2470);
        expect(
          Arr.map(Rec.values(result.snapshots), ({ mode }) => mode)
        ).toEqual(["replace", "replace", "replace"]);
        expect({ manifestReplays, rowReplays }).toEqual({
          manifestReplays: 1,
          rowReplays: 1,
        });
      }),
    30_000
  );

  it.effect("strictly decodes manifests and rows without exposing bodies", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const manifest = yield* Effect.fromNullishOr(snapshotData.manifests[0]);
      const row = yield* Effect.fromNullishOr(snapshotData.rows[0]);
      const [manifestError, rowError] = yield* Effect.all([
        reject(
          decodeContentSnapshotManifests(
            Stream.make({ ...manifest, unexpected: "private value" })
          ).pipe(Stream.runCollect)
        ),
        reject(
          decodeContentSnapshotRows(
            Stream.make({ ...row, unexpected: "private value" })
          ).pipe(Stream.runCollect)
        ),
      ]);

      expect(manifestError).toMatchObject({
        _tag: "SnapshotManifestDecodeError",
        manifestIndex: 0,
      });
      expect(rowError).toMatchObject({
        _tag: "SnapshotRowDecodeError",
        rowIndex: 0,
      });
      expect(encodeJsonText([manifestError, rowError])).not.toContain(
        "private value"
      );
    })
  );

  it.effect("rejects duplicate and reversed replacement manifest order", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const program = yield* Effect.fromNullishOr(snapshotData.manifests[0]);
      const quran = yield* Effect.fromNullishOr(snapshotData.manifests[1]);
      const [duplicate, reversed] = yield* Effect.all([
        reject(
          decodeContentSnapshotManifests(Stream.make(program, program)).pipe(
            Stream.runCollect
          )
        ),
        reject(
          decodeContentSnapshotManifests(Stream.make(quran, program)).pipe(
            Stream.runCollect
          )
        ),
      ]);

      expect([duplicate._tag, reversed._tag]).toEqual([
        "SnapshotManifestOrderError",
        "SnapshotManifestOrderError",
      ]);
    })
  );

  it.effect("rejects rows outside replacement ownership", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const program = yield* Effect.fromOption(
        Arr.findFirst(
          snapshotData.manifests,
          (manifest) => manifest.family === "program"
        )
      );
      const quranRow = yield* Effect.fromOption(
        Arr.findFirst(snapshotData.rows, (row) => row.family === "quran")
      );
      const error = yield* reject(
        verify({ manifests: [program], rows: [quranRow] })
      );

      expect(error).toMatchObject({
        _tag: "SnapshotRowFamilyError",
        family: "quran",
        rowIndex: 0,
      });
    })
  );

  it.effect("rejects a no-op replacement as an incoherent transition", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const program = yield* Effect.fromOption(
        Arr.findFirst(
          snapshotData.manifests,
          (manifest) => manifest.family === "program"
        )
      );
      if (program.family !== "program") {
        return yield* Effect.die("Expected the program test manifest.");
      }
      const previousSnapshots = ContentSnapshotSetSchema.make({
        ...inheritContentSnapshots(null),
        program: inheritContentSnapshot(program.manifest.snapshotId),
      });
      const error = yield* reject(
        verify({
          manifests: [program],
          previousSnapshots,
          rows: Arr.filter(
            snapshotData.rows,
            (row) => row.family === "program"
          ),
        })
      );

      expect(error).toMatchObject({
        _tag: "SnapshotTransitionError",
        family: "program",
      });
    })
  );

  it.effect("compares both replay totals with the signed staged count", () =>
    Effect.gen(function* () {
      yield* verifyStagedSnapshotRows(3, 3, 3);
      const [actual, verified] = yield* Effect.all([
        reject(verifyStagedSnapshotRows(2, 3, 3)),
        reject(verifyStagedSnapshotRows(3, 2, 3)),
      ]);

      expect([actual._tag, verified._tag]).toEqual([
        "SnapshotStagedCountError",
        "SnapshotStagedCountError",
      ]);
      expect(verified).toMatchObject({
        actualCount: 3,
        expectedCount: 3,
        verifiedCount: 2,
      });
    })
  );

  it.effect(
    "inherits all fixed families when a release stages no snapshots",
    () =>
      Effect.gen(function* () {
        const previous = inheritContentSnapshots(null);
        const result = yield* verify({
          manifests: [] satisfies readonly ContentSnapshotManifest[],
          previousSnapshots: previous,
          rows: [],
        });

        expect(result).toEqual({ snapshots: previous, stagedRows: 0 });
      })
  );

  it.effect(
    "pins the derived snapshot set and staged row count of the fixture",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const result = yield* verify({
          manifests: snapshotData.manifests,
          rows: snapshotData.rows,
        });

        expect(result.stagedRows).toBe(2470);
        expect(result.snapshots).toEqual({
          assessment: {
            baseSnapshotId: null,
            mode: "replace",
            resultSnapshotId:
              "sha256:f0af06e68e9c045bbb78bc29311ba69e25ce58a627c30cdc77ec9a8f6d9b014f",
            rowCount: 34,
            rowDigest:
              "sha256:4f7c3a51661c93315577962f4450fcebd2ec58e7af238c85f2162359faa2bd5b",
          },
          program: {
            baseSnapshotId: null,
            mode: "replace",
            resultSnapshotId:
              "sha256:fcbf7e442a7bd062ce50d64b3d9e85394642fc9270334ba3f1701c22e22cab40",
            rowCount: 780,
            rowDigest:
              "sha256:a86da6c00b6c85d5057c6ed23ed793e1f8a864659d32b4e202b2b2dc31680180",
          },
          quran: {
            baseSnapshotId: null,
            mode: "replace",
            resultSnapshotId:
              "sha256:1051bbd1dddf2588e801fe16485c4ec301fc8e3f6551df621f7843d31a48d310",
            rowCount: 1656,
            rowDigest:
              "sha256:3a021aa207cc4db5570defa60b37eb16bd57ab843bcbfb80f549846b948236db",
          },
        });
      })
  );
});
