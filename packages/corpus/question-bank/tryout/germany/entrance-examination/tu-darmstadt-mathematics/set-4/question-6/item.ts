import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a=-2$$ oder $$a=2$$",
        },
        {
          correct: false,
          label: "$$a=\\frac{13}{6}$$",
        },
        {
          correct: false,
          label: "$$a=2$$ oder $$a=\\frac{13}{6}$$",
        },
        {
          correct: true,
          label: "$$a=2$$",
        },
        {
          correct: false,
          label: "$$a=-2$$",
        },
        {
          correct: false,
          label: "$$a=2\\sqrt2$$",
        },
      ],
    },
  },
};

export default item;
