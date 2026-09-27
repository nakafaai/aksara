import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 29 lebih tinggi daripada 21 dan 23, tim menyatakan jadwal digital pasti efektif dan menerapkannya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 29, 21, dan 23 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan nilai 29, 21, dan 23, membatasi simpulan pada uji singkat di ruang latihan itu, serta merencanakan uji lebih lama pada pekan dengan kepadatan berbeda menggunakan aturan pengukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada ruang latihan itu dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 29, 21, dan 23 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
