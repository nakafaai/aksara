import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bike-lanes",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "2",
        },
        {
          correct: true,
          label: "8.75",
        },
        {
          correct: false,
          label: "14",
        },
        {
          correct: false,
          label: "15",
        },
        {
          correct: false,
          label: "17.5",
        },
      ],
    },
  },
};

export default item;
