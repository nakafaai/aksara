import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "explicit-information",
  },
  stimulus: "later-start",
  versions: {
    en: {
      columns: ["Outcome to measure", "Potential unequal effect"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Late arrivals",
        },
        {
          column: 1,
          label: "Transport delays",
        },
        {
          column: 2,
          label: "Difficulty collecting a younger sibling",
        },
      ],
    },
  },
};

export default item;
