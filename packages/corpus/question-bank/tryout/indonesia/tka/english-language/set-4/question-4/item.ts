import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The platform is busiest in the evening, while the ground floor is busiest at sunrise.",
        },
        {
          correct: true,
          label:
            "The platform gives a wider view, but birds notice people there more easily.",
        },
        {
          correct: false,
          label:
            "The platform is closer to the hunting herons than the bench downstairs is.",
        },
        {
          correct: false,
          label:
            "The platform stays open in strong wind, while the ground floor then closes.",
        },
        {
          correct: false,
          label:
            "The platform has viewing slits with flaps, while the ground floor has an open rail.",
        },
      ],
    },
  },
  stimulus: "egret-hide",
};

export default item;
