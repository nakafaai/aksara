import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The Peters map gave up correct shapes in order to show correct areas.",
        },
        {
          column: 2,
          label:
            "Peters was the first person to describe an equal-area world map.",
        },
        {
          column: 2,
          label:
            "The cartographers objected to the Peters map mainly because it made rich countries look smaller.",
        },
        {
          column: 1,
          label:
            "The passage implies that an equal-area map must distort shapes somewhere.",
        },
      ],
    },
  },
};

export default item;
