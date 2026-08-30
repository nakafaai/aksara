import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a night market without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a night market.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines systems thinking without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "Hana faced an obstacle while trying to understand why waste was entering the wrong stream and learned through a small accountable action.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
