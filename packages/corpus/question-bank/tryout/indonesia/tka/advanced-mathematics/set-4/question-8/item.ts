import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: true,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
      ],
    },
  },
};

export default item;
