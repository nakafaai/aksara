import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { QuestionHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { makeRouteItems } from "#publisher/routes";
import {
  collectQuestionPublication,
  collectQuestionRoutes,
  publishedQuestionHeads,
  rejectQuestionPublication,
} from "#test/question";

const publishedHeads = await publishedQuestionHeads();
const questionKey =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const selectedEnglishHead = publishedHeads.find(
  ({ contentKey, locale }) =>
    contentKey === `${questionKey}/question` && locale === "en"
);
const answerHead = publishedHeads.find(
  ({ contentKey, locale }) =>
    contentKey === `${questionKey}/answer` && locale === "en"
);
const indonesianHead = publishedHeads.find(
  ({ contentKey, locale }) =>
    contentKey === `${questionKey}/question` && locale === "id"
);
if (!(selectedEnglishHead && answerHead && indonesianHead)) {
  throw new Error("Expected both real question locales and their answer.");
}
const englishHead = selectedEnglishHead;
const familyCases = [
  ["contentKey", { ...englishHead, contentKey: "material/lesson/test" }],
  ["delivery", { ...englishHead, delivery: "entitled" }],
  ["delivery", { ...answerHead, delivery: "authenticated" }],
  ["rendererDomain", { ...englishHead, rendererDomain: "mathematics" }],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath: "packages/corpus/material/lesson/test/en.mdx",
    },
  ],
  [
    "locale",
    {
      ...englishHead,
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.id.mdx",
    },
  ],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-2/question.en.mdx",
    },
  ],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-x/question-1/question.en.mdx",
    },
  ],
  [
    "rendererDomain",
    {
      ...englishHead,
      contentKey:
        "question-bank/tryout/indonesia/other/test/set-1/question-1/question",
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/other/test/set-1/question-1/question.en.mdx",
    },
  ],
] as const;

/** Decodes a modified question head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(QuestionHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Creates one route-free stale head for a real renderer-domain grammar. */
function staleHead(
  relativeQuestion: string,
  rendererDomain: typeof englishHead.rendererDomain,
  physicalQuestion = relativeQuestion
) {
  return modifyHead({
    ...englishHead,
    contentKey: `question-bank/tryout/indonesia/${relativeQuestion}/question`,
    rendererDomain,
    sourcePath: `packages/corpus/question-bank/tryout/indonesia/${physicalQuestion}/question.en.mdx`,
  });
}

describe("question publication", () => {
  it("never produces a route bind for question or answer bodies", async () => {
    const transitions = await collectQuestionRoutes([]);
    const items = await Effect.runPromise(
      makeRouteItems(
        ReleaseIdSchema.make("test-question-routes"),
        Stream.fromIterable(transitions)
      ).pipe(Stream.runCollect)
    );

    expect(transitions).toHaveLength(4);
    expect(
      transitions.every(
        ({ current, next }) =>
          current.publicPath === undefined && next.publicPath === undefined
      )
    ).toBe(true);
    expect([...items]).toEqual([]);
  });

  it("accepts every real question renderer grammar and pair-group source", async () => {
    const stale = [
      staleHead("snbt/english-language/set-9/question-1", "snbt-plain"),
      staleHead("snbt/general-reasoning/set-9/question-1", "snbt-general"),
      staleHead("snbt/mathematical-reasoning/set-9/question-1", "snbt-math"),
      staleHead("snbt/quantitative-knowledge/set-99/question-1", "snbt-quant"),
      staleHead(
        "snbt/reading-and-writing-skills/set-9/question-1",
        "snbt-plain",
        "snbt/reading-and/writing-skills/set-9/question-1"
      ),
      staleHead("tka/mathematics/set-9/question-1", "tka-math"),
    ].sort((left, right) => {
      if (left.contentKey < right.contentKey) {
        return -1;
      }
      if (left.contentKey > right.contentKey) {
        return 1;
      }
      return 0;
    });
    const records = await collectQuestionPublication({ heads: stale });

    expect(
      records.filter(({ record }) => record.change.operation === "delete")
    ).toHaveLength(stale.length);
  });

  it("rejects duplicate and noncanonical published heads as typed failures", async () => {
    await expect(
      rejectQuestionPublication([englishHead, englishHead])
    ).resolves.toMatchObject({
      _tag: "QuestionHeadDuplicateError",
    });
    await expect(
      rejectQuestionPublication([indonesianHead, englishHead])
    ).resolves.toMatchObject({ _tag: "QuestionHeadOrderError" });
  });

  it.each(familyCases)(
    "rejects a question-head %s contradiction",
    async (field, head) => {
      await expect(
        rejectQuestionPublication([modifyHead(head)])
      ).resolves.toMatchObject({
        _tag: "QuestionHeadFamilyError",
        field,
      });
    }
  );
});
