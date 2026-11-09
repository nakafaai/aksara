import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "glacier-flow",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Glacier ice forms as new snow presses on older snow and squeezes out the air.",
        },
        {
          column: 2,
          label: "Most mountain glaciers move more than ten kilometres a year.",
        },
        {
          column: 2,
          label:
            "In the stake experiment, the stakes near the valley walls moved farthest.",
        },
        {
          column: 1,
          label:
            "Some outlet glaciers in Greenland carry ice from the ice sheet to the sea.",
        },
      ],
    },
  },
};

export default item;
