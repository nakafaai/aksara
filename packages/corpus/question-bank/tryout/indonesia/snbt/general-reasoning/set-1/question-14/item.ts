import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "meja",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "P duduk bersebelahan dengan K.",
        },
        {
          correct: false,
          label: "N duduk berhadapan dengan P.",
        },
        {
          correct: false,
          label: "L duduk di kursi bernomor genap.",
        },
        {
          correct: false,
          label: "O duduk berhadapan dengan K.",
        },
        {
          correct: false,
          label: "M tidak duduk bersebelahan dengan O.",
        },
      ],
    },
  },
};

export default item;
