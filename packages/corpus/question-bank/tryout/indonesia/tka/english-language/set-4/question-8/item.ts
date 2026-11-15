import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "mangrove-planting",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "P, U, Q, S, T, R",
        },
        {
          correct: false,
          label: "U, Q, P, S, T, R",
        },
        {
          correct: false,
          label: "U, S, Q, P, T, R",
        },
        {
          correct: false,
          label: "U, Q, S, P, R, T",
        },
        {
          correct: true,
          label: "U, Q, S, P, T, R",
        },
      ],
    },
  },
};

export default item;
