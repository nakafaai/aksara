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
          isCorrect: false,
          label:
            "The prints are sealed under fruit covers; white lights dry the paper while price cards hold it flat.",
        },
        {
          isCorrect: false,
          label:
            "The prints bridge the stone channels; yellow edges protect them from customers' wet shoes.",
        },
        {
          isCorrect: false,
          label:
            "The prints surround the blue drain circle; nearby chairs stop water from reaching them.",
        },
        {
          isCorrect: false,
          label:
            "The prints hang in the cooking row; steam softens them while warm lamps prevent wind damage.",
        },
        {
          isCorrect: true,
          label:
            "The prints are placed on vertical racks beneath deep awnings; a wall gap limits trapped dampness and clips resist wind.",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
