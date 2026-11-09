import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "basic-income",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Basic income pilots have proved that a universal scheme would succeed.",
        },
        {
          correct: true,
          label:
            "Pilots are useful but cannot show what a permanent universal scheme would do.",
        },
        {
          correct: false,
          label:
            "A basic income should be rejected because recipients stop working.",
        },
        {
          correct: false,
          label:
            "Pilots waste public money and should be ended as soon as possible.",
        },
        {
          correct: false,
          label:
            "A universal scheme would work better if charities paid for it instead of taxes.",
        },
      ],
    },
  },
};

export default item;
