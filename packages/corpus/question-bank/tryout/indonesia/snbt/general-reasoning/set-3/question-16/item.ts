import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "rapat",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Cahya duduk di kursi 3.",
        },
        {
          column: 2,
          label: "Asri duduk di kursi 1.",
        },
        {
          column: 2,
          label: "Fajar bersebelahan dengan Asri.",
        },
        {
          column: 1,
          label: "Galuh berhadapan dengan Fajar.",
        },
      ],
    },
  },
};

export default item;
