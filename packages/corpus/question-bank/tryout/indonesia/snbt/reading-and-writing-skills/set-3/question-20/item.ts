import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 31 lebih tinggi daripada 23 dan 25, tim memastikan kartu efektif lalu menerapkannya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 31, 23, dan 25 lalu merencanakan lebih banyak sesi tanpa membatasi klaim pada lokakarya tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada lokakarya tersebut dan merencanakan lebih banyak sesi tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 31, 23, dan 25, membatasi klaim pada lokakarya tersebut, lalu merencanakan lebih banyak sesi dengan aturan ukur yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 31, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
