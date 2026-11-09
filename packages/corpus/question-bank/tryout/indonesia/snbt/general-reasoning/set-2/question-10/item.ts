import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "YE",
        },
        {
          correct: false,
          label: "YF",
        },
        {
          correct: false,
          label: "ZD",
        },
        {
          correct: true,
          label: "ZE",
        },
        {
          correct: false,
          label: "ZF",
        },
      ],
    },
  },
};

export default item;
