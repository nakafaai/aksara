import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "scale-rate",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pukul 08.27",
        },
        {
          correct: false,
          label: "pukul 08.35",
        },
        {
          correct: true,
          label: "pukul 08.42",
        },
        {
          correct: false,
          label: "pukul 08.50",
        },
        {
          correct: false,
          label: "pukul 08.57",
        },
      ],
    },
  },
};

export default item;
