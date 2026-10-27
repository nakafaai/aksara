import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt2$$",
        },
        {
          correct: true,
          label: "$$4\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
      ],
    },
  },
};

export default item;
