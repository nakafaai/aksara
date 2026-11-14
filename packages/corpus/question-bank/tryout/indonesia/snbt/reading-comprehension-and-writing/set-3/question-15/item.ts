import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "lapak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kalimat (3)",
        },
        {
          correct: false,
          label: "kalimat (4)",
        },
        {
          correct: false,
          label: "kalimat (11)",
        },
        {
          correct: false,
          label: "kalimat (12)",
        },
        {
          correct: false,
          label: "kalimat (13)",
        },
      ],
    },
  },
};

export default item;
