import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
        {
          correct: false,
          label:
            "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui.",
        },
        {
          correct: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          correct: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          correct: true,
          label:
            "Kegunaan kode bergantung pada mutu dan pembaruan catatan di belakangnya.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
