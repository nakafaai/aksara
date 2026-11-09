import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "figure-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "72 cm",
        },
        {
          correct: false,
          label: "76 cm",
        },
        {
          correct: false,
          label: "80 cm",
        },
        {
          correct: false,
          label: "82 cm",
        },
        {
          correct: true,
          label: "84 cm",
        },
      ],
    },
  },
};

export default item;
