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
        "sha256:083c7fcc9067b5ddbd0729fd3a98ee5df7f414eee96240463ef9413ad08f9da8",
      provenanceStatus: "blocked",
      runtimeDigest:
        "sha256:50d48580b4689147b99ac137bae8a6a38d5b0b942cee3d08dc3208cbac40babe",
      searchCount: 228,
      searchDigest:
        "sha256:432593667ecb71aadb2a3a24783000d8cf9b09be22a82fa54821618138ae1b11",
      sourceBytes: 19_376_634,
      sourceDigest:
        "sha256:9aa95cde6f38685d313bf1e4ceb0e8b9db1fe021205202e9ee9a49e2de24fce6",
      surahCount: 114,
      verseCount: 6236,
    });
    expect(snapshot.manifest.chunkCount).toBe(
      snapshot.manifest.runtimeCount - snapshot.manifest.surahCount
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
