import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  stimulus: "budaya",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Angklung diadakan pada hari Senin.",
        },
        {
          column: 1,
          label: "Wayang diadakan pada hari Senin.",
        },
        {
          column: 1,
          label: "Batik diadakan pada sesi siang.",
        },
        {
          column: 2,
          label: "Wayang diadakan pada sesi pagi.",
        },
      ],
    },
  },
};

export default item;
