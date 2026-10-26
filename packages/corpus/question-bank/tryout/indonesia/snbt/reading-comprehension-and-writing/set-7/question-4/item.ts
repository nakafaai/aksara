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
            "Pemesanan awal dipilih agar kesesuaian pesanan tidak perlu diukur lagi.",
        },
        {
          correct: false,
          label:
            "Pemesanan awal dipilih agar banyak unsur program dapat diubah sekaligus.",
        },
        {
          correct: true,
          label:
            "Pemesanan sehari sebelumnya dipilih agar pilihan siswa diketahui sebelum mereka tiba di meja saji.",
        },
        {
          correct: false,
          label:
            "Pemesanan awal dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          correct: false,
          label:
            "Pemesanan awal dipilih hanya karena hasil akhir pengujiannya sudah dipastikan.",
        },
      ],
    },
  },
};

export default item;
