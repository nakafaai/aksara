import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "coffee-picking",
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
          label: "kalimat (5)",
        },
        {
          correct: true,
          label: "kalimat (6)",
        },
        {
          correct: false,
          label: "kalimat (8)",
        },
      ],
    },
  },
};

export default item;
