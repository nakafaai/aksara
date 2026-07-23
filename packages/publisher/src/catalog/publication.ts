import type { FileSystem, Path } from "@effect/platform";
import type { ReleaseId, Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  type ArticleHead,
  ArticleHeadSchema,
  type MaterialHead,
  MaterialHeadSchema,
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { verifyResultCatalog } from "@nakafa/aksara-contracts/release/result-digest";
import { Effect, Schema, type Scope, Stream } from "effect";
import {
  type PrepareArticlePublicationError,
  prepareArticlePublication,
} from "#publisher/article/publication";
import {
  type PrepareMaterialPublicationError,
  prepareMaterialPublication,
} from "#publisher/material/publication";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import {
  type PrepareQuestionPublicationError,
  prepareQuestionPublication,
} from "#publisher/question/publication";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import type { RouteTransition } from "#publisher/routes";

/** Signed identity of the complete active result catalog. */
export interface ContentCatalogBase {
  readonly count: number;
  readonly digest: Sha256Hash;
  readonly releaseId: ReleaseId;
}

/** A genesis publication found active heads without an authenticated base. */
export class CatalogGenesisError extends Schema.TaggedError<CatalogGenesisError>()(
  "CatalogGenesisError",
  {
    actualCount: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Replayable whole-catalog plan consumed by generic release preparation. */
export interface ContentCatalogPublication {
  /** Replays canonical article, material, then question transitions. */
  readonly records: () => Stream.Stream<
    PreparedContentTransition,
    ReplaySpoolError
  >;
  /** Replays the complete desired catalog in canonical content-head order. */
  readonly result: () => Stream.Stream<
    ArticleHead | MaterialHead | QuestionHead,
    ReplaySpoolError
  >;
  /** Replays every family route transition for global conflict resolution. */
  readonly routes: () => Stream.Stream<RouteTransition, ReplaySpoolError>;
}

/** Exact checkout, renderer, base, and family heads for one fresh release. */
export interface ContentCatalogPublicationInput<E, R> {
  readonly base: ContentCatalogBase | null;
  readonly checkoutRoot: string;
  readonly published: {
    readonly article: Stream.Stream<ArticleHead, E, R>;
    readonly material: Stream.Stream<MaterialHead, E, R>;
    readonly question: Stream.Stream<QuestionHead, E, R>;
  };
  readonly rendererManifest: unknown;
}

type ResultCatalogError = Effect.Effect.Error<
  ReturnType<typeof verifyResultCatalog<ReplaySpoolError, never>>
>;

/** Every expected failure before a replayable whole-catalog plan exists. */
export type PrepareContentCatalogError<E> =
  | E
  | CatalogGenesisError
  | PrepareArticlePublicationError<ReplaySpoolError>
  | PrepareMaterialPublicationError<ReplaySpoolError>
  | PrepareQuestionPublicationError<ReplaySpoolError>
  | ReplaySpoolError
  | ResultCatalogError;

/** Authenticates exactly one complete base catalog before family compilation. */
function verifyBaseCatalog(
  base: ContentCatalogBase | null,
  count: number,
  heads: () => Stream.Stream<
    ArticleHead | MaterialHead | QuestionHead,
    ReplaySpoolError
  >
) {
  if (base !== null) {
    return verifyResultCatalog({
      expectedCount: base.count,
      expectedDigest: base.digest,
      heads: heads(),
      releaseId: base.releaseId,
    });
  }
  if (count === 0) {
    return Effect.void;
  }
  return Effect.fail(new CatalogGenesisError({ actualCount: count }));
}

/** Prepares all implemented families under one authenticated base catalog. */
export const prepareContentCatalog: <E, R>(
  input: ContentCatalogPublicationInput<E, R>
) => Effect.Effect<
  ContentCatalogPublication,
  PrepareContentCatalogError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareContentCatalog")(function* <E, R>(
  input: ContentCatalogPublicationInput<E, R>
) {
  const articleHeads = yield* createReplaySpool({
    prefix: "aksara-article-heads-",
    schema: ArticleHeadSchema,
    stream: input.published.article,
  });
  const materialHeads = yield* createReplaySpool({
    prefix: "aksara-material-heads-",
    schema: MaterialHeadSchema,
    stream: input.published.material,
  });
  const questionHeads = yield* createReplaySpool({
    prefix: "aksara-question-heads-",
    schema: QuestionHeadSchema,
    stream: input.published.question,
  });
  /** Replays the exact active catalog in canonical family-prefix order. */
  const active = () =>
    Stream.concat(articleHeads.replay(), materialHeads.replay()).pipe(
      Stream.concat(questionHeads.replay())
    );
  yield* verifyBaseCatalog(
    input.base,
    articleHeads.count + materialHeads.count + questionHeads.count,
    active
  );
  const article = yield* prepareArticlePublication({
    checkoutRoot: input.checkoutRoot,
    published: articleHeads.replay(),
    rendererManifest: input.rendererManifest,
  });
  const material = yield* prepareMaterialPublication({
    checkoutRoot: input.checkoutRoot,
    published: materialHeads.replay(),
    rendererManifest: input.rendererManifest,
  });
  const question = yield* prepareQuestionPublication({
    checkoutRoot: input.checkoutRoot,
    published: questionHeads.replay(),
    rendererManifest: input.rendererManifest,
  });
  /** Replays canonical transitions without collecting either family. */
  const records = () =>
    Stream.concat(article.records(), material.records()).pipe(
      Stream.concat(question.records())
    );
  /** Replays the complete desired catalog without copying unchanged heads. */
  const result = () =>
    Stream.concat(article.result(), material.result()).pipe(
      Stream.concat(question.result())
    );
  /** Replays all route transitions for one global conflict-resolution pass. */
  const routes = () =>
    Stream.concat(article.routes(), material.routes()).pipe(
      Stream.concat(question.routes())
    );
  return { records, result, routes };
});
