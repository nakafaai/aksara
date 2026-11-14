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
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$-2$$",
        },
      ],
    },
  },
};

export default item;
