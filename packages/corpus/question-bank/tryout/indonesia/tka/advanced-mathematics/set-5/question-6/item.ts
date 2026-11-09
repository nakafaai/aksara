import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "polynomials",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4x+3$$",
        },
        {
          correct: true,
          label: "$$4x-1$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$4x+11$$",
        },
        {
          correct: false,
          label: "$$3x+4$$",
        },
      ],
    },
  },
};

export default item;
