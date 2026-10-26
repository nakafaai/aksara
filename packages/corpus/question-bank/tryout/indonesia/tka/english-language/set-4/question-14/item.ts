import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Stay where he is until the electricity comes back on",
        },
        {
          correct: false,
          label: "Wait in the kitchen for his grandmother to bring a candle",
        },
        {
          correct: false,
          label: "Search the dark house for the matches and the candles",
        },
        {
          correct: false,
          label: "Call his parents to ask where the candles are kept",
        },
        {
          correct: true,
          label:
            "Take the flashlight from the drawer and go to his grandmother",
        },
      ],
    },
  },
  stimulus: "power-cut",
};

export default item;
