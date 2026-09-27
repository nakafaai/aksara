import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 33 lebih tinggi daripada 23 dan 25, tim menyatakan peta dengan waktu tempuh pasti efektif dan menerapkannya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 33, 23, dan 25 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada pintu masuk itu dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan nilai 33, 23, dan 25, membatasi simpulan pada uji singkat di satu pintu masuk taman, serta merencanakan uji lebih lama pada waktu kunjungan berbeda dengan aturan pengukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 33, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
