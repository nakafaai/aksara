import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3\\frac{1}{2} \\text{ m}$$",
        },
        {
          correct: true,
          label: "$$2\\frac{1}{2} \\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4\\frac{1}{2} \\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2\\frac{1}{3} \\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3\\frac{1}{3} \\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
