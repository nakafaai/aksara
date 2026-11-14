import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\pi$$ cm",
        },
        {
          correct: false,
          label: "$$\\frac{77}{6}\\pi$$ cm",
        },
        {
          correct: true,
          label: "$$14\\pi$$ cm",
        },
        {
          correct: false,
          label: "$$26\\pi$$ cm",
        },
        {
          correct: false,
          label: "$$28\\pi$$ cm",
        },
      ],
    },
  },
};

export default item;
