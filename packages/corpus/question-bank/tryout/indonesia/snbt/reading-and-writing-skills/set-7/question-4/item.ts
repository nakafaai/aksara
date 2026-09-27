import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih agar kesesuaian pesanan tidak perlu diukur lagi.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih agar banyak unsur program dapat diubah sekaligus.",
        },
        {
          isCorrect: true,
          label:
            "Pemesanan sehari sebelumnya dipilih agar pilihan siswa diketahui sebelum mereka tiba di meja saji.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih hanya karena hasil akhir pengujiannya sudah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
