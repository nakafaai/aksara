import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "coding-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ku, ne, dan ri",
        },
        {
          correct: false,
          label: "ta, wa, dan ri",
        },
        {
          correct: true,
          label: "ku, wa, dan ri",
        },
        {
          correct: false,
          label: "ku, wa, dan bi",
        },
        {
          correct: false,
          label: "lo, wa, dan ri",
        },
      ],
    },
  },
};

export default item;
