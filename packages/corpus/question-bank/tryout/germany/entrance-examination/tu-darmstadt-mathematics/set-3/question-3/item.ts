import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$10^2$$",
        },
        {
          correct: false,
          label: "$$10^3$$",
        },
        {
          correct: true,
          label: "$$10^4$$",
        },
        {
          correct: false,
          label: "$$10^5$$",
        },
        {
          correct: false,
          label: "$$10^6$$",
        },
      ],
    },
  },
};

export default item;
