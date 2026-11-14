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
          label: "○ ○ ○ ○ ○ ○ ●",
        },
        {
          correct: false,
          label: "○ ○ ● ● ○ ○ ○",
        },
        {
          correct: false,
          label: "○ ○ ○ ○ ○ ● ●",
        },
        {
          correct: true,
          label: "● ○ ○ ○ ○ ○ ●",
        },
        {
          correct: false,
          label: "○ ● ● ● ○ ○ ○",
        },
      ],
    },
  },
};

export default item;
