import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "sasando",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Sasando dimainkan dengan cara digesek.",
        },
        {
          column: 1,
          label: "Setiap dawai sasando menghasilkan nada yang berbeda.",
        },
        {
          column: 1,
          label: "Pemain sasando dapat memainkan melodi dan iringan sekaligus.",
        },
        {
          column: 2,
          label:
            "Sasando listrik tetap memerlukan wadah daun lontar untuk memperkuat bunyi.",
        },
      ],
    },
  },
};

export default item;
