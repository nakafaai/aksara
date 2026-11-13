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
          label: "$$\\frac{8}{21}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{7}$$",
        },
        {
          correct: true,
          label: "$$\\frac{13}{21}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{41}{42}$$",
        },
      ],
    },
  },
};

export default item;
