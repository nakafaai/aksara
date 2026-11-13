import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "gelasan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat (4)",
        },
        {
          correct: false,
          label: "kalimat (9)",
        },
        {
          correct: true,
          label: "kalimat (10)",
        },
        {
          correct: false,
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
