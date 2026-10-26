import { AssessmentCountsSchema } from "@nakafa/aksara-contracts/assessment/snapshot";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { QuranProvenanceStatusSchema } from "@nakafa/aksara-contracts/quran/snapshot/spec";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot/data";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  decodeContentSnapshotManifests,
  verifyContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/verify";
import type { FileSystem, Path } from "effect";
import { Array as Arr, Effect, Schema, type Scope, Stream } from "effect";
import { prepareReleaseSnapshots } from "#publisher/snapshot/release";

const CountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

/** Complete structured-catalog evidence produced without signing or staging. */
export const CatalogSnapshotEvidenceSchema = Schema.Struct({
  assessment: Schema.Struct({
    counts: AssessmentCountsSchema,
    rowDigest: Sha256HashSchema,
    snapshotId: Sha256HashSchema,
  }),
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
    provenanceStatus: QuranProvenanceStatusSchema,
    runtimeCount: CountSchema,
    searchCount: CountSchema,
    snapshotId: Sha256HashSchema,
    sourceDigest: Sha256HashSchema,
  }),
  stagedRows: CountSchema,
});
type CatalogSnapshotEvidence = typeof CatalogSnapshotEvidenceSchema.Type;

/** Structured preparation omitted one required current-model family. */
export class CatalogSnapshotSetError extends Schema.TaggedError<
  CatalogSnapshotSetError,
  { readonly brand: unique symbol }
>()("CatalogSnapshotSetError", {
  actualFamilies: Schema.Array(ContentSnapshotKindSchema),
}) {}

/** Structured catalog preparation, decoding, or verification failed. */
export class ContentCatalogSnapshotError extends Schema.TaggedError<
  ContentCatalogSnapshotError,
  { readonly brand: unique symbol }
>()("ContentCatalogSnapshotError", {
  cause: Schema.Unknown,
  stage: Schema.Literals(["decode", "prepare", "verify"]),
}) {}

/** Requires exact assessment, program, and Quran manifests in canonical order. */
function selectCompleteManifests(
  manifests: readonly ContentSnapshotManifest[]
) {
  const [assessment, program, quran] = manifests;
  if (
    assessment?.family === "assessment" &&
    program?.family === "program" &&
    quran?.family === "quran"
  ) {
    return Effect.succeed({ assessment, program, quran });
  }
  return Effect.fail(
    new CatalogSnapshotSetError({
      actualFamilies: Arr.map(manifests, ({ family }) => family),
    })
  );
}

/** Validates every current structured family and returns signed-source facts. */
export const validateCatalogSnapshots: (
  checkoutRoot: string
) => Effect.Effect<
  CatalogSnapshotEvidence,
  CatalogSnapshotSetError | ContentCatalogSnapshotError,
  FileSystem.FileSystem | Path.Path | Scope.Scope
> = Effect.fn("AksaraPublisher.validateCatalogSnapshots")(function* (
  checkoutRoot: string
) {
  const prepared = yield* prepareReleaseSnapshots({
    checkoutRoot,
    families: ContentSnapshotKindSchema.literals,
    previousSnapshots: null,
  }).pipe(
    Effect.mapError(
      (cause) => new ContentCatalogSnapshotError({ cause, stage: "prepare" })
    )
  );
  const manifests = yield* decodeContentSnapshotManifests(
    prepared.manifests
  ).pipe(
    Stream.runCollect,
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
  const { assessment, program, quran } =
    yield* selectCompleteManifests(manifests);
  return CatalogSnapshotEvidenceSchema.make({
    assessment: {
      counts: assessment.manifest.counts,
      rowDigest: assessment.manifest.rowDigest,
      snapshotId: assessment.manifest.snapshotId,
    },
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
  });
});
