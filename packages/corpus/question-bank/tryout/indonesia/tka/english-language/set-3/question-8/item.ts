import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To preserve the photograph and the visitor's memory as separate claims, while treating the visitor's approximate year as final.",
        },
        {
          isCorrect: false,
          label:
            "To merge the photograph and the visitor's memory into one confident claim before either source could be checked.",
        },
        {
          isCorrect: true,
          label:
            "To preserve which claim came from the photograph and which came from a person's memory, while leaving both open to later review.",
        },
        {
          isCorrect: false,
          label:
            "To postpone recording both sources until every person and date in the photograph had been identified with certainty.",
        },
        {
          isCorrect: false,
          label:
            "To preserve both claims for review, while giving the approximate memory greater weight than the dated photograph.",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
