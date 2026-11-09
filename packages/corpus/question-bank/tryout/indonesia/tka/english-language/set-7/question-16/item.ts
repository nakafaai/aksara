import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "repot-plant",
  versions: {
    en: {
      columns: [
        "Getting the new pot ready",
        "Removing the plant",
        "Settling the plant in",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Putting about three centimeters of soil in the bottom of the new pot",
        },
        {
          column: 2,
          label: "Tapping the sides of the old pot when the plant is stuck",
        },
        {
          column: 3,
          label: "Pressing the fresh soil down lightly around the roots",
        },
        { column: 2, label: "Holding the plant at the base of its stems" },
      ],
    },
  },
};

export default item;
