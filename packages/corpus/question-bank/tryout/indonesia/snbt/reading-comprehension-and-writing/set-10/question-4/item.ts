import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengelompokan bahan membuat penyelesaian hidangan sebelum batas waktu tidak perlu diukur.",
        },
        {
          correct: false,
          label:
            "Pengelompokan bahan memungkinkan beberapa unsur kelas diubah sekaligus.",
        },
        {
          correct: false,
          label:
            "Pengelompokan bahan dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          correct: true,
          label:
            "Pengelompokan bahan menurut tahap resep dapat mempersingkat pencarian saat kelompok berpindah tahap.",
        },
        {
          correct: false,
          label:
            "Pengelompokan bahan dipilih karena hasil akhir pengujiannya sudah pasti.",
        },
      ],
    },
  },
};

export default item;
