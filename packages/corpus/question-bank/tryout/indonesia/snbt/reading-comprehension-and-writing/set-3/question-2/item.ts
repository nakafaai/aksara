import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "insertion",
  },
  stimulus: "resapan",
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
