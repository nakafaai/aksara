import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-1$$",
        },
        {
          correct: false,
          label: "$$7$$ oder $$-1$$",
        },
        {
          correct: false,
          label: "$$77$$",
        },
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{77}$$",
        },
        {
          correct: false,
          label: "$$3+\\sqrt{12}$$",
        },
      ],
    },
  },
};

export default item;
