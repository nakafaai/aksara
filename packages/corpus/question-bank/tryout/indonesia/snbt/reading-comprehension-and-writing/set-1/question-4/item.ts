import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "lumbung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat (3)",
        },
        {
          correct: false,
          label: "kalimat (9)",
        },
        {
          correct: false,
          label: "kalimat (10)",
        },
        {
          correct: true,
          label: "kalimat (11)",
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
