import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Contoh foto terbukti menjadi satu-satunya penyebab rata-rata kesepakatan yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pasangan pencatat mengalami peningkatan kesepakatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Nilai awal dan nilai sesi pembanding sama.",
        },
        {
          isCorrect: false,
          label: "Uji tersebut menetapkan tingkat kesepakatan jangka panjang.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata kesepakatan pada sesi uji lebih tinggi daripada nilai awal dan nilai sesi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
