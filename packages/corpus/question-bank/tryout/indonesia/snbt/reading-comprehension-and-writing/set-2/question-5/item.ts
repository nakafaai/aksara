import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "perahu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat (2)",
        },
        {
          correct: false,
          label: "kalimat (3)",
        },
        {
          correct: false,
          label: "kalimat (4)",
        },
        {
          correct: true,
          label: "kalimat (5)",
        },
        {
          correct: false,
          label: "kalimat (6)",
        },
      ],
    },
  },
};

export default item;
