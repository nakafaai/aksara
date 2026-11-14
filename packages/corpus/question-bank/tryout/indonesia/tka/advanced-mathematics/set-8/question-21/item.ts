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
          correct: false,
          label: "$$5$$",
        },
        {
          correct: true,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$\\infty$$",
        },
        {
          correct: false,
          label: "$$-\\frac23$$",
        },
        {
          correct: false,
          label: "$$\\frac15$$",
        },
      ],
    },
  },
};

export default item;
