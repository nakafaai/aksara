import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "app-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "6",
        },
        {
          correct: true,
          label: "300",
        },
        {
          correct: false,
          label: "600",
        },
        {
          correct: false,
          label: "1,200",
        },
        {
          correct: false,
          label: "2,100",
        },
      ],
    },
  },
};

export default item;
