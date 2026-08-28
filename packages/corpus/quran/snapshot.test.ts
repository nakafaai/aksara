import { NodeServices } from "@effect/platform-node";
import { layer } from "@effect/vitest";
import { QuranSnapshotRowSchema } from "@nakafa/aksara-contracts/quran/snapshot/row";
import { Effect, Path, Stream } from "effect";
import { expect } from "vitest";
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
            "sha256:be930c4a68579727a51732ba6ee622a9bec34a49acaf881a379f497e64d8fba8",
          provenanceDigest:
            "sha256:478263c93e1fc38077d8476ec462e9f08cae9218865f4d7d2773868f5cf1541f",
          provenanceStatus: "approved",
          runtimeDigest:
            "sha256:8bae581ae54a7c722b200f2a1134335a88b27e9398a572221ec16ffb044daf69",
          searchCount: 342,
          searchDigest:
            "sha256:55797023180303406d42770e90bb997ce19c3dca856e29c9c9568e0ae4335953",
          snapshotId:
            "sha256:3f51e04465e765d4b9e77f560e59b5d65b6d63475423be2c5e42da8b8c3e2a43",
          sourceBytes: 20_600_641,
          sourceDigest:
            "sha256:de42a454eba6c2e88e2e17d4db03827df33751c1212f6b36542a9be6ac83a9c1",
          sourceFileCount: 121,
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
      }),
    30_000
  );
});
