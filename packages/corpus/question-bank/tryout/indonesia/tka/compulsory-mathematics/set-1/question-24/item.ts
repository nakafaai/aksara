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
          label: "$$\\frac{29}{90}$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{45}$$",
        },
        {
          correct: false,
          label: "$$\\frac16$$",
        },
        {
          correct: false,
          label: "$$\\frac{11}{45}$$",
        },
        {
          correct: false,
          label: "$$\\frac{37}{90}$$",
        },
      ],
    },
  },
};

export default item;
