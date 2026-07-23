import { Effect, Stream } from "effect";
import { beforeAll, describe, expect, it } from "vitest";
import {
  ContentSnapshotSetSchema,
  emptyContentSnapshots,
  inheritContentSnapshot,
} from "#contracts/release/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot-data";
import {
  decodeContentSnapshotManifests,
  decodeContentSnapshotRows,
  verifyContentSnapshots,
  verifyStagedSnapshotRows,
} from "#contracts/release/snapshot-verify";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

let snapshotData: Effect.Effect.Success<
  ReturnType<typeof makeSnapshotTestData>
>;

beforeAll(async () => {
  snapshotData = await Effect.runPromise(makeSnapshotTestData());
}, 30_000);

/** Returns one expected typed failure without a FiberFailure wrapper. */
function reject<A, E>(effect: Effect.Effect<A, E>) {
  return Effect.runPromise(effect.pipe(Effect.flip));
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
    manifests: () => Stream.fromIterable(input.manifests),
    previousSnapshots: input.previousSnapshots ?? null,
    rows: () => Stream.fromIterable(input.rows),
  });
}

describe("structured snapshot verification", () => {
  it("derives the fixed set and deliberately replays interleaved rows", async () => {
    let manifestReplays = 0;
    let rowReplays = 0;
    const result = await Effect.runPromise(
      verifyContentSnapshots({
        manifests: () => {
          manifestReplays += 1;
          return Stream.fromIterable(snapshotData.manifests);
        },
        previousSnapshots: null,
        rows: () => {
          rowReplays += 1;
          return Stream.fromIterable(interleaveRows(snapshotData.rows));
        },
      })
    );

    expect(result.stagedRows).toBe(1445);
    expect(Object.values(result.snapshots).map(({ mode }) => mode)).toEqual([
      "replace",
      "replace",
      "replace",
    ]);
    expect({ manifestReplays, rowReplays }).toEqual({
      manifestReplays: 1,
      rowReplays: 6,
    });
  }, 30_000);

  it("strictly decodes manifests and rows without exposing bodies", async () => {
    const [manifest] = snapshotData.manifests;
    const [row] = snapshotData.rows;
    if (manifest === undefined || row === undefined) {
      throw new Error("Expected complete snapshot test data.");
    }
    const [manifestError, rowError] = await Promise.all([
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
  });

  it("rejects duplicate and reversed replacement manifest order", async () => {
    const [program, quran] = snapshotData.manifests;
    if (program === undefined || quran === undefined) {
      throw new Error("Expected ordered snapshot manifests.");
    }
    const [duplicate, reversed] = await Promise.all([
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
  });

  it("rejects rows outside replacement ownership", async () => {
    const program = snapshotData.manifests.find(
      (manifest) => manifest.family === "program"
    );
    const quranRow = snapshotData.rows.find((row) => row.family === "quran");
    if (program === undefined || quranRow === undefined) {
      throw new Error("Expected program and Quran test values.");
    }
    const error = await reject(
      verify({ manifests: [program], rows: [quranRow] })
    );

    expect(error).toMatchObject({
      _tag: "SnapshotRowFamilyError",
      family: "quran",
      rowIndex: 0,
    });
  });

  it("rejects a no-op replacement as an incoherent transition", async () => {
    const program = snapshotData.manifests.find(
      (manifest) => manifest.family === "program"
    );
    if (program?.family !== "program") {
      throw new Error("Expected the program test manifest.");
    }
    const previousSnapshots = ContentSnapshotSetSchema.make({
      ...emptyContentSnapshots(),
      program: inheritContentSnapshot(program.manifest.snapshotId),
    });
    const error = await reject(
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
  });

  it("compares both replay totals with the signed staged count", async () => {
    await expect(
      Effect.runPromise(verifyStagedSnapshotRows(3, 3, 3))
    ).resolves.toBeUndefined();
    const [actual, verified] = await Promise.all([
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
  });

  it("inherits all fixed families when a release stages no snapshots", async () => {
    const previous = emptyContentSnapshots();
    const result = await Effect.runPromise(
      verify({
        manifests: [] satisfies readonly ContentSnapshotManifest[],
        previousSnapshots: previous,
        rows: [],
      })
    );

    expect(result).toEqual({ snapshots: previous, stagedRows: 0 });
  });
});
