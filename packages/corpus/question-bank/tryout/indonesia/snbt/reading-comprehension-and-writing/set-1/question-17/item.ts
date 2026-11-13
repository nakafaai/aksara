import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "gelasan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tahun lalu, sebagian besar pengunjung yang terluka tergores benang gelasan dari layang-layang aduan yang putus.",
        },
        {
          correct: true,
          label:
            "Tahun ini, lomba aduan dipindahkan ke ujung pantai yang tertutup bagi penonton, sedangkan tahun lalu lomba itu digelar tepat di depan tali pembatas.",
        },
        {
          correct: false,
          label:
            "Pos kesehatan festival tahun ini buka dua jam lebih lama sehingga lebih banyak luka ringan yang tercatat.",
        },
        {
          correct: false,
          label:
            "Jumlah pengunjung festival tahun ini lebih banyak daripada jumlah pengunjung tahun lalu.",
        },
        {
          correct: false,
          label:
            "Dua peserta yang didapati membawa benang gelasan tidak diizinkan ikut lomba aduan.",
        },
      ],
    },
  },
};

export default item;
