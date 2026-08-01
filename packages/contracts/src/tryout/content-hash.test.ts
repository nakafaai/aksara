import { describe, expect, it } from "vitest";
import { DateOnlySchema } from "#contracts/date";
import { QuestionKeySchema } from "#contracts/question/identity";
import {
  canonicalizeTryoutContent,
  hashTryoutContent,
  type TryoutContentInput,
} from "#contracts/tryout/content-hash";

const source: TryoutContentInput = {
  answerBody: "\nAnswer\n\n\nDetail\n",
  choices: [
    { label: "Choice 1", value: true },
    { label: "Choice 2", value: false },
  ],
  date: DateOnlySchema.make("2025-03-04"),
  locale: "en",
  questionBody: "\nQuestion\n",
  sourcePath: QuestionKeySchema.make(
    "question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1"
  ),
  sourceRevision: "2026-07-05",
  title: "Question 1",
};

describe("try-out content hash", () => {
  it("matches the durable question-pair canonical bytes", () => {
    expect(canonicalizeTryoutContent(source)).toBe(
      '{"answerBody":"Answer\\n\\nDetail","choices":[{"label":"Choice 1","value":true},{"label":"Choice 2","value":false}],"date":1741046400000,"locale":"en","questionBody":"Question","sourcePath":"question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1","sourceRevision":"2026-07-05","title":"Question 1"}'
    );
    expect(hashTryoutContent(source)).toBe(
      "5a0cf65c749e6709dd5d804b586ec890f7bee0223e5a17cf993de35708625e05"
    );
  });

  it.each([
    ["answerBody", "changed answer"],
    ["date", DateOnlySchema.make("2025-03-05")],
    ["locale", "id"],
    ["questionBody", "changed question"],
    [
      "sourcePath",
      QuestionKeySchema.make(
        "question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-2"
      ),
    ],
    ["sourceRevision", "2026-07-06"],
    ["title", "Changed title"],
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
});
