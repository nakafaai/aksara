import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{15}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{7}$$",
        },
        {
          correct: true,
          label: "$$-3$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{2}$$",
        },
        {
          correct: false,
          label: "$$-2$$",
        },
      ],
    },
  },
};

export default item;
