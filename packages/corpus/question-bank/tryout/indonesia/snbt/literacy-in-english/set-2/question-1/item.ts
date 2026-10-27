import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Why Everyone Should Swim Every Day",
        },
        {
          correct: false,
          label: "How Recreational Water Spreads Illness",
        },
        {
          correct: false,
          label: "The Best Exercise for People with Arthritis",
        },
        {
          correct: false,
          label: "Why Water Exercise Prevents Every Illness",
        },
        {
          correct: true,
          label: "Swimming: Possible Benefits and Safety Considerations",
        },
      ],
    },
  },
};

export default item;
