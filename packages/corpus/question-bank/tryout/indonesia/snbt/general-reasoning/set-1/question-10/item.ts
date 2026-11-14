import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "TW",
        },
        {
          correct: false,
          label: "YD",
        },
        {
          correct: false,
          label: "OD",
        },
        {
          correct: false,
          label: "DW",
        },
        {
          correct: true,
          label: "DD",
        },
      ],
    },
  },
};

export default item;
