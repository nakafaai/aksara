import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{2}{15}$$",
        },
        {
          correct: true,
          label: "$$\\frac{\\sqrt{221}}{15}$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\sqrt5}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\sqrt{229}}{15}$$",
        },
      ],
    },
  },
};

export default item;
