import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  versions: {
    en: {
      columns: ["Movement", "Moisture", "Access"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Elastic shelf cords",
        },
        {
          column: 2,
          label: "Sealed book boxes",
        },
        {
          column: 3,
          label: "A folding ramp with raised edges",
        },
      ],
    },
  },
  stimulus: "library-boat",
};

export default item;
