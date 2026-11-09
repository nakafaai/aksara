import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "basic-income",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A six-month payment to 500 volunteers chosen from across the country",
        },
        {
          correct: false,
          label:
            "A detailed survey asking adults how they would spend a basic income",
        },
        {
          correct: true,
          label:
            "Payments to every adult in several whole towns for many years",
        },
        {
          correct: false,
          label:
            "A two-year payment to 2,000 unemployed people, as Finland arranged",
        },
        {
          correct: false,
          label:
            "Payments to jobless people that stop as soon as each one finds work",
        },
      ],
    },
  },
};

export default item;
