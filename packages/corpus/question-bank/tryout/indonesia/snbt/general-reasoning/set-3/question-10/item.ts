import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "symbol-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "MBNQV",
        },
        {
          correct: false,
          label: "KYJLP",
        },
        {
          correct: false,
          label: "MCPTY",
        },
        {
          correct: false,
          label: "NDQUA",
        },
        {
          correct: true,
          label: "MCPTZ",
        },
      ],
    },
  },
};

export default item;
