import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1:1$$",
        },
        {
          correct: true,
          label: "$$7:1$$",
        },
        {
          correct: false,
          label: "$$2:1$$",
        },
        {
          correct: false,
          label: "$$5:1$$",
        },
        {
          correct: false,
          label: "$$8:1$$",
        },
      ],
    },
  },
};

export default item;
