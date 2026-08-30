import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a community sports centre without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a community sports centre.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines co-design without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "Omar faced an obstacle while trying to review an accessibility map and learned through a small accountable action.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
