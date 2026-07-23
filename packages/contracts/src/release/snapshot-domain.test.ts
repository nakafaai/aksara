import { Effect, Stream } from "effect";
import { beforeAll, describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot-data";
import { verifySnapshotRows } from "#contracts/release/snapshot-domain";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

const unrelatedHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
let snapshotData: Effect.Effect.Success<
  ReturnType<typeof makeSnapshotTestData>
>;

beforeAll(async () => {
  snapshotData = await Effect.runPromise(makeSnapshotTestData());
}, 30_000);

/** Returns the exact test manifest owned by one structured family. */
function manifestFor(
  manifests: readonly ContentSnapshotManifest[],
  family: ContentSnapshotManifest["family"]
) {
  const manifest = manifests.find((candidate) => candidate.family === family);
  if (manifest === undefined) {
    throw new Error(`Expected the ${family} test manifest.`);
  }
  return manifest;
}

/** Runs one family verifier against the complete replayable row source. */
function verify(
  manifest: ContentSnapshotManifest,
  rows: readonly ContentSnapshotRow[]
) {
  return Effect.runPromise(
    verifySnapshotRows(manifest, () => Stream.fromIterable(rows))
  );
}

/** Returns one typed family verification failure. */
function reject(
  manifest: ContentSnapshotManifest,
  rows: readonly ContentSnapshotRow[]
) {
  return Effect.runPromise(
    verifySnapshotRows(manifest, () => Stream.fromIterable(rows)).pipe(
      Effect.flip
    )
  );
}

describe("structured snapshot domain verification", () => {
  it("authenticates all three domain manifests against replayed rows", async () => {
    const counts = await Promise.all(
      snapshotData.manifests.map((manifest) =>
        verify(manifest, snapshotData.rows)
      )
    );

    expect(counts).toEqual([6, 1427, 12]);
  }, 30_000);

  it("rejects mismatched program and try-out signed evidence", async () => {
    const program = manifestFor(snapshotData.manifests, "program");
    const tryout = manifestFor(snapshotData.manifests, "tryout");
    if (program.family !== "program" || tryout.family !== "tryout") {
      throw new Error("Expected narrowed test manifests.");
    }
    const programError = await reject(
      {
        ...program,
        manifest: { ...program.manifest, rowDigest: unrelatedHash },
      },
      snapshotData.rows
    );
    const tryoutError = await reject(
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
  });

  it("binds every Quran row to the selected snapshot identity", async () => {
    const quran = manifestFor(snapshotData.manifests, "quran");
    const firstQuranIndex = snapshotData.rows.findIndex(
      (row) => row.family === "quran"
    );
    const firstQuran = snapshotData.rows[firstQuranIndex];
    if (quran.family !== "quran" || firstQuran?.family !== "quran") {
      throw new Error("Expected Quran test values.");
    }
    const rows = snapshotData.rows.slice();
    rows[firstQuranIndex] = {
      ...firstQuran,
      record: { ...firstQuran.record, snapshotId: unrelatedHash },
    };
    const error = await reject(quran, rows);

    expect(error).toMatchObject({
      _tag: "SnapshotEvidenceError",
      family: "quran",
      field: "snapshotId",
    });
  });

  it("rejects a mismatched content-addressed snapshot identity", async () => {
    const quran = manifestFor(snapshotData.manifests, "quran");
    if (quran.family !== "quran") {
      throw new Error("Expected the Quran test manifest.");
    }
    const error = await reject(
      {
        ...quran,
        manifest: { ...quran.manifest, snapshotId: unrelatedHash },
      },
      snapshotData.rows.map((row) =>
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
  }, 30_000);
});
