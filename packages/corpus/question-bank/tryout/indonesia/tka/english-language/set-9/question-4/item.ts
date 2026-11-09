import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "stilt-house",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The larger room is used for sitting, eating, and sleeping, while the smaller room is the kitchen.",
        },
        {
          correct: false,
          label:
            "The larger room is outside, while the smaller room is under the house.",
        },
        {
          correct: false,
          label: "The larger room has a fan, while the smaller room does not.",
        },
        {
          correct: false,
          label:
            "The larger room is at the back, while the smaller room is at the front.",
        },
        {
          correct: false,
          label:
            "The larger room is for guests only, while the smaller room holds the loom.",
        },
      ],
    },
  },
};

export default item;
