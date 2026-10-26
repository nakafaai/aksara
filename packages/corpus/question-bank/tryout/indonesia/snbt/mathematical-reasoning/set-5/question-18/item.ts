import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2:3$$",
        },
        {
          correct: true,
          label: "$$3:4$$",
        },
        {
          correct: false,
          label: "$$4:5$$",
        },
        {
          correct: false,
          label: "$$2:5$$",
        },
        {
          correct: false,
          label: "$$1:2$$",
        },
      ],
    },
  },
};

export default item;
