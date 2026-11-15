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
        { column: 2, label: "Ibu berharap Laras membatalkan rencananya dan tetap tinggal untuk menenun." },
        { column: 1, label: "Ibu menerima pilihan Laras walaupun tidak mengatakannya secara langsung." },
        { column: 2, label: "Ibu menganggap tradisi menenun keluarga tidak lagi penting." },
        { column: 1, label: "Ibu menyerahkan kepada Laras cara meneruskan tradisi keluarga itu." },
      ],
    },
  },
};

export default item;
