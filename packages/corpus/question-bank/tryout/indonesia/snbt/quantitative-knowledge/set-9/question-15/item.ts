import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x > y$$",
        },
        {
          correct: false,
          label: "$$x = y$$",
        },
        {
          correct: true,
          label: "$$x < y$$",
        },
        {
          correct: false,
          label: "$$2x = y$$",
        },
        {
          correct: false,
          label: "$$x = 4y$$",
        },
      ],
    },
  },
};

export default item;
