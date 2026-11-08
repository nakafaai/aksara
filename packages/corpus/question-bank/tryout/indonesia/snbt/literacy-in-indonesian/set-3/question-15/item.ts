import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "canteen-labels",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Penjualan makanan berlabel hijau naik lebih dari 40 persen.",
        },
        {
          column: 2,
          label:
            "Jumlah seluruh porsi yang terjual di kantin bertambah setelah label dipasang.",
        },
        {
          column: 1,
          label:
            "Penurunan penjualan makanan berlabel merah lebih besar daripada kenaikan penjualan makanan berlabel hijau.",
        },
        {
          column: 2,
          label:
            "Survei menunjukkan bahwa semua siswa mengurangi konsumsi gorengan.",
        },
      ],
    },
  },
};

export default item;
