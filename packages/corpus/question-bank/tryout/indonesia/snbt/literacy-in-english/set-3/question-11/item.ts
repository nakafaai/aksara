import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "meat-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "20 percent",
        },
        {
          correct: false,
          label: "31.25 percent",
        },
        {
          correct: true,
          label: "31.5 percent",
        },
        {
          correct: false,
          label: "35 percent",
        },
        {
          correct: false,
          label: "42 percent",
        },
      ],
    },
  },
};

export default item;
