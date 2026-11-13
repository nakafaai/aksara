import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{22}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{11}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$3+\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$36$$",
        },
        {
          correct: true,
          label: "$$6$$",
        },
      ],
    },
  },
};

export default item;
