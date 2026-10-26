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
            "Panah dipilih agar penyelesaian rute tidak perlu diukur lagi.",
        },
        {
          correct: false,
          label:
            "Panah dipilih agar banyak unsur pameran dapat diubah sekaligus.",
        },
        {
          correct: false,
          label:
            "Panah dipilih karena semua nilai pembanding telah terbukti sama.",
        },
        {
          correct: false,
          label:
            "Panah dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
        {
          correct: true,
          label:
            "Panah dipilih untuk membantu pengunjung mengikuti rute di lorong bercabang.",
        },
      ],
    },
  },
};

export default item;
