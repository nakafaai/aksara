import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";
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

/** Returns one expected typed failure through the native Effect test runtime. */
function reject<A, E>(effect: Effect.Effect<A, E>) {
  return effect.pipe(Effect.flip);
}

/** Interleaves families without changing any signed per-family order. */
function interleaveRows(rows: readonly ContentSnapshotRow[]) {
  const groups = {
    program: rows.filter((row) => row.family === "program"),
    quran: rows.filter((row) => row.family === "quran"),
    tryout: rows.filter((row) => row.family === "tryout"),
  };
  const result: ContentSnapshotRow[] = [];
  const length = Math.max(
    groups.program.length,
    groups.quran.length,
    groups.tryout.length
  );
  for (let index = 0; index < length; index += 1) {
    for (const family of ["program", "quran", "tryout"] as const) {
      const row = groups[family][index];
      if (row !== undefined) {
        result.push(row);
      }
    }
  }
  return result;
}

/** Authenticates one test input through explicit replay factories. */
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
    "derives the fixed set and deliberately replays interleaved rows",
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

        expect(result.stagedRows).toBe(2148);
        expect(Object.values(result.snapshots).map(({ mode }) => mode)).toEqual(
          ["replace", "replace", "replace"]
        );
        expect({ manifestReplays, rowReplays }).toEqual({
          manifestReplays: 1,
          rowReplays: 8,
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
      expect(JSON.stringify([manifestError, rowError])).not.toContain(
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
      const program = yield* Effect.fromNullishOr(
        snapshotData.manifests.find((manifest) => manifest.family === "program")
      );
      const quranRow = yield* Effect.fromNullishOr(
        snapshotData.rows.find((row) => row.family === "quran")
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
      const program = yield* Effect.fromNullishOr(
        snapshotData.manifests.find((manifest) => manifest.family === "program")
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
          rows: snapshotData.rows.filter((row) => row.family === "program"),
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
});
