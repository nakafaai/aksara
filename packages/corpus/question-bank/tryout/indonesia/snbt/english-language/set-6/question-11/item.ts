import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a small public archive without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a small public archive.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: true,
          label:
            "Theo faced an obstacle while trying to catalogue a box of community photographs and learned through a small accountable action.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines metadata without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
