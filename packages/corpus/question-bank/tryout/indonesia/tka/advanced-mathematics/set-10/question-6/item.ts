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
          label: "$$x^3-x^2-4x+4=0$$",
        },
        {
          correct: false,
          label: "$$x^3-4x^2+x+7=0$$",
        },
        {
          correct: false,
          label: "$$x^3+7x^2+12x=0$$",
        },
        {
          correct: true,
          label: "$$x^3-7x^2+12x=0$$",
        },
        {
          correct: false,
          label: "$$x^3-7x^2+12x+6=0$$",
        },
      ],
    },
  },
};

export default item;
