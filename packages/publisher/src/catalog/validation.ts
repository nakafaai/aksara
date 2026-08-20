import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { digestRoutes } from "@nakafa/aksara-contracts/release/route/digest";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { FileSystem, Path } from "effect";
import { Effect, Schema, type Scope, Stream } from "effect";
import { readContentCatalogExpectation } from "#publisher/catalog/expectation";
import { prepareContentCatalog } from "#publisher/catalog/publication";
import {
  CatalogResultIdentityError,
  validateCatalogResult,
} from "#publisher/catalog/result";
import {
  CatalogSnapshotEvidenceSchema,
  validateCatalogSnapshots,
} from "#publisher/catalog/snapshots";
import { makeRouteItems } from "#publisher/routes";

const CHECK_RELEASE_ID = ReleaseIdSchema.make("catalog-check");
const CountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

/** Exact full-corpus evidence returned by a read-only catalog check. */
export const ContentCatalogValidationSchema = Schema.Struct({
  articleCount: CountSchema,
  materialCount: CountSchema,
  questionCount: CountSchema,
  recordCount: CountSchema,
  rendererManifestHash: Sha256HashSchema,
  resultDigest: Sha256HashSchema,
  routeCount: CountSchema,
  routeDigest: Sha256HashSchema,
  snapshots: CatalogSnapshotEvidenceSchema,
  totalCount: CountSchema,
});
export type ContentCatalogValidation =
  typeof ContentCatalogValidationSchema.Type;

/** One prepared count differs from its authoritative source inventory. */
export class ContentCatalogCountError extends Schema.TaggedError<ContentCatalogCountError>()(
  "ContentCatalogCountError",
  {
    actualCount: CountSchema,
    expectedCount: CountSchema,
    kind: Schema.Literals([
      "article",
      "material",
      "question",
      "records",
      "routes",
    ]),
  }
) {}

/** A compiled result row differs from the source-owned body identity. */
export class ContentCatalogIdentityError extends Schema.TaggedError<ContentCatalogIdentityError>()(
  "ContentCatalogIdentityError",
  {
    actual: CatalogResultIdentityError.fields.actual,
    expected: CatalogResultIdentityError.fields.expected,
    index: CatalogResultIdentityError.fields.index,
  }
) {}

/** A complete route projection differs from its source-derived digest. */
export class ContentCatalogDigestError extends Schema.TaggedError<ContentCatalogDigestError>()(
  "ContentCatalogDigestError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    kind: Schema.Literal("routes"),
  }
) {}

/** One internal preparation or canonical digest stage failed. */
export class ContentCatalogValidationError extends Schema.TaggedError<ContentCatalogValidationError>()(
  "ContentCatalogValidationError",
  {
    cause: Schema.Unknown,
    stage: Schema.Literals(["catalog", "result", "routes", "snapshots"]),
  }
) {}

/** Requires one prepared count to equal its source-derived expectation. */
function requireCount(
  kind: ContentCatalogCountError["kind"],
  actualCount: number,
  expectedCount: number
) {
  return actualCount === expectedCount
    ? Effect.void
    : Effect.fail(
        new ContentCatalogCountError({ actualCount, expectedCount, kind })
      );
}

/** Requires one prepared digest to equal its source-derived expectation. */
function requireRouteDigest(
  actualDigest: typeof Sha256HashSchema.Type,
  expectedDigest: typeof Sha256HashSchema.Type
) {
  return actualDigest === expectedDigest
    ? Effect.void
    : Effect.fail(
        new ContentCatalogDigestError({
          actualDigest,
          expectedDigest,
          kind: "routes",
        })
      );
}

/** Owns an internal validation failure behind one stable package contract. */
function validationError(
  stage: ContentCatalogValidationError["stage"],
  cause: unknown
) {
  return new ContentCatalogValidationError({ cause, stage });
}

/** Compiles and validates every current body and structured source family. */
export const validateContentCatalog: (input: {
  readonly checkoutRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
}) => Effect.Effect<
  ContentCatalogValidation,
  | ContentCatalogCountError
  | ContentCatalogDigestError
  | ContentCatalogIdentityError
  | ContentCatalogValidationError,
  FileSystem.FileSystem | Path.Path | Scope.Scope
> = Effect.fn("AksaraPublisher.validateContentCatalog")(function* (input) {
  const expectation = yield* readContentCatalogExpectation(
    input.checkoutRoot
  ).pipe(Effect.mapError((cause) => validationError("catalog", cause)));
  const publication = yield* prepareContentCatalog({
    base: null,
    checkoutRoot: input.checkoutRoot,
    published: {
      article: Stream.empty,
      material: Stream.empty,
      question: Stream.empty,
    },
    rendererManifest: input.rendererManifest,
  }).pipe(Effect.mapError((cause) => validationError("catalog", cause)));
  const result = yield* validateCatalogResult({
    expectedHeads: expectation.heads,
    result: publication.result,
  }).pipe(
    Effect.mapError((cause) =>
      cause._tag === "CatalogResultIdentityError"
        ? new ContentCatalogIdentityError({
            actual: cause.actual,
            expected: cause.expected,
            index: cause.index,
          })
        : validationError("result", cause)
    )
  );
  const [recordCount, routes, expectedRoutes, snapshots] = yield* Effect.all(
    [
      publication.records.pipe(
        Stream.runCount,
        Effect.mapError((cause) => validationError("result", cause))
      ),
      digestRoutes(
        CHECK_RELEASE_ID,
        makeRouteItems(CHECK_RELEASE_ID, publication.routes)
      ).pipe(Effect.mapError((cause) => validationError("routes", cause))),
      digestRoutes(
        CHECK_RELEASE_ID,
        makeRouteItems(
          CHECK_RELEASE_ID,
          Stream.fromIterable(expectation.routes)
        )
      ).pipe(Effect.mapError((cause) => validationError("routes", cause))),
      validateCatalogSnapshots({
        checkoutRoot: input.checkoutRoot,
        questionHeads: result.questionHeads,
        rendererManifest: input.rendererManifest,
      }).pipe(Effect.mapError((cause) => validationError("snapshots", cause))),
    ],
    { concurrency: 5 }
  );

  yield* requireCount("article", result.articleCount, expectation.articleCount);
  yield* requireCount(
    "material",
    result.materialCount,
    expectation.materialCount
  );
  yield* requireCount(
    "question",
    result.questionCount,
    expectation.questionCount
  );
  yield* requireCount("records", recordCount, expectation.totalCount);
  yield* requireCount("routes", routes.count, expectedRoutes.count);
  yield* requireRouteDigest(routes.digest, expectedRoutes.digest);

  return ContentCatalogValidationSchema.make({
    articleCount: result.articleCount,
    materialCount: result.materialCount,
    questionCount: result.questionCount,
    recordCount,
    rendererManifestHash: input.rendererManifest.hash,
    resultDigest: result.digest,
    routeCount: routes.count,
    routeDigest: routes.digest,
    snapshots,
    totalCount: result.totalCount,
  });
});
