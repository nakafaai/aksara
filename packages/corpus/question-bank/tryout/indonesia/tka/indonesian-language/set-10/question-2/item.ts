import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "butterfly-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "pupuk untuk menyuburkan tanaman di taman" },
        { correct: false, label: "air untuk menyiram tanaman setiap pagi" },
        { correct: false, label: "alat untuk menyemprotkan cairan ke daun" },
        { correct: false, label: "obat untuk menyembuhkan ulat yang sakit" },
        { correct: true, label: "zat kimia untuk membasmi hama" },
      ],
    },
  },
};

export default item;
