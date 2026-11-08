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
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac32$$",
        },
        {
          correct: true,
          label: "$$\\frac52$$",
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
