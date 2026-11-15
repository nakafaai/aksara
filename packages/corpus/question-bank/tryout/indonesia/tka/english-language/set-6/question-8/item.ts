import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "orange-float",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "P, Q, S, R, T",
        },
        {
          correct: false,
          label: "Q, P, R, S, T",
        },
        {
          correct: false,
          label: "T, Q, P, S, R",
        },
        {
          correct: true,
          label: "Q, P, S, R, T",
        },
        {
          correct: false,
          label: "P, S, Q, R, T",
        },
      ],
    },
  },
};

export default item;
