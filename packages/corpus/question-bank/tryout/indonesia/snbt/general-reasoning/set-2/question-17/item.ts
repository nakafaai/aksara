import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "loker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ana",
        },
        {
          correct: false,
          label: "Beni",
        },
        {
          correct: false,
          label: "Caca",
        },
        {
          correct: false,
          label: "Doni",
        },
        {
          correct: true,
          label: "Eli",
        },
      ],
    },
  },
};

export default item;
