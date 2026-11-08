import { assert, describe, it } from "@effect/vitest";
import type { AssessmentSite } from "@nakafa/aksara-compiler/assessment/error";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { assembleInteraction } from "#publisher/assessment/interaction";

const SITE: AssessmentSite = {
  contentKey: ContentKeySchema.make(
    "question-bank/tryout/test/question-1/question.id"
  ),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/question-bank/tryout/test/question-1/question.id.mdx"
  ),
};

describe("assembleInteraction", () => {
  it.effect(
    "takes a fraction only for a typed number that is not whole and keeps its unit",
    () =>
      Effect.gen(function* () {
        const decimal = yield* assembleInteraction(
          { kind: "numericEntry", unit: "cm", value: "0.75" },
          "id",
          SITE
        );
        const whole = yield* assembleInteraction(
          { kind: "numericEntry", value: "-12" },
          "en",
          SITE
        );

        assert.deepStrictEqual(decimal, {
          interaction: {
            acceptsFractions: true,
            id: "number",
            kind: "numericEntry",
            label: "Jawaban",
            unit: "cm",
          },
          key: { interaction: "number", kind: "numericEntry", value: "0.75" },
        });
        assert.deepStrictEqual(whole, {
          interaction: {
            acceptsFractions: false,
            id: "number",
            kind: "numericEntry",
            label: "Answer",
          },
          key: { interaction: "number", kind: "numericEntry", value: "-12" },
        });
      })
  );
});
