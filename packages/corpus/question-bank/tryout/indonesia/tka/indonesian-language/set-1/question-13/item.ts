import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "heat-map",
  versions: {
    id: {
      columns: ["Sudah dikendalikan", "Perlu dikendalikan"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Model termometer",
        },
        {
          column: 1,
          label: "Waktu tunggu sebelum pencatatan",
        },
        {
          column: 2,
          label: "Penggunaan kipas di ruang baca",
        },
      ],
    },
  },
};

export default item;
