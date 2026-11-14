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
          label: "$$\\frac{56}{81}$$",
        },
        {
          correct: false,
          label: "$$\\frac{28}{45}$$",
        },
        {
          correct: false,
          label: "$$\\frac{63}{125}$$",
        },
        {
          correct: false,
          label: "$$\\frac{112}{243}$$",
        },
        {
          correct: false,
          label: "$$\\frac{25}{81}$$",
        },
      ],
    },
  },
};

export default item;
