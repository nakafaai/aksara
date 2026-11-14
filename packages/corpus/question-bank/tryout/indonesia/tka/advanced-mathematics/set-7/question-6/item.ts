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
          label: "$$17$$",
        },
        {
          correct: true,
          label: "$$21$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
      ],
    },
  },
};

export default item;
