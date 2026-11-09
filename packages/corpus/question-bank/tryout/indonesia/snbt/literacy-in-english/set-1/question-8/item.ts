import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "parking-minimums",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Parking minimums were first meant to prevent congestion caused by drivers looking for spaces.",
        },
        {
          column: 2,
          label:
            "Removing parking minimums would mean that no new parking spaces are built.",
        },
        {
          column: 1,
          label:
            "Parking formulas are sometimes borrowed from places with different travel patterns.",
        },
        {
          column: 2,
          label:
            "Every city that removed its minimums saw housing prices fall.",
        },
      ],
    },
  },
};

export default item;
