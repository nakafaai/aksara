import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "tempe-mold",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedelai untuk tempe direbus, dikupas, dan direndam sebelum ditaburi ragi.",
        },
        {
          column: 1,
          label:
            "Enzim dari kapang memecah protein dan lemak kedelai menjadi bagian yang lebih sederhana.",
        },
        {
          column: 2,
          label: "Vitamin B12 dalam tempe dihasilkan oleh kapang *Rhizopus*.",
        },
        {
          column: 2,
          label:
            "Kantong plastik untuk tempe harus tertutup rapat agar tidak dimasuki udara.",
        },
      ],
    },
  },
};

export default item;
