import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "cultivated-meat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "To make cultivated meat look more traditional to shoppers",
        },
        {
          correct: false,
          label:
            "To raise the price of cultivated meat above that of farmed meat",
        },
        {
          correct: false,
          label: "To prove that cultivated meat is safer than farmed meat",
        },
        {
          correct: true,
          label: "To let people who prefer farmed meat avoid cultivated meat",
        },
        {
          correct: false,
          label: "To persuade farmers to switch to producing cultivated meat",
        },
      ],
    },
  },
};

export default item;
