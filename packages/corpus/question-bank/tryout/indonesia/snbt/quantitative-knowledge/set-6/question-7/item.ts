import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{5}{3} \\text{ dan } -1$$",
        },
        {
          correct: false,
          label: "$$5 \\text{ dan } -3$$",
        },
        {
          correct: false,
          label: "$$-5 \\text{ dan } 3$$",
        },
        {
          correct: false,
          label: "$$-\\frac{5}{3} \\text{ dan } 1$$",
        },
        {
          correct: false,
          label: "$$5 \\text{ dan } -1$$",
        },
      ],
    },
  },
};

export default item;
