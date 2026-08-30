import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Absolute certainty about a neighbourhood flood-warning exercise",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a neighbourhood flood-warning exercise should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of actionable information",
        },
        {
          isCorrect: true,
          label:
            "Evidence-informed change in a neighbourhood flood-warning exercise",
        },
        {
          isCorrect: false,
          label: "One rule for every a neighbourhood flood-warning exercise",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
