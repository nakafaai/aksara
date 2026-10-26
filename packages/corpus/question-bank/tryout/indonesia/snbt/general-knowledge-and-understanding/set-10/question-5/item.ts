import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Informasi asal produk perlu memisahkan tahap rantai pasok agar ringkas bagi pembeli sekaligus dapat ditelusuri saat pemeriksaan.",
        },
        {
          correct: true,
          label:
            "Dalam simulasi, catatan berlapis mempersempit produk yang harus ditarik dibanding label satu lokasi.",
        },
        {
          correct: false,
          label:
            "Pengelola pasar mengusulkan satu label asal berdasarkan tempat produk terakhir dikemas.",
        },
        {
          correct: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          correct: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
