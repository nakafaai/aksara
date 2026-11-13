import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      columns: ["Flooded at least once a day", "Flooded less than once a day"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The ground where the plant that stores salt in its fleshy stems grows",
        },
        {
          column: 1,
          label:
            "The ground where the plant with hollow channels in its stems grows",
        },
        {
          column: 1,
          label: "The ground beyond the last plants, where the boardwalk ends",
        },
        {
          column: 2,
          label:
            "The ground where a plant that pushes salt out through its leaves grows beside white-crusted patches",
        },
      ],
    },
  },
};

export default item;
