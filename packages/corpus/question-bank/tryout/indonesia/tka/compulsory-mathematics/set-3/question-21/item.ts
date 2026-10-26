import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac25$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: true,
          label: "$$\\frac13$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
      ],
    },
  },
};

export default item;
