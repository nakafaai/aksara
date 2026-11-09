import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "work-rate",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "pukul 07.28",
        },
        {
          correct: false,
          label: "pukul 07.24",
        },
        {
          correct: false,
          label: "pukul 07.30",
        },
        {
          correct: false,
          label: "pukul 07.34",
        },
        {
          correct: false,
          label: "pukul 07.40",
        },
      ],
    },
  },
};

export default item;
