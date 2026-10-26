import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{6}{55}$$",
        },
        {
          correct: false,
          label: "$$\\frac{6}{25}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{11}$$",
        },
      ],
    },
  },
  stimulus: "club-choices",
};

export default item;
