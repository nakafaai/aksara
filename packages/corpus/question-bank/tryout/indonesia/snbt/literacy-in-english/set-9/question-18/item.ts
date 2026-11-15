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
            "On the Peters map, Greenland would look about as large as Africa.",
        },
        {
          column: 1,
          label:
            "On the Peters map, Africa would cover roughly fourteen times the area of Greenland.",
        },
        {
          column: 2,
          label:
            "The cartographers objected that the Peters map got the areas of countries wrong.",
        },
      ],
    },
  },
};

export default item;
