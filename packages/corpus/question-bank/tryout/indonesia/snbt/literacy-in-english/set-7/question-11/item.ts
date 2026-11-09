import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "museum-visits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "8.3%",
        },
        {
          correct: false,
          label: "10.7%",
        },
        {
          correct: true,
          label: "12.0%",
        },
        {
          correct: false,
          label: "15.8%",
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
