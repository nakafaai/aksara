import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a community repair café",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a community repair café should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of product-life extension",
        },
        {
          isCorrect: false,
          label: "One rule for every a community repair café",
        },
        {
          isCorrect: true,
          label: "Evidence-informed change in a community repair café",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
