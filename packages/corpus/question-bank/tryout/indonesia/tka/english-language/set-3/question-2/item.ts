import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "rain-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The prints are sealed under fruit covers. White lights dry the paper while price cards hold it flat.",
        },
        {
          correct: false,
          label:
            "The prints bridge the stone channels. Yellow edges protect them from customers' wet shoes.",
        },
        {
          correct: false,
          label:
            "The prints surround the blue drain circle. Nearby chairs stop water from reaching them.",
        },
        {
          correct: false,
          label:
            "The prints hang in the cooking row. Steam softens them while warm lamps prevent wind damage.",
        },
        {
          correct: true,
          label:
            "The prints are placed on vertical racks beneath deep awnings. A wall gap limits trapped dampness and clips resist wind.",
        },
      ],
    },
  },
};

export default item;
