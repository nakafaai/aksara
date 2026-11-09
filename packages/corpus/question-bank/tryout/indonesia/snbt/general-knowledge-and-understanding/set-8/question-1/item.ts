import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "komodo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mengejar mangsa sampai jarak yang jauh",
        },
        {
          correct: false,
          label: "membuntuti mangsa diam-diam dari belakang",
        },
        {
          correct: false,
          label: "memancing mangsa dengan umpan",
        },
        {
          correct: false,
          label: "menggali lubang jebakan",
        },
        {
          correct: true,
          label: "menyerang tiba-tiba dari persembunyian",
        },
      ],
    },
  },
};

export default item;
