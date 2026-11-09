import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "walking-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Children squeeze between the vehicles to reach the gate.",
        },
        {
          correct: false,
          label:
            "Fifteen children in bright vests are easy for drivers to see.",
        },
        {
          correct: false,
          label:
            "Children should be active for an average of at least sixty minutes a day.",
        },
        { correct: false, label: "Routes can pause on stormy days." },
        {
          correct: true,
          label:
            "The number of vehicles stopping at SD Lereng Asri's gate fell from about 140 to about 90.",
        },
      ],
    },
  },
};

export default item;
