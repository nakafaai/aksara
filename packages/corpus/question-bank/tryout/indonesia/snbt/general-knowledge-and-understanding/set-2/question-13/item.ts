import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "tabungan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Menyelidiki dengan teliti",
        },
        {
          correct: false,
          label: "Membiarkan begitu saja",
        },
        {
          correct: false,
          label: "Melaporkan kepada pemerintah",
        },
        {
          correct: false,
          label: "Menolak dengan tegas",
        },
        {
          correct: true,
          label: "Mencari cara untuk mengatasi",
        },
      ],
    },
  },
};

export default item;
