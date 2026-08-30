import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a residents' workshop without examining evidence or choice.",
        },
        {
          isCorrect: true,
          label:
            "Priya faced an obstacle while trying to prepare a flood-safety message and learned through a small accountable action.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a residents' workshop.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines cognitive load without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
