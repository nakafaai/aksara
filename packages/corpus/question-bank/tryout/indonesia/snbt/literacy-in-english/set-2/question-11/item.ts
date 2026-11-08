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
          label: "About 14 percent",
        },
        {
          correct: false,
          label: "About 22 percent",
        },
        {
          correct: true,
          label: "About 16 percent",
        },
        {
          correct: false,
          label: "About 25 percent",
        },
        {
          correct: false,
          label: "About 80 percent",
        },
      ],
    },
  },
};

export default item;
