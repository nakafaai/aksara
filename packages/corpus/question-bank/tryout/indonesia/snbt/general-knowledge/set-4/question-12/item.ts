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
            "Kecepatan yang tampak pada rata-rata perlu diuji lagi pada kelompok transaksi yang benar-benar sebanding.",
        },
        {
          isCorrect: false,
          label:
            "Pada uji berikutnya, rata-rata lama cukup dipakai tanpa menyamakan jumlah barang dalam transaksi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
