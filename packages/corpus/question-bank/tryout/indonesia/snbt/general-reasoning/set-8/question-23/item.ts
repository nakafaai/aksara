import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "motor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "R, S, P, Q",
        },
        {
          correct: false,
          label: "S, Q, P, R",
        },
        {
          correct: false,
          label: "R, P, S, Q",
        },
        {
          correct: false,
          label: "S, R, P, Q",
        },
        {
          correct: false,
          label: "Q, S, P, R",
        },
      ],
    },
  },
};

export default item;
