import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Informasi asal produk perlu memisahkan tahap rantai pasok agar ringkas bagi pembeli sekaligus dapat ditelusuri saat pemeriksaan.",
        },
        {
          isCorrect: true,
          label:
            "Dalam simulasi, catatan berlapis mempersempit produk yang harus ditarik dibanding label satu lokasi.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pasar mengusulkan satu label asal berdasarkan tempat produk terakhir dikemas.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
