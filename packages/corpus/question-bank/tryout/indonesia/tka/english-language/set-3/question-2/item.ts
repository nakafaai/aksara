import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "On vertical racks beneath awnings",
        },
        {
          isCorrect: false,
          label: "Inside soup pots",
        },
        {
          isCorrect: false,
          label: "Across the stone channels",
        },
        {
          isCorrect: false,
          label: "Within the blue drain circle",
        },
        {
          isCorrect: false,
          label: "Under the fruit covers",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
