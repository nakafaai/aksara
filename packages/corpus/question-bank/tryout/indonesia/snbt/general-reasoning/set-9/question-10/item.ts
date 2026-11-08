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
          label: "08.20",
        },
        {
          correct: false,
          label: "08.30",
        },
        {
          correct: false,
          label: "08.35",
        },
        {
          correct: true,
          label: "08.40",
        },
        {
          correct: false,
          label: "08.50",
        },
      ],
    },
  },
};

export default item;
