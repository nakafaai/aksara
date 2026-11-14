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
          correct: false,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$\\infty$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: true,
          label: "$$-\\frac14$$",
        },
        {
          correct: false,
          label: "$$-4$$",
        },
      ],
    },
  },
};

export default item;
