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
          correct: false,
          label: "$$\\frac{1}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{11}{45}$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{4}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{15}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{8}$$",
        },
      ],
    },
  },
};

export default item;
