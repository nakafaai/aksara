import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of an event-planning meeting without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every an event-planning meeting.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines contingency without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "Caleb faced an obstacle while trying to build a budget for a youth concert and learned through a small accountable action.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
