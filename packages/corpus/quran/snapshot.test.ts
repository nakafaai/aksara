import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { QuranSnapshotRowSchema } from "@nakafa/aksara-contracts/quran/snapshot/row";
import { Array as Arr, Effect, Path, Stream } from "effect";
import { prepareQuranSnapshot } from "#corpus/quran/snapshot";

layer(NodeServices.layer)("Quran snapshot preparation", (it) => {
  it.effect(
    "binds every exact structured row to one reproducible snapshot",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const checkoutRoot = path.resolve(import.meta.dirname, "../../..");
        const snapshot = yield* prepareQuranSnapshot({ checkoutRoot });
        const rows = yield* Stream.runCollect(snapshot.rows);

        expect(snapshot.manifest).toMatchObject({
          projectionDigest:
            "sha256:ec307f5e521bfc9212c3a76183747e85752d7a481cebec9ea79e71ad990e160f",
          provenanceDigest:
            "sha256:aab13f062ec6989c1fe7286b8d8e1b0f7adc2115d17e6dc0b2b49c38d2afa2d8",
          provenanceStatus: "approved",
          runtimeDigest:
            "sha256:130b5523e2d13ed077277e28183a583cbcc1936b552f266fa5157f8942928bcb",
          searchCount: 456,
          searchDigest:
            "sha256:0d2d8f8fc75e273258f80e8075ce038e0776682f53ce266d74c98f9597846bf8",
          snapshotId:
            "sha256:7a68a5699d2a67abc69c37f2ff062d13e3a461f3d485f672c301a6c09d7f4e5f",
          sourceBytes: 26_462_642,
          sourceDigest:
            "sha256:db27daa635f53490416a50d2b5c86d2f8a38f2fef929418cb03df5285bf37d0c",
          sourceFileCount: 236,
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
          Arr.every(
            rows,
            (row) =>
              row.snapshotId === snapshot.manifest.snapshotId &&
              QuranSnapshotRowSchema.make(row).rowHash === row.rowHash
          )
        ).toBe(true);
      }),
    30_000
  );
});
