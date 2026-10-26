import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
        {
          correct: false,
          label:
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
        {
          correct: true,
          label:
            "Manfaat pembayaran digital perlu dinilai dengan data yang sebanding dan akses pengguna, sehingga penambahannya tidak otomatis berarti penghapusan tunai.",
        },
        {
          correct: false,
          label:
            "Karena sebagian pengguna mengalami kendala, jalur digital sebaiknya dihapus meskipun bermanfaat bagi kelompok lain.",
        },
        {
          correct: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
