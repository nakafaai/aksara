import {
  ContentKeySchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import {
  inheritContentSnapshots,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareContentRelease } from "#publisher/preparation";
import {
  record as baseTransition,
  contentRecord,
  rendererManifest,
  head as resultHead,
} from "#test/publication";
import { makeProgramSnapshotFixture } from "#test/snapshot";

const aksaraSha = GitCommitShaSchema.make("a".repeat(40));
const emptySnapshots = {
  previousSnapshots: null,
  snapshotManifests: () => Stream.empty,
  snapshotRows: () => Stream.empty,
} as const;
const scope = PublicationScopeSchema.make({
  content: [
    {
      contentKey: contentRecord.change.contentKey,
      family: "material",
      locale: contentRecord.change.locale,
    },
    {
      contentKey: ContentKeySchema.make("test:publication:z"),
      family: "material",
      locale: "en",
    },
  ],
  families: [],
  snapshots: [],
});

/** Runs preparation with one replayable in-memory test protocol source. */
function prepare<E, R>(
  records: () => Stream.Stream<unknown, E, R>,
  snapshotManifests: () => Stream.Stream<unknown, E, R> = () => Stream.empty
) {
  return prepareContentRelease({
    aksaraSha,
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    ...emptySnapshots,
    records,
    releaseId: ReleaseIdSchema.make("test-prepare-release"),
    rendererManifest,
    result: () => Stream.make(resultHead),
    routes: () => Stream.empty,
    scope,
    snapshotManifests,
  });
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
          contentKey: ContentKeySchema.make("test:publication:z"),
          family: "material",
          locale: "en",
          operation: "delete",
        }),
      },
    };
    const prepared = await Effect.runPromise(
      prepare(() => Stream.make(baseTransition, deletion))
    );
    const [items, projections, snapshotManifests, snapshotRows] =
      await Effect.runPromise(
        Effect.all([
          prepared.items().pipe(Stream.runCollect),
          prepared.projections().pipe(Stream.runCollect),
          prepared.snapshotManifests().pipe(Stream.runCollect),
          prepared.snapshotRows().pipe(Stream.runCollect),
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
      prepare(() =>
        Stream.make({
          ...baseTransition,
          record: {
            ...baseTransition.record,
            projection: incompleteProjection,
          },
        })
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "PreparedContentDecodeError" });
  });

  it("self-verifies every replay against its derived signed digests", async () => {
    let replayCount = 0;
    const error = await Effect.runPromise(
      prepare(() => {
        replayCount += 1;
        return replayCount === 1 ? Stream.make(baseTransition) : Stream.empty;
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ReleaseItemCountMismatchError");
  });

  it("validates the renderer before invoking the authored source", async () => {
    let invoked = false;
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        baseManifestHash: null,
        baseReleaseId: null,
        baseResultCount: 0,
        baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
        ...emptySnapshots,
        records: () => {
          invoked = true;
          return Stream.make(baseTransition);
        },
        releaseId: ReleaseIdSchema.make("test-invalid-renderer"),
        rendererManifest: {
          ...rendererManifest,
          hash: Sha256HashSchema.make(`sha256:${"9".repeat(64)}`),
        },
        result: () => Stream.make(resultHead),
        routes: () => Stream.empty,
        scope,
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("RendererManifestHashMismatchError");
    expect(invoked).toBe(false);
  });

  it("rejects a replacement manifest outside the signed scope", async () => {
    const snapshot = makeProgramSnapshotFixture();
    const error = await Effect.runPromise(
      prepare(
        () => Stream.make(baseTransition),
        snapshot.snapshotManifests
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreparedSnapshotScopeError",
      family: "program",
    });
  });

  it("rejects reuse of the base release identity before reading records", async () => {
    const selfBasedRelease = ReleaseIdSchema.make("test-self-based-release");
    let invoked = false;
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        baseManifestHash: Sha256HashSchema.make(`sha256:${"8".repeat(64)}`),
        baseReleaseId: selfBasedRelease,
        baseResultCount: 1,
        baseResultDigest: resultHead.projectionHash,
        previousSnapshots: inheritContentSnapshots(null),
        records: () => {
          invoked = true;
          return Stream.make(baseTransition);
        },
        releaseId: selfBasedRelease,
        rendererManifest,
        result: () => Stream.make(resultHead),
        routes: () => Stream.empty,
        scope,
        snapshotManifests: () => Stream.empty,
        snapshotRows: () => Stream.empty,
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
      baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
      baseReleaseId: null,
    },
    {
      baseManifestHash: null,
      baseReleaseId: ReleaseIdSchema.make("test-unpaired-base"),
    },
    {
      baseManifestHash: Sha256HashSchema.make(`sha256:${"6".repeat(64)}`),
      baseReleaseId: ReleaseIdSchema.make("test-missing-snapshot-base"),
    },
  ])("rejects an unpaired exact base identity", async (base) => {
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        ...base,
        baseResultCount: 0,
        baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
        ...emptySnapshots,
        records: () => Stream.make(baseTransition),
        releaseId: ReleaseIdSchema.make("test-invalid-base-pair"),
        rendererManifest,
        result: () => Stream.make(resultHead),
        routes: () => Stream.empty,
        scope,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "PreparedReleaseBaseIdentityError" });
  });
});
