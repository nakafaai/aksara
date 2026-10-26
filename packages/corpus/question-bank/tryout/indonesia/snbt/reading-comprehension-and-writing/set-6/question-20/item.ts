import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tim membandingkan rata-rata 32, 22, dan 24, membatasi klaim pada kelengkapan waktu, serta merencanakan pemeriksaan kesesuaian antarrelawan dengan aturan pencatatan waktu yang sama.",
        },
        {
          correct: false,
          label:
            "Karena 32 lebih tinggi daripada 22 dan 24, tim menyatakan seluruh laporan akurat dan menerapkan contoh secara permanen.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 32, 22, dan 24 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          correct: false,
          label:
            "Tim membatasi klaim pada kelengkapan waktu dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          correct: false,
          label:
            "Nilai 32, 22, dan 24 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pencatatan waktu.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
