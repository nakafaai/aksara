import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "water-meters",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Area C used more water in the first year of the trial than in the year before.",
        },
        {
          column: 2,
          label:
            "Each area without smart meters cut its use by more than 50 litres a day.",
        },
        {
          column: 1,
          label:
            "Both areas with smart meters cut their use by more than 10 percent.",
        },
        {
          column: 1,
          label:
            "Before the trial, Area A used the most water of the four areas.",
        },
      ],
    },
  },
};

export default item;
