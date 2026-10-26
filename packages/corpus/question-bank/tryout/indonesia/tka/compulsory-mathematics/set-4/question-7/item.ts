import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{13}{20}\\text{ m/s}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{20}\\text{ m/s}$$",
        },
        {
          correct: false,
          label: "$$1\\text{ m/s}$$",
        },
        {
          correct: true,
          label: "$$\\frac{5}{4}\\text{ m/s}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{3}\\text{ m/s}$$",
        },
      ],
    },
  },
  stimulus: "freight-lift",
};

export default item;
