import {
  ContentFamilySchema,
  ContentLocaleSchema,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  ReleaseIdSchema,
  type Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentHead,
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import {
  createResultCatalogDigest,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
} from "@nakafa/aksara-contracts/release/result/digest";
import { Effect, Ref, Schema, Stream } from "effect";
import type { ExpectedCatalogHead } from "#publisher/catalog/expectation";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";

const CHECK_RELEASE_ID = ReleaseIdSchema.make("catalog-check");
const CountSchema = Schema.Int.pipe(Schema.nonNegative());
const CatalogHeadIdentitySchema = Schema.Struct({
  contentKey: ContentKeySchema,
  family: ContentFamilySchema,
  locale: ContentLocaleSchema,
});

/** Family counts and digest produced by one complete result-catalog replay. */
export interface CatalogResultEvidence {
  readonly articleCount: number;
  readonly digest: typeof Sha256HashSchema.Type;
  readonly materialCount: number;
  readonly questionCount: number;
  /** Replays only validated question heads for structured try-out binding. */
  readonly questionHeads: () => Stream.Stream<QuestionHead, ReplaySpoolError>;
  readonly totalCount: number;
}

/** Exact source expectation and prepared stream for one result validation. */
interface CatalogResultInput<E, R> {
  readonly expectedHeads: readonly ExpectedCatalogHead[];
  /** Replays the complete prepared result catalog exactly once. */
  readonly result: () => Stream.Stream<ContentHead, E, R>;
}

/** A result replay differs from its independently source-owned identity. */
export class CatalogResultIdentityError extends Schema.TaggedError<CatalogResultIdentityError>()(
  "CatalogResultIdentityError",
  {
    actual: Schema.NullOr(CatalogHeadIdentitySchema),
    expected: Schema.NullOr(CatalogHeadIdentitySchema),
    index: CountSchema,
  }
) {}

interface CatalogResultState {
  readonly articleCount: number;
  readonly index: number;
  readonly materialCount: number;
  readonly questionCount: number;
  readonly totalCount: number;
}

const EMPTY_RESULT_STATE: CatalogResultState = {
  articleCount: 0,
  index: 0,
  materialCount: 0,
  questionCount: 0,
  totalCount: 0,
};

/** Retains only the source-owned identity fields from one compact head. */
function resultIdentity(head: ContentHead): ExpectedCatalogHead {
  return {
    contentKey: head.contentKey,
    family: head.family,
    locale: head.locale,
  };
}

/** Checks whether two catalog heads claim the same stable source identity. */
function hasSameIdentity(
  expected: ExpectedCatalogHead,
  actual: ExpectedCatalogHead
) {
  return (
    expected.contentKey === actual.contentKey &&
    expected.family === actual.family &&
    expected.locale === actual.locale
  );
}

/** Counts one compact head after proving its exact source-owned identity. */
function validateHead(
  expectedHeads: readonly ExpectedCatalogHead[],
  state: CatalogResultState,
  head: ContentHead
) {
  const expected = expectedHeads[state.index] ?? null;
  const actual = resultIdentity(head);
  if (expected === null || !hasSameIdentity(expected, actual)) {
    return Effect.fail(
      new CatalogResultIdentityError({
        actual,
        expected,
        index: state.index,
      })
    );
  }
  const counted = {
    ...state,
    index: state.index + 1,
    totalCount: state.totalCount + 1,
  };
  if (head.family === "article") {
    return Effect.succeed({
      ...counted,
      articleCount: state.articleCount + 1,
    });
  }
  if (head.family === "material") {
    return Effect.succeed({
      ...counted,
      materialCount: state.materialCount + 1,
    });
  }
  return Effect.succeed({
    ...counted,
    questionCount: state.questionCount + 1,
  });
}

/**
 * Validates identities and digest in one result replay while sealing the
 * question subset needed by structured snapshots.
 */
export const validateCatalogResult = Effect.fn(
  "AksaraPublisher.validateCatalogResult"
)(function* <E, R>(input: CatalogResultInput<E, R>) {
  const counts = yield* Ref.make(EMPTY_RESULT_STATE);
  const digest = yield* createResultCatalogDigest(CHECK_RELEASE_ID);
  const validated = input.result().pipe(
    Stream.mapEffect((head) =>
      Effect.gen(function* () {
        const current = yield* Ref.get(counts);
        const next = yield* validateHead(input.expectedHeads, current, head);
        yield* updateResultCatalogDigest(CHECK_RELEASE_ID, digest, head);
        yield* Ref.set(counts, next);
        return head;
      })
    ),
    Stream.filter((head): head is QuestionHead => head.family === "question")
  );
  const questions = yield* createReplaySpool({
    prefix: "aksara-catalog-questions-",
    schema: QuestionHeadSchema,
    stream: validated,
  });
  const state = yield* Ref.get(counts);
  const resultDigest = yield* finalizeResultCatalogDigest(
    CHECK_RELEASE_ID,
    digest
  );

  return {
    articleCount: state.articleCount,
    digest: resultDigest,
    materialCount: state.materialCount,
    questionCount: state.questionCount,
    questionHeads: questions.replay,
    totalCount: state.totalCount,
  } satisfies CatalogResultEvidence;
});
