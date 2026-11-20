import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";
import type { ItemSource } from "#corpus/question-bank/item";
import { SetPathSchema, setSourcePath } from "#corpus/question-bank/path";
import type { QuestionSet } from "#corpus/question-bank/source";
import { TEST_ITEM } from "#corpus/test/bank";
import { validateSectionPoints } from "#corpus/tryout/readiness/points";
import { ReadinessSectionSchema } from "#corpus/tryout/readiness/section";

const path = SetPathSchema.make("test-country/test-exam/test-section/set-1");
const explanations: QuestionSet["explanations"] = ["de"];

/** An Aufgabe of five points: a derivative of two and a gap of three. */
const aufgabe: ItemSource = {
  versions: {
    de: {
      kind: "parts",
      parts: [
        { expression: "2x", kind: "mathEntry", label: "a", points: 2 },
        { accepted: ["fällt"], kind: "textEntry", label: "b", points: 3 },
      ],
    },
  },
};

/** A set of the Aufgabe and a choice worth one point. */
const set: QuestionSet = {
  explanations,
  path,
  questions: Arr.map([aufgabe, TEST_ITEM], (item, index) => ({
    explanations,
    item,
    number: index + 1,
    set: path,
    sourceRoot: setSourcePath(path, `question-${index + 1}`),
  })),
  stimuli: [],
};

/** An editorial expectation of the given value. */
const editorial = <Value>(value: Value) => ({
  provenance: { kind: "editorial" },
  value,
});

/** A readiness section of two questions with the given points recorded. */
function section(points: object) {
  return Schema.decodeUnknownSync(ReadinessSectionSchema)({
    key: "test-section",
    order: 1,
    questionCount: editorial(2),
    timeLimitSeconds: editorial(3600),
    ...points,
  });
}

describe("validateSectionPoints", () => {
  it.effect("accepts the points of each question and their total", () =>
    Effect.gen(function* () {
      yield* validateSectionPoints(
        section({
          questionPoints: editorial([5, 1]),
          totalPoints: editorial(6),
        }),
        set,
        "scope"
      );
      yield* validateSectionPoints(section({}), undefined, "scope");
    })
  );

  it.effect("rejects points that drift from the items or a missing set", () =>
    Effect.gen(function* () {
      const failures = yield* Effect.forEach(
        [
          validateSectionPoints(
            section({ questionPoints: editorial([4, 2]) }),
            set,
            "scope"
          ),
          validateSectionPoints(
            section({ totalPoints: editorial(7) }),
            set,
            "scope"
          ),
          validateSectionPoints(
            section({ questionPoints: editorial([5, 1]) }),
            undefined,
            "scope"
          ),
        ],
        Effect.flip
      );

      expect(
        Arr.map(failures, ({ actual, expected, field, scope }) => [
          field,
          actual,
          expected,
          scope,
        ])
      ).toEqual([
        ["questionPoints", "5/1", "4/2", "scope"],
        ["totalPoints", "6", "7", "scope"],
        ["questionPoints", "none", "5/1", "scope"],
      ]);
    })
  );
});
