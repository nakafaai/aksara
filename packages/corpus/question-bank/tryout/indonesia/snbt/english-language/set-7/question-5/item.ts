import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Absolute certainty about leaf growth under different light colours",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in leaf growth under different light colours should be ignored",
        },
        {
          isCorrect: true,
          label:
            "Testing using a blue light filter in leaf growth under different light colours",
        },
        {
          isCorrect: false,
          label: "The complete world history of confounding variable",
        },
        {
          isCorrect: false,
          label: "One rule for every leaf growth under different light colours",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
