import { NodeServices } from "@effect/platform-node";
import {
  ContentKeySchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import {
  inheritContentSnapshots,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";
import { prepareContentRelease } from "#publisher/preparation";
import type { PrepareContentReleaseInput } from "#publisher/preparation/spec";
import {
  record as baseTransition,
  contentRecord,
  historicalRendererManifest,
  rendererManifest,
  head as resultHead,
} from "#test/publication";
import { makeProgramSnapshotFixture } from "#test/snapshot";

const aksaraSha = GitCommitShaSchema.make("a".repeat(40));
const priorAppLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
]);
const inheritedSnapshots = {
  previousSnapshots: inheritContentSnapshots(null),
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntimeSnapshot: null,
} as const;
const emptySnapshots = {
  previousSnapshots: null,
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntimeSnapshot: null,
} as const;
const scope = PublicationScopeSchema.make({
  families: ["material"],
  snapshots: [],
});

type TestPreparationInput = PrepareContentReleaseInput<never, never>;

/** Runs preparation with direct overrides around one valid retained base. */
function prepare(overrides: Partial<TestPreparationInput> = {}) {
  return prepareContentRelease({
    aksaraSha,
    baseActiveAppLocales: ACTIVE_APP_LOCALES,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
    baseReleaseId: ReleaseIdSchema.make("test-prepare-base"),
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    ...inheritedSnapshots,
    records: Stream.make(baseTransition),
    releaseId: ReleaseIdSchema.make("test-prepare-release"),
    rendererManifest,
    result: Stream.make(resultHead),
    routes: Stream.empty,
    scope,
    ...overrides,
  }).pipe(Effect.provide(NodeServices.layer));
}

describe("prepareContentRelease", () => {
  it("derives replayable items and projections from one canonical record source", async () => {
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
    const prepared = await Effect.runPromise(
      prepare({ records: Stream.make(baseTransition, deletion) })
    );
    const [items, projections, snapshotManifests, snapshotRows] =
      await Effect.runPromise(
        Effect.all([
          prepared.items.pipe(Stream.runCollect),
          prepared.projections.pipe(Stream.runCollect),
          prepared.snapshotManifests.pipe(Stream.runCollect),
          prepared.snapshotRows.pipe(Stream.runCollect),
        ])
      );
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
  });

  it("rejects incomplete material projections from exact-Git authoring", async () => {
    const { topicTitle: _topicTitle, ...incompleteProjection } =
      baseTransition.record.projection;
    const error = await Effect.runPromise(
      prepare({
        records: Stream.make({
          ...baseTransition,
          record: {
            ...baseTransition.record,
            projection: incompleteProjection,
          },
        }),
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "PreparedContentDecodeError" });
  });

  it("self-verifies every replay against its derived signed digests", async () => {
    let replayCount = 0;
    const error = await Effect.runPromise(
      prepare({
        records: Stream.suspend(() => {
          replayCount += 1;
          return replayCount === 1 ? Stream.make(baseTransition) : Stream.empty;
        }),
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ReleaseItemCountMismatchError");
  });

  it("validates the renderer before invoking the authored source", async () => {
    let invoked = false;
    const error = await Effect.runPromise(
      prepare({
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
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("RendererManifestHashMismatchError");
    expect(invoked).toBe(false);
  });

  it("rejects a hash-valid historical renderer before reading source", async () => {
    let invoked = false;
    const error = await Effect.runPromise(
      prepare({
        records: Stream.suspend(() => {
          invoked = true;
          return Stream.make(baseTransition);
        }),
        rendererManifest: historicalRendererManifest(),
      }).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "ContractDecodeError",
      contract: "LiveRendererManifestDomains",
    });
    expect(invoked).toBe(false);
  });

  it("rejects a replacement manifest outside the signed scope", async () => {
    const snapshot = await makeProgramSnapshotFixture();
    const error = await Effect.runPromise(
      prepare({ snapshotManifests: snapshot.snapshotManifests }).pipe(
        Effect.flip
      )
    );
    expect(error).toMatchObject({
      _tag: "PreparedSnapshotScopeError",
      family: "program",
    });
  });

  it("rejects a runtime bundle snapshot outside the resulting release state", async () => {
    const runtimeSnapshot = makeTryoutSnapshot({
      activeAppLocales: ACTIVE_APP_LOCALES,
      catalogDigest: Sha256HashSchema.make(`sha256:${"8".repeat(64)}`),
      counts: { country: 0, exam: 0, section: 0, set: 0, track: 0 },
      placementCount: 0,
      placementDigest: Sha256HashSchema.make(`sha256:${"8".repeat(64)}`),
      routeCount: 0,
    });
    const error = await Effect.runPromise(
      prepare({ tryoutRuntimeSnapshot: runtimeSnapshot }).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreparedTryoutRuntimeSnapshotError",
      actualSnapshotId: runtimeSnapshot.snapshotId,
      expectedSnapshotId: null,
    });
  });

  it("rejects a policy transition that omits any authored family", async () => {
    const snapshot = await makeProgramSnapshotFixture();
    const error = await Effect.runPromise(
      prepare({
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
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "ReleasePolicyClosureError",
      family: "article",
      field: "scope",
    });
  });

  it("rejects reuse of the base release identity before reading records", async () => {
    const selfBasedRelease = ReleaseIdSchema.make("test-self-based-release");
    let invoked = false;
    const error = await Effect.runPromise(
      prepare({
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
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreparedReleaseIdentityError",
      baseReleaseId: selfBasedRelease,
      releaseId: selfBasedRelease,
    });
    expect(invoked).toBe(false);
  });

  it.each([
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
  ])("rejects an unpaired exact base identity", async (base) => {
    const error = await Effect.runPromise(
      prepare({
        ...base,
        ...emptySnapshots,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "PreparedReleaseBaseIdentityError" });
  });
});
