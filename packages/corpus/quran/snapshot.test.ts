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
        "sha256:40f179d89ba4e17bb97efc915121e196dcad79dda3aa7916a48101da0afbe79c",
      provenanceDigest:
        "sha256:a5335ed69ce8e4804c1b0ed7968f1d73498bf2ae1e71be3cd00c6754c4b02dee",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:a087de056abe7a9cf88126122dec0296cbeff2af8f3da6fbb8b690b1815e50a6",
      searchCount: 342,
      searchDigest:
        "sha256:1cf90478be212d6d256a5fcb2b60ba5765d4dca839b9bc2fdfe66ee72cff8a95",
      snapshotId:
        "sha256:6a80d6207ec35c6d2a3fda71a5a3941333761db80671fb948b7c860d41c0c228",
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
