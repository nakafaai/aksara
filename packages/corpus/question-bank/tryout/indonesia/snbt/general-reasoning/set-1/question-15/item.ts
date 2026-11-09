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
          correct: false,
          label: "N duduk bersebelahan dengan K.",
        },
        {
          correct: true,
          label: "P duduk di kursi $$6$$.",
        },
        {
          correct: false,
          label: "L duduk di kursi $$2$$.",
        },
        {
          correct: false,
          label: "O duduk bersebelahan dengan P.",
        },
        {
          correct: false,
          label: "M duduk di kursi $$5$$.",
        },
      ],
    },
  },
};

export default item;
