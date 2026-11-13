import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt3$$",
        },
        {
          correct: true,
          label: "$$2\\sqrt6-2\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$6-2\\sqrt6$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt6$$",
        },
        {
          correct: false,
          label: "$$6-2\\sqrt3$$",
        },
      ],
    },
  },
};

export default item;
