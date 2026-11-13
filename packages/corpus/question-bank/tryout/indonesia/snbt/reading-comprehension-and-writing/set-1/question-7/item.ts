import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "sentence-order",
  },
  stimulus: "antrean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(6), (9), (8), (5), (7)",
        },
        {
          correct: false,
          label: "(6), (8), (5), (9), (7)",
        },
        {
          correct: false,
          label: "(8), (6), (9), (5), (7)",
        },
        {
          correct: false,
          label: "(6), (8), (9), (7), (5)",
        },
        {
          correct: true,
          label: "(6), (8), (9), (5), (7)",
        },
      ],
    },
  },
};

export default item;
