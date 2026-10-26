import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { requireCompleteBank } from "#corpus/question-bank/entries";
import {
  CHECKOUT,
  checkoutLayer,
  questionFiles,
  TEST_SET,
} from "#corpus/test/bank";

describe("requireCompleteBank", () => {
  const otherSet = "test-country/test-exam/test-section/other-set" as const;

  it.effect("accepts a bank whose every file belongs to an active set", () =>
    requireCompleteBank(CHECKOUT, [TEST_SET]).pipe(
      Effect.provide(checkoutLayer(questionFiles(1)))
    )
  );

  it.effect("refuses a set no exam names and a stray file in the bank", () =>
    Effect.gen(function* () {
      const inactive = yield* requireCompleteBank(CHECKOUT, [TEST_SET]).pipe(
        Effect.provide(
          checkoutLayer([
            ...questionFiles(1),
            [
              `packages/corpus/question-bank/tryout/${otherSet}/question-1/item.ts`,
              "",
            ],
          ])
        ),
        Effect.flip
      );
      const stray = yield* requireCompleteBank(CHECKOUT, [TEST_SET]).pipe(
        Effect.provide(
          checkoutLayer([
            ...questionFiles(1),
            ["packages/corpus/question-bank/tryout/README.md", "Bank."],
          ])
        ),
        Effect.flip
      );

      expect(inactive).toMatchObject({
        _tag: "QuestionBankPathError",
        path: `${otherSet}/question-1/item.ts`,
      });
      expect(stray).toMatchObject({
        _tag: "QuestionBankPathError",
        path: "README.md",
      });
    })
  );
});
