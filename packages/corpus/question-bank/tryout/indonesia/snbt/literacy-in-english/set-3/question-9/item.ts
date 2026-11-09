import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "four-day-week",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It keeps the same hours and skips the redesign behind the good results.",
        },
        {
          correct: false,
          label:
            "It requires employees to accept lower pay for the same amount of work.",
        },
        {
          correct: false,
          label:
            "It is used only in hospitals, where staff must be present every day.",
        },
        {
          correct: false,
          label:
            "It reduces the number of meetings so much that teams stop communicating.",
        },
        {
          correct: false,
          label:
            "It has never been tested in any company in the United Kingdom.",
        },
      ],
    },
  },
};

export default item;
