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
            "Jumlah porsi makanan merah yang berkurang lebih banyak daripada jumlah porsi makanan hijau yang bertambah.",
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
