import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "relative-motion",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pukul 08.48",
        },
        {
          correct: false,
          label: "pukul 09.00",
        },
        {
          correct: false,
          label: "pukul 09.06",
        },
        {
          correct: false,
          label: "pukul 09.12",
        },
        {
          correct: true,
          label: "pukul 09.18",
        },
      ],
    },
  },
};

export default item;
