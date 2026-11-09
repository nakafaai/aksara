import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "turtle-nest",
  versions: {
    id: {
      columns: [
        "Alasan pemindahan telur",
        "Cara kerja relawan",
        "Aturan bagi pengunjung",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Sarang di pantai terbuka sering digali anjing liar.",
        },
        { column: 2, label: "Sebagian sarang dinaungi jaring paranet." },
        { column: 3, label: "Memotret dengan lampu kilat dilarang." },
        { column: 2, label: "Telur dipindahkan dalam waktu enam jam." },
      ],
    },
  },
};

export default item;
