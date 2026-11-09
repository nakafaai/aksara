import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-storage",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "81 menit" },
        { correct: false, label: "82 menit" },
        { correct: false, label: "217 menit" },
        { correct: false, label: "281 menit" },
        { correct: false, label: "750 menit" },
      ],
    },
  },
};

export default item;
