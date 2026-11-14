import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "sprint-times",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rata-rata waktu lebih kecil daripada median waktu.",
        },
        { correct: false, label: "Median waktu adalah 14,4 detik." },
        { correct: false, label: "Modus waktu adalah 14,2 detik." },
        { correct: false, label: "Jangkauan waktu adalah 3,1 detik." },
        {
          correct: true,
          label: "Rata-rata waktu lebih besar daripada median waktu.",
        },
      ],
    },
  },
};

export default item;
