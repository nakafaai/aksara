import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "four-day-week",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Firms that expected to benefit may have joined, so results may not fit others.",
        },
        {
          correct: false,
          label:
            "Volunteer companies paid their staff less than other companies did.",
        },
        {
          correct: false,
          label:
            "Voluntary trials are not permitted in sectors such as healthcare and transport.",
        },
        {
          correct: false,
          label:
            "Companies that volunteer tend to exaggerate their results to look successful.",
        },
        {
          correct: false,
          label:
            "Volunteering meant the trials lasted longer than planned trials would.",
        },
      ],
    },
  },
};

export default item;
