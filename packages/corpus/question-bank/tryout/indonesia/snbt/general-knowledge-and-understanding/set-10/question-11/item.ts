import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Satu nama tempat dapat benar tetapi tetap menyesatkan jika pembaca menganggapnya mewakili seluruh perjalanan produk.",
        },
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
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
