import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "tabungan",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "tidak bersedia",
        },
        {
          column: 1,
          label: "tidak mau",
        },
        {
          column: 2,
          label: "bersedia",
        },
        {
          column: 2,
          label: "berani",
        },
      ],
    },
  },
};

export default item;
