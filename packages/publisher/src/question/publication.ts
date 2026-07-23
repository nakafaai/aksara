import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  decodeQuestionPath,
  QUESTION_BANK_ROOT,
} from "@nakafa/aksara-corpus/question-bank/path";
import { decodeQuestionRegistry } from "@nakafa/aksara-corpus/question-bank/registry";
import { Effect, Option, Schema, type Scope, Stream, Tuple } from "effect";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import {
  mapQuestionSourceError,
  type QuestionMetadataError,
  type QuestionSourceError,
} from "#publisher/question/document";
import {
  planQuestionPublication,
  QuestionPublicationPlanSchema,
} from "#publisher/question/plan";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import {
  type RouteTransition,
  routeTransitionForContent,
} from "#publisher/routes";

const QuestionFamilyFieldSchema = Schema.Literal(
  "contentKey",
  "delivery",
  "locale",
  "rendererDomain",
  "sourcePath"
);

/** A target returned the same question identity more than once. */
export class QuestionHeadDuplicateError extends Schema.TaggedError<QuestionHeadDuplicateError>()(
  "QuestionHeadDuplicateError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** A target returned question heads outside canonical content-head order. */
export class QuestionHeadOrderError extends Schema.TaggedError<QuestionHeadOrderError>()(
  "QuestionHeadOrderError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** A question-head page contained identity owned by another family or body. */
export class QuestionHeadFamilyError extends Schema.TaggedError<QuestionHeadFamilyError>()(
  "QuestionHeadFamilyError",
  {
    contentKey: ContentKeySchema,
    field: QuestionFamilyFieldSchema,
    locale: ContentLocaleSchema,
  }
) {}

interface HeadOrderState {
  readonly previous: QuestionHead | undefined;
}

/** Every failure possible while replaying authoritative question records. */
export type QuestionPublicationStreamError<E> =
  | E
  | CompileContentError
  | ContentSourceInspectionError
  | QuestionHeadDuplicateError
  | QuestionHeadFamilyError
  | QuestionHeadOrderError
  | QuestionMetadataError
  | QuestionSourceError;

/** Authoritative question plan consumed by whole-catalog release composition. */
export interface QuestionPublication {
  /** Replays the exact question delta against supplied active question heads. */
  readonly records: () => Stream.Stream<
    PreparedContentTransition,
    ReplaySpoolError
  >;
  /** Replays the complete desired question head catalog in canonical order. */
  readonly result: () => Stream.Stream<QuestionHead, ReplaySpoolError>;
  /** Replays route-free transitions without inventing question paths. */
  readonly routes: () => Stream.Stream<RouteTransition, ReplaySpoolError>;
}

/** Fresh-CI inputs pinned to one checkout, renderer, and question-head stream. */
export interface QuestionPublicationInput<E, R> {
  readonly checkoutRoot: string;
  readonly published: Stream.Stream<QuestionHead, E, R>;
  readonly rendererManifest: unknown;
}

type RendererManifestError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

/** Every failure possible before the replayable question plan is constructed. */
export type PrepareQuestionPublicationError<E> =
  | E
  | QuestionPublicationStreamError<never>
  | ReplaySpoolError
  | RendererManifestError;

/** Finds the first field proving a head does not own its question source. */
const mismatchedFamilyField = Effect.fn(
  "AksaraPublisher.mismatchedQuestionField"
)(function* (head: QuestionHead) {
  const keyPrefix = "question-bank/tryout/indonesia/";
  const questionSuffix = "/question";
  const answerSuffix = "/answer";
  let bodyKind: "question" | "answer" | undefined;
  if (head.contentKey.endsWith(questionSuffix)) {
    bodyKind = "question";
  } else if (head.contentKey.endsWith(answerSuffix)) {
    bodyKind = "answer";
  }
  if (!head.contentKey.startsWith(keyPrefix) || bodyKind === undefined) {
    return "contentKey";
  }
  if (
    (bodyKind === "question" && head.delivery !== "authenticated") ||
    (bodyKind === "answer" && head.delivery !== "entitled")
  ) {
    return "delivery";
  }
  const bodySuffix = `/${bodyKind}`;
  const relativeQuestion = head.contentKey.slice(
    keyPrefix.length,
    -bodySuffix.length
  );
  const sourcePrefix = `${QUESTION_BANK_ROOT}/`;
  const sourceSuffix = `/${bodyKind}.${head.locale}.mdx`;
  if (!head.sourcePath.startsWith(sourcePrefix)) {
    return "sourcePath";
  }
  if (!head.sourcePath.endsWith(sourceSuffix)) {
    return "locale";
  }
  const sourceRoot = head.sourcePath.slice(
    sourcePrefix.length,
    -sourceSuffix.length
  );
  const location = yield* decodeQuestionPath(sourceRoot).pipe(
    Effect.mapError(
      (error) =>
        new QuestionHeadFamilyError({
          contentKey: head.contentKey,
          field: error.reason === "renderer" ? "rendererDomain" : "sourcePath",
          locale: head.locale,
        })
    )
  );
  if (location.questionKey !== `${keyPrefix}${relativeQuestion}`) {
    return "sourcePath";
  }
  if (head.rendererDomain !== location.rendererDomain) {
    return "rendererDomain";
  }
});

/** Validates family ownership and strict ordering before diffing one head. */
function validatePublishedHead(
  state: HeadOrderState,
  head: QuestionHead
): Effect.Effect<
  readonly [HeadOrderState, QuestionHead],
  QuestionHeadDuplicateError | QuestionHeadFamilyError | QuestionHeadOrderError
> {
  return Effect.gen(function* () {
    const field = yield* mismatchedFamilyField(head);
    if (field !== undefined) {
      return yield* new QuestionHeadFamilyError({
        contentKey: head.contentKey,
        field,
        locale: head.locale,
      });
    }
    const { previous } = state;
    if (previous !== undefined) {
      const comparison = compareContentHeads(previous, head);
      if (comparison === 0) {
        return yield* new QuestionHeadDuplicateError({
          contentKey: head.contentKey,
          locale: head.locale,
        });
      }
      if (comparison > 0) {
        return yield* new QuestionHeadOrderError({
          contentKey: head.contentKey,
          locale: head.locale,
        });
      }
    }
    return Tuple.make({ previous: head }, head);
  });
}

/** Proves every published question head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<QuestionHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(Stream.mapAccumEffect(initial, validatePublishedHead));
}

/**
 * Plans one family-local question delta from exact Git sources and active heads.
 * Global signed-base verification belongs to whole-catalog composition.
 */
export const prepareQuestionPublication: <E, R>(
  input: QuestionPublicationInput<E, R>
) => Effect.Effect<
  QuestionPublication,
  PrepareQuestionPublicationError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareQuestionPublication")(function* <E, R>(
  input: QuestionPublicationInput<E, R>
) {
  const rendererManifest = yield* validateRenderer(input.rendererManifest);
  const entries = yield* decodeQuestionRegistry(input.checkoutRoot).pipe(
    Effect.mapError(mapQuestionSourceError(input.checkoutRoot))
  );
  const plans = planQuestionPublication({
    checkoutRoot: input.checkoutRoot,
    entries,
    published: validatePublishedHeads(input.published),
    rendererManifest,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-question-",
    schema: QuestionPublicationPlanSchema,
    stream: plans,
  });
  /** Replays canonical question transitions from the sealed spool. */
  const records = () =>
    spool
      .replay()
      .pipe(Stream.filterMap((plan) => Option.fromNullable(plan.record)));
  /** Replays the complete canonical question catalog from the sealed spool. */
  const result = () =>
    spool
      .replay()
      .pipe(Stream.filterMap((plan) => Option.fromNullable(plan.result)));
  /** Replays route-free question changes for global route planning. */
  const routes = () => records().pipe(Stream.map(routeTransitionForContent));
  return { records, result, routes };
});
