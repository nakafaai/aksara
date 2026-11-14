import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{25}{6}$$",
        },
        {
          correct: true,
          label: "$$\\frac{50}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{100}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{625}{16}$$",
        },
        {
          correct: false,
          label: "$$\\frac{25}{3}$$",
        },
      ],
    },
  },
};

export default item;
