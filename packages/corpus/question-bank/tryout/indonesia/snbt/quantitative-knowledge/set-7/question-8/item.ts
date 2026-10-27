import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$450$$",
        },
        {
          correct: false,
          label: "$$900$$",
        },
        {
          correct: false,
          label: "$$600$$",
        },
        {
          correct: false,
          label: "$$300$$",
        },
        {
          correct: false,
          label: "$$150$$",
        },
      ],
    },
  },
};

export default item;
