import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 32, 22, dan 24, membatasi klaim pada kelengkapan waktu, serta merencanakan pemeriksaan kesesuaian antarrelawan dengan aturan pencatatan waktu yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Karena 32 lebih tinggi daripada 22 dan 24, tim menyatakan seluruh laporan akurat dan menerapkan contoh secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 32, 22, dan 24 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada kelengkapan waktu dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 32, 22, dan 24 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pencatatan waktu.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
