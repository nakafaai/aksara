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
        "sha256:5ea9c0dbdcbb4e5adf379a7aad44bcd79b608054276e1e70085b819f36eb9bfb",
      provenanceDigest:
        "sha256:a8e8876015edb2c8d21738c9ce7a0f46f7f7bf1665dc63a52150ac715a21c96b",
      provenanceStatus: "approved",
      runtimeDigest:
        "sha256:69177909768686d239d5920ede44b59b3ae8ef79c24325554569e16f2b0e2ec0",
      searchCount: 228,
      searchDigest:
        "sha256:103398dedd49e343d59d2cb0daecaaa5c5f8e0fa8a590b091bd0392c038219a8",
      snapshotId:
        "sha256:2994ca7d8e65000978f78ede7fb57973461e9f7a923b93508c1c4045aec1d9cb",
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
