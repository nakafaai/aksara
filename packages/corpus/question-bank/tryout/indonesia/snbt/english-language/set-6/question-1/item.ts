import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of enzyme activity in a classroom model without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every enzyme activity in a classroom model.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: true,
          label:
            "The class tested holding the mixture at 37 degrees Celsius in enzyme activity in a classroom model while controlling other factors and reporting a limitation.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines enzyme without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
