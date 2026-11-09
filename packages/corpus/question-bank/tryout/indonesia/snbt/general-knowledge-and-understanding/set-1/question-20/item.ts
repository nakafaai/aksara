import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "karang",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Warna putih pada karang yang memutih berasal dari kerangka kapurnya.",
        },
        {
          column: 2,
          label: "Karang yang memutih pasti mati.",
        },
        {
          column: 1,
          label: "Alga memperoleh tempat berlindung dari karang.",
        },
        {
          column: 2,
          label:
            "Pemutihan karang terjadi ketika suhu air laut naik selama satu hari.",
        },
      ],
    },
  },
};

export default item;
