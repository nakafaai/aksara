import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena 33 lebih tinggi daripada 23 dan 25, tim menyatakan peta dengan waktu tempuh pasti efektif dan menerapkannya secara permanen.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 33, 23, dan 25 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          correct: false,
          label:
            "Tim membatasi simpulan pada pintu masuk itu dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          correct: true,
          label:
            "Tim membandingkan nilai 33, 23, dan 25, membatasi simpulan pada uji singkat di satu pintu masuk taman, serta merencanakan uji lebih lama pada waktu kunjungan berbeda dengan aturan pengukuran yang sama.",
        },
        {
          correct: false,
          label:
            "Nilai 33, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
};

export default item;
