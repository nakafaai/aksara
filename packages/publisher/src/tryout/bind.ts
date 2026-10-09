import {
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { ContentDeliveryClassSchema } from "@nakafa/aksara-contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { compareTryoutPlacements } from "@nakafa/aksara-contracts/tryout/identity";
import {
  type TryoutPlacementSource,
  TryoutPlacementSourceSchema,
} from "@nakafa/aksara-contracts/tryout/placement";
import {
  Array as Arr,
  Effect,
  HashMap,
  HashSet,
  Option,
  Order,
  Schema,
  Stream,
} from "effect";
import {
  TryoutHeadBodySchema,
  TryoutHeadDuplicateError,
  TryoutHeadMismatchError,
  TryoutHeadMissingError,
  TryoutHeadOrderError,
} from "#publisher/tryout/error";
import {
  questionRoot,
  validatePlacementPairs,
} from "#publisher/tryout/placement";

const HeadRequirementSchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  bodyKind: TryoutHeadBodySchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
  placement: TryoutPlacementSourceSchema,
  sourcePath: CorpusSourcePathSchema,
});

type HeadRequirement = typeof HeadRequirementSchema.Type;

const BoundTryoutPlacementSchema = Schema.Struct({
  answerHead: QuestionHeadSchema,
  placement: TryoutPlacementSourceSchema,
  questionHead: QuestionHeadSchema,
});

/** Exact question and answer hashes bound to one active placement source. */
export type BoundTryoutPlacement = typeof BoundTryoutPlacementSchema.Type;

const HeadOrderStateSchema = Schema.Struct({
  previous: Schema.UndefinedOr(QuestionHeadSchema),
});

type HeadOrderState = typeof HeadOrderStateSchema.Type;

/** Advances one canonical desired-head stream or reports its exact disorder. */
function validateHeadOrder(
  state: HeadOrderState,
  head: QuestionHead
): Effect.Effect<
  readonly [HeadOrderState, readonly QuestionHead[]],
  TryoutHeadDuplicateError | TryoutHeadOrderError
> {
  const { previous } = state;
  if (previous !== undefined) {
    const order = compareContentHeads(previous, head);
    if (order === 0) {
      return Effect.fail(
        new TryoutHeadDuplicateError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
    if (order > 0) {
      return Effect.fail(
        new TryoutHeadOrderError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
  }
  return Effect.succeed([{ previous: head }, [head]]);
}

/** Derives both delivery-specific head requirements from one placement. */
function requirementsForPlacement(
  placement: TryoutPlacementSource
): readonly [HeadRequirement, HeadRequirement] {
  return [
    {
      artifactLocale: placement.answerArtifactLocale,
      bodyKind: "answer",
      contentKey: placement.answerContentKey,
      delivery: "entitled",
      placement,
      sourcePath: CorpusSourcePathSchema.make(
        `${placement.questionSourcePath}/answer.${placement.answerArtifactLocale}.mdx`
      ),
    },
    {
      artifactLocale: placement.questionArtifactLocale,
      bodyKind: "question",
      contentKey: placement.questionContentKey,
      delivery: "authenticated",
      placement,
      sourcePath: CorpusSourcePathSchema.make(
        `${placement.questionSourcePath}/question.${placement.questionArtifactLocale}.mdx`
      ),
    },
  ];
}

/** Builds canonical active-head requirements without retaining body content. */
function makeTryoutHeadRequirements(
  placements: readonly TryoutPlacementSource[]
) {
  return Arr.sort(
    Arr.flatMap(placements, requirementsForPlacement),
    Order.make(compareContentHeads)
  );
}

/** Validates canonical order across one complete desired question-head stream. */
function validateTryoutHeadStream<E, R>(
  heads: Stream.Stream<QuestionHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return heads.pipe(Stream.mapAccumEffect(() => initial, validateHeadOrder));
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

/** Indexes only exact active compact heads while validating the full stream. */
function indexTryoutHeads<E, R>(
  requirements: readonly HeadRequirement[],
  heads: Stream.Stream<QuestionHead, E, R>
) {
  const requirementByIdentity = HashMap.fromIterable(
    Arr.map(requirements, (requirement) => [
      headIdentity(requirement),
      requirement,
    ])
  );
  const activeRoots = HashSet.fromIterable(
    Arr.map(requirements, ({ contentKey }) => questionRoot(contentKey))
  );
  return validateTryoutHeadStream(heads).pipe(
    Stream.runFoldEffect(
      () => HashMap.empty<string, QuestionHead>(),
      (headsByIdentity, head) => {
        if (!HashSet.has(activeRoots, questionRoot(head.contentKey))) {
          return Effect.succeed(headsByIdentity);
        }
        const identity = headIdentity(head);
        const requirement = Option.getOrUndefined(
          HashMap.get(requirementByIdentity, identity)
        );
        if (requirement === undefined) {
          return Effect.fail(
            new TryoutHeadMismatchError({
              artifactLocale: head.artifactLocale,
              contentKey: head.contentKey,
              field: "contentKey",
            })
          );
        }
        const field = mismatchedField(requirement, head);
        if (field !== undefined) {
          return Effect.fail(
            new TryoutHeadMismatchError({
              artifactLocale: head.artifactLocale,
              contentKey: head.contentKey,
              field,
            })
          );
        }
        return Effect.succeed(HashMap.set(headsByIdentity, identity, head));
      }
    )
  );
}

/** Reads one required active head from the validated compact-head index. */
function requiredHead(
  heads: HashMap.HashMap<string, QuestionHead>,
  requirement: HeadRequirement
) {
  const head = Option.getOrUndefined(
    HashMap.get(heads, headIdentity(requirement))
  );
  return head === undefined
    ? Effect.fail(
        new TryoutHeadMissingError({
          artifactLocale: requirement.artifactLocale,
          bodyKind: requirement.bodyKind,
          contentKey: requirement.contentKey,
        })
      )
    : Effect.succeed(head);
}

/** Binds one placement to its exact delivery-specific body artifacts. */
function bindPlacement(
  heads: HashMap.HashMap<string, QuestionHead>,
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
      Effect.andThen(indexTryoutHeads(requirements, heads)),
      Effect.map((headsByIdentity) =>
        Stream.fromIterable(
          Arr.sort(placements, Order.make(compareTryoutPlacements))
        ).pipe(
          Stream.mapEffect((placement) =>
            bindPlacement(headsByIdentity, placement)
          )
        )
      )
    )
  );
}
