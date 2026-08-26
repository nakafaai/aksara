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
        "sha256:b2b4977415376fe6a9536eb953b496fb59d88a8fa20f4fd4c95547660ba1e40f",
      provenanceDigest:
        "sha256:a65c6001f613f6ac2f68014d6af93cab1ef473d6b6e8ed99dfa9567eb12cc95f",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:643754d3cda3931d166ecccf0b00e6ca3cb4f44d45b732e0609702fb69ed5971",
      searchCount: 342,
      searchDigest:
        "sha256:1cf90478be212d6d256a5fcb2b60ba5765d4dca839b9bc2fdfe66ee72cff8a95",
      snapshotId:
        "sha256:ee18bdbb10ed7ba3a2ed22e62748f5159058a7ee2e3af33f6965ad0c3c46a946",
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
