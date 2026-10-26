import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
            "Kecepatan yang tampak pada rata-rata perlu diuji lagi pada kelompok transaksi yang benar-benar sebanding.",
        },
        {
          correct: false,
          label:
            "Pada uji berikutnya, rata-rata lama cukup dipakai tanpa menyamakan jumlah barang dalam transaksi.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
