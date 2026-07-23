import type { QuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import {
  QURAN_ROW_COUNT,
  QuranSnapshotRowSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import type { PreparedQuranSnapshot } from "#corpus/quran/snapshot";
import {
  prepareQuranSnapshot,
  requireQuranProductionApproval,
} from "#corpus/quran/snapshot";

describe("Quran snapshot preparation", () => {
  it("binds every exact structured row to one reproducible snapshot", async () => {
    const snapshot = await Effect.runPromise(prepareQuranSnapshot());
    const rows = Chunk.toReadonlyArray(
      await Effect.runPromise(Stream.runCollect(snapshot.rows()))
    );

    expect(snapshot.manifest).toMatchObject({
      chunkCount: 1085,
      projectionCount: QURAN_ROW_COUNT,
      provenanceStatus: "blocked",
      runtimeCount: 1199,
      searchCount: 228,
      sourceBytes: 19_376_634,
      surahCount: 114,
      verseCount: 6236,
    });
    expect(rows).toHaveLength(QURAN_ROW_COUNT);
    expect(
      rows.every(
        (row) =>
          row.snapshotId === snapshot.manifest.snapshotId &&
          QuranSnapshotRowSchema.make(row).rowHash === row.rowHash
      )
    ).toBe(true);
  });

  it("blocks unapproved production provenance and accepts reviewed status", async () => {
    const snapshot = await Effect.runPromise(prepareQuranSnapshot());
    const blocked = await Effect.runPromise(
      requireQuranProductionApproval(snapshot).pipe(Effect.flip)
    );
    const provenance: QuranProvenanceManifest = {
      ...snapshot.provenance,
      status: "approved",
    };
    const approved: PreparedQuranSnapshot = { ...snapshot, provenance };

    await expect(
      Effect.runPromise(requireQuranProductionApproval(approved))
    ).resolves.toBeUndefined();
    expect(blocked).toMatchObject({
      _tag: "QuranProvenanceBlockedError",
      digest: snapshot.provenance.digest,
    });
  });
});
