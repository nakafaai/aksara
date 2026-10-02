import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          isCorrect: true,
          label:
            "Kegunaan kode bergantung pada mutu dan pembaruan catatan di belakangnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
