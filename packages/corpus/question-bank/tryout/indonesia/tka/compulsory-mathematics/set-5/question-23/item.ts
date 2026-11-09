import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "run-times",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Rata-rata waktu tempuh kelompok A turun $$1$$ menit.",
        },
        {
          correct: false,
          label: "Median waktu tempuh kelompok A tidak berubah.",
        },
        {
          correct: true,
          label: "Jangkauan waktu tempuh kelompok A menjadi $$9$$ menit.",
        },
        {
          correct: true,
          label: "Modus waktu tempuh kelompok A tetap $$27$$ menit.",
        },
        {
          correct: false,
          label:
            "Rata-rata waktu tempuh kelompok A menjadi lebih besar daripada rata-rata kelompok B.",
        },
      ],
    },
  },
};

export default item;
