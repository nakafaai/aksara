import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "tabung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1-\\frac{\\pi}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: true,
          label: "$$1-\\frac{\\pi}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{\\pi}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{3}-\\frac{\\pi}{4}$$",
        },
      ],
    },
  },
};

export default item;
