import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Why Everyone Should Swim Every Day",
        },
        {
          isCorrect: false,
          label: "How Recreational Water Spreads Illness",
        },
        {
          isCorrect: false,
          label: "The Best Exercise for People with Arthritis",
        },
        {
          isCorrect: false,
          label: "Why Water Exercise Prevents Every Illness",
        },
        {
          isCorrect: true,
          label: "Swimming: Possible Benefits and Safety Considerations",
        },
      ],
    },
  },
};

export default item;
