import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { ContractDecodeError } from "@nakafa/aksara-contracts/errors";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/verify";
import { Effect, Stream } from "effect";
import { prepareAcceptanceRelease } from "#publisher/acceptance/preparation";
import {
  AcceptanceSourceError,
  loadAcceptanceSources,
} from "#publisher/acceptance/source";
import { makeAcceptanceTestSources } from "#test/acceptance";

vi.mock("#publisher/acceptance/source", async (importOriginal) => ({
  ...(await importOriginal<typeof import("#publisher/acceptance/source")>()),
  loadAcceptanceSources: vi.fn(),
}));

const identity = {
  aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
  releaseId: ReleaseIdSchema.make("test-acceptance-genesis"),
};

layer(NodeServices.layer)("acceptance release preparation", (it) => {
  it.effect(
    "self-verifies an independent genesis with every family and exact structured snapshots",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeAcceptanceTestSources();
        vi.mocked(loadAcceptanceSources).mockReturnValue(
          Effect.succeed(fixture.sources)
        );
        const prepared = yield* prepareAcceptanceRelease({
          ...fixture,
          ...identity,
        });
        const [items, manifests] = yield* Effect.all([
          Stream.runCollect(prepared.items),
          Stream.runCollect(prepared.snapshotManifests),
        ]);
        const count =
          fixture.sources.article.length +
          fixture.sources.material.length +
          fixture.sources.page.length +
          fixture.sources.tryout.entries.length;
        expect(items).toHaveLength(count);
        expect(prepared.manifest).toMatchObject({
          activeAppLocales: ACTIVE_APP_LOCALES,
          baseManifestHash: null,
          baseReleaseId: null,
          itemCount: count,
          origin: { kind: "git", sha: identity.aksaraSha },
          releaseId: identity.releaseId,
          resultCount: count,
          scope: {
            families: ["article", "material", "page", "question"],
            snapshots: ["program", "quran", "tryout"],
          },
        });
        expect(manifests.map(({ family }) => family)).toEqual([
          "program",
          "quran",
          "tryout",
        ]);
        const tryout = manifests.find(({ family }) => family === "tryout");
        expect(tryout).toMatchObject({
          manifest: {
            placementCount: fixture.sources.tryout.projection.placements.length,
          },
        });
        yield* verifyContentReleaseItems({
          items: prepared.items,
          manifest: prepared.manifest,
        });
        yield* verifyContentSnapshots({
          manifests: prepared.snapshotManifests,
          previousSnapshots: null,
          rows: prepared.snapshotRows,
        });
        expect(prepared.rendererManifest).toEqual(fixture.rendererManifest);
        expect(prepared.rendererPreflight).toBe("exact");
      }),
    { timeout: 60_000 }
  );

  it.effect(
    "validates renderer integrity before reading any selected source",
    () =>
      Effect.gen(function* () {
        vi.mocked(loadAcceptanceSources).mockClear();
        const error = yield* prepareAcceptanceRelease({
          ...identity,
          checkoutRoot: "/test/unused-checkout",
          rendererManifest: {},
        }).pipe(Effect.flip);
        expect(error).toBeInstanceOf(ContractDecodeError);
        expect(vi.mocked(loadAcceptanceSources)).not.toHaveBeenCalled();
      })
  );

  it.effect(
    "preserves required source failures before preparing a release",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeAcceptanceTestSources();
        const failure = new AcceptanceSourceError({
          identity: "test:missing-source:en",
        });
        vi.mocked(loadAcceptanceSources).mockReturnValue(Effect.fail(failure));
        const error = yield* prepareAcceptanceRelease({
          ...fixture,
          ...identity,
        }).pipe(Effect.flip);
        expect(error).toBe(failure);
      })
  );
});
