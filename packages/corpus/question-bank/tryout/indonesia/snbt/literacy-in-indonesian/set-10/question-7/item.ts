import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "front-labels",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            'Logo "Pilihan Lebih Sehat" wajib dipasang pada semua produk di Indonesia.',
        },
        {
          column: 1,
          label:
            "Di Chili, tanda segi delapan hitam wajib bagi produk yang melewati batas tertentu.",
        },
        {
          column: 1,
          label:
            "Sebagian produsen di Chili mengubah resep agar produknya tidak diberi tanda.",
        },
        {
          column: 2,
          label:
            "Tabel informasi nilai gizi tidak mencantumkan kandungan gula.",
        },
      ],
    },
  },
};

export default item;
