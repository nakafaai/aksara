import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan membuat penyelesaian hidangan sebelum batas waktu tidak perlu diukur.",
        },
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan memungkinkan beberapa unsur kelas diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: true,
          label:
            "Pengelompokan bahan menurut tahap resep dapat mempersingkat pencarian saat kelompok berpindah tahap.",
        },
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan dipilih karena hasil akhir pengujiannya sudah pasti.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
