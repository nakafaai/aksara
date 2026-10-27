import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "analisa efektivitas kode pengembalian pada setiap gagang",
        },
        {
          correct: true,
          label: "analisis efektivitas kode pengembalian pada setiap gagang",
        },
        {
          correct: false,
          label: "analisis efektifitas kode pengembalian pada setiap gagang",
        },
        {
          correct: false,
          label: "analisa efektifitas kode pengembalian pada setiap gagang",
        },
        {
          correct: false,
          label:
            "analisis efektivitas kode pengembalian dalam kontek peminjaman payung",
        },
      ],
    },
  },
};

export default item;
