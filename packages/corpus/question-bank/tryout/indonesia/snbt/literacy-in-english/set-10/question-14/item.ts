import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "app-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The reminder group had more people in it than the no-reminder group.",
        },
        {
          correct: false,
          label:
            "The table gives no figures for the share of users still active on day 7.",
        },
        {
          correct: true,
          label:
            "By day 90, the reminder group was only one point ahead of the other.",
        },
        {
          correct: false,
          label:
            "The people who received reminders were chosen because they were keener.",
        },
        {
          correct: false,
          label:
            "More people in the reminder group than in the other had left by day 7.",
        },
      ],
    },
  },
};

export default item;
