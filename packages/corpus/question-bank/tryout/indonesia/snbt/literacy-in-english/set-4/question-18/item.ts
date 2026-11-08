import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The mechanism could be used to predict when eclipses were likely.",
        },
        {
          column: 2,
          label: "Fewer than ten gears have survived from the mechanism.",
        },
        {
          column: 1,
          label:
            "One dial followed a four-year cycle that included the Olympics.",
        },
        {
          column: 2,
          label:
            "Medieval astronomical clocks were built before the Antikythera mechanism.",
        },
      ],
    },
  },
};

export default item;
