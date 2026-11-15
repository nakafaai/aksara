import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "bridge-count",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "R, P, Q, T, S",
        },
        {
          correct: true,
          label: "R, Q, P, T, S",
        },
        {
          correct: false,
          label: "Q, R, P, T, S",
        },
        {
          correct: false,
          label: "R, Q, T, P, S",
        },
        {
          correct: false,
          label: "R, Q, P, S, T",
        },
      ],
    },
  },
};

export default item;
