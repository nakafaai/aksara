import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About 36",
        },
        {
          correct: false,
          label: "About 45",
        },
        {
          correct: true,
          label: "About 59",
        },
        {
          correct: false,
          label: "About 72",
        },
        {
          correct: false,
          label: "About 230",
        },
      ],
    },
  },
};

export default item;
