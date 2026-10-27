import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0 < m < \\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$m < 0 \\lor m > \\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$-\\frac{1}{2} < m < \\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$0 \\leq m < \\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$m < -\\frac{1}{2} \\lor m > 0$$",
        },
      ],
    },
  },
};

export default item;
