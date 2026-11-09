import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "water-tank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat (1)",
        },
        {
          correct: false,
          label: "kalimat (2)",
        },
        {
          correct: true,
          label: "kalimat (5)",
        },
        {
          correct: false,
          label: "kalimat (6)",
        },
        {
          correct: false,
          label: "kalimat (7)",
        },
      ],
    },
  },
};

export default item;
