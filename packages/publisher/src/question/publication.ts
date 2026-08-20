import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { QuestionChoiceLocaleMissingError } from "@nakafa/aksara-contracts/projection/question";
import {
  QuestionKeySchema,
  QuestionSourcePathSchema,
  questionBankKey,
  questionKeyParts,
  questionSourcePathParts,
} from "@nakafa/aksara-contracts/question/identity";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/spec";
import type { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateLiveRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import { loadQuestionContent } from "@nakafa/aksara-corpus/question-bank/content";
import type { QuestionBankIndex } from "@nakafa/aksara-corpus/question-bank/path";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import type { FileSystem, Path } from "effect";
import { Effect, Result, Schema, type Scope, Stream, Tuple } from "effect";
import { constUndefined } from "effect/Function";
import type { PublicationScopeIdentityError } from "#publisher/family/scope";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import {
  mapQuestionSourceError,
  type QuestionMetadataError,
  type QuestionSourceError,
} from "#publisher/question/document";
import {
  planQuestionPublication,
  type QuestionChoiceJoinError,
  QuestionPublicationPlanSchema,
} from "#publisher/question/plan";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import {
  type RouteTransition,
  routeTransitionForContent,
} from "#publisher/routes";

const QuestionFamilyFieldSchema = Schema.Literals([
  "contentKey",
  "delivery",
  "artifactLocale",
  "rendererDomain",
  "sourcePath",
]);

/** A target returned the same question identity more than once. */
export class QuestionHeadDuplicateError extends Schema.TaggedError<QuestionHeadDuplicateError>()(
  "QuestionHeadDuplicateError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** A target returned question heads outside canonical content-head order. */
export class QuestionHeadOrderError extends Schema.TaggedError<QuestionHeadOrderError>()(
  "QuestionHeadOrderError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** A question-head page contained identity owned by another family or body. */
export class QuestionHeadFamilyError extends Schema.TaggedError<QuestionHeadFamilyError>()(
  "QuestionHeadFamilyError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
    field: QuestionFamilyFieldSchema,
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
  | QuestionChoiceLocaleMissingError
  | QuestionMetadataError
  | QuestionSourceError
  | PublicationScopeIdentityError;

/** Authoritative question plan consumed by whole-catalog release composition. */
export interface QuestionPublication {
  /** Replays the exact question delta against supplied active question heads. */
  readonly records: Stream.Stream<PreparedContentTransition, ReplaySpoolError>;
  /** Replays the complete desired question head catalog in canonical order. */
  readonly result: Stream.Stream<QuestionHead, ReplaySpoolError>;
  /** Replays route-free transitions without inventing question paths. */
  readonly routes: Stream.Stream<RouteTransition, ReplaySpoolError>;
}

/** Fresh-CI inputs pinned to one checkout, renderer, and question-head stream. */
export interface QuestionPublicationInput<E, R> {
  readonly checkoutRoot: string;
  readonly published: Stream.Stream<QuestionHead, E, R>;
  readonly rendererManifest: unknown;
  readonly scope?: PublicationScope | undefined;
}

type RendererManifestError = Effect.Error<
  ReturnType<typeof validateLiveRendererManifestHash>
>;
type TryoutRegistryError = Effect.Error<
  ReturnType<typeof decodeTryoutRegistry>
>;
/** Every failure possible before the replayable question plan is constructed. */
export type PrepareQuestionPublicationError<E> =
  | E
  | QuestionChoiceJoinError
  | QuestionPublicationStreamError<never>
  | ReplaySpoolError
  | RendererManifestError
  | TryoutRegistryError;

/** Finds the first field proving a head does not own its question source. */
function mismatchedFamilyField(
  questionBanks: QuestionBankIndex,
  head: QuestionHead
): typeof QuestionFamilyFieldSchema.Type | undefined {
  const questionSuffix = "/question";
  const answerSuffix = "/answer";
  let bodyKind: "question" | "answer" | undefined;
  if (head.contentKey.endsWith(questionSuffix)) {
    bodyKind = "question";
  } else if (head.contentKey.endsWith(answerSuffix)) {
    bodyKind = "answer";
  }
  if (bodyKind === undefined) {
    return "contentKey";
  }
  const bodySuffix = `/${bodyKind}`;
  const questionKey = head.contentKey.slice(0, -bodySuffix.length);
  if (!Schema.is(QuestionKeySchema)(questionKey)) {
    return "contentKey";
  }
  if (
    (bodyKind === "question" && head.delivery !== "authenticated") ||
    (bodyKind === "answer" && head.delivery !== "entitled")
  ) {
    return "delivery";
  }
  if (!Schema.is(QuestionSourcePathSchema)(head.sourcePath)) {
    return "sourcePath";
  }
  const document = questionSourcePathParts(head.sourcePath);
  if (document.kind !== "body") {
    return "sourcePath";
  }
  if (document.artifactLocale !== head.artifactLocale) {
    return "artifactLocale";
  }
  if (document.bodyKind !== bodyKind || document.questionKey !== questionKey) {
    return "sourcePath";
  }
  const { questionSetKey } = questionKeyParts(document.questionKey);
  const rendererDomain = questionBanks.get(questionBankKey(questionSetKey));
  if (rendererDomain !== undefined && head.rendererDomain !== rendererDomain) {
    return "rendererDomain";
  }
}

/** Validates family ownership and strict ordering before diffing one head. */
function validatePublishedHead(
  questionBanks: QuestionBankIndex,
  state: HeadOrderState,
  head: QuestionHead
): Effect.Effect<
  readonly [HeadOrderState, readonly QuestionHead[]],
  QuestionHeadDuplicateError | QuestionHeadFamilyError | QuestionHeadOrderError
> {
  const field = mismatchedFamilyField(questionBanks, head);
  if (field !== undefined) {
    return Effect.fail(
      new QuestionHeadFamilyError({
        artifactLocale: head.artifactLocale,
        contentKey: head.contentKey,
        field,
      })
    );
  }
  const { previous } = state;
  if (previous !== undefined) {
    const comparison = compareContentHeads(previous, head);
    if (comparison === 0) {
      return Effect.fail(
        new QuestionHeadDuplicateError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
    if (comparison > 0) {
      return Effect.fail(
        new QuestionHeadOrderError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
  }
  return Effect.succeed(Tuple.make({ previous: head }, [head]));
}

/** Proves every published question head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<QuestionHead, E, R>,
  questionBanks: QuestionBankIndex
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(
    Stream.mapAccumEffect(
      () => initial,
      (state, head) => validatePublishedHead(questionBanks, state, head)
    )
  );
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
  const tryoutSources = yield* decodeTryoutRegistry();
  const { entries, questionBanks, sources } = yield* loadQuestionContent(
    input.checkoutRoot,
    tryoutSources
  ).pipe(Effect.mapError(mapQuestionSourceError(input.checkoutRoot)));
  const plans = planQuestionPublication({
    checkoutRoot: input.checkoutRoot,
    entries,
    published: validatePublishedHeads(input.published, questionBanks),
    rendererManifest,
    scope: input.scope,
    sources,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-question-",
    schema: QuestionPublicationPlanSchema,
    stream: plans,
  });
  /** Replays canonical question transitions from the sealed spool. */
  const records = spool.replay.pipe(
    Stream.filterMap((plan) =>
      Result.fromNullishOr(plan.record, constUndefined)
    )
  );
  /** Replays the complete canonical question catalog from the sealed spool. */
  const result = spool.replay.pipe(
    Stream.filterMap((plan) =>
      Result.fromNullishOr(plan.result, constUndefined)
    )
  );
  /** Replays route-free question changes for global route planning. */
  const routes = records.pipe(Stream.map(routeTransitionForContent));
  return { records, result, routes };
});
