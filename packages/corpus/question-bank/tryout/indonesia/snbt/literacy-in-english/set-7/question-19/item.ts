import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "carnegie-libraries",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To suggest a personal reason behind Carnegie's gifts to libraries",
        },
        {
          correct: false,
          label: "To show that private libraries were better than public ones",
        },
        {
          correct: false,
          label:
            "To explain how Carnegie first made his fortune in the steel industry",
        },
        {
          correct: false,
          label: "To prove that every working boy in Pittsburgh became wealthy",
        },
        {
          correct: false,
          label: "To argue that libraries should only open on Saturdays",
        },
      ],
    },
  },
};

export default item;
