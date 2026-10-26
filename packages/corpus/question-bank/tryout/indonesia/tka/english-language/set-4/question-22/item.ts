import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "information-validity",
  },
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The trees lowered the air temperature across the town center.",
        },
        {
          column: 2,
          label:
            "Asphalt in the sun is hotter than grass in the sun at every hour of the day.",
        },
        {
          column: 1,
          label:
            "On the day of the test, concrete in full sun was hotter than grass in full sun.",
        },
      ],
    },
  },
  stimulus: "shade-trees",
};

export default item;
