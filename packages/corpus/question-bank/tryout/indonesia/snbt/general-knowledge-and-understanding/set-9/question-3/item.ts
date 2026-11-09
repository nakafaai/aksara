import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "tenun",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Benang ditenun lebih dahulu, baru kemudian diikat dan dicelup.",
        },
        {
          column: 2,
          label:
            "Satu kali pencelupan sudah cukup untuk menghasilkan kain dengan banyak warna.",
        },
        {
          column: 1,
          label: "Pewarna merah dapat dibuat dari akar mengkudu.",
        },
        {
          column: 1,
          label: "Motif tenun ikat dapat menunjukkan asal daerah pemakainya.",
        },
      ],
    },
  },
};

export default item;
