import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Sudah dicatat", "Akan dicatat"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Lama genangan",
        },
        {
          column: 2,
          label: "Intensitas hujan",
        },
        {
          column: 2,
          label: "Kelembapan tanah sebelum hujan",
        },
      ],
    },
  },
  stimulus: "rain-garden",
};

export default item;
