import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "text-structure",
  },
  stimulus: "grain-barn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kalimat (3) dan (4)",
        },
        {
          correct: false,
          label: "kalimat (1) dan (2)",
        },
        {
          correct: false,
          label: "kalimat (5) dan (6)",
        },
        {
          correct: false,
          label: "kalimat (6) dan (7)",
        },
        {
          correct: false,
          label: "kalimat (7) dan (8)",
        },
      ],
    },
  },
};

export default item;
