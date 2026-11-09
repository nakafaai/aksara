import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "sachet-waste",
  versions: {
    id: {
      columns: [
        "Masalah sampah saset",
        "Uji coba penjualan curah",
        "Tanggapan terhadap poster",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Saset mudah terbawa air hingga menyumbat selokan.",
        },
        { column: 2, label: "Pembeli membawa wadah sendiri ke warung." },
        {
          column: 3,
          label: "Pengurus bank sampah menilai isi poster terlalu jauh.",
        },
        {
          column: 2,
          label: "Sebagian pembeli ragu akan kebersihan barang curah.",
        },
      ],
    },
  },
};

export default item;
