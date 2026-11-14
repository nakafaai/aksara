import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "polynomials",
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
          correct: false,
          label: "$$-4$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$4$$",
        },
      ],
    },
  },
};

export default item;
