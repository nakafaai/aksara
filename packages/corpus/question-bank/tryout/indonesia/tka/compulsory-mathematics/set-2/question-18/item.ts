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
          correct: true,
          label: "$$70$$",
        },
        {
          correct: false,
          label: "$$60$$",
        },
        {
          correct: false,
          label: "$$64$$",
        },
        {
          correct: false,
          label: "$$68$$",
        },
        {
          correct: false,
          label: "$$72$$",
        },
      ],
    },
  },
  stimulus: "water-tank",
};

export default item;
