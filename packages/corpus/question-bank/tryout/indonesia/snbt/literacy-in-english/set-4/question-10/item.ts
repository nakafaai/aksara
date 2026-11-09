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
            "A small fee with no cap on numbers and no public record of spending",
        },
        {
          correct: true,
          label:
            "Timed bookings with a daily cap, plus a fee openly spent on residents' needs",
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
