import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "water-turn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kalimat (1)",
        },
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
