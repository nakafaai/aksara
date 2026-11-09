import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Fikri",
        },
        {
          correct: false,
          label: "Gita",
        },
        {
          correct: true,
          label: "Hasan",
        },
        {
          correct: false,
          label: "Indah",
        },
        {
          correct: false,
          label: "Joni",
        },
      ],
    },
  },
};

export default item;
