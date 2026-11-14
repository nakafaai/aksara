import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "calculus",
    topic: "limits",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$-\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$-1$$",
        },
        {
          correct: false,
          label: "$$\\infty$$",
        },
      ],
    },
  },
};

export default item;
