import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-number-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "N28",
        },
        {
          correct: false,
          label: "O28",
        },
        {
          correct: false,
          label: "P30",
        },
        {
          correct: false,
          label: "M30",
        },
        {
          correct: true,
          label: "O30",
        },
      ],
    },
  },
};

export default item;
