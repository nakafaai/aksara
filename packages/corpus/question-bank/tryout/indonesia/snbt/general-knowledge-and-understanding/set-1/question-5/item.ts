import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "leuit",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Padi disimpan di leuit dalam bentuk beras agar cepat diolah.",
        },
        {
          column: 1,
          label:
            "Kolong leuit membantu mengurangi kelembapan pada padi yang disimpan.",
        },
        {
          column: 2,
          label: "Semua komunitas yang memiliki leuit melarang penjualan padi.",
        },
        {
          column: 1,
          label: "Sekam ikut melindungi bulir padi dari serangan serangga.",
        },
      ],
    },
  },
};

export default item;
