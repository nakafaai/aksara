import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "screens-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "25.0%",
        },
        {
          correct: true,
          label: "31.5%",
        },
        {
          correct: false,
          label: "32.5%",
        },
        {
          correct: false,
          label: "37.8%",
        },
        {
          correct: false,
          label: "50.0%",
        },
      ],
    },
  },
};

export default item;
