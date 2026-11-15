import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "mpemba-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Timing a different event, such as the first ice instead of reaching zero degrees, and placing the thermometer in a slightly different spot.",
        },
        {
          correct: false,
          label:
            "Hot water losing mass by evaporation, and hot water holding less dissolved gas.",
        },
        {
          correct: false,
          label:
            "Timing a different event, such as the first ice instead of reaching zero degrees, and warming the water before it goes into the freezer.",
        },
        {
          correct: false,
          label:
            "Placing the thermometer in a slightly different spot, and using an ice-cream mixture instead of water.",
        },
        {
          correct: false,
          label:
            "Warm water rising and carrying heat to the surface, and placing the thermometer in a slightly different spot.",
        },
      ],
    },
  },
};

export default item;
