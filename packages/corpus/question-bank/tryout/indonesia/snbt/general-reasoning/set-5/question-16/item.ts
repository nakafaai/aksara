import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "selection",
  },
  stimulus: "sains",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Tepat satu dari Arka dan Haikal dipilih.",
        },
        {
          column: 2,
          label: "Gendis dipilih.",
        },
        {
          column: 2,
          label: "Bening dipilih.",
        },
        {
          column: 1,
          label: "Jika Elvira dipilih, Arka juga dipilih.",
        },
      ],
    },
  },
};

export default item;
