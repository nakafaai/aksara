import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "cultivated-meat",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Cultivated meat is already cheaper than farmed meat.",
        },
        {
          column: 1,
          label:
            "Singapore was the first country to approve the sale of cultivated meat.",
        },
        {
          column: 1,
          label:
            "A ban prevents evidence about the product from being collected.",
        },
        {
          column: 2,
          label:
            "Labelling cultivated meat would force consumers to stop buying farmed meat.",
        },
      ],
    },
  },
};

export default item;
