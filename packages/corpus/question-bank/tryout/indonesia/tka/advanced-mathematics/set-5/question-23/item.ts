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
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: true,
          label: "$$-\\frac12$$",
        },
        {
          correct: false,
          label: "$$-\\infty$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
      ],
    },
  },
};

export default item;
