import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import {
  type ContentLocale,
  ContentLocaleSchema,
  compareContentHeads,
  routeIdentity,
} from "#contracts/content";
import {
  ContentKeySchema,
  type PublicPath,
  PublicPathSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  canonicalizeMaterialHead,
  type MaterialHead,
} from "#contracts/release/head";
import { RESULT_CATALOG_DIGEST_DOMAIN } from "#contracts/release/result";

/** SHA-256 computation failed before result-catalog integrity was established. */
export class ResultCatalogHashError extends Schema.TaggedError<ResultCatalogHashError>()(
  "ResultCatalogHashError",
  { releaseId: ReleaseIdSchema }
) {}

/** A result catalog is duplicated or outside canonical content-head order. */
export class ResultCatalogOrderError extends Schema.TaggedError<ResultCatalogOrderError>()(
  "ResultCatalogOrderError",
  {
    contentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Two complete result heads claim the same locale-specific public route. */
export class ResultCatalogRouteError extends Schema.TaggedError<ResultCatalogRouteError>()(
  "ResultCatalogRouteError",
  {
    contentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
    publicPath: PublicPathSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** A replayed result catalog has a different signed head count. */
export class ResultCatalogCountMismatchError extends Schema.TaggedError<ResultCatalogCountMismatchError>()(
  "ResultCatalogCountMismatchError",
  {
    actualCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    expectedCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    releaseId: ReleaseIdSchema,
  }
) {}

/** A replayed result catalog does not match its signed digest. */
export class ResultCatalogDigestMismatchError extends Schema.TaggedError<ResultCatalogDigestMismatchError>()(
  "ResultCatalogDigestMismatchError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Keeps mutable hash and ordering state private to one catalog replay. */
class ResultCatalogDigestState {
  readonly #hash = createHash("sha256");
  readonly #routes = new Set<string>();
  count = 0;
  previous: MaterialHead | undefined;

  /** Initializes one domain-separated result-catalog hash. */
  constructor() {
    this.#hash.update(RESULT_CATALOG_DIGEST_DOMAIN);
    this.#hash.update("\n");
  }

  /** Claims one public route and reports whether it was globally unique. */
  claimRoute(locale: ContentLocale, publicPath: PublicPath) {
    const identity = routeIdentity({
      locale,
      publicPath,
    });
    if (this.#routes.has(identity)) {
      return false;
    }
    this.#routes.add(identity);
    return true;
  }

  /** Adds one canonical compact head and advances ordering evidence. */
  update(head: MaterialHead): void {
    this.#hash.update(canonicalizeMaterialHead(head));
    this.#hash.update("\n");
    this.count += 1;
    this.previous = head;
  }

  /** Consumes the hash and returns its branded immutable identity. */
  digest() {
    return Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`);
  }
}

/** Creates a fresh domain-separated digest state for one result catalog. */
export function createResultCatalogDigest(releaseId: ReleaseId) {
  return Effect.try({
    catch: () => new ResultCatalogHashError({ releaseId }),
    try: () => new ResultCatalogDigestState(),
  });
}

/** Adds one canonically ordered compact head to a result digest. */
export function updateResultCatalogDigest(
  releaseId: ReleaseId,
  state: ResultCatalogDigestState,
  head: MaterialHead
): Effect.Effect<
  ResultCatalogDigestState,
  ResultCatalogHashError | ResultCatalogOrderError | ResultCatalogRouteError
> {
  if (state.previous && compareContentHeads(state.previous, head) >= 0) {
    return Effect.fail(
      new ResultCatalogOrderError({
        contentKey: head.contentKey,
        locale: head.locale,
        releaseId,
      })
    );
  }
  if (
    head.publicPath !== undefined &&
    !state.claimRoute(head.locale, head.publicPath)
  ) {
    return Effect.fail(
      new ResultCatalogRouteError({
        contentKey: head.contentKey,
        locale: head.locale,
        publicPath: head.publicPath,
        releaseId,
      })
    );
  }
  return Effect.try({
    catch: () => new ResultCatalogHashError({ releaseId }),
    try: () => {
      state.update(head);
      return state;
    },
  });
}

/** Finalizes one incremental result-catalog digest. */
export function finalizeResultCatalogDigest(
  releaseId: ReleaseId,
  state: ResultCatalogDigestState
) {
  return Effect.try({
    catch: () => new ResultCatalogHashError({ releaseId }),
    try: () => state.digest(),
  });
}

/** Digests one complete compact-head stream without retaining the catalog. */
export const digestResultCatalog = Effect.fn(
  "AksaraContracts.digestResultCatalog"
)(function* <E, R>(
  releaseId: ReleaseId,
  heads: Stream.Stream<MaterialHead, E, R>
) {
  const initial = yield* createResultCatalogDigest(releaseId);
  const state = yield* heads.pipe(
    Stream.runFoldEffect(initial, (current, head) =>
      updateResultCatalogDigest(releaseId, current, head)
    )
  );
  const digest = yield* finalizeResultCatalogDigest(releaseId, state);
  return { count: state.count, digest };
});

/** Authenticates one complete replayed catalog against its signed result root. */
export const verifyResultCatalog = Effect.fn(
  "AksaraContracts.verifyResultCatalog"
)(function* <E, R>(input: {
  readonly expectedCount: number;
  readonly expectedDigest: typeof Sha256HashSchema.Type;
  readonly heads: Stream.Stream<MaterialHead, E, R>;
  readonly releaseId: ReleaseId;
}) {
  const summary = yield* digestResultCatalog(input.releaseId, input.heads);
  if (summary.count !== input.expectedCount) {
    return yield* new ResultCatalogCountMismatchError({
      actualCount: summary.count,
      expectedCount: input.expectedCount,
      releaseId: input.releaseId,
    });
  }
  if (summary.digest !== input.expectedDigest) {
    return yield* new ResultCatalogDigestMismatchError({
      actualDigest: summary.digest,
      expectedDigest: input.expectedDigest,
      releaseId: input.releaseId,
    });
  }
  return summary;
});
