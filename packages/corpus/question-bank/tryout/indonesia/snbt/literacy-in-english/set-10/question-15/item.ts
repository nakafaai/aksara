import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "app-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The number of reminders each person in the study received in total",
        },
        {
          correct: false,
          label:
            "How many times each user opened the app on their very first day",
        },
        {
          correct: false,
          label:
            "The share of users who had switched off the sound on their phones",
        },
        {
          correct: false,
          label: "The number of languages the app offers to people who sign up",
        },
        {
          correct: true,
          label: "Scores on one vocabulary test taken by both groups on day 90",
        },
      ],
    },
  },
};

export default item;
