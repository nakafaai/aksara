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
          label: "$$\\frac{10}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{6}$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$-\\frac83$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
      ],
    },
  },
};

export default item;
