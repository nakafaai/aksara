import type { FileSystem, Path } from "@effect/platform";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot/data";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  decodeContentSnapshotManifests,
  verifyContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/verify";
import { Chunk, Effect, Schema, type Scope, Stream } from "effect";
import { prepareReleaseSnapshots } from "#publisher/snapshot/release";

const CountSchema = Schema.Int.pipe(Schema.nonNegative());

/** Complete structured-catalog evidence produced without signing or staging. */
export const CatalogSnapshotEvidenceSchema = Schema.Struct({
  program: Schema.Struct({
    rowCount: CountSchema,
    rowDigest: Sha256HashSchema,
    sitemapCount: CountSchema,
    snapshotId: Sha256HashSchema,
  }),
  quran: Schema.Struct({
    projectionCount: CountSchema,
    projectionDigest: Sha256HashSchema,
    provenanceDigest: Sha256HashSchema,
    provenanceStatus: Schema.Literal("approved", "blocked"),
    runtimeCount: CountSchema,
    searchCount: CountSchema,
    snapshotId: Sha256HashSchema,
    sourceDigest: Sha256HashSchema,
  }),
  stagedRows: CountSchema,
  tryout: Schema.Struct({
    catalogCount: CountSchema,
    catalogDigest: Sha256HashSchema,
    placementCount: CountSchema,
    placementDigest: Sha256HashSchema,
    routeCount: CountSchema,
    snapshotId: Sha256HashSchema,
  }),
});
export type CatalogSnapshotEvidence = typeof CatalogSnapshotEvidenceSchema.Type;

/** Structured preparation omitted one required current-model family. */
export class CatalogSnapshotSetError extends Schema.TaggedError<CatalogSnapshotSetError>()(
  "CatalogSnapshotSetError",
  { actualFamilies: Schema.Array(ContentSnapshotKindSchema) }
) {}

/** Structured catalog preparation, decoding, or verification failed. */
export class ContentCatalogSnapshotError extends Schema.TaggedError<ContentCatalogSnapshotError>()(
  "ContentCatalogSnapshotError",
  {
    cause: Schema.Unknown,
    stage: Schema.Literal("decode", "prepare", "verify"),
  }
) {}

/** Sources required to validate every current structured snapshot family. */
interface CatalogSnapshotInput<E, R> {
  readonly checkoutRoot: string;
  /** Replays validated question heads for exact try-out placement binding. */
  readonly questionHeads: () => Stream.Stream<QuestionHead, E, R>;
  readonly rendererManifest: unknown;
}

/** Requires exact Program, Quran, and Try-out manifests in canonical order. */
function selectCompleteManifests(
  manifests: readonly ContentSnapshotManifest[]
) {
  const [program, quran, tryout] = manifests;
  if (program?.family !== "program") {
    return Effect.fail(
      new CatalogSnapshotSetError({
        actualFamilies: manifests.map(({ family }) => family),
      })
    );
  }
  if (quran?.family !== "quran") {
    return Effect.fail(
      new CatalogSnapshotSetError({
        actualFamilies: manifests.map(({ family }) => family),
      })
    );
  }
  if (tryout?.family !== "tryout") {
    return Effect.fail(
      new CatalogSnapshotSetError({
        actualFamilies: manifests.map(({ family }) => family),
      })
    );
  }
  return Effect.succeed({ program, quran, tryout });
}

/** Counts every localized hierarchy row authenticated by one try-out snapshot. */
function tryoutCatalogCount(
  counts: Extract<
    ContentSnapshotManifest,
    { readonly family: "tryout" }
  >["manifest"]["counts"]
) {
  return Object.values(counts).reduce((total, count) => total + count, 0);
}

/** Validates every current structured family and returns signed-source facts. */
export const validateCatalogSnapshots: <E, R>(
  input: CatalogSnapshotInput<E, R>
) => Effect.Effect<
  CatalogSnapshotEvidence,
  CatalogSnapshotSetError | ContentCatalogSnapshotError,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.validateCatalogSnapshots")(function* <E, R>(
  input: CatalogSnapshotInput<E, R>
) {
  const prepared = yield* prepareReleaseSnapshots({
    checkoutRoot: input.checkoutRoot,
    families: ["program", "quran", "tryout"],
    previousSnapshots: null,
    questionHeads: input.questionHeads,
    rendererManifest: input.rendererManifest,
  }).pipe(
    Effect.mapError(
      (cause) => new ContentCatalogSnapshotError({ cause, stage: "prepare" })
    )
  );
  const manifests = yield* decodeContentSnapshotManifests(
    prepared.manifests()
  ).pipe(
    Stream.runCollect,
    Effect.map(Chunk.toReadonlyArray),
    Effect.mapError(
      (cause) => new ContentCatalogSnapshotError({ cause, stage: "decode" })
    )
  );
  const verified = yield* verifyContentSnapshots({
    manifests: prepared.manifests,
    previousSnapshots: null,
    rows: prepared.rows,
  }).pipe(
    Effect.mapError(
      (cause) => new ContentCatalogSnapshotError({ cause, stage: "verify" })
    )
  );
  const { program, quran, tryout } = yield* selectCompleteManifests(manifests);
  return CatalogSnapshotEvidenceSchema.make({
    program: {
      rowCount: program.manifest.rowCount,
      rowDigest: program.manifest.rowDigest,
      sitemapCount: program.manifest.sitemapCount,
      snapshotId: program.manifest.snapshotId,
    },
    quran: {
      projectionCount: quran.manifest.projectionCount,
      projectionDigest: quran.manifest.projectionDigest,
      provenanceDigest: quran.manifest.provenanceDigest,
      provenanceStatus: quran.manifest.provenanceStatus,
      runtimeCount: quran.manifest.runtimeCount,
      searchCount: quran.manifest.searchCount,
      snapshotId: quran.manifest.snapshotId,
      sourceDigest: quran.manifest.sourceDigest,
    },
    stagedRows: verified.stagedRows,
    tryout: {
      catalogCount: tryoutCatalogCount(tryout.manifest.counts),
      catalogDigest: tryout.manifest.catalogDigest,
      placementCount: tryout.manifest.placementCount,
      placementDigest: tryout.manifest.placementDigest,
      routeCount: tryout.manifest.routeCount,
      snapshotId: tryout.manifest.snapshotId,
    },
  });
});
