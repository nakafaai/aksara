import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "bazar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "4",
        },
        {
          correct: true,
          label: "5",
        },
        {
          correct: false,
          label: "6",
        },
        {
          correct: false,
          label: "7",
        },
        {
          correct: false,
          label: "8",
        },
      ],
    },
  },
};

export default item;
