import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac95$$",
        },
        {
          correct: true,
          label: "$$-3$$",
        },
        {
          correct: false,
          label: "$$-\\frac78$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$-\\frac34$$",
        },
      ],
    },
  },
};

export default item;
