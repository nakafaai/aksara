import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "commute-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "0-9 menit" },
        { correct: true, label: "10-19 menit" },
        { correct: false, label: "20-29 menit" },
        { correct: false, label: "30-39 menit" },
        { correct: false, label: "40-49 menit" },
      ],
    },
  },
};

export default item;
