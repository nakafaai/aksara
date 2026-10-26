import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena 29 lebih tinggi daripada 21 dan 23, tim menyatakan jadwal digital pasti efektif dan menerapkannya secara permanen.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 29, 21, dan 23 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          correct: true,
          label:
            "Tim membandingkan nilai 29, 21, dan 23, membatasi simpulan pada uji singkat di ruang latihan itu, serta merencanakan uji lebih lama pada pekan dengan kepadatan berbeda menggunakan aturan pengukuran yang sama.",
        },
        {
          correct: false,
          label:
            "Tim membatasi simpulan pada ruang latihan itu dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          correct: false,
          label:
            "Nilai 29, 21, dan 23 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
