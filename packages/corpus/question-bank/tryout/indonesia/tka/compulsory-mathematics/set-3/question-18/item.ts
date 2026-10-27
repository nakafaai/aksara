import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "courtyard-layout",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$288$$",
        },
        {
          correct: false,
          label: "$$252$$",
        },
        {
          correct: false,
          label: "$$276$$",
        },
        {
          correct: false,
          label: "$$292$$",
        },
        {
          correct: false,
          label: "$$304$$",
        },
      ],
    },
  },
};

export default item;
