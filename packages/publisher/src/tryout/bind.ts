import {
  ContentLocaleSchema,
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import type { ContentDeliveryClassSchema } from "@nakafa/aksara-contracts/delivery";
import {
  type ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import { compareTryoutPlacements } from "@nakafa/aksara-contracts/tryout/row-hash";
import {
  type TryoutPlacementSource,
  TryoutPlacementSourceSchema,
} from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Stream } from "effect";
import {
  type TryoutHeadBodySchema,
  TryoutHeadDuplicateError,
  TryoutHeadMismatchError,
  TryoutHeadMissingError,
  TryoutHeadOrderError,
} from "#publisher/tryout/error";

interface HeadRequirement {
  readonly bodyKind: typeof TryoutHeadBodySchema.Type;
  readonly contentKey: typeof ContentKeySchema.Type;
  readonly delivery: typeof ContentDeliveryClassSchema.Type;
  readonly locale: typeof ContentLocaleSchema.Type;
  readonly placement: TryoutPlacementSource;
  readonly sourcePath: typeof CorpusSourcePathSchema.Type;
}

/** Exact question and answer hashes bound to one active placement source. */
export interface BoundTryoutPlacement {
  readonly answerHead: QuestionHead;
  readonly placement: TryoutPlacementSource;
  readonly questionHead: QuestionHead;
}

interface HeadOrderState {
  readonly previous: QuestionHead | undefined;
}

/** Advances one canonical desired-head stream or reports its exact disorder. */
function validateHeadOrder(
  state: HeadOrderState,
  head: QuestionHead
): Effect.Effect<
  readonly [HeadOrderState, QuestionHead],
  TryoutHeadDuplicateError | TryoutHeadOrderError
> {
  const { previous } = state;
  if (previous !== undefined) {
    const order = compareContentHeads(previous, head);
    if (order === 0) {
      return Effect.fail(
        new TryoutHeadDuplicateError({
          contentKey: head.contentKey,
          locale: head.locale,
        })
      );
    }
    if (order > 0) {
      return Effect.fail(
        new TryoutHeadOrderError({
          contentKey: head.contentKey,
          locale: head.locale,
        })
      );
    }
  }
  return Effect.succeed([{ previous: head }, head]);
}

/** Derives both delivery-specific head requirements from one placement. */
function requirementsForPlacement(
  placement: TryoutPlacementSource
): readonly [HeadRequirement, HeadRequirement] {
  return [
    {
      bodyKind: "answer",
      contentKey: placement.answerContentKey,
      delivery: "entitled",
      locale: placement.locale,
      placement,
      sourcePath: CorpusSourcePathSchema.make(
        `${placement.questionSourcePath}/answer.${placement.locale}.mdx`
      ),
    },
    {
      bodyKind: "question",
      contentKey: placement.questionContentKey,
      delivery: "authenticated",
      locale: placement.locale,
      placement,
      sourcePath: CorpusSourcePathSchema.make(
        `${placement.questionSourcePath}/question.${placement.locale}.mdx`
      ),
    },
  ];
}

/** Builds canonical active-head requirements without retaining body content. */
function makeTryoutHeadRequirements(
  placements: readonly TryoutPlacementSource[]
) {
  return placements
    .flatMap(requirementsForPlacement)
    .sort((left, right) => compareContentHeads(left, right));
}

/** Validates canonical order across one complete desired question-head stream. */
function validateTryoutHeadStream<E, R>(
  heads: Stream.Stream<QuestionHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return heads.pipe(Stream.mapAccumEffect(initial, validateHeadOrder));
}

/** Finds the first exact source-owned field that differs from a requirement. */
function mismatchedField(requirement: HeadRequirement, head: QuestionHead) {
  for (const field of ["delivery", "rendererDomain", "sourcePath"] as const) {
    const expected =
      field === "rendererDomain"
        ? requirement.placement.rendererDomain
        : requirement[field];
    if (head[field] !== expected) {
      return field;
    }
  }
}

/** Returns the logical question root shared by all body head identities. */
function questionRoot(contentKey: string) {
  return contentKey.slice(0, contentKey.lastIndexOf("/"));
}

/** Rejects incomplete or repeated locale placements for one question root. */
function validatePlacementPairs(placements: readonly TryoutPlacementSource[]) {
  const localesByRoot = new Map<string, Set<string>>();
  for (const placement of placements) {
    const root = questionRoot(placement.questionContentKey);
    const locales = localesByRoot.get(root) ?? new Set<string>();
    if (locales.has(placement.locale)) {
      return Effect.fail(
        new TryoutHeadMismatchError({
          contentKey: placement.questionContentKey,
          field: "bodyPair",
          locale: placement.locale,
        })
      );
    }
    locales.add(placement.locale);
    localesByRoot.set(root, locales);
  }
  for (const placement of placements) {
    const locales = localesByRoot.get(
      questionRoot(placement.questionContentKey)
    );
    if (locales?.size !== ContentLocaleSchema.literals.length) {
      return Effect.fail(
        new TryoutHeadMismatchError({
          contentKey: placement.questionContentKey,
          field: "bodyPair",
          locale: placement.locale,
        })
      );
    }
  }
  return Effect.void;
}

/** Indexes only exact active compact heads while validating the full stream. */
function indexTryoutHeads<E, R>(
  requirements: readonly HeadRequirement[],
  heads: Stream.Stream<QuestionHead, E, R>
) {
  const requirementByIdentity = new Map(
    requirements.map((requirement) => [headIdentity(requirement), requirement])
  );
  const activeRoots = new Set(
    requirements.map(({ contentKey }) => questionRoot(contentKey))
  );
  return validateTryoutHeadStream(heads).pipe(
    Stream.runFoldEffect(
      new Map<string, QuestionHead>(),
      (headsByIdentity, head) => {
        if (!activeRoots.has(questionRoot(head.contentKey))) {
          return Effect.succeed(headsByIdentity);
        }
        const identity = headIdentity(head);
        const requirement = requirementByIdentity.get(identity);
        if (requirement === undefined) {
          return Effect.fail(
            new TryoutHeadMismatchError({
              contentKey: head.contentKey,
              field: "contentKey",
              locale: head.locale,
            })
          );
        }
        const field = mismatchedField(requirement, head);
        if (field !== undefined) {
          return Effect.fail(
            new TryoutHeadMismatchError({
              contentKey: head.contentKey,
              field,
              locale: head.locale,
            })
          );
        }
        headsByIdentity.set(identity, head);
        return Effect.succeed(headsByIdentity);
      }
    )
  );
}

/** Reads one required active head from the validated compact-head index. */
function requiredHead(
  heads: ReadonlyMap<string, QuestionHead>,
  requirement: HeadRequirement
) {
  const head = heads.get(headIdentity(requirement));
  return head === undefined
    ? Effect.fail(
        new TryoutHeadMissingError({
          bodyKind: requirement.bodyKind,
          contentKey: requirement.contentKey,
          locale: requirement.locale,
        })
      )
    : Effect.succeed(head);
}

/** Binds one placement to its exact delivery-specific body artifacts. */
function bindPlacement(
  heads: ReadonlyMap<string, QuestionHead>,
  placement: TryoutPlacementSource
) {
  const [answerRequirement, questionRequirement] =
    requirementsForPlacement(placement);
  return Effect.all([
    requiredHead(heads, answerRequirement),
    requiredHead(heads, questionRequirement),
  ]).pipe(
    Effect.map(
      ([answer, question]) =>
        ({
          answerHead: answer,
          placement: TryoutPlacementSourceSchema.make(placement),
          questionHead: question,
        }) satisfies BoundTryoutPlacement
    )
  );
}

/** Streams exact artifact bindings for every active try-out placement. */
export function bindTryoutHeads<E, R>(
  placements: readonly TryoutPlacementSource[],
  heads: Stream.Stream<QuestionHead, E, R>
) {
  const requirements = makeTryoutHeadRequirements(placements);
  return Stream.unwrap(
    validatePlacementPairs(placements).pipe(
      Effect.zipRight(indexTryoutHeads(requirements, heads)),
      Effect.map((headsByIdentity) =>
        Stream.fromIterable([...placements].sort(compareTryoutPlacements)).pipe(
          Stream.mapEffect((placement) =>
            bindPlacement(headsByIdentity, placement)
          )
        )
      )
    )
  );
}
