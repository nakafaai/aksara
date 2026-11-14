import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "revision",
  },
  stimulus: "antrean",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Menghapus kedua tanda koma pada kalimat (4).",
        },
        {
          column: 2,
          label:
            "Mengganti kata *membuat* pada kalimat (10) dengan *menjadikan*.",
        },
        {
          column: 1,
          label: "Menghapus kedua tanda koma pada kalimat (12).",
        },
        {
          column: 1,
          label:
            "Menghapus kata *tidak* sebelum *bergeming* pada kalimat (13).",
        },
      ],
    },
  },
};

export default item;
