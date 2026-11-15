import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Ibu sudah lama memperhatikan minat Laras pada gambar bangunan.",
        },
        {
          column: 2,
          label:
            "Ibu meminta Laras pulang setiap libur untuk menyelesaikan kain itu.",
        },
        {
          column: 1,
          label:
            "Ibu menyerahkan kain yang belum selesai dan membiarkan Laras menentukan cara menyelesaikannya.",
        },
        {
          column: 2,
          label:
            "Ibu masih berharap Laras meneruskan motif pucuk rebung tanpa perubahan.",
        },
        {
          column: 1,
          label:
            "Malam itu Ibu lebih banyak berbicara lewat kiasan dan perbuatan daripada mengatakan perasaannya secara langsung.",
        },
      ],
    },
  },
};

export default item;
