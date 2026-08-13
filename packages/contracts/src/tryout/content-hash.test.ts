import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { DateOnlySchema } from "#contracts/date";
import { QuestionKeySchema } from "#contracts/question/identity";
import {
  canonicalizeTryoutContent,
  hashTryoutContent,
  TryoutContentInputSchema,
} from "#contracts/tryout/content-hash";

const source = Schema.decodeUnknownSync(TryoutContentInputSchema)({
  answerArtifactLocale: "de",
  answerBody: "\nAnswer\n\n\nDetail\n",
  appLocale: "de",
  choices: [
    { label: "Choice 1", value: true },
    { label: "Choice 2", value: false },
  ],
  date: DateOnlySchema.make("2025-03-04"),
  deliveryLanguage: "en",
  questionArtifactLocale: "en",
  questionBody: "\nQuestion\n",
  sourcePath: QuestionKeySchema.make(
    "question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1"
  ),
  sourceRevision: "2026-07-05",
});

describe("try-out content hash", () => {
  it("matches the durable question-pair canonical bytes", () => {
    expect(canonicalizeTryoutContent(source)).toBe(
      '{"answerArtifactLocale":"de","answerBody":"Answer\\n\\nDetail","appLocale":"de","choices":[{"label":"Choice 1","value":true},{"label":"Choice 2","value":false}],"date":1741046400000,"deliveryLanguage":"en","questionArtifactLocale":"en","questionBody":"Question","sourcePath":"question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1","sourceRevision":"2026-07-05"}'
    );
    expect(hashTryoutContent(source)).toBe(
      "89ea75fa90865dc3a86269000c2d297981b56624a659b960fd298d11e136b5e6"
    );
  });

  it.each([
    ["answerBody", "changed answer"],
    ["date", DateOnlySchema.make("2025-03-05")],
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

  it("changes when choice label, order, or correctness changes", () => {
    const variants = [
      [
        { label: "Changed", value: true },
        { label: "Choice 2", value: false },
      ],
      [...source.choices].reverse(),
      [
        { label: "Choice 1", value: false },
        { label: "Choice 2", value: true },
      ],
    ];
    expect(
      variants.every(
        (choices) =>
          hashTryoutContent({ ...source, choices }) !==
          hashTryoutContent(source)
      )
    ).toBe(true);
  });

  it("rejects app, answer, delivery, and question locale drift", () => {
    const result = Schema.decodeUnknownEither(TryoutContentInputSchema)({
      ...source,
      answerArtifactLocale: "id",
    });
    expect(Either.isLeft(result) ? String(result.left) : "").toContain(
      "Expected answer locale to match app locale and question locale to match delivery language."
    );
  });
});
