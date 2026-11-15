import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "reading-minutes",
  versions: {
    en: {
      columns: [
        "Stated as a fact",
        "Stated as an opinion",
        "Not stated in either text",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Both pilot teachers already ran book clubs.",
        },
        {
          column: 2,
          label:
            "Daily practice builds readers better than anything else does.",
        },
        {
          column: 3,
          label: "The two hundred new books raised borrowing.",
        },
        {
          column: 1,
          label: "The first lesson is mathematics on four days of the week.",
        },
        {
          column: 2,
          label: "Fifteen minutes a day is a small price for daily reading.",
        },
        {
          column: 3,
          label: "Year 8 already reads during the long break.",
        },
      ],
    },
  },
};

export default item;
