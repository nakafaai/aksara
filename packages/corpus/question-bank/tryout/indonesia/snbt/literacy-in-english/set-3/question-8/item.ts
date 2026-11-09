import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "four-day-week",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "In a reduced week, employees work fewer total hours for the same pay.",
        },
        {
          column: 2,
          label:
            "The best trial results came mainly from compressed weeks of four ten-hour days.",
        },
        {
          column: 1,
          label:
            "Governments could require employers in trials to share their data.",
        },
        {
          column: 2,
          label:
            "Hospitals and care homes were well represented in the voluntary trials.",
        },
      ],
    },
  },
};

export default item;
