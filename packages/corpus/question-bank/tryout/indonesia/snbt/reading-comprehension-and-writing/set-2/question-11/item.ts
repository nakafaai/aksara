import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "affix-meaning",
  },
  stimulus: "debat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*menyalahkan* diganti *mempersalahkan* karena yang dimaksud adalah pembicara melanggar aturan itu",
        },
        {
          correct: false,
          label:
            "kalimat (5) tidak perlu diperbaiki karena *menyalahkan* sudah bermakna melanggar aturan",
        },
        {
          correct: true,
          label:
            "*menyalahkan* diganti *menyalahi* karena yang dimaksud adalah pembicara melanggar aturan itu",
        },
        {
          correct: false,
          label:
            "*menyalahkan* diganti *menyalahi* karena akhiran *-i* pada kata itu menyatakan perbuatan yang dilakukan berulang-ulang",
        },
        {
          correct: false,
          label:
            "*menyalahkan* diganti *mempersalahkan* karena *menyalahkan* bukan bentuk baku",
        },
      ],
    },
  },
};

export default item;
