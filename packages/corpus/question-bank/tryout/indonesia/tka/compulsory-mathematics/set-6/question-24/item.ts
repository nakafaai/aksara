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
          label: "$$\\frac{25}{63}$$",
        },
        {
          correct: false,
          label: "$$\\frac{91}{216}$$",
        },
        {
          correct: true,
          label: "$$\\frac{13}{27}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{27}$$",
        },
      ],
    },
  },
};

export default item;
