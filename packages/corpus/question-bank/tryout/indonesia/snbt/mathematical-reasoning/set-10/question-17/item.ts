import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-canteen",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Senin pada minggu kedua" },
        { correct: false, label: "Selasa pada minggu kedua" },
        { correct: false, label: "Rabu pada minggu kedua" },
        { correct: false, label: "Senin pada minggu ketiga" },
        { correct: true, label: "Selasa pada minggu ketiga" },
      ],
    },
  },
};

export default item;
