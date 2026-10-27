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
            "Kartu pertanyaan membuat jumlah pengunjung yang bertanya tidak perlu diukur.",
        },
        {
          correct: false,
          label:
            "Kartu pertanyaan memungkinkan banyak unsur tur diubah sekaligus.",
        },
        {
          correct: true,
          label:
            "Dua pertanyaan awal pada kartu memberi pengunjung titik awal yang lebih khusus daripada undangan untuk bertanya apa saja.",
        },
        {
          correct: false,
          label:
            "Kartu dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          correct: false,
          label:
            "Kartu dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
      ],
    },
  },
};

export default item;
