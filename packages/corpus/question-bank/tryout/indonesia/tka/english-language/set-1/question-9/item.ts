import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "gauge",
  versions: {
    en: {
      columns: ["Spoils every reading", "Spoils only one morning's reading"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Looking down at the measuring cylinder from above while the marks are being made",
        },
        {
          column: 1,
          label:
            "Drawing the zero line before the water has covered the domed base",
        },
        {
          column: 2,
          label: "Reading the gauge three hours late on a hot afternoon",
        },
        {
          column: 1,
          label:
            "Drawing the marks with a ruler held against the bottle instead of test pours",
        },
      ],
    },
  },
};

export default item;
