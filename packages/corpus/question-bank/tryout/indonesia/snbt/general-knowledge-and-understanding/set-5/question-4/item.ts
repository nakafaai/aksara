import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "subak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (7) membantah pernyataan pada kalimat (6).",
        },
        {
          correct: false,
          label:
            "Kalimat (7) memberikan contoh lain manfaat subak di luar pengendalian hama.",
        },
        {
          correct: true,
          label:
            "Kalimat (7) menjelaskan cara jadwal tanam serentak mengendalikan hama.",
        },
        {
          correct: false,
          label:
            "Kalimat (7) menyebutkan akibat buruk dari jadwal tanam yang serentak.",
        },
        {
          correct: false,
          label:
            "Kalimat (7) mengulang isi kalimat (6) dengan kata-kata yang berbeda.",
        },
      ],
    },
  },
};

export default item;
