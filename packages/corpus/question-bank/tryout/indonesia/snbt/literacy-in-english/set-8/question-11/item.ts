import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "scooter-pilot",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "2.0",
        },
        {
          correct: false,
          label: "2.5",
        },
        {
          correct: false,
          label: "2.7",
        },
        {
          correct: false,
          label: "4.0",
        },
        {
          correct: false,
          label: "16.0",
        },
      ],
    },
  },
};

export default item;
