import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1 : 3$$",
        },
        {
          correct: false,
          label: "$$1 : 4$$",
        },
        {
          correct: false,
          label: "$$1 : 8$$",
        },
        {
          correct: true,
          label: "$$1 : 9$$",
        },
        {
          correct: false,
          label: "$$2 : 3$$",
        },
      ],
    },
  },
};

export default item;
