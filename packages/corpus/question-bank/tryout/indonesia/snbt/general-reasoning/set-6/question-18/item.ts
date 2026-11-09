import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "deductive-reasoning",
    topic: "rule-application",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "D, B, C",
        },
        {
          correct: false,
          label: "B, D, C",
        },
        {
          correct: false,
          label: "D, B, A",
        },
        {
          correct: false,
          label: "B, D, A",
        },
        {
          correct: false,
          label: "D, C, B",
        },
      ],
    },
  },
};

export default item;
