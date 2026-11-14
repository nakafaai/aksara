import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "insertion",
  },
  stimulus: "peron",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "setelah kalimat (7)" },
        { correct: false, label: "setelah kalimat (6)" },
        { correct: false, label: "setelah kalimat (5)" },
        { correct: false, label: "setelah kalimat (4)" },
        { correct: false, label: "setelah kalimat (3)" },
      ],
    },
  },
};

export default item;
