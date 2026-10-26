import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$75\\frac13$$",
        },
        {
          correct: false,
          label: "$$74$$",
        },
        {
          correct: false,
          label: "$$75$$",
        },
        {
          correct: false,
          label: "$$76$$",
        },
        {
          correct: false,
          label: "$$76\\frac23$$",
        },
      ],
    },
  },
};

export default item;
