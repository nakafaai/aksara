import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena 31 lebih tinggi daripada 23 dan 25, tim memastikan kartu efektif lalu menerapkannya secara permanen.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 31, 23, dan 25 lalu merencanakan lebih banyak sesi tanpa membatasi klaim pada lokakarya tersebut.",
        },
        {
          correct: false,
          label:
            "Tim membatasi klaim pada lokakarya tersebut dan merencanakan lebih banyak sesi tanpa melaporkan perbandingan.",
        },
        {
          correct: true,
          label:
            "Tim membandingkan 31, 23, dan 25, membatasi klaim pada lokakarya tersebut, lalu merencanakan lebih banyak sesi dengan aturan ukur yang sama.",
        },
        {
          correct: false,
          label:
            "Nilai 31, 23, dan 25 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pengukuran.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
