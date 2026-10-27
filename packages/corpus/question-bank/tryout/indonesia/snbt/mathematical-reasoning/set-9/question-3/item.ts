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
          correct: false,
          label: "$$2:1$$",
        },
        {
          correct: true,
          label: "$$3:2$$",
        },
        {
          correct: false,
          label: "$$5:3$$",
        },
        {
          correct: false,
          label: "$$2:3$$",
        },
      ],
    },
  },
};

export default item;
