import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "selection",
  },
  stimulus: "estafet",
  versions: {
    id: {
      columns: ["Mungkin", "Tidak mungkin"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Tim terdiri atas Fani, Gilang, Kiki, dan Lusi.",
        },
        {
          column: 2,
          label: "Tim terdiri atas Gilang, Hana, Joko, dan Kiki.",
        },
        {
          column: 2,
          label: "Tim terdiri atas Fani, Hana, Joko, dan Lusi.",
        },
        {
          column: 1,
          label: "Tim terdiri atas Gilang, Hana, Kiki, dan Lusi.",
        },
      ],
    },
  },
};

export default item;
