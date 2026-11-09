import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "water-filter",
  versions: {
    en: {
      columns: [
        "Building the layers",
        "Preparing the bottle",
        "Testing the filter",
      ],
      kind: "matrix",
      statements: [
        { column: 2, label: "Making holes in the cap with a nail" },
        { column: 1, label: "Putting the fine sand above the charcoal" },
        {
          column: 3,
          label: "Pouring the water through the filter a second time",
        },
        {
          column: 2,
          label: "Cutting the bottle 10 centimeters from the bottom",
        },
      ],
    },
  },
};

export default item;
