import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  ContentKeySchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";
import {
  emptySnapshots,
  prepareTestRelease as prepare,
  priorAppLocales,
} from "#test/preparation";
import {
  record as baseTransition,
  contentRecord,
  historicalRendererManifest,
  rendererManifest,
  head as resultHead,
} from "#test/publication";
import { makeProgramSnapshotFixture } from "#test/snapshot";

layer(NodeServices.layer)("prepareContentRelease", (it) => {
  it.effect(
    "derives replayable items and projections from one canonical record source",
    () =>
      Effect.gen(function* () {
        const deletion = {
          prior: {
            head: {
              ...resultHead,
              contentKey: ContentKeySchema.make("test:publication:z"),
            },
            state: "material" as const,
          },
          record: {
            change: ContentDeleteSchema.make({
              artifactLocale: ArtifactLocaleSchema.make("en"),
              contentKey: ContentKeySchema.make("test:publication:z"),
              family: "material",
              operation: "delete",
            }),
          },
        };
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
          snapshots: inheritContentSnapshots(null),
        });
        expect([...items].map(({ index }) => index)).toEqual([0, 1]);
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

  it.effect(
    "rejects a hash-valid historical renderer before reading source",
    () =>
      Effect.gen(function* () {
        let invoked = false;
        const error = yield* prepare({
          records: Stream.suspend(() => {
            invoked = true;
            return Stream.make(baseTransition);
          }),
          rendererManifest: historicalRendererManifest(),
        }).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "ContractDecodeError",
          contract: "LiveRendererManifestDomains",
        });
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

  it.effect(
    "rejects predecessor-only exact content from new Git releases",
    () =>
      Effect.gen(function* () {
        let invoked = false;
        const error = yield* prepare({
          records: Stream.suspend(() => {
            invoked = true;
            return Stream.make(baseTransition);
          }),
          scope: PublicationScopeSchema.make({
            content: [],
            families: ["material"],
            snapshots: [],
          }),
        }).pipe(Effect.flip);

        expect(error._tag).toBe("GitPublicationScopeError");
        expect(invoked).toBe(false);
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

  it.effect.each([
    {
      baseActiveAppLocales: null,
      baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
      baseReleaseId: null,
    },
    {
      baseActiveAppLocales: ACTIVE_APP_LOCALES,
      baseManifestHash: null,
      baseReleaseId: ReleaseIdSchema.make("test-unpaired-base"),
    },
    {
      baseActiveAppLocales: ACTIVE_APP_LOCALES,
      baseManifestHash: Sha256HashSchema.make(`sha256:${"6".repeat(64)}`),
      baseReleaseId: ReleaseIdSchema.make("test-missing-snapshot-base"),
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
