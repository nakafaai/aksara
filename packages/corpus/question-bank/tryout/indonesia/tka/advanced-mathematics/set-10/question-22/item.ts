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
          label: "$$\\frac23$$",
        },
        {
          correct: false,
          label: "$$\\frac34$$",
        },
        {
          correct: true,
          label: "$$\\frac43$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$\\frac83$$",
        },
      ],
    },
  },
};

export default item;
