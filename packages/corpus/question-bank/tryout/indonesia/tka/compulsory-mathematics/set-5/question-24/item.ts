import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{8}{21}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{18}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{12}$$",
        },
      ],
    },
  },
};

export default item;
