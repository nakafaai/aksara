import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "chili-harvest",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Q, P, S, R, T",
        },
        {
          correct: false,
          label: "S, Q, P, R, T",
        },
        {
          correct: false,
          label: "Q, S, R, P, T",
        },
        {
          correct: false,
          label: "Q, S, P, T, R",
        },
        {
          correct: true,
          label: "Q, S, P, R, T",
        },
      ],
    },
  },
};

export default item;
