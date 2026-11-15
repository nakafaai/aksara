import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-3\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt5$$ oder $$-3\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$\\sqrt5$$",
        },
        {
          correct: true,
          label: "$$3\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt7$$",
        },
      ],
    },
  },
};

export default item;
