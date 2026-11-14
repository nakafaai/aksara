import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "redundancy",
  },
  stimulus: "tenun",
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
          label: "kalimat (7)",
        },
        {
          correct: false,
          label: "kalimat (8)",
        },
        {
          correct: false,
          label: "kalimat (9)",
        },
        {
          correct: true,
          label: "kalimat (10)",
        },
      ],
    },
  },
};

export default item;
