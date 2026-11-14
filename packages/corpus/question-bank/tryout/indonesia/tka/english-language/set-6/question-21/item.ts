import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "walking-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "to describe the morning traffic jam in front of SD Taman Kenari",
        },
        {
          correct: false,
          label: "to report the results of a vehicle count at SD Lereng Asri",
        },
        {
          correct: true,
          label:
            "to persuade SD Taman Kenari to start a walking bus for its students",
        },
        {
          correct: false,
          label:
            "to explain the World Health Organization's activity guidelines",
        },
        {
          correct: false,
          label:
            "to argue that parents should never drive their children to school",
        },
      ],
    },
  },
};

export default item;
