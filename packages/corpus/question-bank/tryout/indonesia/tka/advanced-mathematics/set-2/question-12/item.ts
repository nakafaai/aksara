import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac32$$",
        },
        {
          correct: false,
          label: "$$\\frac38$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
        {
          correct: true,
          label: "$$\\frac32$$",
        },
        {
          correct: false,
          label: "$$-\\frac38$$",
        },
      ],
    },
  },
};

export default item;
