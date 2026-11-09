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
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: true,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$100$$",
        },
        {
          correct: false,
          label: "$$160$$",
        },
      ],
    },
  },
};

export default item;
