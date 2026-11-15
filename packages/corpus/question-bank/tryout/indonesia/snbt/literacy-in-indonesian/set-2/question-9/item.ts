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
          column: 2,
          label:
            "Ibu secara halus membujuk Laras agar membatalkan kepergiannya ke Bandung.",
        },
        {
          column: 1,
          label:
            "Ibu menerima pilihan Laras walaupun tidak mengatakannya secara langsung.",
        },
        {
          column: 2,
          label:
            "Ibu menganggap motif pucuk rebung tidak perlu lagi ditenun keluarga mereka.",
        },
        {
          column: 1,
          label:
            "Ibu menyerahkan kepada Laras cara meneruskan tradisi keluarga itu.",
        },
      ],
    },
  },
};

export default item;
