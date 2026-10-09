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
    program: Arr.filter(rows, (row) => row.family === "program"),
    quran: Arr.filter(rows, (row) => row.family === "quran"),
    tryout: Arr.filter(rows, (row) => row.family === "tryout"),
  };
  const result = MutableList.make<ContentSnapshotRow>();
  const length = Math.max(
    groups.program.length,
    groups.quran.length,
    groups.tryout.length
  );
  for (let index = 0; index < length; index += 1) {
    for (const family of ["program", "quran", "tryout"] as const) {
      const row = groups[family][index];
      if (row !== undefined) {
        MutableList.append(result, row);
      }
    }
  }
  return MutableList.toArray(result);
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
        expect(
          Arr.map(Rec.values(result.snapshots), ({ mode }) => mode)
        ).toEqual(["replace", "replace", "replace"]);
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

        expect(result.stagedRows).toBe(2148);
        expect(result.snapshots).toEqual({
          program: {
            baseSnapshotId: null,
            mode: "replace",
            resultSnapshotId:
              "sha256:a94c1fc351939f10f0c73f4c891be1691dede2d0ecf86dad014d37fc82de9b02",
            rowCount: 588,
            rowDigest:
              "sha256:3ede07c7c49092e5f91ee4507902b2d7d6eb41f49330f8c083d09626fefdc5cc",
          },
          quran: {
            baseSnapshotId: null,
            mode: "replace",
            resultSnapshotId:
              "sha256:b1c76d2ed5ba5dc86776737779ffeb73d9e6f21387a30d6538f7178bb3704a82",
            rowCount: 1542,
            rowDigest:
              "sha256:35166bf48e99b55e6fb8394655e8bb413590ed60213befffd8e76deeffdd53fd",
          },
          tryout: {
            baseSnapshotId: null,
            mode: "replace",
            resultSnapshotId:
              "sha256:3fd42ba02a4f1c50d71d9443ed86b7aa871100f37d7afb9205bbc8781f2fc2ca",
            rowCount: 18,
            rowDigest:
              "sha256:b4bfe8db748e1fbb236c6907bfd50b25da1e3001732ae6e0bfba6462c2ad30f0",
          },
        });
      })
  );
});
