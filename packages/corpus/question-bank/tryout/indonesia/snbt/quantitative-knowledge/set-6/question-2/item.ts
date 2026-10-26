import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80\\%$$",
        },
        {
          correct: false,
          label: "$$40\\%$$",
        },
        {
          correct: false,
          label: "$$25\\%$$",
        },
        {
          correct: true,
          label: "$$33\\frac{1}{3}\\%$$",
        },
        {
          correct: false,
          label: "$$20\\%$$",
        },
      ],
    },
  },
};

export default item;
