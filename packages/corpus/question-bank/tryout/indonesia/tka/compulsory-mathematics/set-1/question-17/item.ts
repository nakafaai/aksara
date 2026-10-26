import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac35$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
        {
          correct: false,
          label: "$$\\frac{109}{165}$$",
        },
        {
          correct: true,
          label: "$$\\frac{107}{165}$$",
        },
        {
          correct: false,
          label: "$$\\frac7{10}$$",
        },
      ],
    },
  },
  stimulus: "park-and-pond",
};

export default item;
