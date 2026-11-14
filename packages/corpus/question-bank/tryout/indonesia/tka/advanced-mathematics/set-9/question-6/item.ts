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
          label: "$$3x-1$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$x^2+5x$$",
        },
        {
          correct: false,
          label: "$$-x^2+5x-2$$",
        },
        {
          correct: true,
          label: "$$x^2+x$$",
        },
      ],
    },
  },
};

export default item;
