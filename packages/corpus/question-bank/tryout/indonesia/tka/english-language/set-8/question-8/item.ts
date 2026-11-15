import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "egg-incubator",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "R, P, S, Q, T",
        },
        {
          correct: false,
          label: "R, S, P, Q, T",
        },
        {
          correct: false,
          label: "P, R, S, Q, T",
        },
        {
          correct: false,
          label: "R, P, Q, S, T",
        },
        {
          correct: false,
          label: "R, S, Q, P, T",
        },
      ],
    },
  },
};

export default item;
