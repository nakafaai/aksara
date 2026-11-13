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
          label: "$$\\frac{7}{15}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{30}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{36}$$",
        },
      ],
    },
  },
};

export default item;
