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
        "sha256:760db10a65875a51577f4e4d457dba16e6316426b702fd6acd711d9c8222c619",
      provenanceDigest:
        "sha256:6811b69eb09048b2e1ac142afde742aa32d0702e61428a85bc51782301a5877d",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:94ef30488751f405d4d8a86627ca5a4b6d986d4433613adb3c99e71f0ba393a9",
      searchCount: 342,
      searchDigest:
        "sha256:1cf90478be212d6d256a5fcb2b60ba5765d4dca839b9bc2fdfe66ee72cff8a95",
      snapshotId:
        "sha256:6dcf47955922f468af68d7b74bdc206096c87db1132ee3c598fbbb20bf86415a",
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
