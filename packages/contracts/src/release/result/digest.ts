import { Effect, MutableHashSet, Schema, Stream } from "effect";
import {
  ContentHeadIdentitySchema,
  compareContentHeads,
  routeIdentity,
} from "#contracts/content";
import { DigestStream } from "#contracts/hash/stream";
import {
  type PublicPath,
  PublicPathSchema,
  type ReleaseId,
  ReleaseIdSchema,
  type Sha256HashSchema,
} from "#contracts/ids";
import { AppLocaleSchema, type ArtifactLocale } from "#contracts/locale";
import {
  type ContentHead,
  canonicalizeContentHead,
} from "#contracts/release/head";
import {
  ReleaseCountMismatchFields,
  ReleaseDigestMismatchFields,
} from "#contracts/release/mismatch";
import { RESULT_CATALOG_DIGEST_DOMAIN } from "#contracts/release/result/spec";

/** SHA-256 computation failed before result-catalog integrity was established. */
export class ResultCatalogHashError extends Schema.TaggedError<
  ResultCatalogHashError,
  { readonly brand: unique symbol }
>()("ResultCatalogHashError", { releaseId: ReleaseIdSchema }) {}

/** A result catalog is duplicated or outside canonical content-head order. */
export class ResultCatalogOrderError extends Schema.TaggedError<
  ResultCatalogOrderError,
  { readonly brand: unique symbol }
>()("ResultCatalogOrderError", {
  ...ContentHeadIdentitySchema.fields,
  releaseId: ReleaseIdSchema,
}) {}

/** Two complete result heads claim the same locale-specific public route. */
export class ResultCatalogRouteError extends Schema.TaggedError<
  ResultCatalogRouteError,
  { readonly brand: unique symbol }
>()("ResultCatalogRouteError", {
  ...ContentHeadIdentitySchema.fields,
  publicPath: PublicPathSchema,
  releaseId: ReleaseIdSchema,
}) {}

/** A replayed result catalog has a different signed head count. */
export class ResultCatalogCountMismatchError extends Schema.TaggedError<
  ResultCatalogCountMismatchError,
  { readonly brand: unique symbol }
>()("ResultCatalogCountMismatchError", { ...ReleaseCountMismatchFields }) {}

/** A replayed result catalog does not match its signed digest. */
export class ResultCatalogDigestMismatchError extends Schema.TaggedError<
  ResultCatalogDigestMismatchError,
  { readonly brand: unique symbol }
>()("ResultCatalogDigestMismatchError", { ...ReleaseDigestMismatchFields }) {}

/** Keeps mutable digest and ordering state private to one catalog replay. */
class ResultCatalogDigestState {
  readonly #stream = new DigestStream();
  readonly #routes = MutableHashSet.empty<string>();
  count = 0;
  previous: ContentHead | undefined;

  /** Starts one domain-separated result-catalog digest. */
  constructor() {
    this.#stream.add(RESULT_CATALOG_DIGEST_DOMAIN);
    this.#stream.add("\n");
  }

  /** Claims one public route and reports whether it was globally unique. */
  claimRoute(artifactLocale: ArtifactLocale, publicPath: PublicPath) {
    const identity = routeIdentity({
      appLocale: AppLocaleSchema.make(artifactLocale),
      publicPath,
    });
    if (MutableHashSet.has(this.#routes, identity)) {
      return false;
    }
    MutableHashSet.add(this.#routes, identity);
    return true;
  }

  /** Adds one canonical compact head and advances ordering evidence. */
  update(head: ContentHead): void {
    this.#stream.add(canonicalizeContentHead(head));
    this.#stream.add("\n");
    this.count += 1;
    this.previous = head;
  }

  /** Digests the complete stream once and returns its branded immutable identity. */
  digest() {
    return this.#stream.digest();
  }
}

/** Creates a fresh domain-separated digest state for one result catalog. */
export const createResultCatalogDigest = Effect.sync(
  () => new ResultCatalogDigestState()
);

/** Adds one canonically ordered compact head to a result digest. */
export function updateResultCatalogDigest(
  releaseId: ReleaseId,
  state: ResultCatalogDigestState,
  head: ContentHead
): Effect.Effect<
  ResultCatalogDigestState,
  ResultCatalogOrderError | ResultCatalogRouteError
> {
  if (state.previous && compareContentHeads(state.previous, head) >= 0) {
    return Effect.fail(
      new ResultCatalogOrderError({
        artifactLocale: head.artifactLocale,
        contentKey: head.contentKey,
        releaseId,
      })
    );
  }
  if (!state.claimRoute(head.artifactLocale, head.publicPath)) {
    return Effect.fail(
      new ResultCatalogRouteError({
        artifactLocale: head.artifactLocale,
        contentKey: head.contentKey,
        publicPath: head.publicPath,
        releaseId,
      })
    );
  }
  return Effect.sync(() => {
    state.update(head);
    return state;
  });
}

/** Finalizes one incremental result-catalog digest. */
export function finalizeResultCatalogDigest(
  releaseId: ReleaseId,
  state: ResultCatalogDigestState
) {
  return state
    .digest()
    .pipe(Effect.mapError(() => new ResultCatalogHashError({ releaseId })));
}

/** Digests one complete compact-head stream. Its canonical bytes are held until one Web Crypto digest runs. */
export const digestResultCatalog = Effect.fn(
  "AksaraContracts.digestResultCatalog"
)(function* <E, R>(
  releaseId: ReleaseId,
  heads: Stream.Stream<ContentHead, E, R>
) {
  const initial = yield* createResultCatalogDigest;
  const state = yield* heads.pipe(
    Stream.runFoldEffect(
      () => initial,
      (current, head) => updateResultCatalogDigest(releaseId, current, head)
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
  readonly heads: Stream.Stream<ContentHead, E, R>;
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
