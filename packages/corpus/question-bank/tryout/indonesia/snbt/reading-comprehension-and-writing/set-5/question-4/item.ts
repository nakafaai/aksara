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
            "Contoh foto dipilih agar kesepakatan pencatat tidak perlu diukur lagi.",
        },
        {
          correct: true,
          label:
            "Contoh foto dipilih untuk memperjelas kategori tertulis yang sebelumnya menghasilkan perbedaan penilaian.",
        },
        {
          correct: false,
          label:
            "Contoh foto dipilih agar beberapa unsur pendataan dapat diubah sekaligus.",
        },
        {
          correct: false,
          label:
            "Contoh foto dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          correct: false,
          label:
            "Contoh foto dipilih hanya karena hasil akhir pengujian sudah dipastikan.",
        },
      ],
    },
  },
};

export default item;
