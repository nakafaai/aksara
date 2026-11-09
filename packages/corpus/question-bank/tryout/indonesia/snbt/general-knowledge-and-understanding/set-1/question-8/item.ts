import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "elektronik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (6) dan (7) menjelaskan penyebab munculnya banyak pengepul kecil tanpa peralatan pelindung yang disebut pada kalimat (5).",
        },
        {
          correct: false,
          label: "Kalimat (6) dan (7) membantah keterangan pada kalimat (5).",
        },
        {
          correct: false,
          label: "Kalimat (6) dan (7) merupakan simpulan dari kalimat (5).",
        },
        {
          correct: false,
          label:
            "Kalimat (6) dan (7) membandingkan pengolahan yang aman dengan pengolahan yang tidak aman.",
        },
        {
          correct: true,
          label:
            "Kalimat (6) dan (7) memberikan contoh cara pengolahan tanpa perlindungan yang disebut pada kalimat (5).",
        },
      ],
    },
  },
};

export default item;
