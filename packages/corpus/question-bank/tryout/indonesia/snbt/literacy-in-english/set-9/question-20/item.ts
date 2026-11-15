import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "As one more trade-off, keeping areas true by giving up shapes, and as the first world map to make that trade.",
        },
        {
          correct: false,
          label:
            "As a fairer map that corrects Mercator's bias against the tropics, just as Peters claimed.",
        },
        {
          correct: true,
          label:
            "As one more trade-off, keeping areas true by giving up shapes, which suits some tasks but is not the right map for every job.",
        },
        {
          correct: false,
          label:
            "As one more trade-off, keeping shapes true by giving up areas, which suits navigation better than Mercator's map.",
        },
        {
          correct: false,
          label:
            "As a map to be rejected outright, because cartographers objected to it.",
        },
      ],
    },
  },
};

export default item;
