import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "panen",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "B, D, A, C",
        },
        {
          correct: false,
          label: "C, A, D, B",
        },
        {
          correct: false,
          label: "B, A, D, C",
        },
        {
          correct: false,
          label: "D, B, A, C",
        },
        {
          correct: false,
          label: "B, D, C, A",
        },
      ],
    },
  },
};

export default item;
