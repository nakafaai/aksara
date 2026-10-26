import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$\\frac54$$",
        },
        {
          correct: false,
          label: "$$\\frac94$$",
        },
        {
          correct: true,
          label: "$$\\frac{25}{16}$$",
        },
        {
          correct: false,
          label: "$$\\frac{25}{8}$$",
        },
      ],
    },
  },
};

export default item;
