import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "calculus",
    topic: "limits",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{1}{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
      ],
    },
  },
};

export default item;
