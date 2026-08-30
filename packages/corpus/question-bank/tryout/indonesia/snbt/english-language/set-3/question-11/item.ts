import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Leah faced an obstacle while trying to finish a family-history audio project and learned through a small accountable action.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of the school media room without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every the school media room.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines self-efficacy without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
