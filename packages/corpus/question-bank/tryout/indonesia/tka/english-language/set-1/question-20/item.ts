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
      columns: [
        "Flooded twice a day",
        "Flooded about twice a month",
        "Flooded only by the highest tides or storms",
      ],
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
            "The ground where a plant with hollow channels in its stems grows",
        },
        {
          column: 1,
          label:
            "The bare ground beyond the last plants, where the boardwalk ends",
        },
        {
          column: 3,
          label:
            "The ground where a plant that pushes salt out through its leaves grows beside white-crusted patches",
        },
      ],
    },
  },
};

export default item;
