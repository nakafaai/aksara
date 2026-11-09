import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "indigo-batik",
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
          label: "kalimat (3)",
        },
        {
          correct: true,
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
