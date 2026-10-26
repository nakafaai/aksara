import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The hottest air in town is found near the bus terminal.",
        },
        {
          correct: true,
          label:
            "Many people walk these routes at midday, mostly without shade.",
        },
        {
          correct: false,
          label: "Shop owners have offered to pay for watering the trees.",
        },
        {
          correct: true,
          label: "Shade made the biggest difference on paved surfaces.",
        },
      ],
    },
  },
  stimulus: "shade-trees",
};

export default item;
