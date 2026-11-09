import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "app-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The gap between the two groups grew wider at every later check.",
        },
        {
          correct: true,
          label:
            "The gap was largest early on and had almost vanished by day 90.",
        },
        {
          correct: false,
          label: "Reminders had no effect on the number of users at any point.",
        },
        {
          correct: false,
          label: "Without reminders, almost no one used the app after day 7.",
        },
        {
          correct: false,
          label:
            "Reminders tripled the share of learners still active on day 90.",
        },
      ],
    },
  },
};

export default item;
