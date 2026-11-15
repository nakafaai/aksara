import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{13}$$",
        },
        {
          correct: true,
          label: "$$\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt2$$",
        },
      ],
    },
  },
};

export default item;
