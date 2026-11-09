import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "classroom-points",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Pupils often work harder when points are on offer.",
        },
        {
          column: 2,
          label:
            "In the 1973 experiment, every child was promised a certificate.",
        },
        {
          column: 2,
          label: "Leaderboards mainly help pupils who are near the bottom.",
        },
        {
          column: 1,
          label: "Good games let players fail and try again without penalty.",
        },
      ],
    },
  },
};

export default item;
