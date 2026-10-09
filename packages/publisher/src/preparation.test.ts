import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  ContentKeySchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Array as Arr, Effect, Stream } from "effect";
import {
  deletion,
  emptySnapshots,
  prepareTestRelease as prepare,
  priorAppLocales,
} from "#test/preparation";
import {
  record as baseTransition,
  contentRecord,
  rendererManifest,
  head as resultHead,
} from "#test/publication";
import { incompleteRendererManifest } from "#test/renderer";
import { makeProgramSnapshotFixture } from "#test/snapshot";

layer(NodeServices.layer)("prepareContentRelease", (it) => {
  it.effect(
    "derives replayable items and projections from one canonical record source",
    () =>
      Effect.gen(function* () {
        const prepared = yield* prepare({
          records: Stream.make(baseTransition, deletion),
        });
        const [items, projections, snapshotManifests, snapshotRows] =
          yield* Effect.all([
            prepared.items.pipe(Stream.runCollect),
            prepared.projections.pipe(Stream.runCollect),
            prepared.snapshotManifests.pipe(Stream.runCollect),
            prepared.snapshotRows.pipe(Stream.runCollect),
          ]);
        expect(prepared.manifest).toMatchObject({
          itemCount: 2,
          projectionCount: 1,
          scope: { families: ["material"], snapshots: [] },
          snapshots: inheritContentSnapshots(null),
        });
        expect("content" in prepared.manifest.scope).toBe(false);
        expect(Arr.map(Arr.fromIterable(items), ({ index }) => index)).toEqual([
          0, 1,
        ]);
        expect([...projections]).toEqual([contentRecord.projection]);
        expect([...snapshotManifests]).toEqual([]);
        expect([...snapshotRows]).toEqual([]);
        expect(prepared.rendererManifest).toEqual(rendererManifest);
      })
  );

  it.effect(
    "rejects incomplete material projections from exact-Git authoring",
    () =>
      Effect.gen(function* () {
        const { topicTitle: _topicTitle, ...incompleteProjection } =
          baseTransition.record.projection;
        const error = yield* prepare({
          records: Stream.make({
            ...baseTransition,
            record: {
              ...baseTransition.record,
              projection: incompleteProjection,
            },
          }),
        }).pipe(Effect.flip);

        expect(error).toMatchObject({ _tag: "PreparedContentDecodeError" });
      })
  );

  it.effect(
    "self-verifies every replay against its derived signed digests",
    () =>
      Effect.gen(function* () {
        let replayCount = 0;
        const error = yield* prepare({
          records: Stream.suspend(() => {
            replayCount += 1;
            return replayCount === 1
              ? Stream.make(baseTransition)
              : Stream.empty;
          }),
        }).pipe(Effect.flip);
        expect(error._tag).toBe("ReleaseItemCountMismatchError");
      })
  );

  it.effect("validates the renderer before invoking the authored source", () =>
    Effect.gen(function* () {
      let invoked = false;
      const error = yield* prepare({
        baseActiveAppLocales: null,
        baseManifestHash: null,
        baseReleaseId: null,
        baseRendererManifestHash: null,
        ...emptySnapshots,
        records: Stream.suspend(() => {
          invoked = true;
          return Stream.make(baseTransition);
        }),
        rendererManifest: {
          ...rendererManifest,
          hash: Sha256HashSchema.make(`sha256:${"9".repeat(64)}`),
        },
      }).pipe(Effect.flip);
      expect(error._tag).toBe("RendererManifestHashMismatchError");
      expect(invoked).toBe(false);
    })
  );

  it.effect("rejects incomplete renderer domains before source traversal", () =>
    Effect.gen(function* () {
      let invoked = false;
      const error = yield* prepare({
        records: Stream.suspend(() => {
          invoked = true;
          return Stream.make(baseTransition);
        }),
        rendererManifest: incompleteRendererManifest(rendererManifest),
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");
      expect(invoked).toBe(false);
    })
  );

  it.effect("rejects a replacement manifest outside the signed scope", () =>
    Effect.gen(function* () {
      const snapshot = yield* makeProgramSnapshotFixture();
      const error = yield* prepare({
        snapshotManifests: snapshot.snapshotManifests,
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "PreparedSnapshotScopeError",
        family: "program",
      });
    })
  );

  it.effect("rejects a policy transition that omits any authored family", () =>
    Effect.gen(function* () {
      const snapshot = yield* makeProgramSnapshotFixture();
      const error = yield* prepare({
        baseActiveAppLocales: priorAppLocales,
        baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
        baseReleaseId: ReleaseIdSchema.make("test-policy-base"),
        previousSnapshots: inheritContentSnapshots(null),
        scope: PublicationScopeSchema.make({
          families: [],
          snapshots: ["program"],
        }),
        snapshotManifests: snapshot.snapshotManifests,
        snapshotRows: snapshot.snapshotRows.pipe(Stream.orDie),
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "ReleasePolicyClosureError",
        family: "article",
        field: "scope",
      });
    })
  );

  it.effect(
    "rejects reuse of the base release identity before reading records",
    () =>
      Effect.gen(function* () {
        const selfBasedRelease = ReleaseIdSchema.make(
          "test-self-based-release"
        );
        let invoked = false;
        const error = yield* prepare({
          baseActiveAppLocales: ACTIVE_APP_LOCALES,
          baseManifestHash: Sha256HashSchema.make(`sha256:${"8".repeat(64)}`),
          baseReleaseId: selfBasedRelease,
          baseResultCount: 1,
          baseResultDigest: resultHead.projectionHash,
          records: Stream.suspend(() => {
            invoked = true;
            return Stream.make(baseTransition);
          }),
          releaseId: selfBasedRelease,
        }).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "PreparedReleaseIdentityError",
          baseReleaseId: selfBasedRelease,
          releaseId: selfBasedRelease,
        });
        expect(invoked).toBe(false);
      })
  );

  it.effect(
    "pins one set of release digests for two chunkings of the record stream",
    () =>
      Effect.gen(function* () {
        /** Prepares one release from the shared records in one stream chunking. */
        const digestsFor = Effect.fn("PreparationTest.digestsFor")(function* (
          chunk: number
        ) {
          const route = {
            current: {
              appLocale: AppLocaleSchema.make("en"),
              contentKey: ContentKeySchema.make("test:publication"),
            },
            next: {
              appLocale: AppLocaleSchema.make("en"),
              contentKey: ContentKeySchema.make("test:publication"),
              publicPath: PublicPathSchema.make("subjects/test/publication"),
            },
          };
          const { manifest } = yield* prepare({
            records: Stream.make(baseTransition, deletion).pipe(
              Stream.rechunk(chunk)
            ),
            result: Stream.make(resultHead),
            routes: Stream.make(route),
          });
          return {
            itemsDigest: manifest.itemsDigest,
            projectionDigest: manifest.projectionDigest,
            resultDigest: manifest.resultDigest,
            rollbackDigest: manifest.rollbackDigest,
            routeDigest: manifest.routeDigest,
          };
        });
        expect(yield* digestsFor(1)).toMatchInlineSnapshot(`
          {
            "itemsDigest": "sha256:d88e0bb8f581eb27f76636497430a430fb63f6824b06bdd82a63326ee11a87a2",
            "projectionDigest": "sha256:cd18a20e38e04bdbe7cd70d503e75ff85261da7de8ebdb03f7ca1e4441b743cf",
            "resultDigest": "sha256:3788d304c0b1f434cdf2a8de81bc6a7d0a688230b39b46f62de2aa03d7837fb5",
            "rollbackDigest": "sha256:f67ceb9f909a48abac2665d28162d6579ee9d1f149caa6c8b6837ae5ba8f0c87",
            "routeDigest": "sha256:5ebad4292278c4bf6e2c7655b113ce22d01eaf052fa8af090c0b3f95ff18e613",
          }
        `);
        expect(yield* digestsFor(2)).toMatchInlineSnapshot(`
          {
            "itemsDigest": "sha256:d88e0bb8f581eb27f76636497430a430fb63f6824b06bdd82a63326ee11a87a2",
            "projectionDigest": "sha256:cd18a20e38e04bdbe7cd70d503e75ff85261da7de8ebdb03f7ca1e4441b743cf",
            "resultDigest": "sha256:3788d304c0b1f434cdf2a8de81bc6a7d0a688230b39b46f62de2aa03d7837fb5",
            "rollbackDigest": "sha256:f67ceb9f909a48abac2665d28162d6579ee9d1f149caa6c8b6837ae5ba8f0c87",
            "routeDigest": "sha256:5ebad4292278c4bf6e2c7655b113ce22d01eaf052fa8af090c0b3f95ff18e613",
          }
        `);
      })
  );

  it.effect.each([
    {
      baseActiveAppLocales: null,
      baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
      baseReleaseId: null,
      baseRendererManifestHash: null,
    },
    {
      baseActiveAppLocales: ACTIVE_APP_LOCALES,
      baseManifestHash: null,
      baseReleaseId: ReleaseIdSchema.make("test-unpaired-base"),
      baseRendererManifestHash: rendererManifest.hash,
    },
    {
      baseActiveAppLocales: ACTIVE_APP_LOCALES,
      baseManifestHash: Sha256HashSchema.make(`sha256:${"6".repeat(64)}`),
      baseReleaseId: ReleaseIdSchema.make("test-missing-snapshot-base"),
      baseRendererManifestHash: rendererManifest.hash,
    },
  ])("rejects an unpaired exact base identity", (base) =>
    Effect.gen(function* () {
      const error = yield* prepare({
        ...base,
        ...emptySnapshots,
      }).pipe(Effect.flip);

      expect(error).toMatchObject({ _tag: "PreparedReleaseBaseIdentityError" });
    })
  );
});
