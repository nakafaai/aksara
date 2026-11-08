import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "waste-bank",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Kaleng aluminium mempunyai harga beli per kilogram paling tinggi.",
        },
        {
          column: 2,
          label: "Sampah ditimbang di rumah warga sebelum dibawa ke bank sampah.",
        },
        {
          column: 1,
          label: "Pada bulan Agustus, berat kardus yang diterima lebih besar daripada berat botol plastik bening.",
        },
        {
          column: 2,
          label: "Seluruh uang hasil penjualan sampah dipakai untuk membeli tempat sampah terpilah.",
        },
      ],
    },
  },
};

export default item;
