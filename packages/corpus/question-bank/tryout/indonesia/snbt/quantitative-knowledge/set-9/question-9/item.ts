import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-\\infty,5]$$",
        },
        {
          correct: false,
          label: "$$(2,5]$$",
        },
        {
          correct: false,
          label: "$$(-\\infty,-3)\\cup(2,5)$$",
        },
        {
          correct: false,
          label: "$$(-\\infty,-3)\\cup[2,5]$$",
        },
        {
          correct: true,
          label: "$$(-\\infty,-3)\\cup(2,5]$$",
        },
      ],
    },
  },
};

export default item;
