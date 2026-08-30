import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Absolute certainty about enzyme activity in a classroom model",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in enzyme activity in a classroom model should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of enzyme",
        },
        {
          isCorrect: true,
          label:
            "Testing holding the mixture at 37 degrees Celsius in enzyme activity in a classroom model",
        },
        {
          isCorrect: false,
          label: "One rule for every enzyme activity in a classroom model",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
