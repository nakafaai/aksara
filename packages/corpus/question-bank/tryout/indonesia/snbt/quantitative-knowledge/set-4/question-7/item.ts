import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1, 2, 3$$",
        },
        {
          correct: false,
          label: "$$1 \\text{ dan } 3$$",
        },
        {
          correct: false,
          label: "$$2 \\text{ dan } 4$$",
        },
        {
          correct: false,
          label: "$$4 \\text{ saja}$$",
        },
        {
          correct: false,
          label: "semua",
        },
      ],
    },
  },
};

export default item;
