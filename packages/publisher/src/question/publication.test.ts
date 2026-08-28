import { expect, layer } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Schema, Stream } from "effect";
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
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/choices.ts",
    },
  ],
  [
    "artifactLocale",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.id.mdx",
    },
  ],
  [
    "sourcePath",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-2/question.en.mdx",
    },
  ],
  [
    "sourcePath",
    "question",
    {
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-x/question-1/question.en.mdx",
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
    englishHead: QuestionHead,
    relativeQuestion: string,
    rendererDomain: QuestionHead["rendererDomain"],
    physicalQuestion = relativeQuestion
  ) =>
    modifyHead({
      ...englishHead,
      contentKey: `question-bank/tryout/indonesia/${relativeQuestion}/question`,
      rendererDomain,
      sourcePath: `packages/corpus/question-bank/tryout/indonesia/${physicalQuestion}/question.en.mdx`,
    })
);

/** Loads the real locale and answer heads once for the publication suite. */
const makePublicationTestFixtures = Effect.fn(
  "QuestionPublicationTest.makeFixtures"
)(() =>
  Effect.gen(function* () {
    const publishedHeads = yield* Effect.promise(publishedQuestionHeads);
    const englishHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey, artifactLocale }) =>
          contentKey === `${questionKey}/question` && artifactLocale === "en"
      )
    );
    const answerHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey, artifactLocale }) =>
          contentKey === `${questionKey}/answer` && artifactLocale === "en"
      )
    );
    const indonesianHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey, artifactLocale }) =>
          contentKey === `${questionKey}/question` && artifactLocale === "id"
      )
    );

    return { answerHead, englishHead, indonesianHead, publishedHeads };
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

      expect(created).toHaveLength(6);
      expect(retained).toHaveLength(1);
      expect(
        transitions.every(
          ({ current, next }) =>
            current.publicPath === undefined && next.publicPath === undefined
        )
      ).toBe(true);
      expect([...items]).toEqual([]);
    })
  );

  it.effect("accepts every real question renderer grammar", () =>
    Effect.gen(function* () {
      const { englishHead } = yield* QuestionPublicationTestFixtures;
      const stale = yield* Effect.all([
        makeStaleHead(
          englishHead,
          "snbt/english-language/set-9/question-1",
          "snbt-plain"
        ),
        makeStaleHead(
          englishHead,
          "snbt/general-reasoning/set-9/question-1",
          "snbt-general"
        ),
        makeStaleHead(
          englishHead,
          "snbt/mathematical-reasoning/set-9/question-1",
          "snbt-math"
        ),
        makeStaleHead(
          englishHead,
          "snbt/quantitative-knowledge/set-99/question-1",
          "snbt-quant"
        ),
        makeStaleHead(
          englishHead,
          "snbt/reading-and-writing-skills/set-9/question-1",
          "snbt-plain"
        ),
        makeStaleHead(
          englishHead,
          "tka/mathematics/set-9/question-1",
          "tka-math"
        ),
      ]);
      stale.sort((left, right) => {
        if (left.contentKey < right.contentKey) {
          return -1;
        }
        if (left.contentKey > right.contentKey) {
          return 1;
        }
        return 0;
      });
      const records = yield* Effect.promise(() =>
        collectQuestionPublication({ heads: stale })
      );

      expect(
        records.filter(({ record }) => record.change.operation === "delete")
      ).toHaveLength(stale.length);
    })
  );

  it.effect(
    "tombstones a question bank removed from the current registry",
    () =>
      Effect.gen(function* () {
        const { englishHead } = yield* QuestionPublicationTestFixtures;
        const deletedBank = yield* makeStaleHead(
          englishHead,
          "retired-exam/reading-and-writing-skills/archive-set/question-1",
          "snbt-plain"
        );
        const records = yield* Effect.promise(() =>
          collectQuestionPublication({ heads: [deletedBank] })
        );
        const deletions = records.filter(
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
        const { englishHead, indonesianHead } =
          yield* QuestionPublicationTestFixtures;
        const duplicate = yield* Effect.promise(() =>
          rejectQuestionPublication([englishHead, englishHead])
        );
        const noncanonical = yield* Effect.promise(() =>
          rejectQuestionPublication([indonesianHead, englishHead])
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
        const { answerHead, englishHead } =
          yield* QuestionPublicationTestFixtures;
        const baseHead = bodyKind === "answer" ? answerHead : englishHead;
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
