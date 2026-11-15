import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "island-ferry",
  versions: {
    en: {
      columns: ["At 12:00", "At 13:00"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Low tide at 6:45",
        },
        {
          column: 1,
          label: "Low tide at 8:45",
        },
        {
          column: 2,
          label: "Low tide at 12:20",
        },
        {
          column: 1,
          label: "Low tide at 10:15",
        },
        {
          column: 1,
          label: "Low tide at 13:00",
        },
      ],
    },
  },
};

export default item;
