import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "pos",
  versions: {
    id: {
      columns: ["Mungkin", "Tidak mungkin"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bima dan Dani di pos utara, Ayu di pos tengah, Citra dan Eko di pos selatan.",
        },
        {
          column: 1,
          label:
            "Ayu dan Eko di pos utara, Dani di pos tengah, Bima dan Citra di pos selatan.",
        },
        {
          column: 1,
          label:
            "Bima dan Eko di pos utara, Dani di pos tengah, Ayu dan Citra di pos selatan.",
        },
        {
          column: 2,
          label:
            "Dani dan Eko di pos utara, Citra di pos tengah, Ayu dan Bima di pos selatan.",
        },
      ],
    },
  },
};

export default item;
