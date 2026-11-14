import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "oil-soap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "jumlah liter air yang mengalir di sungai setiap hari",
        },
        { correct: false, label: "warna air yang terlihat dari atas jembatan" },
        { correct: false, label: "seberapa deras sungai mengalir saat banjir" },
        { correct: false, label: "nama sungai yang melintasi kelurahan" },
        { correct: true, label: "mutu atau tingkat baik buruknya air sungai" },
      ],
    },
  },
};

export default item;
