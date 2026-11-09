import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "weaving-class",
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
          correct: false,
          label: "kalimat (6)",
        },
        {
          correct: true,
          label: "kalimat (7)",
        },
      ],
    },
  },
};

export default item;
