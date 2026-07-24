import { QuranSnapshotRowSchema } from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareQuranSnapshot } from "#corpus/quran/snapshot";

describe("Quran snapshot preparation", () => {
  it("binds every exact structured row to one reproducible snapshot", async () => {
    const snapshot = await Effect.runPromise(prepareQuranSnapshot());
    const rows = Chunk.toReadonlyArray(
      await Effect.runPromise(Stream.runCollect(snapshot.rows()))
    );

    expect(snapshot.manifest).toMatchObject({
      projectionDigest:
        "sha256:e73bd9536a91b494460a92b07b9811abc417bd2543be6837d96056cbe6b9119f",
      provenanceDigest:
        "sha256:f275488f9dd9de22a618d282da0f1197e97f19ca8dc2b37304ac4046e68078c8",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:9df742a47aef3647934f4465846313ae1b616ba5d74f17f606c8803a359fa2e9",
      searchCount: 228,
      searchDigest:
        "sha256:adbb16b3c93cc1b1b7dad66f663c1b53b03e368b9edd1f7114ec4401c7d46661",
      snapshotId:
        "sha256:7ffd14d8a77d23de6243a3ba39e653b453c5a18b2d5b728c044a29d3ade98f55",
      sourceBytes: 11_506_941,
      sourceDigest:
        "sha256:73e50fb15aac4cd95c86151cc43f002b5c76986584846e16d171bd0be99f58d7",
      sourceFileCount: 118,
      surahCount: 114,
      verseCount: 6236,
    });
    expect(snapshot.manifest.chunkCount).toBe(
      snapshot.manifest.runtimeCount -
        snapshot.manifest.attributionCount -
        snapshot.manifest.surahCount
    );
    expect(snapshot.manifest.projectionCount).toBe(
      snapshot.manifest.runtimeCount + snapshot.manifest.searchCount
    );
    expect(rows).toHaveLength(snapshot.manifest.projectionCount);
    expect(
      rows.every(
        (row) =>
          row.snapshotId === snapshot.manifest.snapshotId &&
          QuranSnapshotRowSchema.make(row).rowHash === row.rowHash
      )
    ).toBe(true);
  }, 30_000);
});
