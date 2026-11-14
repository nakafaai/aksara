import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Use an equal-area map for the size comparison.",
        },
        {
          correct: false,
          label:
            "Use Mercator's map, and shrink Greenland by eye to about half its size.",
        },
        {
          correct: false,
          label:
            "Use any world map, since every projection distorts area in the same way.",
        },
        {
          correct: true,
          label:
            "If only Mercator's map is available, warn that lands far from the equator look larger than they are.",
        },
        {
          correct: false,
          label:
            "Use Mercator's map, since it keeps shapes true and true shapes mean true sizes.",
        },
      ],
    },
  },
};

export default item;
