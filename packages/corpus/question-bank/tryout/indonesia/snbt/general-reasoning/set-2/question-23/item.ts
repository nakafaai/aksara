import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$23$$",
        },
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$43$$",
        },
        {
          correct: true,
          label: "$$33$$",
        },
        {
          correct: false,
          label: "$$53$$",
        },
      ],
    },
  },
};

export default item;
