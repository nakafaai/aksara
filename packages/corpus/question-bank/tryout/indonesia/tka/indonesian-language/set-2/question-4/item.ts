import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Meja 1", "Meja 2", "Meja 3"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Mencatat gejala dan tanda bahaya",
        },
        {
          column: 2,
          label: "Memilih pengujian yang aman",
        },
        {
          column: 3,
          label: "Membandingkan biaya dan kemungkinan umur pakai",
        },
      ],
    },
  },
  stimulus: "repair-clinic",
};

export default item;
