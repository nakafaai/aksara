import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "fire-volunteers",
  versions: {
    id: {
      kind: "choice",
      options: [
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
        {
          correct: false,
          label: "kalimat (7)",
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
