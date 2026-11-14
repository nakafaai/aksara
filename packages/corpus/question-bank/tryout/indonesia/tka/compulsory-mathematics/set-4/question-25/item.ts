import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{13}{32}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{16}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{8}$$",
        },
        {
          correct: false,
          label: "$$\\frac{47}{72}$$",
        },
      ],
    },
  },
};

export default item;
