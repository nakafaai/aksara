import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "scooter-pilot",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "The number of injuries reported was highest in month 3.",
        },
        {
          column: 2,
          label:
            "Each scooter was used for fewer trips in month 4 than in month 1.",
        },
        {
          column: 2,
          label:
            "The injury figures include every injury anywhere in the city.",
        },
        {
          column: 1,
          label: "Each month's average trip was longer than the month before.",
        },
      ],
    },
  },
};

export default item;
