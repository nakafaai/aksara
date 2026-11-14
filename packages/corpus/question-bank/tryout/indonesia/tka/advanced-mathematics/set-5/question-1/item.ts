import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-\\frac43$$",
        },
        {
          correct: false,
          label: "$$\\frac83$$",
        },
        {
          correct: false,
          label: "$$-24$$",
        },
        {
          correct: false,
          label: "$$-\\frac23$$",
        },
        {
          correct: true,
          label: "$$-\\frac83$$",
        },
      ],
    },
  },
};

export default item;
