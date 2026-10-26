import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  versions: {
    en: {
      columns: ["Safe movement", "Product protection", "Drainage"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Yellow-edged wooden bridges",
        },
        {
          column: 2,
          label: "Vertical racks beneath deep awnings",
        },
        {
          column: 3,
          label: "A blue circle kept clear of chairs",
        },
      ],
    },
  },
  stimulus: "rain-market",
};

export default item;
