import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Panah dipilih agar penyelesaian rute tidak perlu diukur lagi.",
        },
        {
          isCorrect: false,
          label:
            "Panah dipilih agar banyak unsur pameran dapat diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Panah dipilih karena semua nilai pembanding telah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Panah dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Panah dipilih untuk membantu pengunjung mengikuti rute di lorong bercabang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
