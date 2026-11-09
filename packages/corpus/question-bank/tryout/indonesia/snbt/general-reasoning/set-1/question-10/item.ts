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
          label: "RPITA",
        },
        {
          correct: false,
          label: "POTER",
        },
        {
          correct: false,
          label: "OTERP",
        },
        {
          correct: true,
          label: "RPOTE",
        },
        {
          correct: false,
          label: "RPETU",
        },
      ],
    },
  },
};

export default item;
