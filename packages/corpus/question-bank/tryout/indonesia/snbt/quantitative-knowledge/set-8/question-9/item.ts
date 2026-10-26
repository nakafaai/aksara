import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$m < -2 \\lor m > 6$$",
        },
        {
          correct: false,
          label: "$$m > 6$$",
        },
        {
          correct: false,
          label: "$$-2 < m < 6$$",
        },
        {
          correct: false,
          label: "$$-6 < m < 2$$",
        },
        {
          correct: false,
          label: "$$m \\leq -2 \\lor m \\geq 6$$",
        },
      ],
    },
  },
};

export default item;
