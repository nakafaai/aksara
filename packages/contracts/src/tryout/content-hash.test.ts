import { Exit, Schema } from "effect";
import { assert, describe, expect, it } from "vitest";
import { DateOnlySchema } from "#contracts/date";
import { QuestionKeySchema } from "#contracts/question/identity";
import { responseText } from "#contracts/test/tryout";
import {
  canonicalizeTryoutContent,
  hashTryoutContent,
  TryoutContentInputSchema,
} from "#contracts/tryout/content-hash";

const source = Schema.decodeSync(TryoutContentInputSchema)({
  answerArtifactLocale: "de",
  answerBody: "\nAnswer\n\n\nDetail\n",
  appLocale: "de",
  datePublished: DateOnlySchema.make("2025-03-04"),
  deliveryLanguage: "en",
  languagePolicy: { kind: "fixed", language: "en" },
  questionArtifactLocale: "en",
  questionBody: "\nQuestion\n",
  response: {
    kind: "single-choice",
    options: [
      {
        isCorrect: true,
        label: [{ kind: "text", text: "Choice 1" }],
        optionKey: "option-1",
        order: 1,
      },
      {
        isCorrect: false,
        label: [{ kind: "text", text: "Choice 2" }],
        optionKey: "option-2",
        order: 2,
      },
    ],
  },
  sourcePath: QuestionKeySchema.make(
    "question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1"
  ),
  sourceRevision: "2026-07-05",
});

describe("try-out content hash", () => {
  it("matches the durable question-pair canonical bytes", () => {
    expect(canonicalizeTryoutContent(source)).toBe(
      '{"answerArtifactLocale":"de","answerBody":"Answer\\n\\nDetail","appLocale":"de","datePublished":1741046400000,"deliveryLanguage":"en","languagePolicy":{"kind":"fixed","language":"en"},"questionArtifactLocale":"en","questionBody":"Question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":[{"kind":"text","text":"Choice 1"}],"optionKey":"option-1","order":1},{"isCorrect":false,"label":[{"kind":"text","text":"Choice 2"}],"optionKey":"option-2","order":2}]},"sourcePath":"question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1","sourceRevision":"2026-07-05"}'
    );
    expect(hashTryoutContent(source)).toBe(
      "b2b4c7e2b720b89fd7f5e578ee5214e9bdb0e273cb5311cba0f9ba02851d6464"
    );
  });

  it("binds complete blueprint, modification, and stimulus facts", () => {
    const documented = Schema.decodeSync(TryoutContentInputSchema)({
      ...source,
      blueprint: {
        cognitiveLevel: "reasoning",
        contentDomain: "algebra",
        topic: "functions",
      },
      dateModified: DateOnlySchema.make("2025-03-05"),
      stimulusKey: "shared-table",
    });

    expect(JSON.parse(canonicalizeTryoutContent(documented))).toMatchObject({
      blueprint: documented.blueprint,
      dateModified: Date.UTC(2025, 2, 5),
      stimulusKey: "shared-table",
    });
    expect(hashTryoutContent(documented)).not.toBe(hashTryoutContent(source));
  });

  it.each([
    ["answerBody", "changed answer"],
    ["datePublished", DateOnlySchema.make("2025-03-05")],
    ["answerArtifactLocale", "id"],
    ["appLocale", "id"],
    ["deliveryLanguage", "id"],
    ["questionBody", "changed question"],
    ["questionArtifactLocale", "id"],
    [
      "sourcePath",
      QuestionKeySchema.make(
        "question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-2"
      ),
    ],
    ["sourceRevision", "2026-07-06"],
  ] as const)("changes when %s changes", (field, value) => {
    expect(hashTryoutContent({ ...source, [field]: value })).not.toBe(
      hashTryoutContent(source)
    );
  });

  it("changes when response label, order, or correctness changes", () => {
    assert(source.response.kind !== "category");
    const variants = [
      {
        ...source.response,
        options: source.response.options.map((option, index) =>
          index === 0 ? { ...option, label: responseText("Changed") } : option
        ),
      },
      {
        ...source.response,
        options: source.response.options.map((option) => ({
          ...option,
          order: option.order === 1 ? 2 : 1,
        })),
      },
      {
        ...source.response,
        options: source.response.options.map((option) => ({
          ...option,
          isCorrect: !option.isCorrect,
        })),
      },
    ];
    expect(
      variants.every(
        (response) =>
          hashTryoutContent({ ...source, response }) !==
          hashTryoutContent(source)
      )
    ).toBe(true);
  });

  it("rejects modification dates that are not later than publication", () => {
    const result = Schema.decodeExit(TryoutContentInputSchema)({
      ...source,
      dateModified: source.datePublished,
    });
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected dateModified to be later than datePublished."
    );
  });

  it("rejects app, answer, delivery, and question locale drift", () => {
    const result = Schema.decodeExit(TryoutContentInputSchema)({
      ...source,
      answerArtifactLocale: "id",
    });
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected answer locale to match app locale and question locale to match delivery language."
    );
  });
});
