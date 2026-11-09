import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "bazar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Stan X-A berada di nomor 1.",
        },
        {
          correct: false,
          label: "Stan X-C berada di nomor 1.",
        },
        {
          correct: true,
          label: "Stan X-B berada di nomor 6.",
        },
        {
          correct: false,
          label: "Stan XI-C berada di nomor 5.",
        },
        {
          correct: false,
          label: "Stan XI-B berada di nomor 2.",
        },
      ],
    },
  },
};

export default item;
