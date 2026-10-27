import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$70^\\circ$$",
        },
        {
          correct: false,
          label: "$$45^\\circ$$",
        },
        {
          correct: false,
          label: "$$65^\\circ$$",
        },
        {
          correct: false,
          label: "$$75^\\circ$$",
        },
        {
          correct: false,
          label: "$$80^\\circ$$",
        },
      ],
    },
  },
};

export default item;
