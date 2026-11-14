import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{29}{38}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{6}$$",
        },
        {
          correct: true,
          label: "$$\\frac{16}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac{169}{190}$$",
        },
        {
          correct: false,
          label: "$$\\frac{86}{95}$$",
        },
      ],
    },
  },
};

export default item;
