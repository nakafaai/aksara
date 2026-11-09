import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "tooth-brushing",
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
          label: "kalimat (3)",
        },
        {
          correct: false,
          label: "kalimat (5)",
        },
        {
          correct: false,
          label: "kalimat (6)",
        },
      ],
    },
  },
};

export default item;
