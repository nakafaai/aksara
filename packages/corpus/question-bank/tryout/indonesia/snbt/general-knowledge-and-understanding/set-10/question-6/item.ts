import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Informasi asal produk perlu memisahkan tahap rantai pasok agar ringkas bagi pembeli sekaligus dapat ditelusuri saat pemeriksaan.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
        {
          isCorrect: false,
          label:
            "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
