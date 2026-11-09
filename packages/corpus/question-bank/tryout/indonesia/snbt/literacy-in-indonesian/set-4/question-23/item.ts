import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "banda-nutmeg",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sampai abad ke-18, pohon pala hanya tumbuh di Kepulauan Banda.",
        },
        {
          column: 2,
          label: "Fuli adalah jenis pala yang tumbuh di Mauritius.",
        },
        {
          column: 2,
          label:
            "Dalam Perjanjian Breda, Belanda menyerahkan Pulau Run kepada Inggris.",
        },
        {
          column: 1,
          label:
            "Setelah 1621, kebun pala di Banda dikerjakan oleh orang-orang yang didatangkan sebagai budak.",
        },
      ],
    },
  },
};

export default item;
