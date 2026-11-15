import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "village-midwife",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bu Warsih sudah memutuskan merujuk Sumi sebelum Nia memintanya.",
        },
        {
          column: 2,
          label:
            "Bu Warsih meragukan hasil pengukuran tekanan darah yang dilakukan Nia.",
        },
        {
          column: 1,
          label:
            "Mak Rosnah mengetahui peristiwa yang diceritakan Bu Warsih dari pengalamannya sendiri.",
        },
        {
          column: 2,
          label: "Ambulans baru dipanggil setelah Rahmat tiba di poskesdes.",
        },
        {
          column: 1,
          label:
            "Bu Warsih juga merasa tegang, walaupun tidak menunjukkannya di depan Nia.",
        },
      ],
    },
  },
};

export default item;
