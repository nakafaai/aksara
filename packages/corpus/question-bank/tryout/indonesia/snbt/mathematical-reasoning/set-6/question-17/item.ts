import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2 : 3$$",
        },
        {
          correct: false,
          label: "$$3 : 4$$",
        },
        {
          correct: false,
          label: "$$2 : 5$$",
        },
        {
          correct: false,
          label: "$$3 : 5$$",
        },
        {
          correct: false,
          label: "$$4 : 5$$",
        },
      ],
    },
  },
};

export default item;
