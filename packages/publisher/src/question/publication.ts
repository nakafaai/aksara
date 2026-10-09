import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  QuestionKeySchema,
  QuestionSourcePathSchema,
  questionBankKey,
  questionKeyParts,
  questionSourcePathParts,
} from "@nakafa/aksara-contracts/question/identity";
import type { QuestionResponseLocaleMissingError } from "@nakafa/aksara-contracts/question/item";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import { loadQuestionContent } from "@nakafa/aksara-corpus/question-bank/content";
import type { QuestionBankIndex } from "@nakafa/aksara-corpus/question-bank/path";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import type { FileSystem, Path } from "effect";
import {
  Effect,
  MutableHashMap,
  Option,
  Result,
  Schema,
  type Scope,
  Stream,
} from "effect";
import { constUndefined } from "effect/Function";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import {
  type HeadOrderState,
  orderPublishedHeads,
  validateHeadOrder,
} from "#publisher/publication/order";
import {
  mapQuestionSourceError,
  type QuestionMetadataError,
  type QuestionSourceError,
} from "#publisher/question/document";
import {
  planQuestionPublication,
  type QuestionItemJoinError,
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

/** Every failure possible while replaying authoritative question records. */
export type QuestionPublicationStreamError<E> =
  | E
  | CompileContentError
  | ContentSourceInspectionError
  | QuestionHeadDuplicateError
  | QuestionHeadFamilyError
  | QuestionHeadOrderError
  | QuestionResponseLocaleMissingError
  | QuestionMetadataError
  | QuestionSourceError;

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
  readonly rebuild?: boolean | undefined;
  readonly rendererManifest: unknown;
  readonly scope?: PublicationScope | undefined;
}

type RendererManifestError = Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;
type TryoutRegistryError = Effect.Error<
  ReturnType<typeof decodeTryoutRegistry>
>;
/** Every failure possible before the replayable question plan is constructed. */
export type PrepareQuestionPublicationError<E> =
  | E
  | QuestionItemJoinError
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
  const definition = Option.getOrUndefined(
    MutableHashMap.get(questionBanks, questionBankKey(questionSetKey))
  );
  if (
    definition !== undefined &&
    head.rendererDomain !== definition.rendererDomain
  ) {
    return "rendererDomain";
  }
}

/** Validates family ownership and strict ordering before diffing one head. */
function validatePublishedHead(
  questionBanks: QuestionBankIndex,
  state: HeadOrderState,
  head: QuestionHead
) {
  return validateHeadOrder(
    state,
    head,
    (candidate) => mismatchedFamilyField(questionBanks, candidate),
    {
      duplicate: (candidate) =>
        new QuestionHeadDuplicateError({
          artifactLocale: candidate.artifactLocale,
          contentKey: candidate.contentKey,
        }),
      family: (candidate, field) =>
        new QuestionHeadFamilyError({
          artifactLocale: candidate.artifactLocale,
          contentKey: candidate.contentKey,
          field,
        }),
      order: (candidate) =>
        new QuestionHeadOrderError({
          artifactLocale: candidate.artifactLocale,
          contentKey: candidate.contentKey,
        }),
    }
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
    published: orderPublishedHeads(input.published, (state, head) =>
      validatePublishedHead(questionBanks, state, head)
    ),
    rebuild: input.rebuild,
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
