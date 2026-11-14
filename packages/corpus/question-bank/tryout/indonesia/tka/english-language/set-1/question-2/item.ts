import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Wait until late October and have Grandmother name the last houses at the kitchen table, where the map is kept.",
        },
        {
          correct: false,
          label:
            "Ask the boatman to name the last houses, since he grew up nearby and knows where the well lay.",
        },
        {
          correct: false,
          label:
            "Go out by boat with Grandmother before mid-October and lengthen the step distances, since a seven-year-old's steps cover more ground than Laras's.",
        },
        {
          correct: true,
          label:
            "Go out by boat with Grandmother before mid-October and shorten the step distances to fit a seven-year-old's stride.",
        },
        {
          correct: false,
          label:
            "Go out by boat once the October rains have raised the water, so the boat can reach the houses near the school.",
        },
      ],
    },
  },
};

export default item;
