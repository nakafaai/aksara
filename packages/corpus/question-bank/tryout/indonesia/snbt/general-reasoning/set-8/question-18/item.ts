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
          correct: false,
          label: "A, C, D",
        },
        {
          correct: false,
          label: "C, D, A",
        },
        {
          correct: false,
          label: "A, D, C",
        },
        {
          correct: false,
          label: "D, C, A",
        },
        {
          correct: true,
          label: "C, A, D",
        },
      ],
    },
  },
};

export default item;
