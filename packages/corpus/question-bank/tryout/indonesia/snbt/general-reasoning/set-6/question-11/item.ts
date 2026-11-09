import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dodi tidak hadir pada salah satu latihan pekan ini, jadi Dodi tidak ikut final.",
        },
        {
          column: 2,
          label: "Eka hadir pada semua latihan pekan ini, jadi Eka ikut final.",
        },
        {
          column: 1,
          label:
            "Gita ikut final, jadi Gita hadir pada semua latihan pekan ini dan mendapat kaus khusus.",
        },
        {
          column: 2,
          label: "Fajar mendapat kaus khusus, jadi Fajar ikut final.",
        },
      ],
    },
  },
};

export default item;
