import { expect, layer } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Order,
  Schema,
  Stream,
} from "effect";
import {
  QuestionHeadDuplicateError,
  QuestionHeadFamilyError,
  QuestionHeadOrderError,
} from "#publisher/question/publication";
import { makeRouteItems } from "#publisher/routes";
import {
  collectQuestionPublication,
  collectQuestionRoutes,
  publishedQuestionHeads,
  rejectQuestionPublication,
} from "#test/question/spec";

const questionKey =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const familyCases = [
  ["contentKey", "question", { contentKey: "material/lesson/test" }],
  [
    "contentKey",
    "question",
    {
      contentKey:
        "question-bank/tryout/indonesia/snbt/set-1/question-1/question",
    },
  ],
  ["delivery", "question", { delivery: "entitled" }],
  ["delivery", "answer", { delivery: "authenticated" }],
  ["rendererDomain", "question", { rendererDomain: "mathematics" }],
  [
    "sourcePath",
    "question",
    {
      sourcePath: "packages/corpus/material/lesson/test/en.mdx",
    },
  ],
  [
    "sourcePath",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/item.ts",
    },
  ],
  [
    "artifactLocale",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx",
    },
  ],
  [
    "sourcePath",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-2/question.id.mdx",
    },
  ],
  [
    "sourcePath",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-x/question-1/question.id.mdx",
    },
  ],
] as const;

/** Decodes a modified question head without bypassing the wire contract. */
const modifyHead = Effect.fn("QuestionPublicationTest.modifyHead")(
  (input: unknown) =>
    Schema.decodeUnknownEffect(QuestionHeadSchema)(input, {
      onExcessProperty: "error",
    })
);

/** Creates one route-free stale head for a real renderer-domain grammar. */
const makeStaleHead = Effect.fn("QuestionPublicationTest.makeStaleHead")(
  (
    promptHead: QuestionHead,
    relativeQuestion: string,
    rendererDomain: QuestionHead["rendererDomain"],
    physicalQuestion = relativeQuestion
  ) =>
    modifyHead({
      ...promptHead,
      contentKey: `question-bank/tryout/indonesia/${relativeQuestion}/question`,
      rendererDomain,
      sourcePath: `packages/corpus/question-bank/tryout/indonesia/${physicalQuestion}/question.id.mdx`,
    })
);

/** Loads the real locale and answer heads once for the publication suite. */
const makePublicationTestFixtures = Effect.fn(
  "QuestionPublicationTest.makeFixtures"
)(() =>
  Effect.gen(function* () {
    const publishedHeads = yield* Effect.promise(publishedQuestionHeads);
    const promptHead = yield* Effect.fromOption(
      Arr.findFirst(
        publishedHeads,
        ({ contentKey, artifactLocale }) =>
          contentKey === `${questionKey}/question` && artifactLocale === "id"
      )
    );
    const answerHead = yield* Effect.fromOption(
      Arr.findFirst(
        publishedHeads,
        ({ contentKey, artifactLocale }) =>
          contentKey === `${questionKey}/answer` && artifactLocale === "en"
      )
    );

    return { answerHead, promptHead, publishedHeads };
  })
);

class QuestionPublicationTestFixtures extends Context.Service<
  QuestionPublicationTestFixtures,
  Effect.Success<ReturnType<typeof makePublicationTestFixtures>>
>()("AksaraPublisherQuestionPublicationTestFixtures") {}

const publicationTestLayer = Layer.effect(
  QuestionPublicationTestFixtures,
  makePublicationTestFixtures()
);

layer(publicationTestLayer)("question publication", (it) => {
  it.effect("never produces a route bind for question or answer bodies", () =>
    Effect.gen(function* () {
      const { publishedHeads } = yield* QuestionPublicationTestFixtures;
      const [first, ...remainingPublishedHeads] = publishedHeads;
      const firstPublishedHead = yield* Effect.fromNullishOr(first);
      const stalePublishedHeads = [
        QuestionHeadSchema.make({
          ...firstPublishedHead,
          sourceHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        }),
        ...remainingPublishedHeads,
      ];
      const [created, retained] = yield* Effect.all([
        Effect.promise(() => collectQuestionRoutes([])),
        Effect.promise(() => collectQuestionRoutes(stalePublishedHeads)),
      ]);
      const transitions = [...created, ...retained];
      const items = yield* makeRouteItems(
        ReleaseIdSchema.make("test-question-routes"),
        Stream.fromIterable(transitions)
      ).pipe(Stream.runCollect);

      expect(created).toHaveLength(4);
      expect(retained).toHaveLength(1);
      expect(
        Arr.every(
          transitions,
          ({ current, next }) =>
            current.publicPath === undefined && next.publicPath === undefined
        )
      ).toBe(true);
      expect([...items]).toEqual([]);
    })
  );

  it.effect("accepts every real question renderer grammar", () =>
    Effect.gen(function* () {
      const { promptHead } = yield* QuestionPublicationTestFixtures;
      const staleHeads = yield* Effect.all([
        makeStaleHead(
          promptHead,
          "snbt/literacy-in-english/set-9/question-1",
          "snbt-plain"
        ),
        makeStaleHead(
          promptHead,
          "snbt/general-reasoning/set-9/question-1",
          "snbt-general"
        ),
        makeStaleHead(
          promptHead,
          "snbt/mathematical-reasoning/set-9/question-1",
          "snbt-math"
        ),
        makeStaleHead(
          promptHead,
          "snbt/quantitative-knowledge/set-99/question-1",
          "snbt-quant"
        ),
        makeStaleHead(
          promptHead,
          "snbt/reading-comprehension-and-writing/set-9/question-1",
          "snbt-plain"
        ),
        makeStaleHead(
          promptHead,
          "tka/compulsory-mathematics/set-9/question-1",
          "tka-math"
        ),
      ]);
      const stale = Arr.sortWith(
        staleHeads,
        ({ contentKey }) => contentKey,
        Order.String
      );
      const records = yield* Effect.promise(() =>
        collectQuestionPublication({ heads: stale })
      );

      expect(
        Arr.filter(
          records,
          ({ record }) => record.change.operation === "delete"
        )
      ).toHaveLength(stale.length);
    })
  );

  it.effect(
    "tombstones a question bank removed from the current registry",
    () =>
      Effect.gen(function* () {
        const { promptHead } = yield* QuestionPublicationTestFixtures;
        const deletedBank = yield* makeStaleHead(
          promptHead,
          "retired-exam/reading-comprehension-and-writing/archive-set/question-1",
          "snbt-plain"
        );
        const records = yield* Effect.promise(() =>
          collectQuestionPublication({ heads: [deletedBank] })
        );
        const deletions = Arr.filter(
          records,
          ({ record }) => record.change.operation === "delete"
        );

        expect(deletions).toEqual([
          expect.objectContaining({
            record: expect.objectContaining({
              change: expect.objectContaining({ operation: "delete" }),
            }),
          }),
        ]);
      })
  );

  it.effect(
    "rejects duplicate and noncanonical published heads as typed failures",
    () =>
      Effect.gen(function* () {
        const { promptHead, answerHead } =
          yield* QuestionPublicationTestFixtures;
        const duplicate = yield* Effect.promise(() =>
          rejectQuestionPublication([promptHead, promptHead])
        );
        const noncanonical = yield* Effect.promise(() =>
          rejectQuestionPublication([promptHead, answerHead])
        );

        expect(duplicate).toBeInstanceOf(QuestionHeadDuplicateError);
        expect(duplicate).toMatchObject({
          _tag: "QuestionHeadDuplicateError",
        });
        expect(noncanonical).toBeInstanceOf(QuestionHeadOrderError);
        expect(noncanonical).toMatchObject({ _tag: "QuestionHeadOrderError" });
      })
  );

  it.effect.each(familyCases)(
    "rejects a question-head %s contradiction",
    ([field, bodyKind, changes]) =>
      Effect.gen(function* () {
        const { answerHead, promptHead } =
          yield* QuestionPublicationTestFixtures;
        const baseHead = bodyKind === "answer" ? answerHead : promptHead;
        const head = yield* modifyHead({ ...baseHead, ...changes });
        const error = yield* Effect.promise(() =>
          rejectQuestionPublication([head])
        );

        expect(error).toBeInstanceOf(QuestionHeadFamilyError);
        expect(error).toMatchObject({
          _tag: "QuestionHeadFamilyError",
          field,
        });
      })
  );
});
