import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "cholera-pump",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Deaths clustered around the Broad Street pump.",
        },
        {
          correct: true,
          label:
            "Deaths fell after many residents left the area, which took them away from both the pump and the air around it.",
        },
        {
          correct: false,
          label:
            "A widow who lived miles away, but drank water fetched from Broad Street, died of cholera.",
        },
        {
          correct: false,
          label:
            "Neighbours in the same street died at very different rates depending on their water company.",
        },
        {
          correct: false,
          label:
            "Workers at a brewery beside the pump, who did not drink its water, escaped almost entirely.",
        },
      ],
    },
  },
};

export default item;
