import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "fun-run",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "R, P, Q, S, T",
        },
        {
          correct: false,
          label: "Q, R, P, S, T",
        },
        {
          correct: true,
          label: "R, Q, P, S, T",
        },
        {
          correct: false,
          label: "R, Q, S, P, T",
        },
        {
          correct: false,
          label: "R, Q, P, T, S",
        },
      ],
    },
  },
};

export default item;
