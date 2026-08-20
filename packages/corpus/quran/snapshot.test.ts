import { resolve } from "node:path";

import { NodeServices } from "@effect/platform-node";
import { QuranSnapshotRowSchema } from "@nakafa/aksara-contracts/quran/snapshot/row";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";
import { prepareQuranSnapshot } from "#corpus/quran/snapshot";

const checkoutRoot = resolve(import.meta.dirname, "../../..");

describe("Quran snapshot preparation", () => {
  it("binds every exact structured row to one reproducible snapshot", async () => {
    const snapshot = await Effect.runPromise(
      prepareQuranSnapshot({ checkoutRoot }).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const rows = await Effect.runPromise(Stream.runCollect(snapshot.rows));

    expect(snapshot.manifest).toMatchObject({
      projectionDigest:
        "sha256:3b903e29eded334346d297a02e603073a535618e341f9d924ef895f67e9d4672",
      provenanceDigest:
        "sha256:a5335ed69ce8e4804c1b0ed7968f1d73498bf2ae1e71be3cd00c6754c4b02dee",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:7303baf0527eb223c03c7a494e64cd0d6a888af430f592ddb327441d84aa324d",
      searchCount: 342,
      searchDigest:
        "sha256:1cf90478be212d6d256a5fcb2b60ba5765d4dca839b9bc2fdfe66ee72cff8a95",
      snapshotId:
        "sha256:dffe3b952df97c419bbfd08609fdc60e1dfead377a06fcd13e40c8d4a160e014",
      sourceBytes: 13_030_246,
      sourceDigest:
        "sha256:4834b7d8ca7e55e622c3e27a37c4b210af0ab58f066162603b1d76beb0dd91b8",
      sourceFileCount: 119,
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
