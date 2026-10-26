import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Informasi asal produk perlu memisahkan tahap rantai pasok agar ringkas bagi pembeli sekaligus dapat ditelusuri saat pemeriksaan.",
        },
        {
          correct: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
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
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
