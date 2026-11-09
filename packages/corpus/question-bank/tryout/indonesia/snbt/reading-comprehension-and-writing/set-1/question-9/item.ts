import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label: "sesudah kalimat (2)",
        },
        {
          correct: true,
          label: "sesudah kalimat (3)",
        },
        {
          correct: false,
          label: "sesudah kalimat (5)",
        },
        {
          correct: false,
          label: "sesudah kalimat (6)",
        },
        {
          correct: false,
          label: "sesudah kalimat (8)",
        },
      ],
    },
  },
};

export default item;
