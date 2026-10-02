import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
        {
          isCorrect: false,
          label:
            "Karena sebagian pengguna mengalami kendala, jalur digital sebaiknya dihapus meskipun bermanfaat bagi kelompok lain.",
        },
        {
          isCorrect: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
        {
          isCorrect: true,
          label:
            "Data awal mendukung perluasan terbatas, tetapi belum mendukung kewajiban digital bagi semua transaksi.",
        },
        {
          isCorrect: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
