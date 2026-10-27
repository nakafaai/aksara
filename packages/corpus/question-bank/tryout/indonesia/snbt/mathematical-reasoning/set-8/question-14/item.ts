import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{9\\sqrt{5}}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7\\sqrt{5}}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{8\\sqrt{5}}{5}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{11\\sqrt{5}}{5}$$",
        },
      ],
    },
  },
};

export default item;
