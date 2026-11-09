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
          column: 2,
          label:
            "Karena harga barang A $$20\\%$$ lebih murah daripada barang B, harga barang B juga $$20\\%$$ lebih mahal daripada barang A.",
        },
        {
          column: 2,
          label:
            "Jika harga kedua barang sama-sama naik $$10\\%$$, selisih harganya tetap $$\\text{Rp}20{.}000$$.",
        },
        {
          column: 1,
          label: "Harga barang B sama dengan $$125\\%$$ dari harga barang A.",
        },
        {
          column: 1,
          label:
            "Jika harga barang A naik $$\\text{Rp}20{.}000$$, harganya sama dengan harga barang B.",
        },
      ],
    },
  },
};

export default item;
