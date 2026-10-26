import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14 \\text{ dan } 2$$",
        },
        {
          correct: true,
          label: "$$4 \\text{ dan } 2$$",
        },
        {
          correct: false,
          label: "$$12 \\text{ dan } 2$$",
        },
        {
          correct: false,
          label: "$$8 \\text{ dan } 2$$",
        },
        {
          correct: false,
          label: "$$2 \\text{ dan } 2$$",
        },
      ],
    },
  },
};

export default item;
