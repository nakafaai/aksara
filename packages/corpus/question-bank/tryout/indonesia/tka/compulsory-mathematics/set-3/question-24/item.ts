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
          correct: true,
          label: "$$\\frac{1}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{9}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{15}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{5}$$",
        },
      ],
    },
  },
};

export default item;
