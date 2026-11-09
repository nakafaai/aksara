import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "operation-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$43$$",
        },
        {
          correct: false,
          label: "$$67$$",
        },
        {
          correct: true,
          label: "$$73$$",
        },
        {
          correct: false,
          label: "$$91$$",
        },
      ],
    },
  },
};

export default item;
