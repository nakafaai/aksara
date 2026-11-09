import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "rooftop-garden",
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
          label: "kalimat (4)",
        },
        {
          correct: false,
          label: "kalimat (5)",
        },
        {
          correct: true,
          label: "kalimat (7)",
        },
        {
          correct: false,
          label: "kalimat (9)",
        },
      ],
    },
  },
};

export default item;
