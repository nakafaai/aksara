import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "calendar-cycle",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Laras",
        },
        {
          correct: false,
          label: "Made",
        },
        {
          correct: false,
          label: "Nina",
        },
        {
          correct: false,
          label: "Oka",
        },
        {
          correct: true,
          label: "Putri",
        },
      ],
    },
  },
};

export default item;
