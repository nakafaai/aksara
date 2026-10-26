import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Boleh", "Tidak boleh"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Potongan sayur",
        },
        {
          column: 2,
          label: "Kuah berminyak",
        },
        {
          column: 1,
          label: "Daun kering",
        },
      ],
    },
  },
  stimulus: "food-scraps",
};

export default item;
