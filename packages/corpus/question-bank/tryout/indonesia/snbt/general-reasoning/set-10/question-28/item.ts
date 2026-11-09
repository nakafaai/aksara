import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "percent",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Harga akhir buku itu Rp108.000.",
        },
        {
          column: 2,
          label: "Total potongan yang diterima sama dengan diskon 30%.",
        },
        {
          column: 1,
          label: "Jika urutan kedua diskon ditukar, harga akhirnya tetap sama.",
        },
        {
          column: 2,
          label: "Potongan dari diskon tambahan 10% besarnya Rp15.000.",
        },
      ],
    },
  },
};

export default item;
