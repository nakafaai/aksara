import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "6 jam 40 menit" },
        { correct: false, label: "10 jam" },
        { correct: false, label: "13 jam 20 menit" },
        { correct: false, label: "16 jam 40 menit" },
        { correct: false, label: "20 jam" },
      ],
    },
  },
};

export default item;
