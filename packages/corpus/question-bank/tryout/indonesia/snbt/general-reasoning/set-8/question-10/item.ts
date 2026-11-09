import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-number-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "26Z",
        },
        {
          correct: false,
          label: "25Y",
        },
        {
          correct: false,
          label: "26Y",
        },
        {
          correct: false,
          label: "24X",
        },
        {
          correct: false,
          label: "27Z",
        },
      ],
    },
  },
};

export default item;
