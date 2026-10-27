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
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
        {
          correct: false,
          label:
            "Karena sebagian pengguna mengalami kendala, jalur digital sebaiknya dihapus meskipun bermanfaat bagi kelompok lain.",
        },
        {
          correct: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
        {
          correct: true,
          label:
            "Data awal mendukung perluasan terbatas, tetapi belum mendukung kewajiban digital bagi semua transaksi.",
        },
        {
          correct: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
      ],
    },
  },
};

export default item;
