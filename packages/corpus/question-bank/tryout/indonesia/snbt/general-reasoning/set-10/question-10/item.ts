import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "time-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pukul 16.36",
        },
        {
          correct: true,
          label: "pukul 17.12",
        },
        {
          correct: false,
          label: "pukul 17.24",
        },
        {
          correct: false,
          label: "pukul 17.48",
        },
        {
          correct: false,
          label: "pukul 18.00",
        },
      ],
    },
  },
};

export default item;
