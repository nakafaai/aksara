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
          correct: true,
          label: "$$-2$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;
