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
          correct: true,
          label: "$$\\frac{8}{27}$$",
        },
        {
          correct: false,
          label: "$$\\frac{16}{81}$$",
        },
        {
          correct: false,
          label: "$$\\frac{25}{81}$$",
        },
        {
          correct: false,
          label: "$$\\frac{27}{125}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{15}$$",
        },
      ],
    },
  },
};

export default item;
