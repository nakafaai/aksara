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
          label: "$$\\frac{5}{36}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{36}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{21}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{18}$$",
        },
      ],
    },
  },
};

export default item;
