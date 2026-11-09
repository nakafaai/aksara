import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "half-sleep",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ducks in the middle of the row kept one eye open more often than ducks at the ends.",
        },
        {
          column: 1,
          label:
            "Fur seals usually sleep with both hemispheres when they are on land.",
        },
        {
          column: 1,
          label: "Frigatebirds slept for less than an hour a day while flying.",
        },
        {
          column: 2,
          label:
            "Humans can sleep with one hemisphere fully awake, as dolphins do.",
        },
      ],
    },
  },
};

export default item;
