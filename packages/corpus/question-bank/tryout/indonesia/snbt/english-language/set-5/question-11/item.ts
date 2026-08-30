import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mina faced an obstacle while trying to lead a science-fair team without deciding everything alone and learned through a small accountable action.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of an after-school laboratory without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every an after-school laboratory.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines psychological safety without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
