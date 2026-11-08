import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "visitor-fee",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A large fee that only wealthy tourists could afford to pay each day",
        },
        {
          correct: false,
          label:
            "Closing the town to all visitors during the busy summer months",
        },
        {
          correct: false,
          label:
            "A small fee with no limit on numbers and no report on its spending",
        },
        {
          correct: true,
          label:
            "Timed bookings with a daily cap, plus an openly reported fee for residents",
        },
        {
          correct: false,
          label:
            "Removing all charges so that more visitors can come into the town",
        },
      ],
    },
  },
};

export default item;
