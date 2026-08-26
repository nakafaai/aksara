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
        "sha256:5e2a739259973a0e4ce9dd0426cb50041f9a14a7b53718587b16ee433754b987",
      provenanceDigest:
        "sha256:252285f309ff6dd30d347efacd2c16d8d521579ce6f2f82c02702da46232da3c",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:bd20d422d45fb042678eefdad0ac774d82b81c1c2f4c0f5f4939a717a7b805f5",
      searchCount: 342,
      searchDigest:
        "sha256:1cf90478be212d6d256a5fcb2b60ba5765d4dca839b9bc2fdfe66ee72cff8a95",
      snapshotId:
        "sha256:79f4f87bb2cc457bfdd644ebf441bc0444dda12e5509ffb1c8331d7a2a28a991",
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
