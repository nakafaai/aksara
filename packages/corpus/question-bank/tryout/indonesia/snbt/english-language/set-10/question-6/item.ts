import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a youth event-planning group without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a youth event-planning group.",
        },
        {
          isCorrect: true,
          label:
            "The organisers of a youth event-planning group evaluated a budget sheet that separated fixed, flexible, and shared costs through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines fixed cost without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
