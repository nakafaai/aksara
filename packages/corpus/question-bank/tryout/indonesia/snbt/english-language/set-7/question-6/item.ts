import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a neighbourhood flood-warning exercise without examining evidence or choice.",
        },
        {
          isCorrect: true,
          label:
            "The organisers of a neighbourhood flood-warning exercise evaluated an alert that named the street, expected depth, and safe route through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a neighbourhood flood-warning exercise.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines actionable information without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
